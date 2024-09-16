import { Form } from 'react-router-dom'
import SubmitButton from './SubmitButton'
import { PhoneTextInput, TextInput } from './FormControls'
import CountryCitySelector from './CountryCitySelector'
import { useRef } from 'react'
import { useSelector } from 'react-redux'

const CheckoutForm = () => {
  const { user } = useSelector((state) => state.user)
  const itiRef = useRef(null)
  const phoneRef = useRef(null)

  const setPhoneNumber = () => {
    phoneRef.current.value = itiRef.current.getInstance().getNumber()
  }
  return (
    <Form method="POST" className="grid gap-6" id="paytabsForm">
      <h2 className="text-xl">Shipping Information</h2>
      <TextInput
        name={'first_name'}
        type={'text'}
        label={'First Name'}
        className={'input input-bordered'}
      />
      <TextInput
        name={'last_name'}
        type={'text'}
        label={'Last Name'}
        className={'input input-bordered'}
      />
      <PhoneTextInput
        label={'Phone Number'}
        className={'input input-bordered grid items-center'}
        setNumber={setPhoneNumber}
        ref={itiRef}
      />
      <input type="hidden" name="phone_number" ref={phoneRef} />
      <TextInput
        name={'email'}
        label={'Email Address'}
        className={'input input-bordered'}
        type={'email'}
        defaultValue={user.email !== 'test@test.com' ? user.email : ''}
      />
      <CountryCitySelector />
      <TextInput
        name={'address'}
        type={'text'}
        label={'Address'}
        className={'input input-bordered'}
      />
      <SubmitButton text={'Place an Order'} />
    </Form>
  )
}
export default CheckoutForm
