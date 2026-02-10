import { FaTiktok, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa'

const Footer = () => {
  const quickLinks = [
    { label: 'Our Courses', href: '#courses' },
    { label: 'Admission Form', href: '#admission' },
    { label: 'Predicted papers', href: '#papers' },
    { label: 'Resources', href: '#resources' },
    { label: 'Contact Us', href: '#contact' },
  ]

  const courseLinks = [
    { label: 'ADULT COURSES', href: '#adults' },
    { label: 'A LEVEL', href: '#alevel' },
    { label: 'GCSE', href: '#gcse' },
    { label: '11+ Preparation', href: '#11plus' },
    { label: 'Primary Learning', href: '#primary' },
  ]

  const socialLinks = [
    { name: 'Tiktok', href: 'https://tiktok.com', Icon: FaTiktok },
    { name: 'Youtube', href: 'https://youtube.com/@studywithali0009?si=qTwYLqVTG-a2mlbN', Icon: FaYoutube },
    { name: 'Instagram', href: 'https://www.instagram.com/studywithali_?igsh=YWVwODZhM3QzeWpr&utm_source=qr', Icon: FaInstagram },
    { name: 'Facebook', href: 'https://facebook.com', Icon: FaFacebook },
  ]

  return (
    <footer className="bg-linear-to-b from-gray-900 to-black text-gray-300 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="animate-fade-in">
            <h3 className="text-white font-bold text-lg mb-4">OUR COURSES</h3>
            <ul className="space-y-2">
              {courseLinks.map((link, index) => (
                <li
                  key={link.label}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  className="animate-fade-in"
                >
                  <a
                    href={link.href}
                    className="hover:text-teal-400 transition-all duration-300 transform hover:translate-x-2 inline-block cursor-pointer"
                    aria-label={link.label}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-in">
            <h3 className="text-white font-bold text-lg mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li
                  key={link.label}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  className="animate-fade-in"
                >
                  <a
                    href={link.href}
                    className="hover:text-teal-400 transition-all duration-300 transform hover:translate-x-2 inline-block cursor-pointer"
                    aria-label={link.label}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-in">
            <h3 className="text-white font-bold text-lg mb-4">SOCIAL MEDIA</h3>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.Icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl hover:text-teal-400 transition-all duration-300 transform hover:scale-125 hover:rotate-12"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    aria-label={social.name}
                  >
                    <IconComponent />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="animate-fade-in">
            <h3 className="text-white font-bold text-lg mb-4">CONTACT</h3>
            <p className="mb-2">
              <a
                href="mailto:info@studywithali.co.uk"
                className="hover:text-purple-400 transition-all duration-300 transform hover:translate-x-1 inline-block cursor-pointer"
                aria-label="Email us"
              >
                info@studywithali.co.uk
              </a>
            </p>
            <p className="leading-relaxed">123 high street, United Kingdom, B12 0JU</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-center md:text-left text-gray-400">
              Copyright © 2025 STUDY WITH ALI, All rights reserved.
            </p>
            <div className="flex gap-6 flex-wrap justify-center">
              {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((item, index) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '')}`}
                  className="hover:text-teal-400 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  aria-label={item}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
