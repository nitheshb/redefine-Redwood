import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const CountPage = () => {
  return (
    <>
      <MetaTags title="Count" description="Count page" />

      <h1>CountPage</h1>
      <p>
        Find me in <code>./web/src/pages/CountPage/CountPage.tsx</code>
      </p>
      <p>
        My default route is named <code>count</code>, link to me with `
        <Link to={routes.count()}>Count</Link>`
      </p>
    </>
  )
}

export default CountPage
