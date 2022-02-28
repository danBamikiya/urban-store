import { auth } from './../../firebase/utils'
import { takeLatest, put, all, call } from 'redux-saga/effects'
import { setProducts, setProduct, fetchProductsStart } from './products.actions'
import {
  handleAddProduct,
  handleFetchProducts,
  handleFetchProduct,
  handleDeleteProduct
} from './products.helpers'
import productsTypes from './products.types'
import { TakeableChannel } from 'redux-saga'

export function* addProduct({ payload }: { payload: {} }) {
  try {
    const timestamp = new Date()
    yield handleAddProduct({
      ...payload,
      productAdminUserUID: auth.currentUser!.uid,
      createdDate: timestamp
    })
    yield put(fetchProductsStart())
  } catch (err) {
    // console.log(err);
  }
}

export function* onAddProductStart() {
  yield takeLatest(
    productsTypes.ADD_NEW_PRODUCT_START as unknown as TakeableChannel<unknown>,
    addProduct
  )
}

export function* fetchProducts({
  payload
}: {
  payload: {
    filterType: string
    startAfterDoc: []
    persistProducts: []
  }
}): any {
  try {
    const products = yield handleFetchProducts(payload)
    yield put(setProducts(products))
  } catch (err) {
    // console.log(err);
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(
    productsTypes.FETCH_PRODUCTS_START as unknown as TakeableChannel<unknown>,
    fetchProducts
  )
}

export function* deleteProduct({ payload }: { payload: string }) {
  try {
    yield handleDeleteProduct(payload)
    yield put(fetchProductsStart())
  } catch (err) {
    // console.log(err);
  }
}

export function* onDeleteProductStart() {
  yield takeLatest(
    productsTypes.DELETE_PRODUCT_START as unknown as TakeableChannel<unknown>,
    deleteProduct
  )
}

export function* fetchProduct({ payload }: { payload: string }): any {
  try {
    const product = yield handleFetchProduct(payload)
    yield put(setProduct(product))
  } catch (err) {
    // console.log(err);
  }
}

export function* onFetchProductStart() {
  yield takeLatest(
    productsTypes.FETCH_PRODUCT_START as unknown as TakeableChannel<unknown>,
    fetchProduct
  )
}

export default function* productsSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
    call(onFetchProductStart)
  ])
}
