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
      <Form method="POST" className="card bg-base-100 w-1/2 max-w-md shadow-xl">
        <h1 className="text-4xl text-center mt-8 font-bold">Register</h1>
        <div className="card-body">
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
            <p className="text-center mt-4 text-xl py-2">
              Already a member?{' '}
              <Link
                className="link capitalize link-primary no-underline"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </Form>
      {/* </div> */}
    </section>
  )
}
export default Register
