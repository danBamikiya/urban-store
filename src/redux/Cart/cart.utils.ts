export type CartItem = {
  documentID: string
  quantity: number
  productPrice: number
  productName: string
  productThumbnail: string
  productDesc: string
}

export type Props = {
  prevCartItems: CartItem[]
  nextCartItem: CartItem
}

export const existingCartItem = ({ prevCartItems, nextCartItem }: Props) => {
  return prevCartItems.find(
    cartItem => cartItem.documentID === nextCartItem.documentID
  )
}

export const handleAddToCart = ({ prevCartItems, nextCartItem }: Props) => {
  const quantityIncrement = 1
  const cartItemExists = existingCartItem({
    prevCartItems,
    nextCartItem
  })

  if (cartItemExists) {
    return prevCartItems.map(cartItem =>
      cartItem.documentID === nextCartItem.documentID
        ? {
            ...cartItem,
            quantity: cartItem.quantity + quantityIncrement
          }
        : cartItem
    )
  }

  return [
    ...prevCartItems,
    {
      ...nextCartItem,
      quantity: quantityIncrement
    }
  ]
}

export const handleRemoveCartItem = ({
  prevCartItems,
  cartItemToRemove
}: {
  prevCartItems: CartItem[]
  cartItemToRemove: CartItem
}) => {
  return prevCartItems.filter(
    item => item.documentID !== cartItemToRemove.documentID
  )
}

export const handleReduceCartItem = ({
  prevCartItems,
  cartItemToReduce
}: {
  prevCartItems: CartItem[]
  cartItemToReduce: CartItem
}) => {
  const existingCartItem = prevCartItems.find(
    item => item.documentID === cartItemToReduce.documentID
  )

  if (existingCartItem) {
    if (existingCartItem.quantity === 1) {
      return prevCartItems.filter(
        item => item.documentID !== cartItemToReduce.documentID
      )
    }

    return prevCartItems.map(item =>
      cartItemToReduce.documentID === existingCartItem.documentID
        ? {
            ...item,
            quantity: item.quantity - 1
          }
        : item
    )
  }

  return prevCartItems
}
