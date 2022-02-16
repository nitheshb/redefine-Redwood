import { render } from '@redwoodjs/testing/web'

import AdditionalChargesForm from './AdditionalChargesForm'

describe('AdditionalChargesForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdditionalChargesForm />)
    }).not.toThrow()
  })
})
