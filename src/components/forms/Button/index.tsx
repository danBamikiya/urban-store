import React, { FC } from 'react'
import './styles.scss'

type ButtonProps = {
  [x: string]: any
}

const Button: FC<ButtonProps> = ({ children, ...otherProps }) => {
  return (
    <button className="btn" {...otherProps}>
      {children}
    </button>
  )
}

export default Button
