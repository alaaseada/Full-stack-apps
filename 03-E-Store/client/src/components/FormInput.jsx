const FormInput = ({
  type,
  name,
  placeholder,
  icon,
  defaultValue,
  className,
}) => {
  return (
    <label
      className={`input input-bordered flex items-center gap-2 ${
        className || ''
      }`}
    >
      {icon}
      <input
        type={type}
        defaultValue={defaultValue}
        className="grow"
        placeholder={placeholder}
        name={name}
      />
    </label>
  )
}
export default FormInput
