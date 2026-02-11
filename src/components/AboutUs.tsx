import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { FaGraduationCap, FaChalkboardTeacher, FaBook, FaStar } from 'react-icons/fa'

const AboutUs = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.2)
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation(0.1)
  const { ref: commitRef, isVisible: commitVisible } = useScrollAnimation(0.2)

  const handleBookNow = () => {
    window.location.href = '/admission'
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleBookNow()
    }
  }

  const features = [
    {
      title: 'Engaging Live Classes',
      description:
        'Immerse yourself in our interactive live sessions led by our dedicated subject tutors. Participate, ask questions, and receive valuable feedback in real-time. Our live classes provide a dynamic and engaging learning environment for optimal understanding and growth.',
      Icon: FaGraduationCap,
    },
    {
      title: 'Expert Specialist Tutors',
      description:
        'Connect with experienced tutors who are passionate about your success and dedicated to helping you achieve your academic goals.',
      Icon: FaChalkboardTeacher,
    },
    {
      title: 'Tailored Structured Courses',
      description:
        'Our courses are carefully designed to meet your individual learning needs and help you progress at your own pace.',
      Icon: FaBook,
    },
    {
      title: 'Exceptional Selective Tutoring',
      description:
        'We provide focused, high-quality tutoring that targets your specific areas of improvement and builds on your strengths.',
      Icon: FaStar,
    },
  ]

  return (
    <section id="about" className="py-12 bg-linear-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={headerRef}
          className={`max-w-4xl mx-auto text-center mb-10 transition-all duration-300 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            About Us
          </h2>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold gradient-text mb-4">
            IGNITING YOUR TOMORROW
          </h3>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6">
            We believe that education goes beyond mere instruction. It is a journey of growth, where
            we nurture existing abilities, strengthen foundations, and guide students towards their
            inherent potential. Our approach is focused on supporting students' strengths, while
            fostering a positive environment for overcoming weaknesses through encouragement and
            development.
          </p>
          <button
            onClick={handleBookNow}
            onKeyDown={handleKeyDown}
            className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:from-indigo-700 hover:to-purple-700 transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-offset-2 transform hover:scale-105 hover:shadow-lg btn-shine relative overflow-hidden shadow-md cursor-pointer"
            aria-label="Book your place now"
          >
            <span className="relative z-10">Book Your Place Now</span>
          </button>
        </div>

        <div
          ref={featuresRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 transition-all duration-300 ${
            featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl hover-lift border border-gray-100 group transition-all duration-200 shadow-sm"
              style={{
                animationDelay: `${index * 0.05}s`,
                transition: `opacity 0.3s ease-out ${index * 0.05}s, transform 0.3s ease-out ${index * 0.05}s`,
              }}
            >
              <div className="mb-3 transform group-hover:scale-110 transition-transform duration-150 flex justify-center">
                <feature.Icon className="text-3xl text-indigo-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div
          ref={commitRef}
          className={`bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-8 rounded-xl text-center shadow-xl transition-all duration-300 ${
            commitVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <h3 className="text-xl md:text-2xl font-bold mb-4">Our Commitment to Success</h3>
          <p className="text-sm md:text-base mb-6 max-w-3xl mx-auto leading-relaxed text-white/95">
            We understand the challenges students face in meeting the demanding criteria of
            reputable UK colleges and universities. With private tutoring in Birmingham and
            examination centers across the UK, we equip students with the competitive edge they need
            to succeed in an increasingly competitive educational landscape. Our goal is to help
            students stand out and achieve their academic aspirations.
          </p>
          <button
            onClick={handleBookNow}
            onKeyDown={handleKeyDown}
            className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold text-base hover:bg-gray-50 transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-indigo-600 transform hover:scale-105 hover:shadow-lg btn-shine relative overflow-hidden shadow-md cursor-pointer"
            aria-label="Apply now"
          >
            <span className="relative z-10">Apply Now !</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
