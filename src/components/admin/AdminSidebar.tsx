import { FiHome, FiFileText, FiUsers, FiClipboard, FiMail } from 'react-icons/fi'
import type { AdminSectionKey } from './AdminShell'

export type AdminSidebarProps = {
  isCollapsed: boolean
  activeKey: AdminSectionKey
  onChangeActiveKey: (key: AdminSectionKey) => void
}

const baseItemClasses =
  'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium cursor-pointer transition-colors'

export const AdminSidebar = ({ isCollapsed, activeKey, onChangeActiveKey }: AdminSidebarProps) => {
  const handleSelect = (key: AdminSectionKey) => {
    onChangeActiveKey(key)
  }

  return (
    <aside
      className={`hidden md:flex flex-col border-r border-gray-200 bg-gray-50 transition-all duration-200 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <nav className="flex-1 px-2 py-4 space-y-1">
        <button
          type="button"
          onClick={() => handleSelect('overview')}
          className={`${baseItemClasses} ${
            activeKey === 'overview' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
          }`}
          aria-label="Overview"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600 text-xs font-bold text-white">
            <FiHome className="w-4 h-4" aria-hidden="true" />
          </span>
          {isCollapsed ? null : <span>Overview</span>}
        </button>
        <button
          type="button"
          onClick={() => handleSelect('admissions')}
          className={`${baseItemClasses} ${
            activeKey === 'admissions' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
          }`}
          aria-label="Admissions"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gray-200 text-xs font-bold text-gray-800">
            <FiClipboard className="w-4 h-4" aria-hidden="true" />
          </span>
          {isCollapsed ? null : <span>Admissions</span>}
        </button>
        <button
          type="button"
          onClick={() => handleSelect('contacts')}
          className={`${baseItemClasses} ${
            activeKey === 'contacts' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
          }`}
          aria-label="Contacts"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gray-200 text-xs font-bold text-gray-800">
            <FiMail className="w-4 h-4" aria-hidden="true" />
          </span>
          {isCollapsed ? null : <span>Contacts</span>}
        </button>
        <button
          type="button"
          onClick={() => handleSelect('notes')}
          className={`${baseItemClasses} ${
            activeKey === 'notes' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
          }`}
          aria-label="Notes and exam resources"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gray-200 text-xs font-bold text-gray-800">
            <FiFileText className="w-4 h-4" aria-hidden="true" />
          </span>
          {isCollapsed ? null : <span>Notes &amp; exam papers</span>}
        </button>
        <button
          type="button"
          onClick={() => handleSelect('users')}
          className={`${baseItemClasses} ${
            activeKey === 'users' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
          }`}
          aria-label="Users"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gray-200 text-xs font-bold text-gray-800">
            <FiUsers className="w-4 h-4" aria-hidden="true" />
          </span>
          {isCollapsed ? null : <span>Users</span>}
        </button>
      </nav>
      <div className="px-3 pb-4 pt-2 border-t border-gray-200 text-xs text-gray-400">
        {isCollapsed ? <p className="text-center">⋯</p> : <p>More admin tools will appear here later.</p>}
      </div>
    </aside>
  )
}

export default AdminSidebar


