import { useLoaderData } from 'react-router-dom'
import SiteMap from '../components/SiteMap'
import { comfyAxios, formatPrice } from '../utils'
import ColorPalette from '../components/ColorPalette'
import { useState } from 'react'
import Rating from '../components/Rating'
import { addItem } from '../features/cart/cartSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

export const loader = (queryClient) => {
  return async ({ params }) => {
    const {
      data: { data: product },
    } = await queryClient.ensureQueryData({
      queryKey: ['singleProduct', params.id],
      queryFn: () => comfyAxios.get(`/products/${params.id}`),
    })
    return product
  }
}

const SingleProduct = () => {
  const {
    _id,
    attributes: {
      title,
      company,
      description,
      image,
      price,
      colors,
      rating,
      shipping,
    },
  } = useLoaderData()
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [amount, setAmount] = useState(1)
  const dispatch = useDispatch()

  return (
    <div>
      <SiteMap />
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <div>
          <img
            className="w-96 h-96 object-cover rounded-lg lg:w-full"
            src={image}
            alt={title}
          />
        </div>
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl">{formatPrice(price)}</p>
          <Rating rating={rating} />
          <p className="mt-6 leading-8">{description}</p>
          <ColorPalette
            colors={colors}
            chooseColor={setSelectedColor}
            selectedColor={selectedColor}
          />
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              Amount
            </h4>
            <div className="flex gap-2 mt-2">
              <select
                name="amount"
                id="amount"
                className="select select-secondary w-full max-w-xs"
                onChange={(e) => {
                  setAmount(e.target.value)
                }}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map(
                  (amount, index) => {
                    return (
                      <option key={index} value={amount}>
                        {amount}
                      </option>
                    )
                  }
                )}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <button
              className="btn btn-secondary w-fit uppercase"
              onClick={() => {
                dispatch(
                  addItem({
                    cartId: _id + selectedColor,
                    _id,
                    color: selectedColor,
                    amount: Number(amount),
                    title,
                    company,
                    image,
                    price,
                    shipping,
                  })
                )
              }}
            >
              Add To Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SingleProduct
