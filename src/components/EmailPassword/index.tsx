import { ChangeEvent, Component, FormEvent } from 'react'
import './styles.scss'

import AuthWrapper from '../AuthWrapper'
import FormInput from '../forms/FormInput'
import Button from '../forms/Button'
import { auth } from '../../firebase/utils'
import { navigate } from '../../utils/navigate'

interface Props {}

const initialState = {
  email: '',
  errors: [] as string[]
}

class EmailPassword extends Component<Props, typeof initialState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...initialState
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    this.setState({
      [name]: value
    } as unknown as typeof initialState)
  }

  handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const { email } = this.state

      const config = {
        url: 'http://localhost:4050/login'
      }

      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          navigate('/login')
          console.log('Password Reset')
        })
        .catch(() => {
          const err = ['Email not found. Please try again']
          this.setState({
            errors: err
          })
        })
    } catch (err) {
      //
    }
  }

  render() {
    const { email, errors } = this.state
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

          <form onSubmit={this.handleSubmit}>
            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              handleChange={this.handleChange}
            />
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </AuthWrapper>
    )
  }
}

export default EmailPassword
