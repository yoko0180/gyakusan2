import React, { useState } from "react"

const Modal: React.FC<{ show: boolean; onClose: React.MouseEventHandler }> = ({ show, onClose, children }) => {
  return (
    <div className="modal-panel">
      <div className={"modal-overlay " + (show ? "" : " closed")} id="modal-overlay"></div>
      <div className={"modal " + (show ? "" : " closed")} id="modal">
        <button className="close-button" id="close-button" onClick={onClose}>
          閉じる
        </button>
        <div className="modal-guts">
          <h4>ポップアップウィンドウ</h4>
          <p>この窓が表示されている間は窓の外の操作はできません。ウィンドウを閉じて操作して下さい。</p>
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  )
}
export default Modal
