const Hero = () => {
  const handleBookNow = () => {
    window.location.href = '#admission'
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleBookNow()
    }
  }

  const courseCategories = [
    'PRIMARY',
    '11+ COURSES',
    'GCSE COURSES',
    'A LEVEL',
    'ADULT COURSES',
  ]

  return (
    <section className="relative bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-16 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center transition-all duration-300 opacity-100 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight animate-fade-in-up text-white">
            Fuel Your Curiosity and Build Confidence — Learn with Me
          </h1>
          <button
            onClick={handleBookNow}
            onKeyDown={handleKeyDown}
            className="bg-white text-indigo-700 px-8 py-3 rounded-lg font-semibold text-base hover:bg-gray-50 transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-indigo-600 mb-8 transform hover:scale-105 hover:shadow-xl btn-shine relative overflow-hidden shadow-md cursor-pointer"
            aria-label="Book your place now"
          >
            <span className="relative z-10">BOOK YOUR PLACE NOW</span>
          </button>

          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {courseCategories.map((category, index) => (
              <div
                key={category}
                className="glass px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-150 cursor-pointer transform hover:scale-105 hover:-translate-y-1 animate-float backdrop-blur-md text-sm"
                style={{ animationDelay: `${index * 0.2}s` }}
                tabIndex={0}
                role="button"
                aria-label={`View ${category}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    window.location.href = '#courses'
                  }
                }}
              >
                <span className="font-semibold">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
