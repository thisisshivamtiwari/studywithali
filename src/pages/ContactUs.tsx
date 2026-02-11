import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { FaChevronRight, FaMapMarkerAlt, FaEnvelope, FaPaperPlane } from 'react-icons/fa'

const ADDRESS = '123 high street, B12 0JU'
const EMAIL = 'info@studywithali.co.uk'
const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent('123 High Street, B12 0JU, UK')}&output=embed`

type ContactFormState = {
  name: string
  phone: string
  email: string
  subject: string
  message: string
}

const initialContactForm: ContactFormState = {
  name: '',
  phone: '',
  email: '',
  subject: '',
  message: '',
}

const ContactUs = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.2)
  const { ref: mainRef, isVisible: mainVisible } = useScrollAnimation(0.12)
  const { ref: mapRef, isVisible: mapVisible } = useScrollAnimation(0.1)
  const [form, setForm] = useState<ContactFormState>(initialContactForm)

  const handleChange = (field: keyof ContactFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Contact form submitted', form)
    setForm(initialContactForm)
    alert('Thank you. Your message has been sent.')
  }

  return (
    <>
      {/* Hero – same as other pages: indigo/purple/pink gradient, left-aligned */}
      <section
        ref={heroRef}
        id="contact"
        className={`py-10 md:py-12 bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden transition-all duration-300 ${
          heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <nav className="flex items-center gap-2 text-sm mb-4" aria-label="Breadcrumb">
            <Link
              to="/"
              className="text-white/90 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/60 rounded px-1 py-0.5"
              aria-label="Home"
            >
              Home
            </Link>
            <FaChevronRight className="text-white/70 w-3 h-3" aria-hidden="true" />
            <span className="text-white font-semibold" aria-current="page">
              Contact Us
            </span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Contact Us</h1>
          <p className="text-white/90 mt-2 text-base md:text-lg max-w-xl">
            Get in touch – we&apos;re here to help.
          </p>
        </div>
      </section>

      {/* Main: same section style and card treatment as rest of site */}
      <section className="py-12 md:py-16 bg-linear-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div
            ref={mainRef}
            className={`max-w-5xl mx-auto transition-all duration-300 ${
              mainVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left column: Reach us + Map (same grid size), card-material with gradient bar */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                {/* Reach us card */}
                <div className="card-material overflow-hidden">
                  <div className="flex">
                    <div className="w-1.5 min-h-full bg-linear-to-b from-indigo-500 to-purple-500 shrink-0" aria-hidden="true" />
                    <div className="flex-1 p-6 md:p-8">
                      <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-2">
                        Reach us
                      </h2>
                      <p className="text-gray-600 text-sm mb-6">
                        Don&apos;t hesitate to reach out – we&apos;re just a click away.
                      </p>
                      <div className="space-y-5">
                        <a
                          href={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-3 group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg p-2 -m-2"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                            <FaMapMarkerAlt className="w-5 h-5" aria-hidden="true" />
                          </span>
                          <div>
                            <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">Address</span>
                            <p className="text-gray-900 font-medium mt-0.5 group-hover:text-indigo-600 transition-colors">
                              {ADDRESS}
                            </p>
                          </div>
                        </a>
                        <a
                          href={`mailto:${EMAIL}`}
                          className="flex items-start gap-3 group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg p-2 -m-2"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                            <FaEnvelope className="w-5 h-5" aria-hidden="true" />
                          </span>
                          <div>
                            <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">Email</span>
                            <p className="text-gray-900 font-medium mt-0.5 group-hover:text-indigo-600 transition-colors break-all">
                              {EMAIL}
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map card – same width, same card style and gradient bar */}
                <div
                  ref={mapRef}
                  className={`card-material overflow-hidden transition-all duration-300 ${
                    mapVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <div className="flex">
                    <div className="w-1.5 min-h-full bg-linear-to-b from-indigo-500 to-purple-500 shrink-0" aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <div className="p-6 md:p-6 pb-4">
                        <h3 className="text-lg font-bold text-gray-900 tracking-tight">Find us</h3>
                        <p className="text-gray-600 text-sm mt-1">{ADDRESS}</p>
                      </div>
                      <div className="aspect-video min-h-[220px] md:min-h-[260px] bg-gray-100">
                        <iframe
                          title="Map showing Study with Ali location"
                          src={MAP_EMBED_URL}
                          width="100%"
                          height="100%"
                          className="block w-full h-full min-h-[220px] md:min-h-[260px] border-0"
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column: Form – same card style with gradient bar */}
              <div className="lg:col-span-7">
                <div className="card-material overflow-hidden">
                  <div className="flex">
                    <div className="w-1.5 min-h-full bg-linear-to-b from-indigo-500 to-purple-500 shrink-0" aria-hidden="true" />
                    <div className="flex-1 p-6 md:p-8">
                      <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-1">
                        Send a message
                      </h2>
                      <p className="text-gray-500 text-sm mb-6">
                        Fill in the form and we&apos;ll get back to you soon.
                      </p>
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                              Name
                            </label>
                            <input
                              id="contact-name"
                              type="text"
                              value={form.name}
                              onChange={(e) => handleChange('name', e.target.value)}
                              placeholder="Your name"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                              aria-label="Your name"
                            />
                          </div>
                          <div>
                            <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                              Phone
                            </label>
                            <input
                              id="contact-phone"
                              type="tel"
                              value={form.phone}
                              onChange={(e) => handleChange('phone', e.target.value)}
                              placeholder="Your phone"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                              aria-label="Your phone"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                              Email
                            </label>
                            <input
                              id="contact-email"
                              type="email"
                              value={form.email}
                              onChange={(e) => handleChange('email', e.target.value)}
                              placeholder="you@example.com"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                              aria-label="Your email"
                            />
                          </div>
                          <div>
                            <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                              Subject
                            </label>
                            <input
                              id="contact-subject"
                              type="text"
                              value={form.subject}
                              onChange={(e) => handleChange('subject', e.target.value)}
                              placeholder="What is this about?"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                              aria-label="Message subject"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Message
                          </label>
                          <textarea
                            id="contact-message"
                            value={form.message}
                            onChange={(e) => handleChange('message', e.target.value)}
                            placeholder="Your message..."
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-y min-h-[120px]"
                            aria-label="Your message"
                          />
                        </div>
                        <div className="pt-2">
                          <button
                            type="submit"
                            className="inline-flex items-center gap-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 focus:ring-offset-2 transition-all cursor-pointer btn-shine relative overflow-hidden"
                            aria-label="Send message"
                          >
                            <FaPaperPlane className="w-4 h-4 relative z-10" aria-hidden="true" />
                            <span className="relative z-10">Send Message</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactUs
