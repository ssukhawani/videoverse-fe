import { Outlet, useLocation } from 'react-router-dom'
import { LayoutHeader } from './layout'
import { UserNav } from './user-nav'
import { cn } from '@/lib/utils'
import { excludeSidebar } from '@/constants/data'
import Sidebar from './sidebar'

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <>
      <div className='flex h-screen overflow-hidden bg-background'>
        {/* Sidebar */}
        {!excludeSidebar.includes(pathname) && (
          <Sidebar  />
        )}

        {/* Main Content */}
        <main
          id='content'
          className={cn(
            `relative flex-1 overflow-x-hidden pt-16 transition-[margin] md:ml-14 md:pt-0`
          )}
        >
          {/* Layout Header */}
          {!excludeSidebar.includes(pathname) && (
            <LayoutHeader
              className={`fixed top-0 z-10 hidden w-[calc(100%-3rem)] justify-between bg-white text-end transition-all md:flex`}
            >
              <div>
                {/* This div ensures the UserNav icon is aligned to the right */}
              </div>
              <div className='flex items-center'>
                <UserNav />
              </div>
            </LayoutHeader>
          )}

          {/* Main Outlet */}
          <div className={`w-full`}>
            {/* For spacing below fixed header on mobile */}
            <div className='hidden h-16' />
            <Outlet />
          </div>
        </main>
      </div>
    </>
  )
}
