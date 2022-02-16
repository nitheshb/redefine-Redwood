import { render } from '@redwoodjs/testing/web'

import HelloGopiPage from './HelloGopiPage'

describe('HelloGopiPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HelloGopiPage />)
    }).not.toThrow()
  })
})
