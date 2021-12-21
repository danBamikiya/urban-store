import { FormEvent, ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'
import FormInput from '../forms/FormInput'
import Button from '../forms/Button'
import { auth, signInWithGoogle } from '../../firebase/utils'
import AuthWrapper from '../AuthWrapper'

const initialState = {
  email: '',
  password: ''
}

const SignIn = () => {
  const [state, setState] = useState(initialState)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const { email, password } = state

    try {
      await auth.signInWithEmailAndPassword(email, password)
      setState({
        ...initialState
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setState({
      ...state,
      [name]: value
    } as unknown as typeof initialState)
  }

  const { email, password } = state
  const configAuthWrapper = {
    headline: 'Login'
  }

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={handleChange}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={handleChange}
          />
          <Button>LogIn</Button>

          <div className="socialSignin">
            <div className="row">
              <Button onClick={signInWithGoogle}>Sign in with Google</Button>
            </div>
          </div>

          <div className="links">
            <Link to="/recovery">Forgot Password</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  )
}

export default SignIn
