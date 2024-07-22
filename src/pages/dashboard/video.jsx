import { setVideoMeta } from '@/redux/videos'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const SelectedVideo = ({ selectedVideo, videoUrl }) => {
  const dispatch = useDispatch()

  const handleLoadedData = async (e) => {
    // console.dir(ref.current);
    const el = e.target

    const meta = {
      name: selectedVideo.name,
      duration: el.duration,
      videoWidth: el.videoWidth,
      videoHeight: el.videoHeight,
    }
    dispatch(setVideoMeta(meta)); 
  }

  useEffect(() => {
    console.log('Selected video changed:', selectedVideo)
    if (selectedVideo) {
      console.log('Video path:', selectedVideo.file_path)
      console.log('Video MIME type:', selectedVideo.mime_type)
    }
  }, [selectedVideo])

  return (
    <div className='rounded border p-2'>
      <h3 className='text-lg'>{selectedVideo.name}</h3>
      <video
        src={videoUrl}
        controls
        muted
        className='w-full'
        onLoadedMetadata={handleLoadedData}
      >
        <source type={selectedVideo.mime_type} />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default SelectedVideo
