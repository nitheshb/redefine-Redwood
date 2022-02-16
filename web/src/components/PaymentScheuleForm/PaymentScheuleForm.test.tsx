import { render } from '@redwoodjs/testing/web'

import PaymentScheuleForm from './PaymentScheuleForm'

describe('PaymentScheuleForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PaymentScheuleForm />)
    }).not.toThrow()
  })
})
