import videoSlice from "./videoSlice";

export { fetchVideosThunk, uploadVideoThunk, fetchTrimmedVideosThunk } from "./videoThunks";

export default videoSlice;

export const { setSelectedVideo, setVideoMeta } = videoSlice.actions;