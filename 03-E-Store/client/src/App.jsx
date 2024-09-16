import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  Layout,
  Home,
  About,
  Products,
  Cart,
  Checkout,
  Orders,
  Login,
  Register,
  Product,
  Error,
  Confirmation,
} from './pages'
import { loader as landingLoader } from './pages/Home'
import { loader as singleProductLoader } from './pages/SingleProduct'
import { loader as productsLoader } from './pages/Products'
import { loader as checkoutLoader } from './pages/Checkout'
import { loader as loginLoader } from './pages/Login'
import { loader as ordersLoader } from './pages/Orders'
import { registerUser } from './pages/Register'
import { loginUser } from './pages/Login'
import { createOrder } from './pages/Checkout'
import store from './store'
import { useQueryClient } from '@tanstack/react-query'

function App() {
  const queryClient = useQueryClient()
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
          loader: landingLoader(queryClient),
        },
        {
          path: 'about',
          element: <About />,
        },
        {
          path: 'products',
          element: <Products />,
          loader: productsLoader(queryClient),
        },
        {
          path: 'products/:id',
          element: <Product />,
          loader: singleProductLoader(queryClient),
        },
        {
          path: 'cart',
          element: <Cart />,
        },
        {
          path: 'checkout',
          children: [
            {
              index: true,
              element: <Checkout />,
              loader: checkoutLoader(store),
              action: createOrder(store, queryClient),
            },
            {
              path: 'confirmed',
              element: <Confirmation />,
            },
          ],
        },
        {
          path: 'orders',
          element: <Orders />,
          loader: ordersLoader(store, queryClient),
        },
      ],
    },
    {
      path: 'login',
      element: <Login />,
      errorElement: <Error />,
      loader: loginLoader(store),
      action: loginUser(store),
    },
    {
      path: 'register',
      element: <Register />,
      errorElement: <Error />,
      action: registerUser,
    },
  ])

  return <RouterProvider router={router} />
}

export default App
