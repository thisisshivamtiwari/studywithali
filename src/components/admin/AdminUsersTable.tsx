export type AdminUserRow = {
  id: string
  email: string | null
  full_name?: string | null
  role: string | null
  created_at: string | null
}

export type AdminUsersTableProps = {
  users: AdminUserRow[]
  isLoading: boolean
  errorMessage: string | null
}

export const AdminUsersTable = ({ users, isLoading, errorMessage }: AdminUsersTableProps) => {
  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading users…</p>
  }

  if (errorMessage) {
    return <p className="text-sm text-red-600">{errorMessage}</p>
  }

  if (!users.length) {
    return <p className="text-sm text-gray-500">No users found yet.</p>
  }

  const formatDate = (value: string | null) => {
    if (!value) return '—'
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return '—'
    return d.toLocaleDateString()
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-4 py-2 font-semibold text-gray-600">Name</th>
            <th className="text-left px-4 py-2 font-semibold text-gray-600">Email</th>
            <th className="text-left px-4 py-2 font-semibold text-gray-600">Role</th>
            <th className="text-left px-4 py-2 font-semibold text-gray-600">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-gray-100">
              <td className="px-4 py-2 text-gray-900">
                {user.full_name && user.full_name.trim().length > 0 ? user.full_name : '—'}
              </td>
              <td className="px-4 py-2 text-gray-800">{user.email ?? '—'}</td>
              <td className="px-4 py-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    user.role === 'admin'
                      ? 'bg-red-50 text-red-700 border border-red-100'
                      : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                  }`}
                >
                  {user.role ?? 'user'}
                </span>
              </td>
              <td className="px-4 py-2 text-gray-700">{formatDate(user.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminUsersTable

