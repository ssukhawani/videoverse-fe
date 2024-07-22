import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { videoService } from '@/services/serviceInstances'
import { toast } from '@/components/ui/use-toast'

const UploadVideoForm = () => {
  const [file, setFile] = useState(null)
  const [name, setName] = useState('')
  const [progress, setProgress] = useState(0)

  const handleFileChange = (e) => {
    let file = e.target.files[0]
    if (file) {
      setName(file?.name)
      setFile(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const videoData = {
      file: file,
      name: name,
    }

    try {
      const response = await videoService.uploadVideo(videoData, (event) => {
        setProgress(Math.round((100 * event.loaded) / event.total))
      })
      console.log('Video uploaded successfully:', response)
      setTimeout(() => {
        setProgress(100)
      }, 500)

      toast({
        description: 'Video uploaded successfully!',
      })
      // Optionally, reset form fields
      setFile(null)
      setName('')
      setTimeout(() => {
        setProgress(0)
      }, 2000)
    } catch (error) {
      console.error('Error uploading video:', error)
      setProgress(0)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input type='file' onChange={handleFileChange} accept='video/*' />
        <Button type='submit'>Upload Video</Button>
        {progress > 0 && (
          <div>
            <div>Uploading: {progress}%</div>
            <progress value={progress} max='100' />
          </div>
        )}
      </form>
    </>
  )
}

export default UploadVideoForm
