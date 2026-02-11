import { useScrollAnimation } from '../hooks/useScrollAnimation'

const PrimaryLearning = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.2)
  const { ref: introRef, isVisible: introVisible } = useScrollAnimation(0.15)
  const { ref: empowerRef, isVisible: empowerVisible } = useScrollAnimation(0.15)
  const { ref: pricingRef, isVisible: pricingVisible } = useScrollAnimation(0.1)
  const { ref: communityRef, isVisible: communityVisible } = useScrollAnimation(0.2)

  const handleBookNow = () => {
    window.location.assign('/admission')
  }

  const handleScrollToPricing = () => {
    const pricingSection = document.getElementById('primary-learning-pricing')
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleBookNow()
    }
  }

  const pricingPlans = [
    {
      title: 'Key Stage 1',
      popular: true,
      pricePrimary: '30',
      pricePrimaryLabel: ' per week',
      priceSecondary: '£ 120 Monthly',
      features: ['Maths & English', '2 hour Weekly', 'Homework Set', 'Progress Tracking'],
    },
    {
      title: 'Key Stage 2',
      popular: true,
      pricePrimary: '30',
      pricePrimaryLabel: ' per week',
      priceSecondary: '£ 120 Monthly',
      features: ['Maths & English', '2 hour Weekly', 'Homework Set', 'Progress Tracking'],
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
            Primary Learning
          </h1>
          <h2 className="text-lg md:text-xl font-semibold text-white/95 mb-6">
            Primary | KS2 | 7 to 11 years | Year 3 – 6
          </h2>
          <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto mb-8">
            Key Stage 2 is taught in primary schools and core subjects such as English, Maths and
            Science must be taught to comply with the National Curriculum in England.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleBookNow}
              onKeyDown={handleKeyDown}
              className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold text-sm md:text-base hover:bg-gray-50 transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-indigo-600 transform hover:scale-105 hover:shadow-xl btn-shine relative overflow-hidden shadow-md cursor-pointer"
              aria-label="Book primary classes"
            >
              <span className="relative z-10">Book Now</span>
            </button>
            <button
              onClick={handleScrollToPricing}
              className="border border-white/70 text-white px-6 py-3 rounded-lg font-semibold text-sm md:text-base hover:bg-white/10 transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-indigo-600 transform hover:scale-105 cursor-pointer"
              aria-label="View Key Stage classes"
            >
              View Key Stage Classes
            </button>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-linear-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div
            ref={introRef}
            className={`max-w-4xl mx-auto transition-all duration-300 ${
              introVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6">
              We at Elite Stars Academy help primary students to build a strong foundation. At Elite
              Stars Academy our lesson plans are individualised and cater for students with varying
              needs. This not only helps them to learn and understand better but also elevates their
              confidence. Subsequently enables them to excel as they progress further in education.
            </p>
          </div>
        </div>
      </section>

      {/* Empowering Young Minds + Pricing */}
      <section
        id="primary-learning-pricing"
        className="py-12 bg-linear-to-b from-gray-50 to-white relative overflow-hidden"
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
              Empowering Young Minds: Primary Education Excellence at Elite Stars Academy
            </h2>
          </div>

          <div
            ref={pricingRef}
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto transition-all duration-300 ${
              pricingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.title}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover-lift transition-all duration-200 relative"
                style={{
                  animationDelay: `${index * 0.05}s`,
                  transition: `opacity 0.3s ease-out ${index * 0.05}s, transform 0.3s ease-out ${index * 0.05}s`,
                }}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    Popular
                  </div>
                )}
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">{plan.title}</h4>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-bold text-indigo-600">£</span>
                    <span className="text-3xl font-bold text-gray-900">{plan.pricePrimary}</span>
                    <span className="text-gray-600">{plan.pricePrimaryLabel}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">{plan.priceSecondary}</p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature) => (
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
                    aria-label={`Book now for ${plan.title}`}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A High Achieving Multicultural Community */}
      <section className="py-12 bg-linear-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div
            ref={communityRef}
            className={`max-w-3xl mx-auto text-center transition-all duration-300 ${
              communityVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 gradient-text">
              A High Achieving Multicultural Community For Learning
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-8">
              Habitasse diam si at lobortis est penatibus finibus torquent dapibus viverra vel. Justo
              massa nulla aenean molestie lacinia iaculis urna sociosqu et.
            </p>
            <button
              onClick={handleBookNow}
              onKeyDown={handleKeyDown}
              className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:from-indigo-700 hover:to-purple-700 transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-offset-2 transform hover:scale-105 hover:shadow-lg btn-shine relative overflow-hidden shadow-md cursor-pointer"
              aria-label="Apply now"
            >
              <span className="relative z-10">Apply Now !</span>
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default PrimaryLearning
