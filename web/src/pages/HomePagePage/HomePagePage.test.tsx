import { render } from '@redwoodjs/testing/web'

import HomePagePage from './HomePagePage'

describe('HomePagePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HomePagePage />)
    }).not.toThrow()
  })
})
