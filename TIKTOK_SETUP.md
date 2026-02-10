# TikTok Videos Integration Guide

## Overview
This guide explains how to integrate TikTok videos into your website with a horizontal scrolling video player.

## Component Usage

### Basic Usage (Manual Video URLs)

```tsx
import TikTokVideos from './components/TikTokVideos'

const tiktokVideos = [
  {
    id: '1234567890',
    videoUrl: 'https://www.tiktok.com/@studywithali_/video/1234567890',
    embedUrl: 'https://www.tiktok.com/embed/v2/1234567890',
    thumbnail: 'optional-thumbnail-url.jpg',
    title: 'Optional video title'
  },
  // Add more videos...
]

<TikTokVideos videos={tiktokVideos} />
```

### Using TikTok Username (Requires API Setup)

```tsx
<TikTokVideos username="studywithali_" />
```

## API Integration Options

### Option 1: TikTok Official API v2 (Recommended)

**Requirements:**
- TikTok Developer Account
- OAuth 2.0 authentication
- Access token

**Steps:**
1. Register at https://developers.tiktok.com/
2. Create an app and get credentials
3. Implement OAuth flow to get access token
4. Use the `fetchTikTokUserVideos` function from `utils/tiktokApi.ts`

**Example:**
```typescript
import { fetchTikTokUserVideos } from './utils/tiktokApi'

const videos = await fetchTikTokUserVideos('studywithali_', accessToken, 20)
```

### Option 2: RapidAPI TikTok Scraper

**Requirements:**
- RapidAPI account
- API key

**Steps:**
1. Sign up at https://rapidapi.com/
2. Subscribe to a TikTok scraper API (e.g., "TikTok Scraper")
3. Get your API key
4. Use the `fetchTikTokVideosViaRapidAPI` function

**Example:**
```typescript
import { fetchTikTokVideosViaRapidAPI } from './utils/tiktokApi'

const videos = await fetchTikTokVideosViaRapidAPI('studywithali_', apiKey)
```

### Option 3: Backend Proxy (Recommended for Production)

Create a backend endpoint that:
1. Fetches videos from TikTok API
2. Caches the results
3. Returns videos to your frontend

**Backend Example (Node.js/Express):**
```javascript
app.get('/api/tiktok/videos', async (req, res) => {
  try {
    const videos = await fetchTikTokUserVideos('studywithali_', accessToken)
    res.json(videos)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos' })
  }
})
```

**Frontend:**
```typescript
useEffect(() => {
  const fetchVideos = async () => {
    const response = await fetch('/api/tiktok/videos')
    const videos = await response.json()
    setVideos(videos)
  }
  fetchVideos()
}, [])
```

## Getting TikTok Video URLs

### Method 1: Manual Collection
1. Go to your TikTok profile
2. Click on each video
3. Copy the video URL
4. Extract video ID from URL: `tiktok.com/@username/video/VIDEO_ID`

### Method 2: TikTok oEmbed API
```typescript
import { fetchTikTokVideoEmbed } from './utils/tiktokApi'

const videoData = await fetchTikTokVideoEmbed('https://www.tiktok.com/@studywithali_/video/1234567890')
```

## Features

- ✅ Horizontal scrolling with smooth animations
- ✅ 9:16 aspect ratio (vertical TikTok format)
- ✅ Responsive design
- ✅ Keyboard navigation
- ✅ Scroll buttons
- ✅ Loading states
- ✅ Error handling
- ✅ TikTok embed support

## Customization

### Change Video Count
```tsx
<TikTokVideos username="studywithali_" maxCount={10} />
```

### Custom Styling
Edit `src/components/TikTokVideos.tsx` to customize:
- Colors
- Spacing
- Animation speed
- Video card size

## Troubleshooting

### Videos Not Loading
1. Check if video URLs are correct
2. Verify TikTok embed URLs are accessible
3. Check browser console for CORS errors
4. Ensure videos are public (not private)

### API Issues
1. Verify API credentials are correct
2. Check API rate limits
3. Ensure access tokens are valid
4. Check TikTok API status

## Security Notes

- Never expose API keys in frontend code
- Use environment variables for sensitive data
- Implement backend proxy for API calls
- Cache API responses to reduce requests

## Next Steps

1. Choose an API integration method
2. Set up authentication/API keys
3. Add video URLs or implement API fetching
4. Customize styling as needed
5. Test on different devices
