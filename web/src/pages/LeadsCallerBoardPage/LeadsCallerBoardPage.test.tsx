import { render } from '@redwoodjs/testing/web'

import LeadsCallerBoardPage from './LeadsCallerBoardPage'

describe('LeadsCallerBoardPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LeadsCallerBoardPage />)
    }).not.toThrow()
  })
})
