import { Component } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import './default.scss'
import { auth, handleUserProfile } from './firebase/utils'
import { UserState } from './types/user'
import { Unsubscribe } from 'firebase'

// layouts
import HomepageLayout from './layouts/HomepageLayout'
import MainLayout from './layouts/MainLayout'

// pages
import Homepage from './pages/Homepage'
import Registration from './pages/Registration'
import Login from './pages/Login'

interface Props {}
interface State extends UserState {}

const intialState = {
  currentUser: null
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...intialState
    }
  }

  authListener: Unsubscribe | null = null

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth)
        userRef?.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }

      this.setState({
        ...intialState
      })
    })
  }

  componentWillUnmount() {
    this.authListener!()
  }

  render() {
    const { currentUser } = this.state
    return (
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <HomepageLayout currentUser={currentUser}>
                <Homepage />
              </HomepageLayout>
            }
          />
          <Route
            path="/registration"
            element={
              currentUser ? (
                <Navigate to="/" />
              ) : (
                <MainLayout currentUser={currentUser}>
                  <Registration />
                </MainLayout>
              )
            }
          />
          <Route
            path="/login"
            element={
              currentUser ? (
                <Navigate to="/" />
              ) : (
                <MainLayout currentUser={this.state.currentUser}>
                  <Login />
                </MainLayout>
              )
            }
          />
        </Routes>
      </div>
    )
  }
}

export default App
