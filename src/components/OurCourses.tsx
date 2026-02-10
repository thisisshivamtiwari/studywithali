import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { FaEye, FaBullseye, FaBookOpen } from 'react-icons/fa'

const OurCourses = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.2)
  const { ref: coursesRef, isVisible: coursesVisible } = useScrollAnimation(0.1)
  const { ref: introRef, isVisible: introVisible } = useScrollAnimation(0.2)
  const { ref: visionRef, isVisible: visionVisible } = useScrollAnimation(0.1)

  const courses = [
    {
      category: 'PRIMARY',
      title: 'Key Stage 1 & 2 Tuition',
      description: 'Discover the Details of our Programme:',
      link: '#primary',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      category: '11+ PREPARATION',
      title: 'Experience a Comprehensive Learning Program',
      description: 'Experience a Comprehensive Learning Program at Elite Stars Academy:',
      link: '#11plus',
      color: 'from-purple-500 to-purple-600',
    },
    {
      category: 'PRIMARY',
      title: 'Key Stage 1 & 2 Tuition',
      description: 'Discover the Details of our Programme:',
      link: '#primary',
      color: 'from-pink-500 to-pink-600',
    },
    {
      category: 'GCSE',
      title: 'Key Stage 3 & 4 Tuition',
      description: 'Discover the Details of our Programme:',
      link: '#gcse',
      color: 'from-blue-500 to-blue-600',
    },
    {
      category: 'ADULTS',
      title: 'Explore our diverse range of adult courses',
      description: 'Explore our diverse range of adult courses at Elite Stars Academy:',
      link: '#adults',
      color: 'from-green-500 to-green-600',
    },
  ]

  const handleLearnMore = (link: string) => {
    window.location.assign(link)
  }

  const handleKeyDown = (e: React.KeyboardEvent, link: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleLearnMore(link)
    }
  }

  return (
    <section id="courses" className="py-12 bg-linear-to-b from-gray-50 to-white relative" style={{ overflowX: 'hidden', overflowY: 'visible' }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.05),transparent_50%)]"></div>
      <div className="container mx-auto px-4 relative z-10" style={{ overflowX: 'hidden' }}>
        <div
          ref={headerRef}
          className={`text-center mb-8 transition-all duration-300 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 gradient-text">
            Our Courses
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-3">Our Top Courses</h3>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Our top offered courses with their complete details are given below:
          </p>
        </div>

        <div
          ref={coursesRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300 ${
            coursesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ overflow: 'visible' }}
        >
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-5 hover-lift border border-gray-100 group transition-all duration-200"
              style={{
                animationDelay: `${index * 0.05}s`,
                transition: `opacity 0.3s ease-out ${index * 0.05}s, transform 0.3s ease-out ${index * 0.05}s`,
                overflow: 'visible',
              }}
            >
              <div
                className={`bg-linear-to-r ${course.color} text-white px-3 py-1.5 rounded-lg inline-block mb-3 transform group-hover:scale-105 transition-transform duration-150`}
              >
                <span className="font-bold text-xs">{course.category}</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {course.title}
              </h4>
              <p className="text-sm text-gray-600 mb-4">{course.description}</p>
              <button
                onClick={() => handleLearnMore(course.link)}
                onKeyDown={(e) => handleKeyDown(e, course.link)}
                className="text-indigo-600 font-semibold hover:text-indigo-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded inline-flex items-center gap-2 group-hover:gap-3 text-sm cursor-pointer"
                aria-label={`Learn more about ${course.title}`}
              >
                Learn More
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          ))}
        </div>

        <div
          ref={introRef}
          className={`mt-10 bg-white p-6 rounded-xl text-center shadow-lg border border-gray-100 transition-all duration-300 ${
            introVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ overflow: 'visible' }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
            Your confidence fuels our achievements
          </h3>
          <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto mb-6 leading-relaxed">
            We understand the challenges students face in meeting the demanding criteria of
            reputable UK colleges and universities. With private tutoring in Birmingham and
            examination centers across the UK, we equip students with the competitive edge they
            need to succeed in an increasingly competitive educational landscape. Our goal is to help
            students stand out and achieve their academic aspirations.
          </p>
        </div>

        <div
          className={`mt-8 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-8 rounded-xl shadow-xl transition-all duration-300 ${
            introVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ overflow: 'visible' }}
        >
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-center">Introduction Our Tuition</h3>
          <p className="text-base md:text-lg text-center mb-4 max-w-3xl mx-auto text-white/95">
            A good education is a foundation for a better future
          </p>
          <p className="text-sm md:text-base text-center max-w-3xl mx-auto mb-6 leading-relaxed text-white/90">
            At Study with Ali, we are dedicated to providing high-quality tuition for A-Level, 11+
            entrance exams, and adult education courses. With a team of expert tutors and a
            student-centered approach, we offer personalized learning experiences that help students
            excel in their academics and beyond.
          </p>
          <div className="text-center">
            <button
              onClick={() => handleLearnMore('#about')}
              onKeyDown={(e) => handleKeyDown(e, '#about')}
              className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold text-base hover:bg-gray-50 transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-indigo-600 transform hover:scale-105 hover:shadow-lg btn-shine relative overflow-hidden shadow-md cursor-pointer"
              aria-label="More about us"
            >
              <span className="relative z-10">More About Us</span>
            </button>
          </div>
        </div>

        <div
          ref={visionRef}
          className={`mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-300 ${
            visionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ overflow: 'visible' }}
        >
          {[
            { title: 'Our Vision', Icon: FaEye },
            { title: 'Our Mission', Icon: FaBullseye },
            { title: 'Our History', Icon: FaBookOpen },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow-lg text-center hover-lift border border-gray-100 transition-all duration-200"
              style={{
                animationDelay: `${index * 0.05}s`,
                transition: `opacity 0.3s ease-out ${index * 0.05}s, transform 0.3s ease-out ${index * 0.05}s`,
                overflow: 'visible',
              }}
            >
              <div className="mb-3 flex justify-center">
                <item.Icon className="text-3xl text-indigo-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {index === 0 &&
                  'To be the leading online learning platform that empowers students with personalized, high-quality education, fostering academic excellence and lifelong success.'}
                {index === 1 &&
                  "Our mission is to provide accessible, engaging, and innovative tutoring services tailored to each student's needs."}
                {index === 2 &&
                  'Founded with a passion for education, our tuition website started as a small initiative to help students excel in their studies.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurCourses
