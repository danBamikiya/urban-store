import { useState, FormEvent, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './styles.scss'

import AuthWrapper from '../AuthWrapper'
import FormInput from '../forms/FormInput'
import Button from '../forms/Button'
import { useDispatch, useSelector } from 'react-redux'
import {
  resetPasswordStart,
  resetUserState
} from '../../redux/User/user.actions'

type State = {
  resetPasswordSuccess: boolean
  userErr: string[]
}

const mapState = ({ user }: { user: State }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userErr: user.userErr
})

const EmailPassword = () => {
  const { resetPasswordSuccess, userErr } = useSelector(mapState)
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([] as string[])
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState())
      history.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetPasswordSuccess])
  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr)
    }
  }, [userErr])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    dispatch(resetPasswordStart({ email }))
  }

  const configAuthWrapper = {
    headline: 'Email Password'
  }

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="form-wrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}

        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={e => setEmail(e.target.value)}
          />
          <Button type="submit">Email Password</Button>
        </form>

        <div className="links">
          <Link to="/login">LogIn</Link>
          {` | `}
          <Link to="/registration">Register</Link>
        </div>
      </div>
    </AuthWrapper>
  )
}

export default EmailPassword
