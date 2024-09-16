import ProductList from './ProductList'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { listView, gridView } from '../assets/icons'
import { useState } from 'react'
import { constructURL } from '../utils'
import PageLimiter from './PageLimiter'

const ProductsContainer = () => {
  const { products, meta, params } = useLoaderData()
  const [view, setView] = useState('gridView')

  return (
    <div className="pt-24">
      <div className="border-b border-base-300 pb-5 flex justify-between">
        <div>{meta.pagination.total} Products</div>
        <div className="flex gap-2 justify-center items-center">
          <PageLimiter collection_name={'products'} />
          <button
            className={`p-2 ${
              view === 'gridView' ? 'bg-secondary rounded-full text-white' : ''
            }`}
            onClick={() => setView('gridView')}
          >
            {gridView}
          </button>
          <button
            className={`p-2 ${
              view === 'listView' ? 'bg-secondary rounded-full text-white' : ''
            }`}
            onClick={() => setView('listView')}
          >
            {listView}
          </button>
        </div>
      </div>
      {meta.pagination.total ? (
        <ProductList products={products} view={view} />
      ) : (
        <p className="m-10 text-center text-lg tracking-wider">
          Sorry! No products Matched your search
        </p>
      )}
    </div>
  )
}
export default ProductsContainer
