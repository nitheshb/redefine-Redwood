import { render } from '@redwoodjs/testing/web'

import Login1Page from './Login1Page'

describe('Login1Page', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Login1Page />)
    }).not.toThrow()
  })
})
