import { NavLink } from 'react-router-dom'
import links from '../assets/links'
import { useSelector } from 'react-redux'

const NavLinks = ({ className }) => {
  const { user } = useSelector((state) => state.user)
  return (
    <ul className={className} tabIndex={0}>
      {links.map(({ id, path, text }) => {
        if ((text === 'checkout' || text === 'orders') && !user) return
        return (
          <li key={id}>
            <NavLink className="capitalize" to={path}>
              {text}
            </NavLink>
          </li>
        )
      })}
    </ul>
  )
}
export default NavLinks
