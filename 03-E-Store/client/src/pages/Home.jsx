import Hero from '../components/Hero'
import { comfyAxios } from '../utils'
import FeaturedProducts from '../components/FeaturedProducts'

export const loader = (queryClient) => {
  return async () => {
    const {
      data: { data: products },
    } = await queryClient.ensureQueryData({
      queryKey: 'featured',
      queryFn: () => comfyAxios.get('/products?featured=true'),
    })
    return { products }
  }
}
const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
    </div>
  )
}
export default Home
