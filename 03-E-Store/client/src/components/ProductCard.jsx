import { Link } from 'react-router-dom'
import { formatPrice } from '../utils'

const ProductCard = ({
  _id,
  attributes: { title, image, price, company },
  view,
}) => {
  return (
    <>
      {view === 'gridView' ? (
        <Link to={`/products/${_id}`}>
          <article className="card w-full shadow-xl hover:shadow-2xl transition duration-300">
            <figure className="px-4 pt-4">
              <img
                src={image}
                alt={title}
                className="rounded-xl h-64 md:h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title capitalize tracking-wider">{title}</h2>
              <p>{formatPrice(price)}</p>
            </div>
          </article>
        </Link>
      ) : (
        <Link
          to={`/products/${_id}`}
          className="p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap  bg-base-100 shadow-xl hover:shadow-2xl duration-300 group"
        >
          <img
            src={image}
            alt={title}
            className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300"
          />
          <div className="ml-0 sm:ml-16">
            <h3 className="capitalize font-medium text-lg">{title}</h3>
            <h4 className="capitalize text-md text-neutral-content">
              {company}
            </h4>
          </div>
          <p className="font-medium ml-0 sm:ml-auto text-lg">
            {formatPrice(price)}
          </p>
        </Link>
      )}
    </>
  )
}
export default ProductCard
