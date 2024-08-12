import { links } from '../data'
const Menu = () => {
  return (
    <div className="flex gap-x-3">
      {links.map(({ id, text, href }) => {
        return (
          <div key={id}>
            <a
              className="hover:text-lighterColor capitalize text-lg tracking-wide duration-300"
              href={href}
            >
              {text}
            </a>
          </div>
        )
      })}
    </div>
  )
}
export default Menu
