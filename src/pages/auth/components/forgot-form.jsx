import {  useState } from 'react'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toastMessage } from '@/constants/toastMessage'
import { toast } from '@/components/ui/use-toast'
import { authService } from '@/services/serviceInstances'
import { useNavigate } from 'react-router-dom'
import { routeEndpoints } from '@/constants/routeEndpoints'
import { apiEndpoints } from '@/constants/apiEndpoints'

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
})

export function ForgotForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = (data) => {
    setIsLoading(true);

    authService
      .postWithEndpoint(apiEndpoints.RESET_USER_PASS,data)
      .then(() => {
        toast({
          description:toastMessage.RESET_PASS_LINK_SENT
        });
        setTimeout(() => {
          navigate(routeEndpoints.LOGIN)
        }, 300);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='name@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' loading={isLoading}>
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
