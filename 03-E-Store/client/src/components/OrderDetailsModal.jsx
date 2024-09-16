import OrderItem from './OrderItem'

const OrderDetailsModal = ({ orderItems }) => {
  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-2">Order Details</h3>
        {orderItems?.map((item) => {
          return <OrderItem item={item} />
        })}
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
export default OrderDetailsModal
