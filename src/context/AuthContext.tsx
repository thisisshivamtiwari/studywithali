import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export type AuthUser = {
  id: string
  email: string | null
  role: 'user' | 'admin'
}

type AuthContextValue = {
  user: AuthUser | null
  isInitialising: boolean
  handleSetUser: (nextUser: AuthUser | null) => void
  handleLogout: () => Promise<void>
}

const STORAGE_KEY = 'studywithali-user'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isInitialising, setIsInitialising] = useState(true)

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as AuthUser
        if (parsed && parsed.id && parsed.role) {
          setUser(parsed)
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY)
      }
    }
    setIsInitialising(false)
  }, [])

  const handleSetUser = (nextUser: AuthUser | null) => {
    setUser(nextUser)
    if (!nextUser) {
      window.localStorage.removeItem(STORAGE_KEY)
      return
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    handleSetUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isInitialising,
        handleSetUser,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextValue => {
  const value = useContext(AuthContext)
  if (!value) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return value
}

