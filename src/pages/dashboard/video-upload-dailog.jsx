import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from '@/components/ui/use-toast'
import { uploadVideoThunk } from '@/redux/videos'
import { useDispatch } from 'react-redux'

const formSchema = z.object({
  file: z.instanceof(File).refine((file) => file.type.startsWith('video/'), {
    message: 'Please upload a video file',
  }),
})

const UploadFileDialog = ({ open, onOpenChange, onUploadSuccess }) => {
  const dispatch = useDispatch()
  const [progress, setProgress] = useState(0)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: null,
    },
  })

  console.log(form.watch())

  const onSubmit = async (data) => {
    const videoData = {
      file: data.file,
      name: data.file.name,
    }

    try {
      await dispatch(
        uploadVideoThunk({
          data: videoData,
          onUploadProgress: (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total))
          },
        })
      ).unwrap()
      setProgress(100) // Ensure progress is set to 100% after upload completion
      toast({
        description: 'Video uploaded successfully!',
      })
      onUploadSuccess()
      form.reset()
      setTimeout(() => {
        onOpenChange(false) // Close the dialog after successful upload
      }, 500)
    } catch (error) {
      console.error('Error uploading video:', error)
    } finally {
      setTimeout(()=>{
        setProgress(0)
      },1500)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault()
          }}
        >
          <DialogHeader>
            <DialogTitle>Upload Video</DialogTitle>
            <DialogDescription>
              Select a video file to upload.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='file'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video File</FormLabel>
                    <FormControl>
                      <Input
                        type='file'
                        accept='video/*'
                        onChange={(e) => field.onChange(e.target.files[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {progress > 0 && (
                <div className='my-4'>
                  <div>Uploading: {progress}%</div>
                  <progress value={progress} max='100' />
                </div>
              )}
              <DialogFooter>
                <Button className='my-4' type='submit'>
                  Upload Video
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default UploadFileDialog
