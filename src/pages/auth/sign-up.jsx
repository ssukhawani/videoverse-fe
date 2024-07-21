import { Card } from '@/components/ui/card'
import { SignUpForm } from './components/sign-up-form'
import { Link } from 'react-router-dom'
import Logo from '@/components/logo'

export default function SignUp() {
  return (
    <>
      <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
        <Logo/>
          <Card className='p-6'>
            <div className='mb-6 flex flex-col space-y-2 text-left'>
              <h1 className='text-lg font-semibold tracking-tight'>
                Create an account
              </h1>
              <p className='text-sm text-muted-foreground'>
                Already have an account?{' '}
                <Link
                  to='/login'
                  className='underline underline-offset-4 hover:text-primary'
                >
                  Sign In
                </Link>
              </p>
            </div>
            <SignUpForm />
          </Card>
        </div>
      </div>
    </>
  )
}
