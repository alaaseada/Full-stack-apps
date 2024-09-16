import { NavLink } from 'react-router-dom'
import Carousel from './Carousel'

const Hero = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-24 items-center">
      <div className="grid gap-8">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          We are changing the way people shop
        </h1>
        <p className="max-w-xl text-lg leading-8">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
          repellat explicabo enim soluta temporibus asperiores aut obcaecati
          perferendis porro nobis.
        </p>
        <NavLink
          className="btn btn-secondary w-fit lg:text-xl uppercase"
          to="/products"
        >
          Our products
        </NavLink>
      </div>
      <Carousel />
    </div>
  )
}
export default Hero
