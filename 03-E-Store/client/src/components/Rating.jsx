import { filled_star, half_star, empty_star } from '../assets/icons'

const Rating = ({ rating }) => {
  const solid_stars = parseInt(rating)
  const half_stars = Number(rating) % 1 !== 0 ? 1 : 0
  const empty_stars = 5 - solid_stars - half_stars

  return (
    <div className="rating rating-md rating-half">
      {Array.from({ length: solid_stars }).map((_, i) => {
        return <div key={`filled-star-${i}`}>{filled_star}</div>
      })}

      {half_stars && <div>{half_star}</div>}
      {Array.from({ length: empty_stars }).map((_, i) => {
        return <div key={`empty-star-${i}`}>{empty_star}</div>
      })}
    </div>
  )
}
export default Rating
