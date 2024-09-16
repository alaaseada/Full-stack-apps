import ProductList from './ProductList'
import SectionTitle from './SectionTitle'
import { useLoaderData } from 'react-router-dom'

const FeaturedProducts = () => {
  const { products } = useLoaderData()
  return (
    <div className="pt-24">
      <SectionTitle title="Featured Products" />
      <ProductList products={products} view={'gridView'} />
    </div>
  )
}

export default FeaturedProducts
