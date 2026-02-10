import { useState, useEffect, useRef } from 'react'
import { FaChevronLeft, FaChevronRight, FaTiktok } from 'react-icons/fa'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

interface TikTokVideo {
  id: string
  videoUrl: string
  embedUrl: string
  thumbnail?: string
  title?: string
}

interface TikTokVideosProps {
  username?: string
  videos?: TikTokVideo[]
}

const TikTokVideos = ({ username, videos: initialVideos }: TikTokVideosProps) => {
  const { ref, isVisible } = useScrollAnimation(0.2)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [videos, setVideos] = useState<TikTokVideo[]>(initialVideos || [])
  const [loading, setLoading] = useState(false)
  const isScrollingRef = useRef(false)

  // Fetch TikTok videos (you can integrate with TikTok API here)
  useEffect(() => {
    const fetchTikTokVideos = async () => {
      if (initialVideos && initialVideos.length > 0) {
        setVideos(initialVideos)
        return
      }

      if (!username) return

      setLoading(true)
      try {
        // TODO: Replace with actual TikTok API call
        // Example: const response = await fetch(`/api/tiktok/${username}`)
        // For now, using placeholder/mock data
        
        // You can use TikTok API v2 here:
        // https://developers.tiktok.com/doc/tiktok-api-v2-video-list
        // Or use a proxy service like RapidAPI
        
        // Placeholder: Add your TikTok video URLs here
        const mockVideos: TikTokVideo[] = [
          // Add your TikTok video URLs here
          // Example: { id: '1234567890', videoUrl: 'https://www.tiktok.com/@username/video/1234567890', embedUrl: 'https://www.tiktok.com/embed/v2/1234567890' }
        ]
        
        setVideos(mockVideos)
      } catch (error) {
        console.error('Error fetching TikTok videos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTikTokVideos()
  }, [username, initialVideos])

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, direction: 'left' | 'right') => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleScroll(direction)
    }
  }

  // Initialize scroll position to start at original videos (not duplicates)
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container || videos.length === 0) return

    // Set initial scroll position to start of original videos
    const videoWidth = 280 + 16 // width + gap
    container.scrollLeft = videos.length * videoWidth
  }, [videos])

  // Infinite scroll implementation
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container || videos.length === 0) return

    const handleScroll = () => {
      if (isScrollingRef.current) return

      const scrollLeft = container.scrollLeft
      const clientWidth = container.clientWidth
      const videoWidth = 280 + 16 // width + gap
      const originalVideosWidth = videos.length * videoWidth

      // If scrolled past the end of original videos (into duplicate-end), reset to beginning
      if (scrollLeft >= originalVideosWidth * 2) {
        isScrollingRef.current = true
        container.scrollLeft = originalVideosWidth // Reset to start of original videos
        setTimeout(() => {
          isScrollingRef.current = false
        }, 50)
      }
      // If scrolled before the start of original videos (into duplicate-start), reset to end
      else if (scrollLeft < originalVideosWidth) {
        isScrollingRef.current = true
        container.scrollLeft = originalVideosWidth * 2 - clientWidth // Reset to end of original videos
        setTimeout(() => {
          isScrollingRef.current = false
        }, 50)
      }
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [videos])

  // Auto-scroll functionality
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container || videos.length === 0) return

    let autoScrollInterval: number | null = null

    const startAutoScroll = () => {
      autoScrollInterval = setInterval(() => {
        if (container && !isScrollingRef.current) {
          container.scrollBy({
            left: 1,
            behavior: 'auto',
          })
        }
      }, 20) // Smooth auto-scroll
    }

    // Start auto-scroll when component is visible
    if (isVisible) {
      startAutoScroll()
    }

    // Pause on hover
    const handleMouseEnter = () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval)
        autoScrollInterval = null
      }
    }

    const handleMouseLeave = () => {
      if (isVisible && !autoScrollInterval) {
        startAutoScroll()
      }
    }

    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval)
      }
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isVisible, videos])

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-pulse">
              <FaTiktok className="text-4xl text-indigo-600" />
            </div>
            <p className="mt-4 text-gray-600">Loading TikTok videos...</p>
          </div>
        </div>
      </section>
    )
  }

  if (!videos || videos.length === 0) {
    return (
      <section className="py-12 bg-linear-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div
            ref={ref}
            className={`text-center mb-8 transition-all duration-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaTiktok className="text-3xl text-indigo-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Watch Our TikTok Videos
              </h2>
            </div>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto mb-6">
              Follow us on TikTok for educational tips, study hacks, and more!
            </p>
            <a
              href="https://www.tiktok.com/@studywithali_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-150 transform hover:scale-105 shadow-md cursor-pointer"
              aria-label="Visit our TikTok profile"
            >
              <FaTiktok className="text-xl" />
              <span>Follow @studywithali_</span>
            </a>
            <p className="mt-4 text-xs text-gray-500">
              Add video URLs in App.tsx or set up API integration to display videos here
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-linear-to-b from-white to-gray-50 relative overflow-hidden" style={{ overflowX: 'hidden' }}>
      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={ref}
          className={`text-center mb-8 transition-all duration-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaTiktok className="text-3xl text-indigo-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Watch Our TikTok Videos
            </h2>
          </div>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Follow us on TikTok for educational tips, study hacks, and more!
          </p>
        </div>

        <div className="relative">
          {/* Left Scroll Button */}
          <button
            onClick={() => handleScroll('left')}
            onKeyDown={(e) => handleKeyDown(e, 'left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all duration-150 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            aria-label="Scroll left"
          >
            <FaChevronLeft className="text-indigo-600 text-xl" />
          </button>

          {/* Scrollable Container with Infinite Scroll */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide pb-4 px-12 scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              overflowY: 'hidden',
            }}
          >
            {/* Duplicate videos at the end for seamless loop */}
            {videos.map((video) => (
              <div
                key={`duplicate-end-${video.id}`}
                className="shrink-0 w-[280px] bg-white rounded-xl shadow-lg overflow-hidden hover-lift transition-all duration-200"
                style={{ 
                  aspectRatio: '9/16',
                  height: '500px',
                  maxHeight: '500px',
                  overflow: 'hidden'
                }}
              >
                <div 
                  className="relative w-full h-full overflow-hidden rounded-xl"
                  style={{ 
                    height: '100%',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  {video.embedUrl ? (
                    <iframe
                      src={`${video.embedUrl}?autoplay=1&loop=1`}
                      className="border-0"
                      allow="encrypted-media; autoplay; loop"
                      allowFullScreen
                      scrolling="no"
                      style={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        overflow: 'hidden',
                        display: 'block',
                        margin: 0,
                        padding: 0
                      }}
                      title={video.title || `TikTok video ${video.id}`}
                    />
                  ) : (
                    <a
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-full relative group overflow-hidden cursor-pointer"
                    >
                      {video.thumbnail && (
                        <img
                          src={video.thumbnail}
                          alt={video.title || 'TikTok video'}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <FaTiktok className="text-white text-4xl" />
                      </div>
                    </a>
                  )}
                </div>
              </div>
            ))}
            {/* Original videos */}
            {videos.map((video) => (
              <div
                key={video.id}
                className="shrink-0 w-[280px] bg-white rounded-xl shadow-lg overflow-hidden hover-lift transition-all duration-200"
                style={{ 
                  aspectRatio: '9/16',
                  height: '500px',
                  maxHeight: '500px',
                  overflow: 'hidden'
                }}
              >
                <div 
                  className="relative w-full h-full overflow-hidden rounded-xl"
                  style={{ 
                    height: '100%',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  {video.embedUrl ? (
                    <iframe
                      src={`${video.embedUrl}?autoplay=1&loop=1`}
                      className="border-0"
                      allow="encrypted-media; autoplay; loop"
                      allowFullScreen
                      scrolling="no"
                      style={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        overflow: 'hidden',
                        display: 'block',
                        margin: 0,
                        padding: 0
                      }}
                      title={video.title || `TikTok video ${video.id}`}
                    />
                  ) : (
                    <a
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-full relative group overflow-hidden cursor-pointer"
                    >
                      {video.thumbnail && (
                        <img
                          src={video.thumbnail}
                          alt={video.title || 'TikTok video'}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <FaTiktok className="text-white text-4xl" />
                      </div>
                    </a>
                  )}
                </div>
              </div>
            ))}
            {/* Duplicate videos at the beginning for seamless loop */}
            {videos.map((video) => (
              <div
                key={`duplicate-start-${video.id}`}
                className="shrink-0 w-[280px] bg-white rounded-xl shadow-lg overflow-hidden hover-lift transition-all duration-200"
                style={{ 
                  aspectRatio: '9/16',
                  height: '500px',
                  maxHeight: '500px',
                  overflow: 'hidden'
                }}
              >
                <div 
                  className="relative w-full h-full overflow-hidden rounded-xl"
                  style={{ 
                    height: '100%',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  {video.embedUrl ? (
                    <iframe
                      src={`${video.embedUrl}?autoplay=1&loop=1`}
                      className="border-0"
                      allow="encrypted-media; autoplay; loop"
                      allowFullScreen
                      scrolling="no"
                      style={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        overflow: 'hidden',
                        display: 'block',
                        margin: 0,
                        padding: 0
                      }}
                      title={video.title || `TikTok video ${video.id}`}
                    />
                  ) : (
                    <a
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-full relative group overflow-hidden cursor-pointer"
                    >
                      {video.thumbnail && (
                        <img
                          src={video.thumbnail}
                          alt={video.title || 'TikTok video'}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <FaTiktok className="text-white text-4xl" />
                      </div>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={() => handleScroll('right')}
            onKeyDown={(e) => handleKeyDown(e, 'right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all duration-150 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            aria-label="Scroll right"
          >
            <FaChevronRight className="text-indigo-600 text-xl" />
          </button>
        </div>

        {/* Scrollbar Hide CSS */}
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  )
}

export default TikTokVideos
