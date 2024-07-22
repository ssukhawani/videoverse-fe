import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { PasswordInput } from '@/components/ui/password-input'
import { cn } from '@/lib/utils'
import {
  useDispatch,
} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  registerUserThunk,
} from '@/redux/auth'
import { toast } from '@/components/ui/use-toast'
import { toastMessage } from '@/constants/toastMessage'
import {  useState } from 'react'
import { routeEndpoints } from '@/constants/routeEndpoints'

// Match the form schema with backend contracts 
const formSchema = z
  .object({
    full_name: z.string().min(1, { message: 'Please enter your full name' }),
    email: z
      .string()
      .min(1, { message: 'Please enter your email' })
      .email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(1, {
        message: 'Please enter your password',
      })
      .min(7, {
        message: 'Password must be at least 7 characters long',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  })

export function SignUpForm({ className, ...props }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name:'',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(data) {
    setLoading(true)
    delete data['confirmPassword']
    dispatch(
      registerUserThunk({...data})
    )
      .unwrap()
      .then(() => {
        toast({
          description: toastMessage.ACTIVATION_LINK_SENT,
        })
        navigate({
          pathname: routeEndpoints.LOGIN,
        })
        setLoading(false)
      })
      .catch((err)=>{
        console.log(err)
        setLoading(false)
      })
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='full_name'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Robin hood' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-6' loading={loading}>
              Create Account
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
