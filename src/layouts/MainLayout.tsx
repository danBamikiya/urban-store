import { FC } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { UserState } from '../types/user'

type props = UserState

const MainLayout: FC<props> = ({ children, ...props }) => {
  return (
    <div>
      <Header {...props} />
      <div className="main">{children}</div>
      <Footer />
    </div>
  )
}

export default MainLayout
