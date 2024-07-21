import { useLocation } from 'react-router-dom'

export default function useCheckActiveNav() {
  const { pathname } = useLocation()
  const checkActiveNav = (nav, parent=null) => {
    const pathArray = pathname.split('/').filter((item) => item !== '')
    // console.log({nav, parent, pathArray})

    if (nav === '/' && pathArray.length < 1) return true

    if (parent){
      return pathArray.includes(nav.replace(/^\//, '')) && pathArray.includes(parent.replace(/^\//, ''))
    }
    return pathArray.includes(nav.replace(/^\//, ''))
  }

  const checkIfActiveSubNav = (nav) => {
    return pathname === nav
  }

  return { checkActiveNav, checkIfActiveSubNav }
}
