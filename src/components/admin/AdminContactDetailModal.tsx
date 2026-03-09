import { FiX } from 'react-icons/fi'

export type AdminContactDetailModalProps = {
  row: {
    id: string
    name: string | null
    email: string | null
    phone: string | null
    subject: string | null
    message: string | null
    created_at: string | null
  }
  onClose: () => void
}

const formatDate = (value: string | null) => {
  if (!value) return '—'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleString()
}

export const AdminContactDetailModal = ({ row, onClose }: AdminContactDetailModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-detail-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <h2 id="contact-detail-title" className="text-lg font-semibold text-gray-900">
            Contact message
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Close"
          >
            <FiX className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
        <div className="px-6 py-4 overflow-y-auto space-y-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</span>
            <span className="text-sm text-gray-900">{row.name ?? '—'}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</span>
            <span className="text-sm text-gray-900 break-all">{row.email ?? '—'}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone</span>
            <span className="text-sm text-gray-900">{row.phone ?? '—'}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Subject</span>
            <span className="text-sm text-gray-900">{row.subject ?? '—'}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Message</span>
            <p className="text-sm text-gray-900 whitespace-pre-wrap wrap-break-word">{row.message ?? '—'}</p>
          </div>
          <div className="flex flex-col gap-1 pt-2 border-t border-gray-100">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Received</span>
            <span className="text-sm text-gray-700">{formatDate(row.created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminContactDetailModal
