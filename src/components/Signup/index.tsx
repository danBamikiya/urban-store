import { Component, ChangeEvent, FormEvent } from 'react'
import FormInput from '../forms/FormInput'
import Button from '../forms/Button'
import './styles.scss'
import AuthWrapper from '../AuthWrapper'
import { auth, handleUserProfile } from '../../firebase/utils'

interface Props {}

const initialState = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: [] as string[]
}

class Signup extends Component<Props, typeof initialState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...initialState
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    this.setState({
      [name]: value
    } as unknown as typeof initialState)
  }

  handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const { displayName, email, password, confirmPassword } = this.state

    if (password !== confirmPassword) {
      const err = ["Password Don't match"]
      this.setState({
        errors: err
      })
      return
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      )
      await handleUserProfile(user, { displayName })

      this.setState({
        ...initialState
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { displayName, email, password, confirmPassword, errors } = this.state
    const configAuthWrapper = {
      headline: 'Signup'
    }

    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="form-wrap">
          {errors.length > 0 && (
            <ul>
              {errors.map((err, index) => {
                return <li key={index}>{err}</li>
              })}
            </ul>
          )}
          <form onSubmit={this.handleFormSubmit}>
            <FormInput
              type="text"
              name="displayName"
              value={displayName}
              placeholder="Full name"
              handleChange={this.handleChange}
            />
            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              handleChange={this.handleChange}
            />
            <FormInput
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              handleChange={this.handleChange}
            />
            <FormInput
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm Password"
              handleChange={this.handleChange}
            />

            <Button type="submit">Register</Button>
          </form>
        </div>
      </AuthWrapper>
    )
  }
}

export default Signup
