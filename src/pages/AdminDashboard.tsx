import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'
import AdminShell, { type AdminSectionKey } from '../components/admin/AdminShell'
import AdminOverviewCards from '../components/admin/AdminOverviewCards'
import AdminUsersTable, { type AdminUserRow } from '../components/admin/AdminUsersTable'
import AdminAdmissionsTable, { type AdminAdmissionRow } from '../components/admin/AdminAdmissionsTable'
import AdminContactsTable, { type AdminContactRow } from '../components/admin/AdminContactsTable'
import AdminNotesManager from '../components/admin/AdminNotesManager'
import AdminAdmissionDetailModal from '../components/admin/AdminAdmissionDetailModal'
import AdminContactDetailModal from '../components/admin/AdminContactDetailModal'

const AdminDashboard = () => {
  const { user } = useAuth()
  const [activeKey, setActiveKey] = useState<AdminSectionKey>('overview')

  const [users, setUsers] = useState<AdminUserRow[]>([])
  const [usersError, setUsersError] = useState<string | null>(null)
  const [isUsersLoading, setIsUsersLoading] = useState(false)
  const [hasLoadedUsers, setHasLoadedUsers] = useState(false)

  const [admissions, setAdmissions] = useState<AdminAdmissionRow[]>([])
  const [admissionsError, setAdmissionsError] = useState<string | null>(null)
  const [isAdmissionsLoading, setIsAdmissionsLoading] = useState(false)
  const [hasLoadedAdmissions, setHasLoadedAdmissions] = useState(false)

  const [contacts, setContacts] = useState<AdminContactRow[]>([])
  const [contactsError, setContactsError] = useState<string | null>(null)
  const [isContactsLoading, setIsContactsLoading] = useState(false)
  const [hasLoadedContacts, setHasLoadedContacts] = useState(false)

  const [selectedAdmission, setSelectedAdmission] = useState<AdminAdmissionRow | null>(null)
  const [selectedContact, setSelectedContact] = useState<AdminContactRow | null>(null)

  useEffect(() => {
    if (activeKey !== 'users' || hasLoadedUsers) {
      return
    }

    const loadUsers = async () => {
      setIsUsersLoading(true)
      setUsersError(null)
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, email, full_name, role, created_at')
          .order('created_at', { ascending: false })

        if (error) {
          setUsersError(error.message || 'Unable to load users.')
          return
        }

        setUsers((data ?? []) as AdminUserRow[])
        setHasLoadedUsers(true)
      } catch {
        setUsersError('Unable to load users.')
      } finally {
        setIsUsersLoading(false)
      }
    }

    void loadUsers()
  }, [activeKey, hasLoadedUsers])

  useEffect(() => {
    if (activeKey !== 'admissions' || hasLoadedAdmissions) {
      return
    }

    const loadAdmissions = async () => {
      setIsAdmissionsLoading(true)
      setAdmissionsError(null)
      try {
        const { data, error } = await supabase
          .from('admission_applications')
          .select('id, first_name, last_name, email, phone, current_school, current_year, created_at, data')
          .order('created_at', { ascending: false })

        if (error) {
          setAdmissionsError(error.message || 'Unable to load applications.')
          return
        }

        setAdmissions((data ?? []) as AdminAdmissionRow[])
        setHasLoadedAdmissions(true)
      } catch {
        setAdmissionsError('Unable to load applications.')
      } finally {
        setIsAdmissionsLoading(false)
      }
    }

    void loadAdmissions()
  }, [activeKey, hasLoadedAdmissions])

  useEffect(() => {
    if (activeKey !== 'contacts' || hasLoadedContacts) {
      return
    }

    const loadContacts = async () => {
      setIsContactsLoading(true)
      setContactsError(null)
      try {
        const { data, error } = await supabase
          .from('contact_messages')
          .select('id, name, email, phone, subject, message, created_at')
          .order('created_at', { ascending: false })

        if (error) {
          setContactsError(error.message || 'Unable to load messages.')
          return
        }

        setContacts((data ?? []) as AdminContactRow[])
        setHasLoadedContacts(true)
      } catch {
        setContactsError('Unable to load messages.')
      } finally {
        setIsContactsLoading(false)
      }
    }

    void loadContacts()
  }, [activeKey, hasLoadedContacts])

  return (
    <AdminShell activeKey={activeKey} onChangeActiveKey={setActiveKey}>
      {activeKey === 'overview' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">Overview</h1>
            <p className="text-sm text-gray-500">
              Welcome{user?.email ? `, ${user.email}` : ''}. Use this area to manage notes and other content.
            </p>
          </div>
          <AdminOverviewCards />
          <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm">
            <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Notes module placeholder</h2>
            <p className="text-sm text-gray-600">
              This admin dashboard is ready for the notes module. We will plug in Supabase storage and tables here so
              you can upload and manage PDFs by exam board and year.
            </p>
          </div>
        </div>
      )}

      {activeKey === 'users' && (
        <div className="space-y-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">Users</h1>
            <p className="text-sm text-gray-500">List of all profiles and their roles.</p>
          </div>
          <AdminUsersTable users={users} isLoading={isUsersLoading} errorMessage={usersError} />
        </div>
      )}

      {activeKey === 'admissions' && (
        <div className="space-y-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">Admission applications</h1>
            <p className="text-sm text-gray-500">All submitted admission forms.</p>
          </div>
          <AdminAdmissionsTable
            rows={admissions}
            isLoading={isAdmissionsLoading}
            errorMessage={admissionsError}
            onRowClick={setSelectedAdmission}
          />
        </div>
      )}

      {activeKey === 'contacts' && (
        <div className="space-y-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">Contact messages</h1>
            <p className="text-sm text-gray-500">Messages sent from the contact form.</p>
          </div>
          <AdminContactsTable
            rows={contacts}
            isLoading={isContactsLoading}
            errorMessage={contactsError}
            onRowClick={setSelectedContact}
          />
        </div>
      )}

      {selectedAdmission && (
        <AdminAdmissionDetailModal row={selectedAdmission} onClose={() => setSelectedAdmission(null)} />
      )}
      {selectedContact && (
        <AdminContactDetailModal row={selectedContact} onClose={() => setSelectedContact(null)} />
      )}

      {activeKey === 'notes' && (
        <AdminNotesManager />
      )}
    </AdminShell>
  )
}

export default AdminDashboard

