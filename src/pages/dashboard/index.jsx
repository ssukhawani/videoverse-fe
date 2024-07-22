import { fetchVideosThunk, setSelectedVideo } from '@/redux/videos'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SelectedVideo from './video'
import { videoService } from '@/services/serviceInstances'
import RangeInput from './range-input'
import { Button } from '@/components/ui/button'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { videos, selectedVideo, selectedVideoMeta } = useSelector(
    (state) => state.videos
  )
  const [thumbnails, setThumbnails] = useState([])
  const [loadingThumbnails, setLoadingThumbnails] = useState(false)
  const [loadingTrim, setLoadingTrim] = useState(false)

  const [rStart, setRStart] = useState(0)
  const [rEnd, setREnd] = useState(100)
  const [outputVideos, setOutputVideos] = useState([])

  useEffect(() => {
    dispatch(fetchVideosThunk())
  }, [dispatch])

  useEffect(() => {
    if (selectedVideo) {
      setLoadingThumbnails(true)
      videoService
        .getVideoThumbnails(selectedVideo.id)
        .then((response) => {
          setThumbnails(response)
          setLoadingThumbnails(false)
        })
        .catch((error) => {
          console.error('Error fetching thumbnails:', error)
          setLoadingThumbnails(false)
        })
    }
  }, [selectedVideo])

  const handleVideoSelect = (video) => {
    dispatch(setSelectedVideo(video))
  }

  const handleUpdaterStart = (e) => {
    setRStart(parseInt(e.target.value, 10))
  }

  const handleUpdaterEnd = (e) => {
    setREnd(parseInt(e.target.value, 10))
  }

  const trimVideo = async () => {
    const startTime = (rStart / 100) * selectedVideoMeta.duration
    const endTime = (rEnd / 100) * selectedVideoMeta.duration
    setLoadingTrim(true)

    try {
      const response = await videoService.postWithEndpoint(
        `trim/${selectedVideo.id}/`,
        {
          start_time: startTime,
          end_time: endTime,
        }
      )
      const trimmedVideoUrl = response.trimmed_video_url

      // Update the state with the new trimmed video
      setOutputVideos((prevVideos) => [
        ...prevVideos,
        {
          url: trimmedVideoUrl,
          name: `trimmed_${prevVideos.length + 1}.mp4`,
        },
      ])
    } catch (error) {
      console.error('Error trimming video:', error)
    } finally {
      setLoadingTrim(false)
    }
  }

  const videoUrl = selectedVideo
    ? `${import.meta.env.VITE_APP_BACKEND_MEDIA_URL}/${selectedVideo.file_path}`
    : ''

  return (
    <>
      <div className='w-full px-4 pt-6 md:pl-20 md:pt-16'>
        <div className='grid grid-cols-4 gap-4'>
          {/* Video List */}
          <div className='col-span-1 flex flex-col'>
            <h2 className='mb-4 text-xl font-semibold'>Uploaded Videos</h2>
            <ul className='space-y-2'>
              {videos.map((video) => (
                <li key={video.id} className='rounded border p-2'>
                  <button
                    onClick={() => handleVideoSelect(video)}
                    className='text-blue-500'
                  >
                    {video.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Video Preview */}
          <div className='col-span-2 flex flex-col'>
            <h2 className='mb-4 text-xl font-semibold'>Preview</h2>
            {selectedVideo ? (
              <>
                <SelectedVideo
                  selectedVideo={selectedVideo}
                  videoUrl={videoUrl}
                />
              </>
            ) : (
              <p>Select a video to preview</p>
            )}
          </div>

          {/* Output video list */}
          <div className='col-span-1 flex flex-col'>
            <h2 className='mb-4 text-xl font-semibold'>Output Videos</h2>
            <div className='overflow-y-auto max-h-[48vh] pr-4'>
              <ul className='space-y-4'>
                {outputVideos.map((video, index) => (
                  <li key={index} className='rounded border p-2'>
                    <video
                      src={`${import.meta.env.VITE_APP_BACKEND_MEDIA_URL}/${video.url}`}
                      controls
                      className='w-full'
                    />
                    <p className='text-blue-500'>{video.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline */}
        {selectedVideo && (
          <div className='mt-4'>
            <div className='flex w-[73%] items-center justify-between gap-10'>
              <h2 className='text-xl font-semibold'>Video Timeline</h2>
              <Button loading={loadingTrim} onClick={trimVideo}>
                Trim Video
              </Button>
            </div>
            <div className='rounded border p-2'>
              <RangeInput
                thumbNails={thumbnails}
                rEnd={rEnd}
                rStart={rStart}
                handleUpdaterStart={handleUpdaterStart}
                handleUpdaterEnd={handleUpdaterEnd}
                loading={loadingThumbnails}
                videoMeta={selectedVideoMeta}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Dashboard
