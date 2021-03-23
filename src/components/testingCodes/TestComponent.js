import React, { useState, useRef } from "react";
import Modal from "react-modal";
import StudentDetailsRegistration from "../pages/StudentDetailsRegistration";

function TestComponent() {
  const [hasError, setHasError] = useState("");
  const [input, setInput] = useState({
    studentNumber1: "",
    studentNumber2: "",
    studentNumber3: "",
    password: "",
    error: "",
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [testResult, setTestResult] = useState("");
  const [passwordResult, setPasswordResult] = useState("");
  const validateInput = (value) => {
    let error = "";

    if (!value || value.length < 3) error = "Required!";
    else if (value.length !== 12)
      error = "Invalid student format. ex: 2000-0-00000";
    //else error = "No error";
    return error;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = {
      studentNumber1: event.target[0].value,
      studentNumber2: event.target[1].value,
      studentNumber3: event.target[2].value,
      password: event.target[3].value,
    };
    const {
      studentNumber1,
      studentNumber2,
      studentNumber3,
      password,
    } = formData;
    const studentNumberString = `${studentNumber1}-${studentNumber2}-${studentNumber3}`;
    const error = validateInput(studentNumberString);
    console.log(studentNumberString);
    setTestResult(studentNumberString);
    setPasswordResult(password);
    console.log(error);

    if (!error) {
      setTimeout(() => {
        alert(studentNumberString);
        setModalIsOpen(true);
      }, 300);
    } else setHasError(error);
  };

  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });

    const formData = {
      studentNumber1: e.target.value,
      studentNumber2: e.target.value,
      studentNumber3: e.target.value,
      password: e.target.value,
      studentNumber1name: e.target.name,
      studentNumber2name: e.target.name,
      studentNumber3name: e.target.name,
      passwordname: e.target.name,
    };
    const { studentNumber1, studentNumber2 } = formData;

    const studentNumber1Filled = studentNumber1.length === 4;
    const studentNumber2Filled = studentNumber2.length === 1;

    if (studentNumber1Filled && e.target.name === "studentNumber1") {
      inputRef2.current.focus();
    } else if (studentNumber2Filled && e.target.name === "studentNumber2") {
      inputRef3.current.focus();
    }
  };

  const handleKeyPress = (e) => {
    const re = /[0-9]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setInput({
      studentNumber1: "",
      studentNumber2: "",
      studentNumber3: "",
      password: "",
      error: "",
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="input-container">
        <div className="label">Student Number</div>
        <input
          ref={inputRef1}
          className="input studentnumber1"
          type="text"
          name="studentNumber1"
          placeholder="xxxx"
          value={input.studentNumber1}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          maxLength="4"
        />
        <div className="dash" style={{ marginLeft: 4, marginRight: 4 }}>
          -
        </div>
        <input
          ref={inputRef2}
          className="input studentnumber2"
          type="text"
          name="studentNumber2"
          placeholder="x"
          value={input.studentNumber2}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          maxLength="1"
        />
        <div className="dash" style={{ marginLeft: 4, marginRight: 4 }}>
          -
        </div>
        <input
          ref={inputRef3}
          className="input studentnumber3"
          type="text"
          name="studentNumber3"
          placeholder="xxxxx"
          value={input.studentNumber3}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          maxLength="5"
        />
      </div>
      <p className="error">{hasError}</p>
      <div className="input-container">
        <div className="label">Password</div>
        <input
          type="password"
          name="password"
          value={input.password}
          placeholder="PASSWORD"
          onChange={handleChange}
        />
      </div>
      <div className="btn-container">
        <button className="btn danger" type="button" onClick={handleReset}>
          Reset
        </button>
        <button className="btn primary" type="submit">
          Submit
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          {/* <StudentDetailsRegistration /> */}
          <StudentDetailsRegistration />
          {/* <TestCode /> */}
          <button onClick={() => setModalIsOpen(false)}>Back</button>
        </Modal>
        <br />
        <div>
          <h1>{testResult}</h1>
          <h1>{passwordResult}</h1>
        </div>
      </div>
    </form>
  );
}

export default TestComponent;
