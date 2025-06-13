export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();
  const publicRoutes = ['/'];
  if (!publicRoutes.includes(to.path) && !auth.token) {
    return navigateTo('/auth/login');
  }
});