import orderConfirmed from '../assets/order_confirmed.svg'
import SectionTitle from '../components/SectionTitle'

const Confirmation = () => {
  return (
    <div>
      <SectionTitle title="Order Confirmed" />
      <div className="w-4/5 mx-auto col-span-12 grid justify-center">
        <img className="w-96 h-96" src={orderConfirmed} />
      </div>
    </div>
  )
}
export default Confirmation
