export const apiEndpoints = {
  AUTH_SERVICE: "/auth",
  AUTH_REGISTER: '/users/',
  AUTH_LOGIN: '/jwt/create',
  LOGOUT: '/logout/',
  GET_LOGGED_IN_USER: '/users/me/',
  ACTIVATE_USER: '/users/activation',
  RESET_USER_PASS: '/users/reset_password',
  RESET_PASS_CONFIRM: '/users/reset_password_confirm',
  CHANGE_USER_PASS: '/users/set_password/',
  PAGE_LINKS: '?page=${PAGE_NUMBER}&page_size=${PAGE_SIZE}&search=${SEARCH_QUERY}',
}
