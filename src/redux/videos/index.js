import videoSlice from "./videoSlice";

export { fetchVideosThunk, uploadVideoThunk, fetchTrimmedVideosThunk, fetchMergedVideosThunk } from "./videoThunks";

export default videoSlice;

export const { setSelectedVideo, setVideoMeta } = videoSlice.actions;