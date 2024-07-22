import './App.css'
import LocalStorageRepository, { deleteUserInfo } from '@/lib/storage'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import { getAllRoutes } from './routes'
import mainAxiosInstance from './interceptor/instance'
import { setupInterceptors } from './interceptor/interceptors'
import { persistor } from './redux/store'
import { toast } from './components/ui/use-toast'
import { toastMessage } from './constants/toastMessage'
import { decodeAndValidateToken } from './lib/token'
import Loader from './components/loader'
import { routeEndpoints } from './constants/routeEndpoints'

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    // errorElement: <GeneralError />,
    children: [...getAllRoutes(mainPageLoader, protectedLoader)],
  },
])

async function mainPageLoader() {
  const access_token = LocalStorageRepository.get('access_token')
  const { isValidToken } = decodeAndValidateToken(access_token)

  if (access_token != null && isValidToken) {
    return redirect(routeEndpoints.DASHBOARD)
  }else if(access_token != null && !isValidToken){
    toast({
      variant:"destructive",
      description: toastMessage.LOGIN_EXPIRED,
    })
    persistor.purge();
    deleteUserInfo();
    redirect(routeEndpoints.LOGIN)
  }
  return null
}

function protectedLoader({ request }) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  const access_token = LocalStorageRepository.get('access_token')

  const { isValidToken } = decodeAndValidateToken(access_token)
  
  if (access_token == null || !isValidToken) {
    // const params = new URLSearchParams()
    // params.set('from', new URL(request.url).pathname)
    // return redirect('/login' + params.toString())
    return redirect(routeEndpoints.LOGIN)
  }
  return null
}

function App() {
  setupInterceptors(mainAxiosInstance)
  return (
    <div className='App'>
      <RouterProvider router={router} fallbackElement={<Loader />} />
    </div>
  )
}

export default App
