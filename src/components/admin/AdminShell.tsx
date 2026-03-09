import { useState } from 'react'
import AdminTopbar from './AdminTopbar'
import AdminSidebar from './AdminSidebar'

export type AdminSectionKey = 'overview' | 'notes' | 'users' | 'admissions' | 'contacts'

export type AdminShellProps = {
  children: React.ReactNode
  activeKey: AdminSectionKey
  onChangeActiveKey: (key: AdminSectionKey) => void
}

export const AdminShell = ({ children, activeKey, onChangeActiveKey }: AdminShellProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      <AdminTopbar isSidebarCollapsed={isSidebarCollapsed} handleToggleSidebar={handleToggleSidebar} />
      <div className="flex flex-1 min-h-0">
        <AdminSidebar
          isCollapsed={isSidebarCollapsed}
          activeKey={activeKey}
          onChangeActiveKey={onChangeActiveKey}
        />
        <main className="flex-1 min-w-0 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 space-y-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default AdminShell


