import { render } from '@redwoodjs/testing/web'

import DialogFormBody from './DialogFormBody'

describe('DialogFormBody', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DialogFormBody />)
    }).not.toThrow()
  })
})
