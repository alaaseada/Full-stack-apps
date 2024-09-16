import { useNavigate, useLoaderData } from 'react-router-dom'
import { constructURL } from '../utils'

const PageLimiter = ({ collection_name }) => {
  const { params } = useLoaderData()
  let { limit = 5 } = params
  const navigate = useNavigate()

  let baseLimitingURL = constructURL(`/${collection_name}`, params, 'limit')

  return (
    <select
      name="limit"
      id="limit"
      className="select select-bordered select-sm max-w-xs"
      onChange={(e) => {
        navigate(`${baseLimitingURL}${Number(e.target.value)}`, {
          replace: true,
        })
      }}
      defaultValue={limit}
    >
      <option disabled>{collection_name} per page</option>
      {Array.from({ length: 10 }, (_, i) => (i + 1) * 5).map(
        (max_limit, index) => {
          return (
            <option key={index} value={max_limit}>
              {max_limit}
            </option>
          )
        }
      )}
    </select>
  )
}
export default PageLimiter
