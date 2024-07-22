// videoSlice.js
import { createSlice } from '@reduxjs/toolkit'
import videoInitialState from './videoInitialState'
import {
  fetchVideosThunk,
  uploadVideoThunk,
  fetchTrimmedVideosThunk,
  fetchMergedVideosThunk,
} from './videoThunks'

const videoSlice = createSlice({
  name: 'videos',
  initialState: videoInitialState,
  reducers: {
    setSelectedVideo: (state, action) => {
      state.selectedVideo = action.payload
    },
    setVideoMeta: (state, action) => {
      state.selectedVideoMeta = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Videos
      .addCase(fetchVideosThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchVideosThunk.fulfilled, (state, action) => {
        state.loading = false
        state.videos = action.payload
      })
      .addCase(fetchVideosThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Upload Video
      .addCase(uploadVideoThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(uploadVideoThunk.fulfilled, (state, action) => {
        state.loading = false
        state.videos.push(action.payload)
      })
      .addCase(uploadVideoThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Fetch Trimmed Videos
      .addCase(fetchTrimmedVideosThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTrimmedVideosThunk.fulfilled, (state, action) => {
        state.loading = false
        state.trimmedVideos = action.payload
      })
      .addCase(fetchTrimmedVideosThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Fetch Merged Videos
      .addCase(fetchMergedVideosThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMergedVideosThunk.fulfilled, (state, action) => {
        state.loading = false
        state.mergedVideos = action.payload
      })
      .addCase(fetchMergedVideosThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default videoSlice
