import { ChangeEvent } from 'react'
import './styles.scss'

interface Props {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  label?: string
  [x: string]: any
}

const FormInput = ({ handleChange, label, ...otherProps }: Props) => {
  return (
    <div className="form-row">
      {label && <label>{label}</label>}

      <input className="formInput" onChange={handleChange} {...otherProps} />
    </div>
  )
}

export default FormInput
