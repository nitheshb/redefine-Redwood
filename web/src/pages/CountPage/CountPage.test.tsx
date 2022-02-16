import { render } from '@redwoodjs/testing/web'

import CountPage from './CountPage'

describe('CountPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CountPage />)
    }).not.toThrow()
  })
})
