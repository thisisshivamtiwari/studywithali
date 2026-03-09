import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ElevenPlusPreparation from './pages/ElevenPlusPreparation'
import PrimaryLearning from './pages/PrimaryLearning'
import ALevel from './pages/ALevel'
import GCSE from './pages/GCSE'
import AdultCourses from './pages/AdultCourses'
import ExamPapers from './pages/ExamPapers'
import AdmissionForm from './pages/AdmissionForm'
import ContactUs from './pages/ContactUs'
import Login from './pages/Login'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import { useAuth } from './context/AuthContext'

type AdminRouteProps = {
  children: React.ReactElement
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, isInitialising } = useAuth()

  if (isInitialising) {
    return null
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  if (user.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}

const AppShell = () => {
  const location = useLocation()
  const isAdminDashboard = location.pathname.startsWith('/admin/dashboard')

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminDashboard && (
        <>
          <Header />
          {/* Spacer so content is not hidden under fixed header (py-4 + h-16 + py-4 = 6rem) */}
          <div className="h-24 shrink-0" aria-hidden="true" />
        </>
      )}
      <main className="grow relative z-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/11plus" element={<ElevenPlusPreparation />} />
          <Route path="/primary" element={<PrimaryLearning />} />
          <Route path="/alevel" element={<ALevel />} />
          <Route path="/gcse" element={<GCSE />} />
          <Route path="/adults" element={<AdultCourses />} />
          <Route path="/exam-papers" element={<ExamPapers />} />
          <Route path="/admission" element={<AdmissionForm />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </main>
      {!isAdminDashboard && <Footer />}
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
