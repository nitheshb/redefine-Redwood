import { render } from '@redwoodjs/testing/web'

import PaymentScheuleForm from './PaymentScheduleForm'

describe('PaymentScheuleForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PaymentScheuleForm />)
    }).not.toThrow()
  })
})
