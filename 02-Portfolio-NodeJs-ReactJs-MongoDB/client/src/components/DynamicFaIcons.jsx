import { IconContext } from 'react-icons'
import loadable from '@loadable/component'

const DynamicFAIcon = ({ ...props }) => {
  const Icon = loadable(() => import(`react-icons/fa`), {
    resolveComponent: (el) => {
      const key = props.icon
      if (key in el) {
        return el[key]
      } else {
        const backupKey = 'FaQuestion'
        return el[backupKey]
      }
    },
  })

  const value = {
    color: props.color,
    size: props.size,
    className: props.className,
    style: props.style,
    attr: props.attr,
  }

  return (
    <IconContext.Provider value={value}>
      <Icon />
    </IconContext.Provider>
  )
}

export default DynamicFAIcon
