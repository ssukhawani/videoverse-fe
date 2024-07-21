import { Card } from '@/components/ui/card'
import { UserAuthForm } from './components/user-auth-form'
import { Link } from 'react-router-dom'
import Logo from '@/components/logo'

export default function SignIn() {
  return (
    <>
      <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
          <Logo />
          <Card className='p-6'>
            <div className='mb-8 flex flex-col space-y-2 text-left'>
              <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
              <p className='text-sm text-muted-foreground'>
                New here?{' '}
                <Link
                  to='/signup'
                  className='underline underline-offset-4 hover:text-primary'
                >
                  Signup now
                </Link>
              </p>
            </div>
            <UserAuthForm />
          </Card>
        </div>
      </div>
    </>
  )
}
