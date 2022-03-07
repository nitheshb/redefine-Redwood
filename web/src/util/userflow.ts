import { navigate, routes } from '@redwoodjs/router'
import { getUser } from 'src/context/dbQueryFirebase'

export const navigateBasedOnUser = async (uid) => {
  const userData = await getUser(uid)
  if (!userData) {
    return null
  }
  if (userData.roles.includes('admin')) {
    navigate(routes.newHomePage(), { replace: true })
  }
  if (userData.roles.includes('sales-manager')) {
    navigate(routes.leadsManager(), { replace: true })
  }
  return null
}
