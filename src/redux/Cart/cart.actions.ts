import cartTypes from './cart.types'
import { CartItem } from './cart.utils'

export const addProduct = (nextCartItem: CartItem) => ({
  type: cartTypes.ADD_TO_CART,
  payload: nextCartItem
})

export const removeCartItem = (cartItem: Pick<CartItem, 'documentID'>) => ({
  type: cartTypes.REMOVE_CART_ITEM,
  payload: cartItem
})

export const reduceCartItem = (cartItem: CartItem) => ({
  type: cartTypes.REDUCE_CART_ITEM,
  payload: cartItem
})

export const clearCart = () => ({
  type: cartTypes.CLEAR_CART
})
