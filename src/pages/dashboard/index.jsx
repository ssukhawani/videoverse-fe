import {
  fetchMergedVideosThunk,
  fetchTrimmedVideosThunk,
  fetchVideosThunk,
  setSelectedVideo,
} from '@/redux/videos'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SelectedVideo from './video'
import { videoService } from '@/services/serviceInstances'
import RangeInput from './range-input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from '@/components/ui/use-toast'

const Dashboard = () => {
  const dispatch = useDispatch()
  const {
    videos,
    selectedVideo,
    selectedVideoMeta,
    trimmedVideos,
    mergedVideos,
  } = useSelector((state) => state.videos)
  const [thumbnails, setThumbnails] = useState([])
  const [loadingThumbnails, setLoadingThumbnails] = useState(false)
  const [loadingTrim, setLoadingTrim] = useState(false)
  const [loadingMerge, setLoadingMerge] = useState(false)

  const [rStart, setRStart] = useState(0)
  const [rEnd, setREnd] = useState(100)
  const [selectedTrimmedVideos, setSelectedTrimmedVideos] = useState([])

  useEffect(() => {
    dispatch(fetchVideosThunk())
    dispatch(fetchTrimmedVideosThunk())
    dispatch(fetchMergedVideosThunk())
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
    if (!rStart || !rEnd) {
      toast({
        variant: 'destructive',
        description: 'Please select range for trimming',
      })
      return
    }

    const startTime = (rStart / 100) * selectedVideoMeta.duration
    const endTime = (rEnd / 100) * selectedVideoMeta.duration
    setLoadingTrim(true)

    try {
      await videoService.postWithEndpoint(`trim/${selectedVideo.id}/`, {
        start_time: startTime,
        end_time: endTime,
      })
      // Update the state with the new trimmed video
      dispatch(fetchTrimmedVideosThunk())
    } catch (error) {
      console.error('Error trimming video:', error)
    } finally {
      setLoadingTrim(false)
    }
  }

  const handleCheckboxChange = (videoId) => {
    setSelectedTrimmedVideos((prevSelected) =>
      prevSelected.includes(videoId)
        ? prevSelected.filter((id) => id !== videoId)
        : [...prevSelected, videoId]
    )
  }

  const mergeVideos = async () => {
    if (!selectedTrimmedVideos.length) {
      toast({
        variant: 'destructive',
        description: 'Please select trimmed videos for merging',
      })
      return
    }
    setLoadingMerge(true)

    try {
      await videoService.postWithEndpoint(`merge_trimmed_videos/`, {
        video_ids: selectedTrimmedVideos.sort(),
      })
      // Update the state with the new merged videos
      dispatch(fetchMergedVideosThunk())
    } catch (error) {
      console.error('Error merging videos:', error)
    } finally {
      setLoadingMerge(false)
    }
  }

  const videoUrl = selectedVideo
    ? `${import.meta.env.VITE_APP_BACKEND_MEDIA_URL}/${selectedVideo.file_path}`
    : ''

  return (
    <>
      <div className='w-full px-4 pt-6 md:pl-20 md:pt-16'>
        <div className='grid gap-4 md:grid-cols-5'>
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
              <>{videos.length > 0 && <p>Select a video to preview</p>}</>
            )}
          </div>

          {/* Output video list */}
          <div className='col-span-1 flex flex-col'>
            <h2 className='mb-4 text-xl font-semibold'>Trimmed Videos</h2>
            <div className='max-h-[48vh] overflow-y-auto pr-4'>
              <ul className='space-y-4'>
                {trimmedVideos.map((video) => (
                  <li
                    key={video.id}
                    className='flex space-x-2 space-y-4 rounded border p-2'
                  >
                    <Checkbox
                      checked={selectedTrimmedVideos.includes(video.id)}
                      onCheckedChange={() => handleCheckboxChange(video.id)}
                    />
                    <div className='h-[140px] w-[140px] flex-1 p-1'>
                      <video
                        src={`${import.meta.env.VITE_APP_BACKEND_MEDIA_URL}/${video.file_path}`}
                        controls
                        className='w-full'
                      />
                      <p className='truncate text-blue-500'>{video.name}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className='col-span-1 flex flex-col'>
            <h2 className='mb-4 text-xl font-semibold'>Merged Videos</h2>
            <div className='max-h-[48vh] overflow-y-auto pr-4'>
              <ul className='space-y-4'>
                {mergedVideos.map((video) => (
                  <li
                    key={video.id}
                    className='flex space-x-2 space-y-4 rounded border p-2'
                  >
                    <div className='h-[160px] w-[160px] flex-1 p-2'>
                      <video
                        src={`${import.meta.env.VITE_APP_BACKEND_MEDIA_URL}/${video.file_path}`}
                        controls
                        className='w-full'
                      />
                      <p className='truncate text-blue-500'>{video.name}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline */}
        {videos.length > 0 && (
          <div className='my-4'>
            <div className='my-8 flex w-[78%] items-center justify-between gap-10'>
              <h2 className='text-xl font-semibold'>Video Timeline</h2>
              <div className='flex gap-4'>
                <Button loading={loadingTrim} onClick={trimVideo}>
                  Trim Video
                </Button>
                <Button loading={loadingMerge} onClick={mergeVideos}>
                  Merge Videos
                </Button>
              </div>
            </div>
            {selectedVideo && (
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
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Dashboard
