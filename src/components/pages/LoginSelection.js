import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import StudentLogin from "./StudentLogin";

//path = "/" login modal
function LoginSelection() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="form-control">
      <h2>Login as</h2>
      <button onClick={() => setModalIsOpen(true)}>Student</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <StudentLogin />
        <button onClick={() => setModalIsOpen(false)}>Back</button>
      </Modal>
      <br />
      <button>Faculty</button>
    </div>
  );
}

export default LoginSelection;
