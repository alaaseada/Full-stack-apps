import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import userSlice from './features/user/userSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userSlice,
  },
})

export default store
