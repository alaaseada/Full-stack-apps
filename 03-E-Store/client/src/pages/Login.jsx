import FormInput from '../components/FormInput'
import SubmitButton from '../components/SubmitButton'
import { key, email } from '../assets/icons'
import { Form, Link, redirect, useNavigate } from 'react-router-dom'
import { comfyAxios } from '../utils'
import { toast } from 'react-toastify'
import { login } from '../features/user/userSlice'
import { useDispatch } from 'react-redux'

export const loginUser = (store) => {
  return async ({ request }) => {
    const formData = await request.formData()
    const userObj = Object.fromEntries(formData.entries())
    try {
      const { data } = await comfyAxios.post('/auth/login', userObj)
      store.dispatch(login({ ...data }))
      return redirect('/')
    } catch (error) {
      toast.error(error.response?.data?.msg || error.message)
      return null
    }
  }
}

export const loader = (store) => {
  return ({ request }) => {
    if (store.getState().user.user) {
      toast.info('You are already logged in')
      return redirect('/')
    }
    return null
  }
}
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginAsGuest = async () => {
    try {
      const userObj = { email: 'test@test.com', password: 'secretpassword' }
      const { data } = await comfyAxios.post('/auth/login', userObj)
      dispatch(login({ ...data }))
      navigate('/')
    } catch (error) {
      const msg = error.response?.data?.msg || error.message
      toast.error(msg)
    }
  }
  return (
    <section className="full-h-center">
      <Form
        method="POST"
        className="card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-3xl text-center font-bold mb-4">Login</h4>
        <FormInput
          type="email"
          name="email"
          placeholder="email"
          icon={email}
          className="my-2"
        />
        <FormInput
          type="password"
          name="password"
          placeholder="password"
          icon={key}
          className="my-2"
        />
        <div className="mt-4 flex flex-col gap-3">
          <SubmitButton text={'login'} />
          <button
            type="button"
            className="btn btn-secondary uppercase"
            onClick={loginAsGuest}
          >
            Guest user
          </button>
          <p className="text-center mt-4">
            Not a member yet?{' '}
            <Link
              className="link capitalize link-primary no-underline"
              to="/register"
            >
              register
            </Link>
          </p>
        </div>
      </Form>
    </section>
  )
}
export default Login
