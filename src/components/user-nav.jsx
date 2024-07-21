import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TYPE_LOGOUT } from '@/constants/actionTypeConstants'
import { routeEndpoints } from '@/constants/routeEndpoints'
import { deleteUserInfo } from '@/lib/storage'
import { persistor } from '@/redux/store'
import { authService } from '@/services/serviceInstances'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function UserNav() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { refreshToken, userInfo: user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    authService
      .logout({
        refresh: refreshToken,
      })
      .then(() => {
        persistor.purge()
        dispatch({ type: TYPE_LOGOUT })
        deleteUserInfo()
        navigate('/')
      })
  }

  return (
    <>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
              <Avatar className='h-10 w-10 bg-blue-200 shadow-lg'>
                <AvatarImage
                  src={`https://robohash.org/${user.full_name}.png?size=50x50`}
                  alt='user-avatar'
                />
                <AvatarFallback>G</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56' align='end' forceMount>
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm font-medium leading-none'>
                  {user.full_name}
                </p>
                <p className='text-xs leading-none text-muted-foreground'>
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={()=>navigate(routeEndpoints.DASHBOARD)}>Dashboard</DropdownMenuItem>
              <DropdownMenuItem onClick={()=>navigate(routeEndpoints.HELP)}>Help</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )
}
