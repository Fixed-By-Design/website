export default defineNuxtRouteMiddleware(() => {
  const { localPath } = useSiteLocale()
  const { loggedIn } = useUserSession()
  if (!loggedIn.value) return navigateTo(localPath('/signin'), { replace: true })
})
