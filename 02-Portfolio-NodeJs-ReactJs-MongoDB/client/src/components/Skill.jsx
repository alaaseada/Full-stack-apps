import DynamicFAIcon from './DynamicFaIcons'

const Skill = ({ title, icon, text }) => {
  return (
    <article>
      <DynamicFAIcon icon={icon} className="h-16 w-16 text-darkColor" />
      <h4 className="mt-2 font-bold text-mainColor">{title}</h4>
      <p className="text-slate-600">{text}</p>
    </article>
  )
}
export default Skill
