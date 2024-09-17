import Filters from '../components/Filters'
import ProductsContainer from '../components/ProductsContainer'
import PaginationContainer from '../components/PaginationContainer'
import { comfyAxios } from '../utils'

export const loader = (queryClient) => {
  return async ({ request }) => {
    const url = new URL(request.url)
    const params = Object.fromEntries(url.searchParams.entries())
    let {
      search = '',
      price = 100000,
      order = 'a-z',
      category = 'all',
      company = 'all',
      shipping = false,
      page = 1,
      limit = 10,
    } = params
    const {
      data: { data: products, meta },
    } = await queryClient.ensureQueryData({
      queryKey: [
        'products',
        { search, price, order, category, company, shipping, page, limit },
      ],
      queryFn: () => comfyAxios.get(`/products`, { params }),
    })
    return { products, meta, params }
  }
}

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  )
}
export default Products
