import SectionTitle from '../components/SectionTitle'
import CartTotals from '../components/CartTotals'
import CheckoutForm from '../components/CheckoutForm'
import { redirect, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { comfyAxios } from '../utils'
import { clearCart } from '../features/cart/cartSlice'
import shopFirst from '../assets/shopping.svg'
import { QueryClient } from '@tanstack/react-query'

export const loader = (store) => {
  return () => {
    if (!store.getState().user.user) {
      toast.info('You must log in first')
      return redirect('/login')
    }
    return null
  }
}
const secureData = () => {
  const paytabsForm = document.querySelector('#paytabsForm')
  paylib.inlineForm({
    key: import.meta.env.PAYTABS_CLIENT_KEY,
    form: paytabsForm,
    autoSubmit: true,
    callback: function (response) {
      document.getElementById('paymentErrors').innerHTML = ''
      if (response.error) {
        paylib.handleError(document.getElementById('paymentErrors'), response)
      }
    },
  })
}

export const createOrder = (store) => {
  return async ({ request }) => {
    try {
      const formData = await request.formData()
      const orderObj = Object.fromEntries(formData.entries())
      const {
        data: { order, confirmed },
      } = await comfyAxios.post(
        '/orders',
        {
          ...orderObj,
          cartItems: store.getState().cart.items,
          items_count: store.getState().cart.items_count,
          total_invoice: store.getState().cart.total_invoice,
        },
        {
          headers: {
            Authorization: `Bearer ${store.getState().user.user.token}`,
          },
        }
      )
      if (confirmed) {
        toast.success('Order has been successfully sent')
      }
      QueryClient.removeQueries(['orders'])
      store.dispatch(clearCart())
      return redirect('/checkout/confirmed')
    } catch (error) {
      toast.error(error.response?.data?.msg || error.message)
      return null
    }
  }
}

const Checkout = () => {
  const { items_count } = useSelector((state) => state.cart)

  return (
    <>
      {items_count > 0 ? (
        <>
          <SectionTitle title={'place your order'} />
          <div className="mt-6 grid gap-6 md:grid-cols-2 items-start">
            <CheckoutForm />
            <CartTotals />
          </div>
        </>
      ) : (
        <>
          <SectionTitle title={'No Items to Checkout'} />
          <div className="w-4/5 mx-auto col-span-12 grid justify-center">
            <img className="w-96 h-96" src={shopFirst} />
          </div>
        </>
      )}
    </>
  )
}
export default Checkout
