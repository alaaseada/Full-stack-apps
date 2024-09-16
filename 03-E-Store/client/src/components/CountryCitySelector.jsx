import { useState } from 'react'
import { countries } from '../assets/locations'

const CountryCitySelector = () => {
  const [citySource, setCitySource] = useState(
    countries.find((c) => c.name === 'Egypt').cities
  )
  return (
    <>
      <div className="form-control">
        <label className="label" htmlFor="country">
          <span className="label-text capitalize">Country</span>
        </label>
        <select
          name="country"
          id="country-list"
          className="select select-secondary w-full"
          onChange={(e) =>
            setCitySource(
              countries.find((c) => c.name === e.target.value).cities
            )
          }
        >
          {countries.map(({ id, name }) => {
            return (
              <option key={id} value={name}>
                {name}
              </option>
            )
          })}
        </select>
      </div>
      <div className="form-control">
        <label className="label" htmlFor="city">
          <span className="label-text capitalize">City</span>
        </label>
        <select
          name="city"
          id="city-list"
          className="select select-secondary w-full"
        >
          {citySource.map(({ id, name }) => {
            return (
              <option key={id} value={name}>
                {name}
              </option>
            )
          })}
        </select>
      </div>
    </>
  )
}
export default CountryCitySelector
