import productTypes from './products.types'

type Product = {}

interface Action {
  type: string
  payload: Product | Product[]
}

const INITIAL_STATE = {
  products: [],
  product: {}
}

const productsReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case productTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }
    case productTypes.SET_PRODUCT:
      return {
        ...state,
        product: action.payload
      }
    default:
      return state
  }
}

export default productsReducer
