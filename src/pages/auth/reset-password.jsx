import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { routeEndpoints } from '@/constants/routeEndpoints'
import { toastMessage } from '@/constants/toastMessage'
import { authService } from '@/services/serviceInstances'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { PasswordInput } from '@/components/ui/password-input'
import { apiEndpoints } from '@/constants/apiEndpoints'


// Match the form schema with backend contracts 
const formSchema = z
  .object({
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

const ResetPassword = () => {
  let { uid, token } = useParams()
  const navigate = useNavigate()

  const [resetPassObj, setResetPassObj] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  useMemo(() => {
    setResetPassObj(() => ({ ...resetPassObj, uid, token }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, token])

  const onSubmit = (data) => {
    const { password, confirmPassword } = data
    setIsLoading(true)

    authService
      .postWithEndpoint(apiEndpoints.RESET_PASS_CONFIRM,{
        ...resetPassObj,
        new_password: password,
        re_new_password: confirmPassword,
      })
      .then(() => {
        toast({
          description: toastMessage.PASSWORD_RESET_DONE,
        })
        setTimeout(() => {
          navigate(routeEndpoints.LOGIN)
        }, 1000)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <section className='fixed left-0 top-0 z-[997] flex h-screen w-full items-center justify-center bg-black/50'>
        <div className='relative h-full w-full bg-white px-7 pb-9 pt-6 duration-300 md:h-fit md:w-[496px] md:rounded-2xl md:px-12 lg:h-fit'>
          <div className='bg mt-20 flex h-full w-full flex-col gap-10 text-black md:mt-0'>
            <div className='flex h-fit w-full justify-center gap-10'>
              <div className='flex cursor-pointer flex-col items-center'>
                <h1 className={'text-[22px] font-bold text-[#5D6A82]'}>
                  Password Reset
                </h1>
                <div className='bg-color-blue mt-2 h-[5px] w-full rounded-full'></div>
              </div>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='grid gap-2'>
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
                  <Button className='mt-6' loading={isLoading}>
                    Reset
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>
      <div className='pointer-events-none fixed left-0 top-0 z-[994] h-screen w-full bg-white'></div>
    </>
  )
}

export default ResetPassword
