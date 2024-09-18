import { CheckBox, RangeSelector, Selector, TextInput } from './FormControls'
import { Form, Link, useLoaderData } from 'react-router-dom'

const Filters = () => {
  const { meta, params } = useLoaderData()
  const { search, category, company, order, price, shipping } = params

  return (
    <Form
      name="searchForm"
      method="GET"
      className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center"
      action="/products"
    >
      <TextInput
        name={'search'}
        type={'search'}
        label={'Select Product'}
        defaultValue={search}
        className={'input input-bordered input-sm w-full max-w-xs'}
      />

      <Selector
        name={'category'}
        label={'Select Category'}
        values={meta.categories}
        defaultValue={category}
        className={'select select-bordered select-sm'}
      />
      <Selector
        name={'company'}
        label={'Select Company'}
        values={meta.companies}
        defaultValue={company}
        className={'select select-bordered select-sm'}
      />
      <Selector
        name={'order'}
        label={'Order By'}
        values={['a-z', 'z-a', 'low', 'high']}
        defaultValue={order}
        className={'select select-bordered select-sm'}
      />
      <RangeSelector
        name={'price'}
        min={'0'}
        max={'100000'}
        className={'range range-secondary range-sm'}
        step={'100'}
        defaultValue={price || '100000'}
      />
      <CheckBox
        name={'shipping'}
        label={'Free Shipping'}
        className={'checkbox checkbox-primary'}
        defaultChecked={shipping}
      />
      <button type="submit" className="btn btn-secondary btn-sm uppercase">
        Search
      </button>
      <Link
        className="btn btn-accent btn-sm text-white uppercase"
        to="/products"
      >
        Reset
      </Link>
    </Form>
  )
}
export default Filters
