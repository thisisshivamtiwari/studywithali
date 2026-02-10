/**
 * TikTok API Utility Functions
 * 
 * To fetch TikTok videos, you have several options:
 * 
 * 1. TikTok Official API v2 (requires authentication):
 *    - https://developers.tiktok.com/doc/tiktok-api-v2-video-list
 *    - Requires OAuth 2.0 authentication
 *    - Endpoint: https://open.tiktokapis.com/v2/video/list/
 * 
 * 2. TikTok oEmbed API (for embedding):
 *    - https://www.tiktok.com/oembed?url=VIDEO_URL
 *    - No authentication required for public videos
 * 
 * 3. Third-party APIs (RapidAPI, etc.):
 *    - Various services available on RapidAPI marketplace
 *    - Usually require API keys
 */

export interface TikTokVideoData {
  id: string
  videoUrl: string
  embedUrl: string
  thumbnail?: string
  title?: string
  description?: string
  author?: string
  duration?: number
  likeCount?: number
  commentCount?: number
  shareCount?: number
  viewCount?: number
}

/**
 * Fetch TikTok videos using oEmbed API
 * Note: This requires individual video URLs
 */
export const fetchTikTokVideoEmbed = async (
  videoUrl: string
): Promise<TikTokVideoData | null> => {
  try {
    const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`
    const response = await fetch(oembedUrl)
    
    if (!response.ok) {
      throw new Error('Failed to fetch TikTok embed')
    }
    
    const data = await response.json()
    const videoId = extractVideoIdFromUrl(videoUrl)
    
    return {
      id: videoId || '',
      videoUrl: videoUrl,
      embedUrl: data.html ? extractEmbedUrl(data.html) : `https://www.tiktok.com/embed/v2/${videoId}`,
      thumbnail: data.thumbnail_url,
      title: data.title,
      author: data.author_name,
    }
  } catch (error) {
    console.error('Error fetching TikTok embed:', error)
    return null
  }
}

/**
 * Extract video ID from TikTok URL
 */
export const extractVideoIdFromUrl = (url: string): string | null => {
  const match = url.match(/tiktok\.com\/.*\/video\/(\d+)/)
  return match ? match[1] : null
}

/**
 * Extract embed URL from oEmbed HTML
 */
const extractEmbedUrl = (html: string): string => {
  const match = html.match(/src="([^"]+)"/)
  return match ? match[1] : ''
}

/**
 * Fetch TikTok user videos using TikTok API v2
 * 
 * IMPORTANT: This requires:
 * 1. TikTok Developer Account
 * 2. OAuth 2.0 authentication
 * 3. Access token
 * 
 * Example implementation:
 */
export const fetchTikTokUserVideos = async (
  _username: string,
  accessToken: string,
  maxCount: number = 20
): Promise<TikTokVideoData[]> => {
  try {
    // First, get user ID from username (requires separate API call)
    // Then use: https://open.tiktokapis.com/v2/video/list/
    
    const response = await fetch(
      'https://open.tiktokapis.com/v2/video/list/',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          max_count: maxCount,
          fields: [
            'id',
            'create_time',
            'cover_image_url',
            'share_url',
            'video_description',
            'duration',
            'title',
            'like_count',
            'comment_count',
            'share_count',
            'view_count',
          ],
        }),
      }
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch TikTok videos')
    }
    
    const data = await response.json()
    
    return data.data.videos.map((video: any) => ({
      id: video.id,
      videoUrl: video.share_url,
      embedUrl: `https://www.tiktok.com/embed/v2/${video.id}`,
      thumbnail: video.cover_image_url,
      title: video.title || video.video_description,
      description: video.video_description,
      duration: video.duration,
      likeCount: video.like_count,
      commentCount: video.comment_count,
      shareCount: video.share_count,
      viewCount: video.view_count,
    }))
  } catch (error) {
    console.error('Error fetching TikTok user videos:', error)
    return []
  }
}

/**
 * Alternative: Use RapidAPI TikTok API
 * Example endpoint: https://tiktok-scraper2.p.rapidapi.com/user/posts
 */
export const fetchTikTokVideosViaRapidAPI = async (
  username: string,
  apiKey: string
): Promise<TikTokVideoData[]> => {
  try {
    const response = await fetch(
      `https://tiktok-scraper2.p.rapidapi.com/user/posts?username=${username}`,
      {
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'tiktok-scraper2.p.rapidapi.com',
        },
      }
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch TikTok videos')
    }
    
    const data = await response.json()
    
    // Transform the response to match our interface
    return data.data.map((video: any) => ({
      id: video.id,
      videoUrl: video.webVideoUrl || video.videoUrl,
      embedUrl: `https://www.tiktok.com/embed/v2/${video.id}`,
      thumbnail: video.cover,
      title: video.text,
      description: video.text,
      likeCount: video.diggCount,
      commentCount: video.commentCount,
      shareCount: video.shareCount,
      viewCount: video.playCount,
    }))
  } catch (error) {
    console.error('Error fetching TikTok videos via RapidAPI:', error)
    return []
  }
}
