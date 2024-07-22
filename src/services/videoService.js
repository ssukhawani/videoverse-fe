// services/videoService.js
import { apiEndpoints } from '@/constants/apiEndpoints'
import Repository from './repository'
import mainAxiosInstance from '@/interceptor/instance'

// Video service
class VideoService extends Repository {
  constructor() {
    super(apiEndpoints.VIDEO_SERVICE)
  }

  // Custom method for uploading a video
  async uploadVideo(data, onUploadProgress) {
    const formData = new FormData()
    formData.append('file', data.file)
    formData.append('name', data.name)

    const response = await mainAxiosInstance.post(this.endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    })
    return response.data
  }

  // Custom method for fetching videos for a user
  async getUserVideos() {
    try {
      const response = await this.get(`user/`)
      return response
    } catch (error) {
      return this.onError(error)
    }
  }

  // Custom method for deleting a video
  async deleteVideo(videoId) {
    try {
      const response = await this.delete(`/${videoId}/`)
      return response
    } catch (error) {
      return this.onError(error)
    }
  }

  async getVideoThumbnails(videoId) {
    try {
      const response = await this.get(`thumbnails/${videoId}/`);
      return response;
    } catch (error) {
      return this.onError(error);
    }
  }
}

export default VideoService
