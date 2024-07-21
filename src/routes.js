import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'
import { routeEndpoints } from './constants/routeEndpoints'

export const getAllRoutes = (mainPageLoader, protectedLoader) => [
  // OPEN ROUTES
     // Auth routes
  {
    path: routeEndpoints.HOME,
    loader: mainPageLoader,
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-in')).default,
    }),
  },
  {
    path: routeEndpoints.LOGIN,
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-in')).default,
    }),
  },

  {
    path: routeEndpoints.SIGNUP,
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-up')).default,
    }),
  },
  {
    path: routeEndpoints.USER_ACTIVATION,
    lazy: async () => ({
      Component: (await import('./pages/auth/activate')).default,
    }),
  },
  {
    path: routeEndpoints.FORGET_PASSWORD,
    lazy: async () => ({
      Component: (await import('./pages/auth/forgot-password')).default,
    }),
  },
  {
    path: routeEndpoints.RESET_PASSWORD,
    lazy: async () => ({
      Component: (await import('./pages/auth/reset-password')).default,
    }),
  },


  // PROTECTED ROUTES
  {
    path: '/',
    lazy: async () => {
      const Layout = await import('./components/main-layout')
      return { Component: Layout.default }
    },
    children: [...getProtectedRoutes(protectedLoader)],
  },

  // OPEN ERROR ROUTES
  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
]

export const getProtectedRoutes = (protectedLoader) => [
  {
    path: 'dashboard',
    loader: protectedLoader,
    lazy: async () => ({
      Component: (await import('@/pages/dashboard')).default,
    }),
  },
]
