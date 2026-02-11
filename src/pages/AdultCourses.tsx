import { useScrollAnimation } from '../hooks/useScrollAnimation'

const AdultCourses = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.2)
  const { ref: enhanceRef, isVisible: enhanceVisible } = useScrollAnimation(0.15)
  const { ref: introRef, isVisible: introVisible } = useScrollAnimation(0.15)
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation(0.2)
  const { ref: empowerRef, isVisible: empowerVisible } = useScrollAnimation(0.15)
  const { ref: coursesRef, isVisible: coursesVisible } = useScrollAnimation(0.1)

  const handleBookNow = () => {
    window.location.assign('/admission')
  }

  const handleScrollToCourses = () => {
    const section = document.getElementById('adult-courses-list')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleBookNow()
    }
  }

  const adultCourseList = [
    'English for adults (ESOL)',
    'English for adults',
    'Security Course (SIA)',
    'Functional skills English and Maths Level 1&2',
    'Digital skills for adults',
    'Health and Social Care Level 4',
  ]

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className={`py-16 bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden transition-all duration-300 ${
          heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            ADULT Learning
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-white/95 mb-2">
            ADULT COURSES
          </h2>
          <p className="text-lg md:text-xl font-semibold text-white/90 mb-6">
            Fully Funded Adult Courses
          </p>
          <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto mb-8">
            Enhance your skills and elevate your career with our specialized adult learning courses,
            led by seasoned professionals and fully funded where applicable.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleBookNow}
              onKeyDown={handleKeyDown}
              className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold text-sm md:text-base hover:bg-gray-50 transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-indigo-600 transform hover:scale-105 hover:shadow-xl btn-shine relative overflow-hidden shadow-md cursor-pointer"
              aria-label="Book adult courses"
            >
              <span className="relative z-10">Book Now</span>
            </button>
            <button
              onClick={handleScrollToCourses}
              className="border border-white/70 text-white px-6 py-3 rounded-lg font-semibold text-sm md:text-base hover:bg-white/10 transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-indigo-600 transform hover:scale-105 cursor-pointer"
              aria-label="View adult courses"
            >
              View Courses
            </button>
          </div>
        </div>
      </section>

      {/* Enhance Your Skills */}
      <section className="py-12 bg-linear-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div
            ref={enhanceRef}
            className={`max-w-4xl mx-auto text-center mb-8 transition-all duration-300 ${
              enhanceVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 gradient-text">
              Enhance Your Skills: Elevate Your Career with Our Specialized Adult Learning Courses
            </h2>
          </div>
          <div
            ref={introRef}
            className={`max-w-4xl mx-auto space-y-6 transition-all duration-300 ${
              introVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              We recognize the importance of continuous growth and development for adults. That's why
              we offer a specialized suite of adult learning courses designed to enhance your skills
              and advance your career.
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Our courses are led by seasoned professionals who are committed to helping you achieve
              your professional and personal goals. With tailored instruction and focused support,
              we ensure that each participant receives the guidance they need to succeed.
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Through a blend of interactive workshops, hands-on training, and personalized coaching,
              our adult learning courses provide you with the knowledge and confidence to excel in
              your field and take your career to new heights.
            </p>
          </div>
        </div>
      </section>

      {/* Join us CTA */}
      <section className="py-12 bg-linear-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div
            ref={ctaRef}
            className={`max-w-3xl mx-auto text-center transition-all duration-300 ${
              ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-lg md:text-xl font-bold text-indigo-700 mb-8">
              Join us at Elite Stars Academy and unlock your potential for success!
            </p>
          </div>
        </div>
      </section>

      {/* Empowering Lifelong Success + Course list */}
      <section
        id="adult-courses-list"
        className="py-12 bg-linear-to-b from-white to-gray-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(129,140,248,0.1),transparent_55%),radial-gradient(circle_at_0%_100%,rgba(236,72,153,0.08),transparent_55%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div
            ref={empowerRef}
            className={`text-center mb-10 transition-all duration-300 ${
              empowerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 gradient-text">
              Empowering Lifelong Success: Specialized Adult Learning
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-700">
              Adult courses
            </h3>
          </div>

          <div
            ref={coursesRef}
            className={`max-w-3xl mx-auto transition-all duration-300 ${
              coursesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <ul className="space-y-3 mb-8">
              {adultCourseList.map((course, index) => (
                <li
                  key={course}
                  className="bg-white rounded-xl shadow-md border border-gray-100 px-5 py-4 flex items-center gap-3 hover-lift transition-all duration-200"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold text-sm">
                    {index + 1}
                  </span>
                  <span className="text-sm md:text-base font-medium text-gray-900">{course}</span>
                </li>
              ))}
            </ul>
            <div className="text-center">
              <button
                onClick={handleBookNow}
                onKeyDown={handleKeyDown}
                className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold text-base hover:from-indigo-700 hover:to-purple-700 transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-offset-2 transform hover:scale-105 hover:shadow-lg btn-shine relative overflow-hidden shadow-md cursor-pointer"
                aria-label="Book adult courses"
              >
                <span className="relative z-10">Book Now</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AdultCourses
