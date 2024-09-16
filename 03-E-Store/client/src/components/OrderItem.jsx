import { formatPrice } from '../utils'

const OrderItem = ({
  item: { color, amount, title, company, image, price },
}) => {
  return (
    <article className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0">
      <img
        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
        alt={title}
        src={image}
      />
      <div className="sm:ml-16 sm:w-48">
        <h3 className="capitalize font-medium">{title}</h3>
        <h4 className="mt-2 capitalize text-sm text-neutral-content">
          {company}
        </h4>
        <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
          color :
          <span
            className="badge badge-sm"
            style={{ backgroundColor: color }}
          ></span>
        </p>
        <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
          Amount : <span>{amount}</span>
        </p>
        <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
          Price :<span className="font-medium">{formatPrice(price)}</span>
        </p>
      </div>
    </article>
  )
}
export default OrderItem
