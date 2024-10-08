import { useSelector } from 'react-redux'
import { formatPrice } from '../utils'

const CartTotals = () => {
  const { total_expenditure, shipping, tax, total_invoice } = useSelector(
    (state) => state.cart
  )
  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Subtotal</span>
          <span className="font-medium">{formatPrice(total_expenditure)}</span>
        </p>
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Shipping</span>
          <span className="font-medium">{formatPrice(shipping)}</span>
        </p>
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Tax</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </p>
        <p className="flex justify-between text-sm mt-4 pb-2">
          <span>Order Total</span>
          <span className="font-medium">{formatPrice(total_invoice)}</span>
        </p>
      </div>
    </div>
  )
}
export default CartTotals
