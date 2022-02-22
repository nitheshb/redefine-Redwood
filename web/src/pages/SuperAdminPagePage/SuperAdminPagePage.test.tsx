import { render } from '@redwoodjs/testing/web'

import SuperAdminPagePage from './SuperAdminPagePage'

describe('SuperAdminPagePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SuperAdminPagePage />)
    }).not.toThrow()
  })
})
