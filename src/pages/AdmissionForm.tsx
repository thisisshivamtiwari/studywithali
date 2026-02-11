import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import {
  FaChevronRight,
  FaChevronLeft,
  FaUser,
  FaAddressCard,
  FaUserFriends,
  FaSchool,
  FaBook,
  FaFileSignature,
  FaCheck,
} from 'react-icons/fa'

const UK_STATES = ['England', 'Scotland', 'Wales', 'Northern Ireland']

const YEAR_OPTIONS = [
  'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6',
  'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13',
]

const TUITION_OPTIONS = ['English', 'Math', 'Business', 'Chemistry', 'Physics', 'Accounts', 'Ucat']

const AGREEMENT_TEXT = `I understand that this application is for admission only for the term indicated. I agree that I am bound by the University's regulations concerning application deadlines and admission requirements. I agree to the release of any transcripts and test scores to this institution, including any SAT, Achievement Test, and ACT score reports. I certify that this information is complete and accurate. I understand that making false or fraudulent statements within this application or residency statement will result in disciplinary action, denial of admission and invalidation of credit or degrees earned. If admitted, I agree to abide by the policies of the Board of Regents and the rules and regulations of the University. Should any information change prior to my entry into the University, I will notify the Office of Admissions. I understand that the application fee I submit with this application is a non-refundable fee.`

const WIZARD_STEPS = [
  { title: 'Personal', titleLong: 'Personal details', icon: FaUser },
  { title: 'Address', titleLong: 'Address', icon: FaAddressCard },
  { title: 'Contact', titleLong: 'Urgent contact', icon: FaUserFriends },
  { title: 'Education', titleLong: 'Education & background', icon: FaSchool },
  { title: 'Tuition', titleLong: 'Tuition required', icon: FaBook },
  { title: 'Agreement', titleLong: 'Agreement', icon: FaFileSignature },
] as const

const TOTAL_STEPS = WIZARD_STEPS.length

type FormState = {
  firstName: string
  lastName: string
  email: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  zipCode: string
  gender: string
  dobMonth: string
  dobDay: string
  dobYear: string
  phone: string
  urgentFirstName: string
  urgentLastName: string
  urgentRelationship: string
  urgentAddressLine1: string
  urgentAddressLine2: string
  urgentCity: string
  urgentState: string
  urgentZipCode: string
  urgentPhone: string
  urgentEmail: string
  currentSchool: string
  currentYear: string
  religion: string
  tuitionRequired: string[]
  agreementAccepted: boolean
}

const initialFormState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  zipCode: '',
  gender: '',
  dobMonth: '',
  dobDay: '',
  dobYear: '',
  phone: '',
  urgentFirstName: '',
  urgentLastName: '',
  urgentRelationship: '',
  urgentAddressLine1: '',
  urgentAddressLine2: '',
  urgentCity: '',
  urgentState: '',
  urgentZipCode: '',
  urgentPhone: '',
  urgentEmail: '',
  currentSchool: '',
  currentYear: '',
  religion: '',
  tuitionRequired: [],
  agreementAccepted: false,
}

const selectArrowStyle = {
  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
}

