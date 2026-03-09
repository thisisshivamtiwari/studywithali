import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { user, isInitialising, handleSetUser } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email || !password) {
      setErrorMessage('Email and password are required.')
      return
    }
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setErrorMessage(error.message || 'Invalid email or password.')
        return
      }

      if (!data.user) {
        setErrorMessage('Unable to sign in right now. Please try again.')
        return
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single()

      const role = (profileData?.role as 'user' | 'admin' | null | undefined) ?? 'user'

      handleSetUser({
        id: data.user.id,
        email: data.user.email ?? null,
        role,
      })

      navigate('/')
    } catch {
      setErrorMessage('Unable to sign in right now. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isInitialising) {
    return null
  }

  if (user) {
    const redirectTo = user.role === 'admin' ? '/admin/dashboard' : '/'
    return <Navigate to={redirectTo} replace />
  }

  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-linear-to-b from-gray-50 to-white py-16 px-4">
      <div className="w-full max-w-md card-material p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Login</h1>
        <p className="text-sm text-gray-600 mb-6 text-center">Sign in to access your account.</p>

        {errorMessage && (
          <div className="mb-4 rounded-lg bg-red-50 text-red-700 text-sm px-3 py-2" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold px-4 py-2.5 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-500/40 text-sm cursor-pointer"
            aria-label="Sign in"
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Login

