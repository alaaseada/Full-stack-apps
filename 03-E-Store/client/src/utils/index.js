import axios from 'axios'

//
export const comfyAxios = axios.create({
  baseURL: 'https:alaaseada-estore-api.netlify.app/api/v1',
})

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EGP',
  }).format(Number(price / 100).toFixed(2))
}

// Usage ex.   let basePagingURL = constructURL(baseURL, params, 'page')
// Substitute it with useLocation and URLSearchParams
export const constructURL = (baseURL, params, paramToBeAdded) => {
  let constructedURL = baseURL
  if (params.isEmpty) {
    constructedURL += `?${paramToBeAdded}=`
  } else {
    constructedURL += `?`
    const keys = Object.keys(params)
    keys.forEach((k) => {
      if (k === paramToBeAdded) return
      constructedURL += `${k}=${params[k]}&`
    })
    constructedURL += `${paramToBeAdded}=`
  }
  return constructedURL
}

export const calculateInvoice = (items) => {
  const [items_count, total_expenditure, tax] = items.reduce(
    ([count, expenditure, tax], item) => {
      count += item.amount
      expenditure += item.price * item.amount
      tax = 0.01 * expenditure
      return [count, expenditure, tax]
    },
    [0, 0, 0]
  )
  const shipping = 500
  const total_invoice = shipping + tax + total_expenditure
  return { items_count, total_expenditure, tax, total_invoice, shipping }
}
