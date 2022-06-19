import { useState } from "react"

const Modal: React.FC<{}> = ({ children }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="modal-panel">
      <div className={ "modal-overlay " + (showModal ? "" : " closed")} id="modal-overlay"></div>
      <div className={"modal " + (showModal ? "" : " closed")} id="modal">
        <button className="close-button" id="close-button" onClick={() => setShowModal(false)}>
          閉じる
        </button>
        <div className="modal-guts">
          <h4>ポップアップウィンドウ</h4>
          <p>この窓が表示されている間は窓の外の操作はできません。ウィンドウを閉じて操作して下さい。</p>
          <div className="">
            {children}
          </div>
        </div>
      </div>
      <button id="open-button" className="open-button" onClick={() => setShowModal(true)}>
        ポップアップ表示
      </button>
    </div>
  )
}
export default Modal
