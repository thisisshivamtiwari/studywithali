import { useState, useEffect } from 'react'
import { FaTiktok, FaInstagram, FaYoutube, FaFacebook, FaChevronDown } from 'react-icons/fa'
import logo from '../assets/Website-logo-Study-with-ali-600.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleMenuToggle()
    }
  }

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label)
  }

  const handleDropdownClose = () => {
    setOpenDropdown(null)
  }

  const navItems = [
    {
      label: 'Our Courses',
      href: '#courses',
      dropdown: [
        { label: '11+ Preparation', href: '#11plus' },
        { label: 'Primary Learning', href: '#primary' },
        { label: 'A LEVEL', href: '#alevel' },
        { label: 'GCSE', href: '#gcse' },
        { label: 'ADULT COURSES', href: '#adults' },
      ],
    },
    { label: 'Admission Form', href: '#admission' },
    {
      label: 'Predicted papers',
      href: '#papers',
      dropdown: [{ label: 'GCSE', href: '#gcse-papers' }],
    },
    { label: 'Resources', href: '#resources' },
    { label: 'Contact Us', href: '#contact' },
  ]

  const socialLinks = [
    { name: 'Tiktok', href: 'https://tiktok.com', Icon: FaTiktok },
    { name: 'Instagram', href: 'https://www.instagram.com/studywithali_?igsh=YWVwODZhM3QzeWpr&utm_source=qr', Icon: FaInstagram },
    { name: 'Youtube', href: 'https://youtube.com/@studywithali0009?si=qTwYLqVTG-a2mlbN', Icon: FaYoutube },
    { name: 'Facebook', href: 'https://facebook.com', Icon: FaFacebook },
  ]

  return (
    <header
      className={`bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-[100] transition-all duration-150 ${
        isScrolled ? 'shadow-xl' : 'shadow-md'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <a
            href="/"
            className="flex items-center transform transition-transform hover:scale-105 duration-150 cursor-pointer"
            aria-label="Study with Ali Home"
          >
            <img
              src={logo}
              alt="Study with Ali Logo"
              className="h-16 w-auto animate-fade-in"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
                onMouseLeave={() => item.dropdown && handleDropdownClose()}
              >
                <a
                  href={item.href}
                  className={`flex items-center gap-1 text-gray-700 hover:text-indigo-600 font-medium transition-all duration-150 relative group text-sm cursor-pointer ${
                    openDropdown === item.label ? 'text-indigo-600' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  aria-label={item.label}
                  onClick={() => !item.dropdown && handleDropdownClose()}
                >
                  {item.label}
                  {item.dropdown && (
                    <FaChevronDown
                      className={`text-xs transition-transform duration-150 ${
                        openDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-150 group-hover:w-full"></span>
                </a>
                {item.dropdown && openDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2 w-48 z-[100]">
                    <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-fade-in">
                      {item.dropdown.map((dropdownItem) => (
                        <a
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors cursor-pointer"
                          onClick={handleDropdownClose}
                          aria-label={dropdownItem.label}
                        >
                          {dropdownItem.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="mailto:info@studywithali.co.uk"
              className="text-gray-700 hover:text-indigo-600 font-medium transition-all duration-150 hover:scale-105 text-sm cursor-pointer"
              aria-label="Email us"
            >
              info@studywithali.co.uk
            </a>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const IconComponent = social.Icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-indigo-600 transition-all duration-150 transform hover:scale-125 hover:rotate-12 cursor-pointer"
                    aria-label={social.name}
                  >
                    <IconComponent className="text-lg" />
                  </a>
                )
              })}
            </div>
          </div>

          <button
            onClick={handleMenuToggle}
            onKeyDown={handleKeyDown}
            className="md:hidden p-2 text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded transition-all duration-150 transform hover:scale-110 cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-6 h-6 transition-transform duration-150"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        <nav
          className={`md:hidden overflow-hidden transition-all duration-200 ${
            isMenuOpen ? 'max-h-[800px] pb-4' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-2 pt-4">
            {navItems.map((item, index) => (
              <div key={item.label}>
                <div className="flex items-center justify-between">
                  <a
                    href={item.href}
                    className="text-gray-700 hover:text-indigo-600 font-medium transition-all duration-150 py-2 transform hover:translate-x-2 text-sm flex-1 cursor-pointer"
                    onClick={() => {
                      if (!item.dropdown) {
                        setIsMenuOpen(false)
                      }
                    }}
                    style={{ animationDelay: `${index * 0.05}s` }}
                    aria-label={item.label}
                  >
                    {item.label}
                  </a>
                  {item.dropdown && (
                    <button
                      onClick={() => handleDropdownToggle(item.label)}
                      className="p-2 text-gray-700 hover:text-indigo-600 transition-colors cursor-pointer"
                      aria-label={`Toggle ${item.label} dropdown`}
                    >
                      <FaChevronDown
                        className={`text-xs transition-transform duration-150 ${
                          openDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  )}
                </div>
                {item.dropdown && openDropdown === item.label && (
                  <div className="pl-4 mt-1 mb-2 space-y-1 animate-fade-in">
                    {item.dropdown.map((dropdownItem) => (
                      <a
                        key={dropdownItem.label}
                        href={dropdownItem.href}
                        className="block py-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer"
                        onClick={() => setIsMenuOpen(false)}
                        aria-label={dropdownItem.label}
                      >
                        {dropdownItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href="mailto:info@studywithali.co.uk"
              className="text-gray-700 hover:text-indigo-600 font-medium transition-all duration-150 py-2 transform hover:translate-x-2 text-sm"
              aria-label="Email us"
            >
              info@studywithali.co.uk
            </a>
            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map((social) => {
                const IconComponent = social.Icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-indigo-600 transition-all duration-150 transform hover:scale-125"
                    aria-label={social.name}
                  >
                    <IconComponent className="text-2xl" />
                  </a>
                )
              })}
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
