import Loader from '@/components/loader'
import { toast } from '@/components/ui/use-toast'
import { apiEndpoints } from '@/constants/apiEndpoints'
import { routeEndpoints } from '@/constants/routeEndpoints'
import { toastMessage } from '@/constants/toastMessage'
import { authService } from '@/services/serviceInstances'
import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Activate = () => {
  let { uid, token } = useParams();
  const isFirstRender = useRef(false)
  const navigate = useNavigate()

  console.log({uid, token}, "uid, token")

  useEffect(() => {
    if (!isFirstRender.current) {
      isFirstRender.current = true
      authService
        .postWithEndpoint(apiEndpoints.ACTIVATE_USER,{ uid, token })
        .then(() => {
          toast({
            description: toastMessage.ACCOUNT_VERIFIED,
          })
          setTimeout(() => {
            toast({
                description: toastMessage.YOU_NEED_TO_LOGIN,
              })
            navigate(routeEndpoints.LOGIN)
          }, 1500)
        })
        .catch(() => {
            navigate(routeEndpoints.SIGNUP + '?from=activate')
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Loader />
}

export default Activate
