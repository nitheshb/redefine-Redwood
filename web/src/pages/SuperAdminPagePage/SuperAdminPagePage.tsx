import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const SuperAdminPagePage = () => {
  return (
    <>
      <MetaTags title="SuperAdminPage" description="SuperAdminPage page" />

      <h1>SuperAdminPagePage</h1>
      <p>
        Find me in <code>./web/src/pages/SuperAdminPagePage/SuperAdminPagePage.tsx</code>
      </p>
      <p>
        My default route is named <code>superAdminPage</code>, link to me with `
        <Link to={routes.superAdminPage()}>SuperAdminPage</Link>`
      </p>
    </>
  )
}

export default SuperAdminPagePage
