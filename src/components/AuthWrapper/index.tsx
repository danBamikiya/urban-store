import { FC } from 'react'
import './styles.scss'

interface Props {
  headline: string
}

const AuthWrapper: FC<Props> = ({ headline, children }) => {
  return (
    <div className="auth-wrapper">
      <div className="wrap">
        {headline && <h2>{headline}</h2>}

        <div className="children">{children && children}</div>
      </div>
    </div>
  )
}

export default AuthWrapper