type FormCardProps = {
  step: number
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

const FormCard = ({ step, title, icon, children }: FormCardProps) => (
  <div className="card-material overflow-hidden">
    <div className="flex">
      <div className="w-1.5 min-h-full bg-linear-to-b from-indigo-500 to-purple-500 shrink-0" aria-hidden="true" />
      <div className="flex-1 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 text-sm font-bold shadow-inner">
            {step}
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-500" aria-hidden="true">
            {icon}
          </span>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  </div>
)

const AdmissionForm = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.2)
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation(0.1)
  const [form, setForm] = useState<FormState>(initialFormState)
  const [currentStep, setCurrentStep] = useState(0)

  const handleChange = (field: keyof FormState, value: string | string[] | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleTuitionToggle = (subject: string) => {
    setForm((prev) => {
      const next = prev.tuitionRequired.includes(subject)
        ? prev.tuitionRequired.filter((s) => s !== subject)
        : [...prev.tuitionRequired, subject]
      return { ...prev, tuitionRequired: next }
    })
  }

  const validateStep = (stepIndex: number): boolean => {
    if (stepIndex === 0) {
      return !!(form.firstName.trim() && form.lastName.trim() && form.email.trim())
    }
    if (stepIndex === 2) {
      return !!(form.urgentFirstName.trim() && form.urgentLastName.trim() && form.urgentPhone.trim())
    }
    if (stepIndex === 5) {
      return form.agreementAccepted
    }
    return true
  }

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      return
    }
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(5)) return
    console.log('Admission form submitted', form)
    alert('Thank you. Your application has been submitted.')
  }

  const inputClass = 'input-material'
  const labelClass = 'input-material-label'

  const renderStepContent = () => {
    const step = currentStep
    switch (step) {
      case 0:
        return (
          <FormCard step={1} title={WIZARD_STEPS[0].titleLong} icon={<FaUser className="w-5 h-5" />}>
            <div className="space-y-5">
              <div>
                <span className={labelClass}>Name <span className="text-red-500">*</span></span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" required value={form.firstName} onChange={(e) => handleChange('firstName', e.target.value)} placeholder="First" className={inputClass} aria-label="First name" />
                  <input type="text" required value={form.lastName} onChange={(e) => handleChange('lastName', e.target.value)} placeholder="Last" className={inputClass} aria-label="Last name" />
                </div>
              </div>
              <div>
                <span className={labelClass}>Email <span className="text-red-500">*</span></span>
                <input type="email" required value={form.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="you@example.com" className={inputClass} aria-label="Email address" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className={labelClass}>Gender</span>
                  <select value={form.gender} onChange={(e) => handleChange('gender', e.target.value)} className={inputClass + ' appearance-none bg-no-repeat bg-size-[1.25rem] bg-position-[right_0.75rem_center] pr-10'} style={selectArrowStyle} aria-label="Gender">
                    <option value="">— Please select —</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <span className={labelClass}>Date of birth</span>
                  <div className="grid grid-cols-3 gap-2">
                    <input type="text" value={form.dobMonth} onChange={(e) => handleChange('dobMonth', e.target.value)} placeholder="MM" maxLength={2} className={inputClass} aria-label="Birth month" />
                    <input type="text" value={form.dobDay} onChange={(e) => handleChange('dobDay', e.target.value)} placeholder="DD" maxLength={2} className={inputClass} aria-label="Birth day" />
                    <input type="text" value={form.dobYear} onChange={(e) => handleChange('dobYear', e.target.value)} placeholder="YYYY" maxLength={4} className={inputClass} aria-label="Birth year" />
                  </div>
                </div>
              </div>
              <div>
                <span className={labelClass}>Phone</span>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 text-sm font-medium shrink-0">United Kingdom +44</span>
                  <input type="tel" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="07400 123456" className={`${inputClass} flex-1 min-w-[180px]`} aria-label="Phone number" />
                </div>
              </div>
            </div>
          </FormCard>
        )
      case 1:
        return (
          <FormCard step={2} title={WIZARD_STEPS[1].titleLong} icon={<FaAddressCard className="w-5 h-5" />}>
            <div className="space-y-5">
              <div>
                <span className={labelClass}>Address line 1</span>
                <input type="text" value={form.addressLine1} onChange={(e) => handleChange('addressLine1', e.target.value)} placeholder="Street address" className={inputClass} aria-label="Address Line 1" />
              </div>
              <div>
                <span className={labelClass}>Address line 2</span>
                <input type="text" value={form.addressLine2} onChange={(e) => handleChange('addressLine2', e.target.value)} placeholder="Apartment, suite, etc. (optional)" className={inputClass} aria-label="Address Line 2" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <span className={labelClass}>City</span>
                  <input type="text" value={form.city} onChange={(e) => handleChange('city', e.target.value)} placeholder="City" className={inputClass} aria-label="City" />
                </div>
                <div>
                  <span className={labelClass}>State</span>
                  <select value={form.state} onChange={(e) => handleChange('state', e.target.value)} className={inputClass + ' appearance-none bg-no-repeat bg-size-[1.25rem] bg-position-[right_0.75rem_center] pr-10'} style={selectArrowStyle} aria-label="State">
                    <option value="">— Select state —</option>
                    {UK_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <span className={labelClass}>Zip code</span>
                  <input type="text" value={form.zipCode} onChange={(e) => handleChange('zipCode', e.target.value)} placeholder="Zip code" className={inputClass} aria-label="Zip Code" />
                </div>
              </div>
            </div>
          </FormCard>
        )
      case 2:
        return (
          <FormCard step={3} title={WIZARD_STEPS[2].titleLong} icon={<FaUserFriends className="w-5 h-5" />}>
            <div className="space-y-5">
              <div>
                <span className={labelClass}>Name <span className="text-red-500">*</span></span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" required value={form.urgentFirstName} onChange={(e) => handleChange('urgentFirstName', e.target.value)} placeholder="First" className={inputClass} aria-label="Urgent contact first name" />
                  <input type="text" required value={form.urgentLastName} onChange={(e) => handleChange('urgentLastName', e.target.value)} placeholder="Last" className={inputClass} aria-label="Urgent contact last name" />
                </div>
              </div>
              <div>
                <span className={labelClass}>Relationship to applicant</span>
                <input type="text" value={form.urgentRelationship} onChange={(e) => handleChange('urgentRelationship', e.target.value)} placeholder="e.g. Parent, Guardian" className={inputClass} aria-label="Relationship to applicant" />
              </div>
              <div>
                <span className={labelClass}>Address</span>
                <input type="text" value={form.urgentAddressLine1} onChange={(e) => handleChange('urgentAddressLine1', e.target.value)} placeholder="Address line 1" className={inputClass} aria-label="Urgent contact address line 1" />
                <input type="text" value={form.urgentAddressLine2} onChange={(e) => handleChange('urgentAddressLine2', e.target.value)} placeholder="Address line 2 (optional)" className={`${inputClass} mt-3`} aria-label="Urgent contact address line 2" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                  <input type="text" value={form.urgentCity} onChange={(e) => handleChange('urgentCity', e.target.value)} placeholder="City" className={inputClass} aria-label="Urgent contact city" />
                  <select value={form.urgentState} onChange={(e) => handleChange('urgentState', e.target.value)} className={inputClass + ' appearance-none bg-no-repeat bg-size-[1.25rem] bg-position-[right_0.75rem_center] pr-10'} style={selectArrowStyle} aria-label="Urgent contact state">
                    <option value="">— Select state —</option>
                    {UK_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <input type="text" value={form.urgentZipCode} onChange={(e) => handleChange('urgentZipCode', e.target.value)} placeholder="Zip code" className={inputClass} aria-label="Urgent contact zip code" />
                </div>
              </div>
              <div>
                <span className={labelClass}>Phone <span className="text-red-500">*</span></span>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 text-sm font-medium shrink-0">United Kingdom +44</span>
                  <input type="tel" required value={form.urgentPhone} onChange={(e) => handleChange('urgentPhone', e.target.value)} placeholder="07400 123456" className={`${inputClass} flex-1 min-w-[180px]`} aria-label="Urgent contact phone" />
                </div>
              </div>
              <div>
                <span className={labelClass}>Email address</span>
                <input type="email" value={form.urgentEmail} onChange={(e) => handleChange('urgentEmail', e.target.value)} placeholder="contact@example.com" className={inputClass} aria-label="Urgent contact email" />
              </div>
            </div>
          </FormCard>
        )
      case 3:
        return (
          <FormCard step={4} title={WIZARD_STEPS[3].titleLong} icon={<FaSchool className="w-5 h-5" />}>
            <div className="space-y-5">
              <div>
                <span className={labelClass}>Current school</span>
                <input type="text" value={form.currentSchool} onChange={(e) => handleChange('currentSchool', e.target.value)} placeholder="School name" className={inputClass} aria-label="Current school" />
              </div>
              <div>
                <span className={labelClass}>Current year</span>
                <select value={form.currentYear} onChange={(e) => handleChange('currentYear', e.target.value)} className={inputClass + ' appearance-none bg-no-repeat bg-size-[1.25rem] bg-position-[right_0.75rem_center] pr-10'} style={selectArrowStyle} aria-label="Current year">
                  <option value="">— Please select —</option>
                  {YEAR_OPTIONS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <span className={labelClass}>Religion</span>
                <input type="text" value={form.religion} onChange={(e) => handleChange('religion', e.target.value)} placeholder="Optional" className={inputClass} aria-label="Religion" />
              </div>
            </div>
          </FormCard>
        )
      case 4:
        return (
          <FormCard step={5} title={WIZARD_STEPS[4].titleLong} icon={<FaBook className="w-5 h-5" />}>
            <p className="text-sm text-gray-500 mb-4">Select all subjects you need tuition for.</p>
            <div className="flex flex-wrap gap-3">
              {TUITION_OPTIONS.map((subject) => {
                const selected = form.tuitionRequired.includes(subject)
                return (
                  <button
                    key={subject}
                    type="button"
                    onClick={() => handleTuitionToggle(subject)}
                    className={`chip-material ${selected ? 'chip-material-selected' : 'chip-material-unselected'}`}
                    aria-pressed={selected}
                    aria-label={`Tuition required for ${subject}`}
                  >
                    {subject}
                  </button>
                )
              })}
            </div>
          </FormCard>
        )
      case 5:
        return (
          <FormCard step={6} title={WIZARD_STEPS[5].titleLong} icon={<FaFileSignature className="w-5 h-5" />}>
            <div className="space-y-5">
              <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-4 max-h-52 overflow-y-auto">
                <p className="text-sm text-gray-600 leading-relaxed">{AGREEMENT_TEXT}</p>
              </div>
              <label className="flex items-start gap-4 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  checked={form.agreementAccepted}
                  onChange={(e) => handleChange('agreementAccepted', e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-2 border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shrink-0 cursor-pointer"
                  aria-label="Do you understand and agree to the terms listed above?"
                />
                <span className="text-gray-700 text-sm leading-relaxed">
                  Do you understand and agree to the terms listed above? <span className="text-red-500">*</span>
                  <br />
                  <span className="text-gray-500">Yes, I understand and agree to the terms listed above.</span>
                </span>
              </label>
            </div>
          </FormCard>
        )
      default:
        return null
    }
  }

  const isLastStep = currentStep === TOTAL_STEPS - 1

  return (
    <>
      {/* Hero / Breadcrumb */}
      <section
        ref={heroRef}
        id="admission"
        className={`py-10 md:py-12 bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden transition-all duration-300 ${
          heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
            <Link to="/" className="text-white/90 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/60 rounded px-1 py-0.5" aria-label="Home">
              Home
            </Link>
            <FaChevronRight className="text-white/60 w-3 h-3" aria-hidden="true" />
            <span className="text-white font-semibold" aria-current="page">Admission Form</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">How to Apply?</h1>
          <p className="text-white/90 mt-2 text-base md:text-lg max-w-xl">
            Complete each step to submit your application. You can go back to change any step.
          </p>
        </div>
      </section>

      {/* Form */}
      <section
        ref={formRef}
        className={`py-12 md:py-16 bg-gray-100/80 transition-all duration-300 ${
          formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Stepper */}
          <div className="mb-8 md:mb-10">
            <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2 scrollbar-hide">
              {WIZARD_STEPS.map((s, index) => {
                const isActive = index === currentStep
                const isCompleted = index < currentStep
                const Icon = s.icon
                return (
                  <div
                    key={s.title}
                    className="flex flex-col items-center shrink-0 min-w-0 flex-1 max-w-18 md:max-w-none"
                  >
                    <div
                      className={`flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                        isActive
                          ? 'border-indigo-500 bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                          : isCompleted
                            ? 'border-indigo-500 bg-indigo-500 text-white'
                            : 'border-gray-200 bg-white text-gray-400'
                      }`}
                      aria-current={isActive ? 'step' : undefined}
                      aria-label={isCompleted ? `Step ${index + 1} completed` : `Step ${index + 1}: ${s.titleLong}`}
                    >
                      {isCompleted ? <FaCheck className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" /> : <Icon className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />}
                    </div>
                    <span className={`mt-2 text-xs font-medium text-center truncate w-full px-0.5 ${isActive ? 'text-indigo-600' : isCompleted ? 'text-gray-600' : 'text-gray-400'}`}>
                      {s.title}
                    </span>
                  </div>
                )
              })}
            </div>
            {/* Progress bar */}
            <div className="mt-4 h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-linear-to-r from-indigo-500 to-purple-500 transition-all duration-300 ease-out"
                style={{ width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%` }}
                role="progressbar"
                aria-valuenow={currentStep + 1}
                aria-valuemin={1}
                aria-valuemax={TOTAL_STEPS}
                aria-label={`Step ${currentStep + 1} of ${TOTAL_STEPS}`}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div key={currentStep} className="wizard-step-content">
              {renderStepContent()}
            </div>

            {/* Wizard actions */}
            <div className="flex items-center justify-between gap-4 mt-8">
              <div className="w-28 shrink-0">
                {currentStep > 0 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg px-4 py-2.5 transition-colors cursor-pointer"
                    aria-label="Previous step"
                  >
                    <FaChevronLeft className="w-4 h-4" aria-hidden="true" />
                    Back
                  </button>
                ) : null}
              </div>
              <div className="flex-1 flex justify-end">
                {isLastStep ? (
                  <button
                    type="submit"
                    className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-10 py-3.5 rounded-xl font-semibold text-base shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 btn-shine relative overflow-hidden cursor-pointer"
                    aria-label="Submit admission form"
                  >
                    <span className="relative z-10">Submit application</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-semibold text-base shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
                    aria-label="Next step"
                  >
                    Next
                    <FaChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default AdmissionForm
