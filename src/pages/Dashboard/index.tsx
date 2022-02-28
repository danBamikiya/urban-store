import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrderHistory } from './../../redux/Orders/orders.actions'
import OrderHistory from './../../components/OrderHistory'
import './styles.scss'
import { UserState } from '../../types/user'

type State = {
  user: UserState
}

// @ts-ignore
const mapState = ({ user, ordersData }: State) => ({
  currentUser: user.currentUser,
  orderHistory: ordersData.orderHistory.data
})

const Dashboard = () => {
  const dispatch = useDispatch()
  const { currentUser, orderHistory } = useSelector(mapState)

  useEffect(() => {
    // @ts-ignore
    dispatch(getUserOrderHistory(currentUser!.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h1>Order History</h1>

      <OrderHistory orders={orderHistory} />
    </div>
  )
}

export default Dashboard
