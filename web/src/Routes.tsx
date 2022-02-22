// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'
// import FullViewProjectPage from './pages/FullViewProjectPage/FullViewProjectPage'
// todo: delete the below commented Route

const Routes = () => {
  return (
    <Router>
      <Route path="/super-admin-page" page={SuperAdminPagePage} name="superAdminPage" />
      <Route path="/users-admin" page={UsersAdminPage} name="usersAdmin" />
      <Route path="/executive-home" page={ExecutiveHomePage} name="executiveHome" />
      <Route path="/leads-manager" page={LeadsManagerPage} name="leadsManager" />
      <Route path="/hello-gopi" page={HelloGopiPage} name="helloGopi" />
      <Route path="/login1" page={Login1Page} name="login1" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/project-edit" page={ProjectEditPage} name="projectEdit" />
      <Route path="/count" page={CountPage} name="count" />
      {/* <Route path="/full-view-project" page={FullViewProjectPage} name="fullViewProject" /> */}
      {/* <Route path="/edit-project" page={EditProjectPage} name="editProject" /> */}
      <Route path="/new-home-page" page={NewHomePagePage} name="newHomePage" />
      <Route path="/leads-caller-board" page={LeadsCallerBoardPage} name="leadsCallerBoard" />
      <Route path="/project-module" page={ProjectModulePage} name="projectModule" />
      <Route path="/my-page" page={MyPagePage} name="myPage" />
      <Route path="/" page={Login1Page} name="login1" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
