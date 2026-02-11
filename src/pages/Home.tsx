import Hero from '../components/Hero'
import FeaturedCourses from '../components/FeaturedCourses'
import AboutUs from '../components/AboutUs'
import OurCourses from '../components/OurCourses'
import TikTokVideos from '../components/TikTokVideos'
import Newsletter from '../components/Newsletter'

interface TikTokVideo {
  id: string
  videoUrl: string
  embedUrl: string
  thumbnail?: string
  title?: string
}

const Home = () => {
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

  return (
    <>
      <Hero />
      <FeaturedCourses />
      <TikTokVideos videos={tiktokVideos} username="studywithali_" />
      <AboutUs />
      <OurCourses />
      <Newsletter />
    </>
  )
}

export default Home

