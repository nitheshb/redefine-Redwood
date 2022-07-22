import { navigate, routes } from '@redwoodjs/router'
import { getUser } from 'src/context/dbQueryFirebase'
import { USER_ROLES } from 'src/constants/userRoles'

export const navigateBasedOnUser = async (uid) => {
  const userData = await getUser(uid)
  if (!userData) {
    return false
  }
  if (userData.roles.includes(USER_ROLES.ADMIN)) {
    console.log('where am i ')
    navigate(routes.home(), { replace: true })
  } else if (
    userData.roles.includes(USER_ROLES.PROJECT_MANAGER) ||
    userData.roles.includes(USER_ROLES.PROJECT_EXECUTIVE)
  ) {
    console.log('where am i 2')
    navigate(routes.home(), { replace: true })
  } else if (
    userData.roles.includes(USER_ROLES.SALES_MANAGER) ||
    userData.roles.includes(USER_ROLES.SALES_EXECUTIVE)
  ) {
    navigate(routes.leadsManager(), { replace: true })
  } else if (
    userData.roles.includes(USER_ROLES.HR_MANAGER) ||
    userData.roles.includes(USER_ROLES.HR_EXECUTIVE)
  ) {
    navigate(routes.usersAdmin(), { replace: true })
  } else if (
    userData.roles.includes(USER_ROLES.CRM_MANAGER) ||
    userData.roles.includes(USER_ROLES.CRM_EXECUTIVE)
  ) {
    navigate(routes.crmModule(), { replace: true })
  } else if (
    userData.roles.includes(USER_ROLES.FINANCE_MANAGER) ||
    userData.roles.includes(USER_ROLES.FINANCE_EXECUTIVE)
  ) {
    navigate(routes.financeModule(), { replace: true })
  } else if (
    userData.roles.includes(USER_ROLES.LEGAL_MANAGER) ||
    userData.roles.includes(USER_ROLES.LEGAL_EXECUTIVE)
  ) {
    navigate(routes.legalModule(), { replace: true })
  } else {
    userData.roles && navigate(routes.accessDenied(), { replace: true })
  }
  return false
}
