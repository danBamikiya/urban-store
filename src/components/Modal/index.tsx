import { ReactNode } from 'react'
import './styles.scss'

type Props = {
  hideModal: boolean
  toggleModal: () => void
  children: ReactNode
}

const Modal = ({ hideModal, toggleModal, children }: Props) => {
  if (hideModal) return null

  return (
    <>
      <div className="modalOverlay" onClick={() => toggleModal()} />
      <div className="modalWrap">
        <div className="modal">{children}</div>
      </div>
    </>
  )
}

export default Modal
