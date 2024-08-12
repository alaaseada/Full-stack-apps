import Logo from './Logo'
import Menu from './Menu'

const Navbar = () => {
  return (
    <nav className="bg-darkColor text-white">
      <div className="align-element py-4 px-8 flex flex-col sm:flex-row sm:gap-x-16 sm:items-center sm:py-8">
        <Logo />
        <Menu />
      </div>
    </nav>
  )
}
export default Navbar
