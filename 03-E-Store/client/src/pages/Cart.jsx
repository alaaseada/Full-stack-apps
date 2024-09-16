import { useSelector } from 'react-redux'
import SectionTitle from '../components/SectionTitle'
import CartItem from '../components/CartItem'
import CartTotals from '../components/CartTotals'
import { Link } from 'react-router-dom'
import emptyCartImg from '../assets/empty_cart.svg'

const Cart = () => {
  const { user } = useSelector((state) => state.user)
  const { items, items_count } = useSelector((state) => state.cart)
  return (
    <>
      <SectionTitle
        title={items_count ? 'Shopping Cart' : 'Your cart is Empty'}
      />
      {items_count > 0 ? (
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {items.map((item) => (
              <CartItem {...item} key={item.cartId} />
            ))}
          </div>
          <div className="lg:col-span-4 lg:pl-4">
            <CartTotals />
            {!user ? (
              <Link
                className="btn btn-primary btn-block mt-8 uppercase"
                to="/login"
              >
                please login to checkout
              </Link>
            ) : (
              <Link
                className="btn btn-primary btn-block mt-8 uppercase"
                to="/checkout"
              >
                checkout
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="w-4/5 mx-auto col-span-12 grid justify-center">
          <img className="w-96 h-96" src={emptyCartImg} alt="Empty cart" />
          <Link
            to="/products"
            className="text-center underline capitalize text-xl tracking-wider"
          >
            Back to Fill your cart
          </Link>
        </div>
      )}
    </>
  )
}
export default Cart
