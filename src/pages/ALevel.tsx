import { useScrollAnimation } from '../hooks/useScrollAnimation'

const ALevel = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.2)
  const { ref: introRef, isVisible: introVisible } = useScrollAnimation(0.15)
  const { ref: nurtureRef, isVisible: nurtureVisible } = useScrollAnimation(0.15)
  const { ref: coursesRef, isVisible: coursesVisible } = useScrollAnimation(0.1)

  const handleBookNow = () => {
    window.location.assign('/admission')
  }

  const handleScrollToCourses = () => {
    const section = document.getElementById('a-level-courses')
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

  const benefits = [
    'Completely tailored to your learning style and learning needs, taught by highly experienced and dedicated tutors with a proven track record',
    'Highly focused on exam technique and how to answer the tricky questions',
    'Designed to ensure you achieve above 90% to score the A* Grade',
    'Inclusive of a progress report after each session',
    'Proven to improve your performance in your other A-Level subjects.',
  ]

  const courseCards = [
    {
      title: 'Easter A-Level Crash Course',
      popular: true,
      features: [
        'Maths / Biology / Chemistry',
        'Practice Exam Techniques',
        'Content Revision',
        'Strategies & tips',
      ],
    },
    {
      title: 'Mock Assessments',
      popular: false,
      features: [
        'GCSE/IGCSE/AS & A-LEVEL',
        'Select your subject',
        'Marked & assessed like real exams',
        'Feedback from examiner',
      ],
    },
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
            A LEVEL Learning
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-white/95 mb-6">
            A LEVEL
          </h2>
          <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto mb-8">
            Our A-Level Maths, Chemistry and Biology sessions are tailored to your learning style,
            with a sharp focus on exam technique and achieving the A* grade.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleBookNow}
              onKeyDown={handleKeyDown}
              className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold text-sm md:text-base hover:bg-gray-50 transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-indigo-600 transform hover:scale-105 hover:shadow-xl btn-shine relative overflow-hidden shadow-md cursor-pointer"
              aria-label="Book A-Level classes"
            >
              <span className="relative z-10">Book Now</span>
            </button>
            <button
              onClick={handleScrollToCourses}
              className="border border-white/70 text-white px-6 py-3 rounded-lg font-semibold text-sm md:text-base hover:bg-white/10 transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-indigo-600 transform hover:scale-105 cursor-pointer"
              aria-label="View A-Level courses"
            >
              View Courses
            </button>
          </div>
        </div>
      </section>

      {/* Intro - benefits list */}
      <section className="py-12 bg-linear-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div
            ref={introRef}
            className={`max-w-4xl mx-auto transition-all duration-300 ${
              introVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
              Our A-Level Maths, Chemistry and Biology sessions are:
            </h3>
            <ul className="space-y-3">
              {benefits.map((item, index) => (
                <li
                  key={index}
                  className="text-sm md:text-base text-gray-600 leading-relaxed flex gap-3"
                >
                  <span className="text-indigo-600 font-bold shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Nurturing Academic Growth + Course cards */}
      <section
        id="a-level-courses"
        className="py-12 bg-linear-to-b from-gray-50 to-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(129,140,248,0.1),transparent_55%),radial-gradient(circle_at_0%_100%,rgba(236,72,153,0.08),transparent_55%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div
            ref={nurtureRef}
            className={`text-center mb-10 transition-all duration-300 ${
              nurtureVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 gradient-text">
              Nurturing Academic Growth: Advancing Through A-Level Excellence
            </h2>
          </div>

          <div
            ref={coursesRef}
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto transition-all duration-300 ${
              coursesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {courseCards.map((card, index) => (
              <div
                key={card.title}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover-lift transition-all duration-200 relative"
                style={{
                  animationDelay: `${index * 0.05}s`,
                  transition: `opacity 0.3s ease-out ${index * 0.05}s, transform 0.3s ease-out ${index * 0.05}s`,
                }}
              >
                {card.popular && (
                  <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    Popular
                  </div>
                )}
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">{card.title}</h4>
                  <ul className="space-y-2 mb-6">
                    {card.features.map((feature) => (
                      <li key={feature} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="text-indigo-600">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={handleBookNow}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold text-sm hover:from-indigo-700 hover:to-purple-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer"
                    aria-label={`Book now for ${card.title}`}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ALevel
