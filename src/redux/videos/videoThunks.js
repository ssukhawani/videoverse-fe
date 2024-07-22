// videoThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { videoService } from '@/services/serviceInstances';

// Thunk to fetch videos
export const fetchVideosThunk = createAsyncThunk(
  'videos/fetchVideos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await videoService.getUserVideos();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to upload a video
export const uploadVideoThunk = createAsyncThunk(
  'videos/uploadVideo',
  async ({ data, onUploadProgress}, { rejectWithValue }) => {
    try {
      const response = await videoService.uploadVideo(data, onUploadProgress);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to fetch videos
export const fetchTrimmedVideosThunk = createAsyncThunk(
  'videos/fetchTrimmedVideos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await videoService.get("trimmed/");
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);