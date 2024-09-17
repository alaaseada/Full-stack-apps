import { toast } from 'react-toastify'
import { comfyAxios, formatPrice } from '../utils'
import { redirect, useLoaderData } from 'react-router-dom'
import moment from 'moment'
import { eye } from '../assets/icons'
import OrderDetailsModal from '../components/OrderDetailsModal'
import { useState } from 'react'
import PaginationContainer from '../components/PaginationContainer'
import PageLimiter from '../components/PageLimiter'

export const loader = (store, queryClient) => {
  return async ({ request }) => {
    const user = store.getState().user.user
    if (!user) {
      toast.info('Please login')
      return redirect('/login')
    }
    try {
      const queryParams = Object.fromEntries(
        new URL(request.url).searchParams.entries()
      )
      let { limit = 10, page = 1 } = queryParams
      const {
        data: { orders, meta },
      } = await queryClient.ensureQueryData({
        queryKey: [
          'orders',
          { user: user.email, limit: Number(limit), page: Number(page) },
        ],
        queryFn: () =>
          comfyAxios.get('/orders', {
            params: queryParams,
            headers: {
              Authorization: `Bearer ${store.getState().user.user.token}`,
            },
          }),
      })
      return { orders, meta, params: queryParams }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.info('Please login first')
        return redirect('/login')
      } else if (error.response?.status === 403) {
        toast.info(
          'Please logout and then login as a normal user not as a guest'
        )
        return redirect('/')
      }
      toast.error(error.response?.data?.msg | error.message)
      return null
    }
  }
}

const Orders = () => {
  const {
    orders,
    meta: {
      pagination: { total },
    },
  } = useLoaderData()
  const [orderItems, setOrderItems] = useState(null)

  return (
    <div className="overflow-x-auto">
      <div className="border-b border-base-300 pb-5 flex justify-between">
        <h2 className="text-3xl font-medium tracking-wider capitalize">
          Your Orders{' '}
          <span className="text-sm tracking-widest">(Total: {total})</span>
        </h2>
        <PageLimiter collection_name={'orders'} />
      </div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Address</th>
            <th style={{ textAlign: 'center' }}># of Products</th>
            <th>Invoice</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((element, index) => {
            const {
              _id,
              first_name,
              last_name,
              address,
              cartItems,
              items_count,
              total_invoice,
              createdAt,
            } = element
            return (
              <tr key={_id}>
                <th>
                  <button
                    onClick={() => {
                      setOrderItems(cartItems)
                      document.getElementById('my_modal_5').showModal()
                    }}
                  >
                    {eye}
                  </button>
                </th>
                <td>
                  {first_name} {last_name}
                </td>
                <td>{address}</td>
                <td style={{ textAlign: 'center' }}>{items_count}</td>
                <td>{formatPrice(total_invoice)}</td>
                <td>{moment(createdAt).format('hh:mm a - DD MMM YYYY')}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <OrderDetailsModal orderItems={orderItems} />
      <PaginationContainer />
    </div>
  )
}
export default Orders
