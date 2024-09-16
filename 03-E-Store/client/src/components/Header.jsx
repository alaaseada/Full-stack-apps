import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../features/user/userSlice'
import { clearCart } from '../features/cart/cartSlice'
import { useQueryClient } from '@tanstack/react-query'

const Header = () => {
  const { user } = useSelector((state) => state.user)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end gap-x-6 text-sm">
        {user ? (
          <>
            <p>Welcome, {user.username}</p>
            <button
              className="link link-hover"
              onClick={() => {
                navigate('/')
                dispatch(clearCart())
                dispatch(logout())
                queryClient.removeQueries()
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="link link-hover">
              Login | Guest
            </Link>
            <Link to="/register" className="link link-hover">
              Create Account
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
export default Header
