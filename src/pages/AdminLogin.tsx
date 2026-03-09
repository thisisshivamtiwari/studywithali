import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'

const AdminLogin = () => {
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

      if (role !== 'admin') {
        await supabase.auth.signOut()
        setErrorMessage('You do not have admin access.')
        return
      }

      handleSetUser({
        id: data.user.id,
        email: data.user.email ?? null,
        role,
      })

      navigate('/admin/dashboard')
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
    <section className="min-h-[60vh] flex items-center justify-center bg-slate-950 py-16 px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl shadow-slate-900/60">
        <h1 className="text-2xl font-bold text-white mb-2 text-center">Admin Login</h1>
        <p className="text-sm text-slate-300 mb-6 text-center">Restricted area. Authorised staff only.</p>

        {errorMessage && (
          <div className="mb-4 rounded-lg bg-red-900/40 text-red-200 text-sm px-3 py-2" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="admin-email" className="block text-sm font-medium text-slate-100 mb-1">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-950 text-slate-50 placeholder-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/40 outline-none text-sm"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-slate-100 mb-1">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-950 text-slate-50 placeholder-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/40 outline-none text-sm"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 text-white font-semibold px-4 py-2.5 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-500/40 text-sm cursor-pointer"
            aria-label="Sign in as admin"
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default AdminLogin

