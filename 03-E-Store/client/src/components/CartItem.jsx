import { useDispatch } from 'react-redux'
import { formatPrice } from '../utils'
import { deleteItem, editItem } from '../features/cart/cartSlice'

const CartItem = ({
  cartId,
  _id,
  color,
  amount,
  title,
  company,
  image,
  price,
}) => {
  const dispatch = useDispatch()
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
      </div>
      <div className="sm:ml-12">
        <div className="form-control max-w-xs">
          <label htmlFor="amount" className="label p-0">
            <span className="label-text">Amount</span>
          </label>
          <select
            name="amount"
            id="amount"
            className="mt-2 select select-base select-bordered select-xs"
            defaultValue={amount}
            onChange={(e) =>
              dispatch(editItem({ cartId, amount: Number(e.target.value) }))
            }
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map(
              (amount, index) => {
                return (
                  <option key={index} value={amount}>
                    {amount}
                  </option>
                )
              }
            )}
          </select>
        </div>
        <button
          className="mt-2 link link-primary link-hover text-sm"
          onClick={() => dispatch(deleteItem({ cartId }))}
        >
          remove
        </button>
      </div>
      <p className="font-medium sm:ml-auto">{formatPrice(price)}</p>
    </article>
  )
}
export default CartItem
