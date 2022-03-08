// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.

import { Router, Route } from '@redwoodjs/router'
import { useAuth } from 'src/context/firebase-auth-context'
import { USER_ROLES } from 'src/constants/userRoles'

const defaultRoutes = () => {
  return (
    <>
      <Route path="/admin/home" page={HomePage} name="home" />
      <Route path="/admin/users-admin" page={UsersAdminPage} name="usersAdmin" />
      <Route path="/admin/leads-manager" page={LeadsManagerPage} name="leadsManager" />
      <Route path="/admin/leads-caller-board" page={LeadsCallerBoardPage} name="leadsCallerBoard" />
      <Route path="/admin/project-edit" page={ProjectEditPage} name="projectEdit" />
      <Route path="/admin/project-module" page={ProjectModulePage} name="projectModule" />
      <Route path="/users-admin" page={UsersAdminPage} name="usersAdmin" />
      <Route path="/leads-manager" page={LeadsManagerPage} name="leadsManager" />
      <Route path="/leads-caller-board" page={LeadsCallerBoardPage} name="leadsCallerBoard" />
      <Route path="/project-edit" page={ProjectEditPage} name="projectEdit" />
      <Route path="/project-module" page={ProjectModulePage} name="projectModule" />
    </>
  )
}
const Routes = () => {
  const { user } = useAuth()

  let UpdatedRoutes = defaultRoutes()
  if (user?.role?.includes(USER_ROLES.ADMIN)) {
    UpdatedRoutes = (
      <>
        <Route path="/admin/home" page={HomePage} name="home" />
        <Route path="/admin/users-admin" page={UsersAdminPage} name="usersAdmin" />
        <Route path="/admin/leads-manager" page={LeadsManagerPage} name="leadsManager" />
        <Route path="/admin/leads-caller-board" page={LeadsCallerBoardPage} name="leadsCallerBoard" />
        <Route path="/admin/project-edit" page={ProjectEditPage} name="projectEdit" />
        <Route path="/admin/project-module" page={ProjectModulePage} name="projectModule" />
      </>
    )
  }

  if (user?.role?.includes(USER_ROLES.HR_MANAGER) || user?.role?.includes(USER_ROLES.HR_EXECUTIVE)) {
    UpdatedRoutes = (
      <>
        <Route path="/users-admin" page={UsersAdminPage} name="usersAdmin" />
      </>
    )
  }

  if (user?.role?.includes(USER_ROLES.SALES_MANAGER) || user?.role?.includes(USER_ROLES.SALES_EXECUTIVE)) {
    UpdatedRoutes = (
      <>
        <Route path="/leads-manager" page={LeadsManagerPage} name="leadsManager" />
        <Route path="/leads-caller-board" page={LeadsCallerBoardPage} name="leadsCallerBoard" />
      </>
    )
  }
  if (user?.role?.includes(USER_ROLES.CRM_MANAGER) || user?.role?.includes(USER_ROLES.CRM_EXECUTIVE)) {
    UpdatedRoutes = (
      <>
        <Route path="/project-edit" page={ProjectEditPage} name="projectEdit" />
        <Route path="/project-module" page={ProjectModulePage} name="projectModule" />
      </>
    )
  }
  return (
    <Router>
      {UpdatedRoutes}
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/" page={LoginPage} name="login" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
