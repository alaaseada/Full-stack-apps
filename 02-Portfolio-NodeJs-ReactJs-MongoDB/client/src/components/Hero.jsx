import introduce_me from '../assets/introduce-me.svg'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Hero = () => {
  return (
    <div className="bg-darkColor text-white py-24">
      <section className="align-element px-8 grid md:grid-cols-2 items-center gap-8">
        <article>
          <h1 className="text-7xl font-bold tracking-wider">I'm Alaa</h1>
          <p className="text-3xl tracking-wider mt-4 capitalize">
            Fullstack Developer
          </p>
          <p className="text-lg mt-2 tracking-wide capitalize">
            Turning ideas into interactive reality
          </p>
          <div className="flex gap-x-4 mt-4">
            <a href="#" className="text-3xl hover:text-mainColor duration-300">
              <FaGithub />
            </a>
            <a href="#" className="text-3xl hover:text-mainColor duration-300">
              <FaLinkedin />
            </a>
          </div>
        </article>
        <article className="hidden md:block">
          <img className="h-80 lg:h-96" src={introduce_me} />
        </article>
      </section>
    </div>
  )
}
export default Hero
