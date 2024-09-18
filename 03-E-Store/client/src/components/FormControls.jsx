import { forwardRef, useState } from 'react'
import { formatPrice } from '../utils'
import IntlTelInput from 'intl-tel-input/reactWithUtils'
import 'intl-tel-input/styles'
import { toast } from 'react-toastify'

export const Selector = ({ name, label, values, className, defaultValue }) => {
  return (
    <div className="form-control">
      <label className="label" htmlFor={name}>
        <span className="label-text capitalize">{label}</span>
      </label>
      <select
        name={name}
        id={name}
        className={className}
        defaultValue={defaultValue}
      >
        {values.map((amount, index) => {
          return (
            <option key={index} value={amount}>
              {amount}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export const RangeSelector = ({
  name,
  min,
  max,
  step,
  className,
  defaultValue,
}) => {
  const [selectedLimit, setSelectedLimit] = useState(defaultValue)
  return (
    <div className="form-control">
      <div className="label">
        <span className="label-text">Select Price</span>
        <span className="label-text-alt">{formatPrice(selectedLimit)}</span>
      </div>
      <input
        type="range"
        name={name}
        id={name}
        min={min}
        max={max}
        className={className}
        step={step}
        defaultValue={defaultValue}
        onChange={(e) => setSelectedLimit(e.target.value)}
      />
      <div className="label">
        <span className="label-text-alt font-bold">{min}</span>
        <span className="label-text-alt font-bold">{formatPrice(max)}</span>
      </div>
    </div>
  )
}

export const TextInput = ({ name, type, label, className, defaultValue }) => {
  return (
    <div className="form-control">
      <label className="label" htmlFor={name}>
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        name={name}
        id={name}
        type={type}
        className={className}
        defaultValue={defaultValue}
      />
    </div>
  )
}

export const CheckBox = ({ name, label, defaultChecked, className }) => {
  return (
    <div className="form-control items-center">
      <label className="label" htmlFor={name}>
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        name={name}
        id={name}
        type="checkbox"
        className={className}
        defaultChecked={defaultChecked}
      />
    </div>
  )
}

export const PhoneTextInput = forwardRef(
  ({ label, className, setNumber }, ref) => {
    return (
      <div className="form-control">
        <label className="label">
          <span className="label-text capitalize">{label}</span>
        </label>
        <IntlTelInput
          onChangeNumber={setNumber}
          initOptions={{
            initialCountry: 'eg',
            containerClass: className,
            onlyCountries: ['eg', 'sa'],
          }}
          ref={ref}
        />
      </div>
    )
  }
)
