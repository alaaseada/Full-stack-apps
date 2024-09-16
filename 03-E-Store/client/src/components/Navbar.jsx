import { Link } from 'react-router-dom'
import { cart, menu } from '../assets/icons'
import NavLinks from './NavLinks'
import ToggleTheme from './ToggleTheme'
import Logo from './Logo'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const { items_count } = useSelector((state) => state.cart)
  return (
    <nav className="bg-base-200">
      <div className="align-element py-2 flex justify-between min-h-16">
        <Logo />
        <div className="dropdown bg-base-200 lg:hidden">
          <div tabIndex={0} role="button" className="btn m-1">
            {menu}
          </div>
          <NavLinks
            className={
              'menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow capitalize'
            }
          />
        </div>
        <NavLinks
          className={
            'hidden menu lg:menu-horizontal bg-base-200 rounded-box capitalize'
          }
        />
        <div className="flex place-items-center gap-8 py-2">
          <ToggleTheme />
          <div className="indicator w-8 h-8">
            <span className="indicator-item badge badge-secondary mt-1 w-6 h-6 absolute left-1">
              {items_count}
            </span>
            <div className="bg-base-200 grid place-items-center">
              <Link to="/cart">{cart}</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
