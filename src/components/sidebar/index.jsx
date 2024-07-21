import { useEffect, useState } from 'react'
import { IconMenu2, IconUpload, IconX } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { Layout, LayoutHeader } from '../layout'
import { Button } from '../ui/button'
import { UserNav } from '../user-nav'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

export default function Sidebar({ className }) {
  const [navOpened, setNavOpened] = useState(false)

  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [navOpened])

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] delay-100 duration-500 md:bottom-0 md:right-auto md:h-svh md:w-24`,
        className
      )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-500 ${navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'} w-full bg-black md:hidden`}
      />

      <Layout>
        {/* Header */}
        <LayoutHeader className='sticky top-0 justify-between px-4 py-3 shadow md:px-4'>
          <div className='ml-5 flex w-full items-center justify-end'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-2 h-6 w-6'
            >
              <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
            </svg>
          </div>

          {/* Toggle Button in mobile */}
          <div className='flex'>
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden'
              aria-label='Toggle Navigation'
              aria-controls='sidebar-menu'
              aria-expanded={navOpened}
              onClick={() => setNavOpened((prev) => !prev)}
            >
              {navOpened ? <IconX /> : <IconMenu2 />}
            </Button>

            <div className='mx-2 flex items-center md:hidden'>
              <UserNav />
            </div>
          </div>
        </LayoutHeader>

        <div className='flex justify-center p-2 py-4'>
          <TooltipProvider delayDuration={0}>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button variant='secondary' className=''>
                  <IconUpload />
                </Button>
              </TooltipTrigger>
              <TooltipContent side='right' className='flex items-center gap-4'>
                Upload
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Layout>
    </aside>
  )
}
