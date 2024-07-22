import { useForm } from 'react-hook-form'
import {
  Link,
  useNavigate,
} from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { PasswordInput } from '@/components/ui/password-input'
import {
  useDispatch,
  // useSelector
} from 'react-redux'
import {
  loggedInUserThunk,
  loginUserThunk,
} from '@/redux/auth'
import { toast } from '@/components/ui/use-toast'
import { toastMessage } from '@/constants/toastMessage'
import { useState } from 'react'

const formSchema = z.object({
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
})

export function UserAuthForm({ className, ...props }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(data) {
    setLoading(true)
    dispatch(
      loginUserThunk({
        email: data.email,
        password: data.password,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(loggedInUserThunk())
          .unwrap()
          .then(() => {
            toast({
              description: toastMessage.LOGIN_SUCCESS,
            })
            navigate({
              pathname: '/',
            })
          })
      })
      .catch((err)=>{
        console.log(err)
      })
      .finally(()=>{
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
                  <div className='flex items-center justify-between'>
                    <FormLabel>Password</FormLabel>
                    <Link
                      to='/forgot-password'
                      className='text-sm font-medium text-muted-foreground hover:opacity-75'
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} autoComplete="password"  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-6' loading={loading}>
              Login
            </Button>


          </div>
        </form>
      </Form>
    </div>
  )
}
