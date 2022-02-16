import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HelloGopiPage = () => {
  return (
    <>
      <MetaTags title="HelloGopi" description="HelloGopi page" />

      <h1>HelloGopiPage</h1>
      <p>
        Find me in <code>./web/src/pages/HelloGopiPage/HelloGopiPage.tsx</code>
      </p>
      <p>
        My default route is named <code>helloGopi</code>, link to me with `
        <Link to={routes.helloGopi()}>HelloGopi</Link>`
      </p>
    </>
  )
}

export default HelloGopiPage
