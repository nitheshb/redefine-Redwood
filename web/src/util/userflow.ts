import { navigate, routes } from '@redwoodjs/router'
import { getUser } from 'src/context/dbQueryFirebase'
import { USER_ROLES } from 'src/constants/userRoles'

export const navigateBasedOnUser = async (uid) => {
  const userData = await getUser(uid)
  if (!userData) {
    return false
  }
  if (userData.roles.includes(USER_ROLES.ADMIN)) {
    navigate(routes.home(), { replace: true })
  }
  if (
    userData.roles.includes(USER_ROLES.SALES_MANAGER) ||
    userData.roles.includes(USER_ROLES.SALES_EXECUTIVE)
  ) {
    navigate(routes.leadsManager(), { replace: true })
  }
  if (
    userData.roles.includes(USER_ROLES.HR_MANAGER) ||
    userData.roles.includes(USER_ROLES.HR_EXECUTIVE)
  ) {
    navigate(routes.usersAdmin(), { replace: true })
  }
  if (
    userData.roles.includes(USER_ROLES.HR_MANAGER) ||
    userData.roles.includes(USER_ROLES.HR_EXECUTIVE)
  ) {
    navigate(routes.usersAdmin(), { replace: true })
  }
  if (
    userData.roles.includes(USER_ROLES.CRM_MANAGER) ||
    userData.roles.includes(USER_ROLES.CRM_EXECUTIVE)
  ) {
    navigate(routes.projectModule(), { replace: true })
  }
  return false
}
