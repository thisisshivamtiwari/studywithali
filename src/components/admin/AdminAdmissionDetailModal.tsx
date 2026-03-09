import { FiX } from 'react-icons/fi'

export type AdmissionData = Record<string, unknown> | null

export type AdminAdmissionDetailModalProps = {
  row: {
    id: string
    first_name: string | null
    last_name: string | null
    email: string | null
    phone: string | null
    current_school: string | null
    current_year: string | null
    created_at: string | null
    data?: AdmissionData
  }
  onClose: () => void
}

const formatDate = (value: string | null) => {
  if (!value) return '—'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleString()
}

const DetailRow = ({ label, value }: { label: string; value: string | null | undefined }) => (
  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 py-2 border-b border-gray-100 last:border-b-0">
    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide shrink-0 w-40">{label}</span>
    <span className="text-sm text-gray-900 wrap-break-word">{value ?? '—'}</span>
  </div>
)

export const AdminAdmissionDetailModal = ({ row, onClose }: AdminAdmissionDetailModalProps) => {
  const data = row.data as Record<string, unknown> | null | undefined
  const get = (key: string): string => {
    if (!data || typeof data[key] !== 'string') return '—'
    return String(data[key])
  }
  const getArr = (key: string): string => {
    if (!data || !Array.isArray(data[key])) return '—'
    return (data[key] as string[]).join(', ')
  }
  const getBool = (key: string): string => (data && data[key] === true ? 'Yes' : '—')

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admission-detail-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <h2 id="admission-detail-title" className="text-lg font-semibold text-gray-900">
            Admission application
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
        <div className="px-6 py-4 overflow-y-auto space-y-6">
          <section>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Personal</h3>
            <DetailRow label="First name" value={data ? get('firstName') : row.first_name} />
            <DetailRow label="Last name" value={data ? get('lastName') : row.last_name} />
            <DetailRow label="Email" value={data ? get('email') : row.email} />
            <DetailRow label="Phone" value={data ? get('phone') : row.phone} />
            <DetailRow label="Gender" value={get('gender')} />
            <DetailRow label="Date of birth" value={[get('dobMonth'), get('dobDay'), get('dobYear')].filter(Boolean).join('/') || '—'} />
          </section>
          <section>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Address</h3>
            <DetailRow label="Address line 1" value={get('addressLine1')} />
            <DetailRow label="Address line 2" value={get('addressLine2')} />
            <DetailRow label="City" value={get('city')} />
            <DetailRow label="State" value={get('state')} />
            <DetailRow label="Zip code" value={get('zipCode')} />
          </section>
          <section>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Urgent contact</h3>
            <DetailRow label="Name" value={`${get('urgentFirstName')} ${get('urgentLastName')}`.trim() || '—'} />
            <DetailRow label="Relationship" value={get('urgentRelationship')} />
            <DetailRow label="Phone" value={get('urgentPhone')} />
            <DetailRow label="Email" value={get('urgentEmail')} />
            <DetailRow label="Address" value={[get('urgentAddressLine1'), get('urgentAddressLine2'), get('urgentCity'), get('urgentState'), get('urgentZipCode')].filter(Boolean).join(', ') || '—'} />
          </section>
          <section>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Education</h3>
            <DetailRow label="Current school" value={data ? get('currentSchool') : row.current_school} />
            <DetailRow label="Current year" value={data ? get('currentYear') : row.current_year} />
            <DetailRow label="Religion" value={get('religion')} />
          </section>
          <section>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Tuition & agreement</h3>
            <DetailRow label="Tuition required" value={data ? getArr('tuitionRequired') : '—'} />
            <DetailRow label="Agreement accepted" value={getBool('agreementAccepted')} />
          </section>
          <section>
            <DetailRow label="Submitted" value={formatDate(row.created_at)} />
          </section>
        </div>
      </div>
    </div>
  )
}

export default AdminAdmissionDetailModal
