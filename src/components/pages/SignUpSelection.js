import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import StudentLogin from "./StudentLogin";
import TestCode from "../testingCodes/TestCode";
import StudentNumberRegistration from "./StudentNumberRegistration";
import FacultyIDRegistration from "./FacultyIDRegistration";

//path = "/" sign up modal
function SignUpSelection() {
  const [studentModalIsOpen, setStudentModalIsOpen] = useState(false);
  const [facultyModalIsOpen, setFacultyModalIsOpen] = useState(false);

  return (
    <div className="form-control">
      <header>Sign Up</header>
      <br />
      <h3>I am a</h3>
      <button onClick={() => setStudentModalIsOpen(true)}>Student</button>
      <Modal
        isOpen={studentModalIsOpen}
        onRequestClose={() => setStudentModalIsOpen(false)}
      >
        <StudentNumberRegistration />
        <button onClick={() => setStudentModalIsOpen(false)}>Back</button>
      </Modal>
      <br />
      <button onClick={() => setFacultyModalIsOpen(true)}>Faculty</button>
      <Modal
        isOpen={facultyModalIsOpen}
        onRequestClose={() => setFacultyModalIsOpen(false)}
      >
        <FacultyIDRegistration />
        <button onClick={() => setFacultyModalIsOpen(false)}>Back</button>
      </Modal>
    </div>
  );
}

export default SignUpSelection;
