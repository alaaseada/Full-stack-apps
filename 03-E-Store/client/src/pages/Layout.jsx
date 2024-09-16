import { Outlet, useNavigation } from 'react-router-dom'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'

const Layout = () => {
  const navigation = useNavigation()
  return (
    <>
      <Header />
      <Navbar />
      <section className="align-element py-20">
        {navigation.state === 'loading' ? <Loading /> : <Outlet />}
      </section>
    </>
  )
}
export default Layout
