import { useState, useEffect, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { signUpUserStart } from './../../redux/User/user.actions'
import './styles.scss'

import AuthWrapper from './../AuthWrapper'
import FormInput from './../forms/FormInput'
import Button from './../forms/Button'
import { UserState } from '../../types/user'

const mapState = ({ user }: { user: UserState }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr
})

const Signup = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { currentUser, userErr } = useSelector(mapState)
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState([] as string[])

  const resetForm = () => {
    setDisplayName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setErrors([])
  }

  useEffect(() => {
    if (currentUser) {
      resetForm()
      history.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr)
    }
  }, [userErr])

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault()
    dispatch(
      signUpUserStart({
        displayName,
        email,
        password,
        confirmPassword
      })
    )
    resetForm()
    history.push('/')
  }

  const configAuthWrapper = {
    headline: 'Registration'
  }

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return <li key={index}>{err}</li>
            })}
          </ul>
        )}

        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Full name"
            handleChange={e => setDisplayName(e.target.value)}
          />

          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={e => setEmail(e.target.value)}
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={e => setPassword(e.target.value)}
          />

          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            handleChange={e => setConfirmPassword(e.target.value)}
          />

          <Button type="submit">Register</Button>
        </form>

        <div className="links">
          <Link to="/login">LogIn</Link>
          {` | `}
          <Link to="/recovery">Reset Password</Link>
        </div>
      </div>
    </AuthWrapper>
  )
}

export default Signup
