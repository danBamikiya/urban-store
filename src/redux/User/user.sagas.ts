import { takeLatest, call, all, put } from 'redux-saga/effects'
import {
  auth,
  handleUserProfile,
  getCurrentUser,
  GoogleProvider
} from '../../firebase/utils'
import userTypes from './user.types'
import {
  signInSuccess,
  signOutUserSuccess,
  resetPasswordSuccess,
  userError
} from './user.actions'
import { handleResetPasswordAPI } from './user.helpers'
import { user } from '../../types/user'
import { TakeableChannel } from 'redux-saga'

export function* getSnapshotFromUserAuth(user: user, additionalData = {}): any {
  try {
    // @ts-ignore
    const userRef = yield call(handleUserProfile, {
      userAuth: user,
      additionalData
    })
    const snapshot = yield userRef.get()
    yield put(
      signInSuccess({
        id: snapshot.id,
        ...snapshot.data()
      })
    )
  } catch (err) {
    //
  }
}

export function* emailSignIn({
  payload: { email, password }
}: {
  payload: { email: string; password: string }
}): any {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password)
    yield getSnapshotFromUserAuth(user)
  } catch (err) {
    //
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(
    userTypes.EMAIL_SIGN_IN_START as unknown as TakeableChannel<unknown>,
    emailSignIn
  )
}

export function* isUserAuthenticated(): any {
  try {
    const userAuth = yield getCurrentUser()
    if (!userAuth) return
    yield getSnapshotFromUserAuth(userAuth)
  } catch (err) {
    //
  }
}

export function* onCheckUserSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOutUser() {
  try {
    yield auth.signOut()
    yield put(signOutUserSuccess())
  } catch (err) {
    // console.log(err);
  }
}

export function* onSignOutUserStart() {
  yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser)
}

export function* signUpUser({
  payload: { displayName, email, password, confirmPassword }
}: {
  payload: {
    displayName: string
    email: string
    password: string
    confirmPassword: string
  }
}) {
  if (password !== confirmPassword) {
    const err = ["Password Don't match"]
    yield put(userError(err))
    return
  }

  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password)
    const additionalData = { displayName }
    yield getSnapshotFromUserAuth(user, additionalData)
  } catch (err) {
    console.log(err)
  }
}

export function* onSignUpUserStart() {
  yield takeLatest(
    userTypes.SIGN_UP_USER_START as unknown as TakeableChannel<unknown>,
    signUpUser
  )
}

export function* resetPassword({
  payload: { email }
}: {
  payload: { email: string }
}) {
  try {
    yield call(handleResetPasswordAPI, email)
    yield put(resetPasswordSuccess())
  } catch (err) {
    yield put(userError(err as string[]))
  }
}

export function* onResetPasswordStart() {
  yield takeLatest(
    userTypes.RESET_PASSWORD_START as unknown as TakeableChannel<unknown>,
    resetPassword
  )
}

export function* googleSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(GoogleProvider)
    yield getSnapshotFromUserAuth(user)
  } catch (err) {
    // console.log(err);
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn)
}

export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutUserStart),
    call(onSignUpUserStart),
    call(onResetPasswordStart),
    call(onGoogleSignInStart)
  ])
}
