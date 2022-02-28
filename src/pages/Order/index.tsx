import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOrderDetailsStart } from './../../redux/Orders/orders.actions'
import { useDispatch, useSelector } from 'react-redux'
import OrderDetails from './../../components/OrderDetails'

// @ts-ignore
const mapState = ({ ordersData }) => ({
  orderDetails: ordersData.orderDetails
})

const Order = () => {
  // @ts-ignore
  const { orderID } = useParams()
  const dispatch = useDispatch()
  const { orderDetails } = useSelector(mapState)
  const { orderTotal } = orderDetails

  useEffect(() => {
    dispatch(getOrderDetailsStart(orderID))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h1>Order ID: #{orderID}</h1>

      <OrderDetails order={orderDetails} />

      <h3>Total: {orderTotal}</h3>
    </div>
  )
}

export default Order
