import FormInput from '../components/FormInput'
import SubmitButton from '../components/SubmitButton'
import { key, user, email } from '../assets/icons'
import { Form, Link, redirect } from 'react-router-dom'
import { comfyAxios } from '../utils'
import { toast } from 'react-toastify'

export const registerUser = async ({ params, request }) => {
  const formData = await request.formData()
  const userObj = Object.fromEntries(formData.entries())
  try {
    const { data } = await comfyAxios.post('/auth/register', userObj)
    toast.success('user created')
    return redirect('/login')
  } catch (error) {
    toast.error(error.response.data.msg || 'An error occured')
    return null
  }
}

const Register = () => {
  return (
    <section className="full-h-center">
      <Form
        method="POST"
        className="card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-3xl text-center font-bold mb-4">Register</h4>
        <FormInput
          type="text"
          placeholder="Username"
          icon={user}
          className="my-2"
          name="username"
        />
        <FormInput
          type="email"
          placeholder="email"
          icon={email}
          className="my-2"
          name="email"
        />
        <FormInput
          type="password"
          placeholder="password"
          icon={key}
          className="my-2"
          name="password"
        />
        <div className="mt-4 flex flex-col gap-3">
          <SubmitButton text={'Register'} />
          <p className="text-center mt-4">
            Already a member?{' '}
            <Link
              className="link capitalize link-primary no-underline"
              to="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </Form>
      {/* </div> */}
    </section>
  )
}
export default Register
