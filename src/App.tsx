import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ElevenPlusPreparation from './pages/ElevenPlusPreparation'
import PrimaryLearning from './pages/PrimaryLearning'
import ALevel from './pages/ALevel'
import GCSE from './pages/GCSE'
import AdultCourses from './pages/AdultCourses'
import AdmissionForm from './pages/AdmissionForm'
import ContactUs from './pages/ContactUs'

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        {/* Spacer so content is not hidden under fixed header (py-4 + h-16 + py-4 = 6rem) */}
        <div className="h-24 shrink-0" aria-hidden="true" />
        <main className="grow relative z-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/11plus" element={<ElevenPlusPreparation />} />
            <Route path="/primary" element={<PrimaryLearning />} />
            <Route path="/alevel" element={<ALevel />} />
            <Route path="/gcse" element={<GCSE />} />
            <Route path="/adults" element={<AdultCourses />} />
            <Route path="/admission" element={<AdmissionForm />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
