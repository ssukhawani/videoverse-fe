import videoSlice from "./videoSlice";

export { fetchVideosThunk, uploadVideoThunk } from "./videoThunks";

export default videoSlice;

export const { setSelectedVideo, setVideoMeta } = videoSlice.actions;