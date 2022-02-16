import { render } from '@redwoodjs/testing/web'

import LeadsManagerPage from './LeadsManagerPage'

describe('LeadsManagerPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LeadsManagerPage />)
    }).not.toThrow()
  })
})
