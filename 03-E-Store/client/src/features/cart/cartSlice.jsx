import { createSlice } from '@reduxjs/toolkit'
import { calculateInvoice } from '../../utils'
import { toast } from 'react-toastify'

const initialState = {
  items: [],
  items_count: 0,
  shipping: 0,
  total_expenditure: 0,
  tex: 0,
  total_invoice: 0,
}

const getItemsfromLocalStorage = () => {
  const cart = localStorage.getItem('cart')
  if (!cart) return initialState
  return JSON.parse(cart)
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: getItemsfromLocalStorage(),
  reducers: {
    addItem: (state, { payload }) => {
      const item = state.items.find((item) => item.cartId === payload.cartId)
      if (!item) {
        state.items.push(payload)
      } else {
        item.amount += payload.amount
      }
      state.items_count += payload.amount
      state.total_expenditure += payload.amount * payload.price
      cartSlice.caseReducers.calculateTotalInvoice(state)
      toast('Item has been added to your cart')
    },
    calculateTotalInvoice: (state) => {
      const not_free_shipping_product = state.items.find(
        (item) => item.shipping === false
      )
      state.shipping = not_free_shipping_product ? 500 : 0
      state.tax = 0.1 * state.total_expenditure
      state.total_invoice = state.total_expenditure + state.tax + state.shipping
      localStorage.setItem('cart', JSON.stringify(state))
    },
    editItem: (state, { payload }) => {
      const item = state.items.find((item) => item.cartId === payload.cartId)
      state.total_expenditure += (payload.amount - item.amount) * item.price
      state.items_count += payload.amount - item.amount
      item.amount = payload.amount
      cartSlice.caseReducers.calculateTotalInvoice(state)
      toast.success('Cart updated')
    },
    deleteItem: (state, { payload }) => {
      const item = state.items.find((item) => item.cartId === payload.cartId)
      state.items_count -= item.amount
      state.total_expenditure -= item.amount * item.price
      state.items.splice(state.items.indexOf(item), 1)
      cartSlice.caseReducers.calculateTotalInvoice(state)
      toast.error('Item deleted')
    },
    clearCart: (state) => {
      localStorage.setItem('cart', JSON.stringify(initialState))
      return initialState
    },
  },
  extraReducers: (builder) => {},
})
export const { addItem, editItem, deleteItem, clearCart, updateInvoice } =
  cartSlice.actions
export default cartSlice.reducer
