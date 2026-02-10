import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { FaCalculator, FaFlask, FaAtom, FaDna } from 'react-icons/fa'

const FeaturedCourses = () => {
  const { ref, isVisible } = useScrollAnimation(0.1)

  const courses = [
    {
      title: 'Mathematics',
      description: 'Master the language of the universe, one equation at a time',
      color: 'from-blue-500 to-blue-600',
      Icon: FaCalculator,
    },
    {
      title: 'Chemistry',
      description: 'Chemistry is like cooking—just never lick the spoon!',
      color: 'from-green-500 to-green-600',
      Icon: FaFlask,
    },
    {
      title: 'Physics',
      description: 'Turn complex theories into simple, real-world understanding',
      color: 'from-indigo-500 to-indigo-600',
      Icon: FaAtom,
    },
    {
      title: 'Biology',
      description: 'From cells to ecosystems, unlock the wonders of life',
      color: 'from-purple-500 to-purple-600',
      Icon: FaDna,
    },
  ]

  const handleWatchNow = () => {
    window.location.href = '#courses'
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleWatchNow()
    }
  }

  return (
    <section className="py-12 bg-linear-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={ref}
          className={`text-center mb-8 transition-all duration-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 gradient-text">
            Boost Your Grades, Build Your Future
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Personalized lessons to help you learn faster and score higher
          </p>
        </div>

        <div className="mb-8 text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-6 inline-block px-4 py-1.5 bg-purple-50 rounded-full border border-purple-100">
            Predicted Math Papers
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((course, index) => (
            <div
              key={course.title}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift group transition-all duration-200 cursor-pointer"
              style={{
                animationDelay: `${index * 0.1}s`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.3s ease-out ${index * 0.05}s, transform 0.3s ease-out ${index * 0.05}s`,
              }}
              onClick={handleWatchNow}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleWatchNow()
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View ${course.title} course`}
            >
              <div
                className={`bg-linear-to-br ${course.color} p-5 text-center relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent"></div>
                <div className="mb-3 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-150 relative z-10 flex justify-center">
                  <course.Icon className="text-4xl text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1 relative z-10">
                  {course.title}
                </h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4 text-sm min-h-[50px]">{course.description}</p>
                <button
                  onClick={handleWatchNow}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:from-indigo-700 hover:to-purple-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform hover:scale-105 btn-shine relative overflow-hidden shadow-sm cursor-pointer"
                  aria-label={`Watch ${course.title} course`}
                >
                  <span className="relative z-10">Watch Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedCourses
