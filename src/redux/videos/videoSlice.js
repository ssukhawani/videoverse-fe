// videoSlice.js
import { createSlice } from '@reduxjs/toolkit';
import videoInitialState from './videoInitialState';
import { fetchVideosThunk, uploadVideoThunk } from './videoThunks';

const videoSlice = createSlice({
  name: 'videos',
  initialState: videoInitialState,
  reducers: {
    setSelectedVideo: (state, action) => {
      state.selectedVideo = action.payload;
    },
    setVideoMeta: (state, action) => {
      state.selectedVideoMeta = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Videos
      .addCase(fetchVideosThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideosThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchVideosThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Upload Video
      .addCase(uploadVideoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadVideoThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.videos.push(action.payload);
      })
      .addCase(uploadVideoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default videoSlice;
