import Header from './components/Header'
import Hero from './components/Hero'
import FeaturedCourses from './components/FeaturedCourses'
import AboutUs from './components/AboutUs'
import OurCourses from './components/OurCourses'
import TikTokVideos from './components/TikTokVideos'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'

interface TikTokVideo {
  id: string
  videoUrl: string
  embedUrl: string
  thumbnail?: string
  title?: string
}

const App = () => {
  // Add your TikTok video URLs here
  // You can also fetch them via API (see utils/tiktokApi.ts)
  // Or use username prop: <TikTokVideos username="studywithali_" />
  const tiktokVideos: TikTokVideo[] = [
    {
      id: '7508527996307819798',
      videoUrl: 'https://www.tiktok.com/@studywithali1/video/7508527996307819798',
      embedUrl: 'https://www.tiktok.com/embed/v2/7508527996307819798',
    },
    {
      id: '7471380123007094048',
      videoUrl: 'https://www.tiktok.com/@studywithali1/video/7471380123007094048',
      embedUrl: 'https://www.tiktok.com/embed/v2/7471380123007094048',
    },
    {
      id: '7482806230017264918',
      videoUrl: 'https://www.tiktok.com/@studywithali1/photo/7482806230017264918',
      embedUrl: 'https://www.tiktok.com/embed/v2/7482806230017264918',
    },
    {
      id: '7521044869566057750',
      videoUrl: 'https://www.tiktok.com/@studywithali1/photo/7521044869566057750',
      embedUrl: 'https://www.tiktok.com/embed/v2/7521044869566057750',
    },
    {
      id: '7506509489353297174',
      videoUrl: 'https://www.tiktok.com/@studywithali1/video/7506509489353297174',
      embedUrl: 'https://www.tiktok.com/embed/v2/7506509489353297174',
    },
    {
      id: '7500515379333156118',
      videoUrl: 'https://www.tiktok.com/@studywithali1/video/7500515379333156118',
      embedUrl: 'https://www.tiktok.com/embed/v2/7500515379333156118',
    },
  ]
  // Add more TikTok video URLs here
  // Example:
  // { id: 'VIDEO_ID', videoUrl: 'https://www.tiktok.com/@studywithali1/video/VIDEO_ID', embedUrl: 'https://www.tiktok.com/embed/v2/VIDEO_ID' },

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow relative z-0">
        <Hero />
        <FeaturedCourses />
        <TikTokVideos videos={tiktokVideos} username="studywithali_" />
        <AboutUs />
        <OurCourses />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

export default App
