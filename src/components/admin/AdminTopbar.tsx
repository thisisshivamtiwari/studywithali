import { useNavigate } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'

export type AdminTopbarProps = {
  isSidebarCollapsed: boolean
  handleToggleSidebar: () => void
}

export const AdminTopbar = ({ isSidebarCollapsed, handleToggleSidebar }: AdminTopbarProps) => {
  const navigate = useNavigate()
  const { user, handleLogout } = useAuth()

  const handleLogoutClick = async () => {
    await handleLogout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="w-full px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleToggleSidebar}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <FiMenu className="w-4 h-4 text-gray-700" aria-hidden="true" />
          </button>
          <div>
            <p className="text-[10px] font-semibold text-indigo-500 uppercase tracking-[0.18em]">Admin</p>
            <h1 className="text-lg md:text-xl font-semibold text-gray-900 leading-tight">Study with Ali dashboard</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[11px] text-gray-400 uppercase tracking-wide">Signed in as</span>
              <span className="text-sm font-medium text-gray-900">{user.email ?? 'Admin'}</span>
            </div>
          )}
          <button
            type="button"
            onClick={handleLogoutClick}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500/70"
            aria-label="Logout"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default AdminTopbar

