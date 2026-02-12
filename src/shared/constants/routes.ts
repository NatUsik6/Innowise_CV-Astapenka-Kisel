export const ROUTES = {
  USERS: '/users',
  CVS: '/cvs',
  USER_SKILLS: (userId: string) => `/users/${userId}/skills`,
  USER_LANGUAGES: (userId: string) => `/users/${userId}/languages`,
};
