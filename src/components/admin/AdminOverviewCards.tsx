import { FiCheckCircle, FiFileText, FiShield } from 'react-icons/fi'

export const AdminOverviewCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <FiCheckCircle className="w-4 h-4" aria-hidden="true" />
          </div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</p>
        </div>
        <p className="text-sm text-gray-800">Logged in as admin.</p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <FiFileText className="w-4 h-4" aria-hidden="true" />
          </div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Next steps</p>
        </div>
        <p className="text-sm text-gray-800">We will add notes management here.</p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-sky-600">
            <FiShield className="w-4 h-4" aria-hidden="true" />
          </div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Role</p>
        </div>
        <p className="text-sm text-gray-800">Admin</p>
      </div>
    </div>
  )
}

export default AdminOverviewCards

