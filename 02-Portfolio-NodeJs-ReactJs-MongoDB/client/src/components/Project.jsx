import { FaGithub } from 'react-icons/fa'
import { TbWorldWww } from 'react-icons/tb'

const Project = ({ _id, title, text, github, url, img }) => {
  return (
    <article className="bg-white shadow-md rounded-lg hover:shadow-xl duration-300">
      <img src={img} alt={title} className="rounded-t-lg w-full" />
      <div className="p-8">
        <h2 className="font-medium tracking-wider text-lg capitalize">
          {title}
        </h2>
        <p className="mt-4 text-slate-600 leading-loose">{text}</p>
        <div className="mt-4 flex gap-x-4">
          <a
            href={github}
            className="text-3xl text-darkColor hover:text-mainColor duration-300"
            target="blank"
          >
            <FaGithub />
          </a>
          <a
            href={url}
            className="text-3xl  text-darkColor hover:text-mainColor duration-300"
            target="blank"
          >
            <TbWorldWww />
          </a>
        </div>
      </div>
    </article>
  )
}
export default Project
