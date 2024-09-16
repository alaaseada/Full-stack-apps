import ProductCard from './ProductCard'

const ProductList = ({ products, view }) => {
  return (
    <section
      className={`${
        view === 'gridView'
          ? 'pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'
          : 'mt-12 grid gap-y-8'
      }`}
    >
      {products.map((product) => {
        const { _id } = product
        return <ProductCard {...product} key={_id} view={view} />
      })}
    </section>
  )
}
export default ProductList
