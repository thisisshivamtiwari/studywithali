export type AdminContactRow = {
  id: string
  name: string | null
  email: string | null
  phone: string | null
  subject: string | null
  message: string | null
  created_at: string | null
}

export type AdminContactsTableProps = {
  rows: AdminContactRow[]
  isLoading: boolean
  errorMessage: string | null
  onRowClick?: (row: AdminContactRow) => void
}

export const AdminContactsTable = ({ rows, isLoading, errorMessage, onRowClick }: AdminContactsTableProps) => {
  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading messages…</p>
  }

  if (errorMessage) {
    return <p className="text-sm text-red-600">{errorMessage}</p>
  }

  if (!rows.length) {
    return <p className="text-sm text-gray-500">No contact messages yet.</p>
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
            <th className="text-left px-4 py-2 font-semibold text-gray-600">Phone</th>
            <th className="text-left px-4 py-2 font-semibold text-gray-600">Subject</th>
            <th className="text-left px-4 py-2 font-semibold text-gray-600">Received</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              role="button"
              tabIndex={0}
              className="border-t border-gray-100 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 cursor-pointer"
              onClick={() => onRowClick?.(row)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onRowClick?.(row)
                }
              }}
              aria-label={`View details for ${row.name ?? 'contact'}`}
            >
              <td className="px-4 py-2 text-gray-900">{row.name ?? '—'}</td>
              <td className="px-4 py-2 text-gray-800">{row.email ?? '—'}</td>
              <td className="px-4 py-2 text-gray-800">{row.phone ?? '—'}</td>
              <td className="px-4 py-2 text-gray-800">{row.subject ?? '—'}</td>
              <td className="px-4 py-2 text-gray-700">{formatDate(row.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminContactsTable

