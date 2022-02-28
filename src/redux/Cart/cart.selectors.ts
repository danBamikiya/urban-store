import { createSelector } from 'reselect'
import { CartItem } from './cart.utils'

interface State {
  cartData: {
    cartItems: CartItem[]
  }
}

export const selectCartData = (state: State) => state.cartData

export const selectCartItems = createSelector(
  [selectCartData],
  cartData => cartData.cartItems
)

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems: CartItem[]) =>
    cartItems.reduce(
      (quantity: number, cartItem: CartItem) => quantity + cartItem.quantity,
      0
    )
)

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems: CartItem[]) =>
    cartItems.reduce(
      (quantity: number, cartItem: CartItem) =>
        quantity + cartItem.quantity * cartItem.productPrice,
      0
    )
)
