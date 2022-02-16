import { render } from '@redwoodjs/testing/web'

import NewHomePagePage from './NewHomePagePage'

describe('NewHomePagePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewHomePagePage />)
    }).not.toThrow()
  })
})
