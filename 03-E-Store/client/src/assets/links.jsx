import { nanoid } from 'nanoid'

const links = [
  {
    id: nanoid(),
    path: '/',
    text: 'home',
  },
  {
    id: nanoid(),
    path: '/about',
    text: 'about',
  },
  {
    id: nanoid(),
    path: '/products',
    text: 'products',
  },
  {
    id: nanoid(),
    path: '/cart',
    text: 'cart',
  },
  ,
  {
    id: nanoid(),
    path: '/checkout',
    text: 'checkout',
  },
  {
    id: nanoid(),
    path: '/orders',
    text: 'orders',
  },
]

export default links
