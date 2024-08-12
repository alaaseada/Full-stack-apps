import onlineInfo from '../assets/online_information.svg'
import SectionTitle from '../components/SectionTitle'

const About = () => {
  return (
    <section id="about" className=" bg-white py-20">
      <div className="align-element gap-16 grid items-center md:grid-cols-2">
        <img src={onlineInfo} className="w-full h-64" />
        <article>
          <SectionTitle title="Code and Coffee" />
          <p className="leading-loose text-slate-600 mt-8">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Repudiandae nesciunt culpa qui, aliquid eum, delectus dignissimos
            dolore possimus dolores consequuntur eius esse excepturi dolorum
            veritatis deleniti? Facilis animi beatae voluptatum?
          </p>
        </article>
      </div>
    </section>
  )
}
export default About
