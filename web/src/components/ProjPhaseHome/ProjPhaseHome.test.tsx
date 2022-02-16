import { render } from '@redwoodjs/testing/web'

import ProjPhaseHome from './ProjPhaseHome'

describe('ProjPhaseHome', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProjPhaseHome />)
    }).not.toThrow()
  })
})
