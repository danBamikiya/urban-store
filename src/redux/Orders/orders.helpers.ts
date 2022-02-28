import { firestore } from './../../firebase/utils'

export const handleSaveOrder = (order: {}) => {
  return new Promise<void>((resolve, reject) => {
    firestore
      .collection('orders')
      .doc()
      .set(order)
      .then(() => {
        resolve()
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const handleGetUserOrderHistory = (uid: number) => {
  return new Promise((res, rej) => {
    let ref = firestore.collection('orders').orderBy('orderCreatedDate')
    ref = ref.where('orderUserID', '==', uid)

    ref
      .get()
      .then(snap => {
        const data = [
          ...snap.docs.map(doc => {
            return {
              ...doc.data(),
              documentID: doc.id
            }
          })
        ]

        res({ data })
      })
      .catch(err => {
        rej(err)
      })
  })
}

export const handleGetOrder = (orderID: string) => {
  return new Promise((res, rej) => {
    firestore
      .collection('orders')
      .doc(orderID)
      .get()
      .then(snap => {
        if (snap.exists) {
          res({
            ...snap.data(),
            documentID: orderID
          })
        }
      })
  })
}
