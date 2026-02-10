import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const { ref, isVisible } = useScrollAnimation(0.2)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      console.log('Newsletter subscription:', email)
      setEmail('')
      alert('Thank you for subscribing!')
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  return (
    <section className="py-12 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={ref}
          className={`max-w-2xl mx-auto text-center transition-all duration-300 ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
          }`}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
            Don't Miss Our Updates
          </h2>
          <p className="text-base md:text-lg text-white/90 mb-6">
            Subscribe To our Newsletter to get early Updates
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-indigo-600 transition-all duration-150 transform focus:scale-105 shadow-sm text-sm"
              required
              aria-label="Enter your email address"
            />
            <button
              type="submit"
              className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold text-base hover:bg-gray-50 transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-indigo-600 whitespace-nowrap transform hover:scale-105 hover:shadow-lg btn-shine relative overflow-hidden shadow-md cursor-pointer"
              aria-label="Subscribe to newsletter"
            >
              <span className="relative z-10">Subscribe</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
