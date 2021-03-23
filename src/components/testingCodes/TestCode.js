import axios from "axios";
import Axios from "axios";
import React, { useState, useRef } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import StudentDetailsRegistration from "../pages/StudentDetailsRegistration";

// const initialValues = {
//   studentNumber1: "",
//   studentNumber2: "",
//   studentNumber3: "",
//   password: "",
//   inputError: "",
//   passwordError: "",
// };

function TestCode() {
  const [hasInputError, setHasInputError] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [inputStudentNumber1, setInputStudentNumber1] = useState("");
  const [inputStudentNumber2, setInputStudentNumber2] = useState("");
  const [inputStudentNumber3, setInputStudentNumber3] = useState("");

  // const [values, setValues] = useState(initialValues);

  // const [input, setInput] = useState({
  //   studentNumber1: "",
  //   studentNumber2: "",
  //   studentNumber3: "",
  //   inputError: "",
  // });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [testResult, setTestResult] = useState("");

  const checkStudentNumber = () => {
    axios
      .post("http://localhost:8000/check", {
        studentNumber: studentNumber,
      })
      .then((response) => {
        console.log(response);
      });
  };

  const validateInput = (value) => {
    let inputError = "";

    if (!value || value.length < 3) inputError = "Required!";
    else if (value.length !== 12)
      inputError = "Invalid student format. ex: 2000-0-00000";
    else inputError = null;
    return inputError;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(event);
    let formData = {
      studentNumber1: event.target[0].value,
      studentNumber2: event.target[1].value,
      studentNumber3: event.target[2].value,
    };
    const { studentNumber1, studentNumber2, studentNumber3 } = formData;
    const studentNumberString = `${studentNumber1}-${studentNumber2}-${studentNumber3}`;
    const inputError = validateInput(studentNumberString);
    console.log(studentNumberString);
    setTestResult(studentNumberString);

    if (!inputError) {
      setTimeout(() => {
        alert(studentNumberString);
        setStudentNumber(studentNumberString);
        setHasInputError(null);
        checkStudentNumber();
        // setModalIsOpen(true);
      }, 300);
    } else {
      setHasInputError(inputError);
    }
  };

  const reset = () => {
    setInputStudentNumber1("");
    setInputStudentNumber2("");
    setInputStudentNumber3("");
  };

  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();

  const handleInputChange1 = (e) => {
    e.preventDefault();
    setInputStudentNumber1(e.target.value);
    console.log(inputStudentNumber1);
    // const studentNumberString = `${studentNumber1}-${studentNumber2}-${studentNumber3}`;
  };

  const handleInputChange2 = (e) => {
    e.preventDefault();
    setInputStudentNumber2(e.target.value);
    console.log(inputStudentNumber2);
  };

  const handleInputChange3 = (e) => {
    e.preventDefault();
    setInputStudentNumber3(e.target.value);
    console.log(inputStudentNumber3);
  };

  const handleChange = (event) => {
    event.preventDefault();
    console.log(event);
    // setInput({ ...input, [e.target.name]: e.target.value });
    //const [inputStudentNumber1, setInputStudentNumber1] = useState("");
    // setInputStudentNumber1(event.target[0].value);
    // setInputStudentNumber2(inputStudentNumber2);
    // setInputStudentNumber3(inputStudentNumber3);
    // console.log(inputStudentNumber1);
    // console.log(inputStudentNumber2);
    // console.log(inputStudentNumber3);
    // const { name, value } = event.target;
    // setValues({ ...values, [name]: value });

    let formData = {
      studentNumber1: event.target.value,
      studentNumber2: event.target.value,
      studentNumber3: event.target.value,
      studentNumber1name: event.target.name,
      studentNumber2name: event.target.name,
      studentNumber3name: event.target.name,
    };
    const { studentNumber1, studentNumber2, studentNumber3 } = formData;
    const studentNumber1Filled = studentNumber1.length === 4;
    const studentNumber2Filled = studentNumber2.length === 1;

    if (studentNumber1Filled && event.target.name === "studentNumber1") {
      inputRef2.current.focus();
    } else if (studentNumber2Filled && event.target.name === "studentNumber2") {
      inputRef3.current.focus();
    }

    const studentNumberString = `${studentNumber1}-${studentNumber2}-${studentNumber3}`;
    console.log(studentNumberString);
    // console.log(values.studentNumber1);
    // console.log(values.studentNumber2);
    // console.log(values.studentNumber3);
    if (studentNumberString.length === 12) {
      setHasInputError(null);
    }
  };

  const handleKeyPress = (e) => {
    const re = /[0-9]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <form className="form-control" onSubmit={handleSubmit}>
      <header>Sign Up</header>
      <h1>Enter Student Number</h1>
      <div className="input-container">
        <div className="label">Student Number</div>
        <input
          ref={inputRef1}
          className="input studentnumber1"
          type="text"
          name="studentNumber1"
          placeholder="xxxx"
          value={inputStudentNumber1}
          onChange={
            handleInputChange1
            // handleChange)
          }
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
          value={inputStudentNumber2}
          onChange={handleInputChange2}
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
          value={inputStudentNumber3}
          onChange={handleInputChange3}
          onKeyPress={handleKeyPress}
          maxLength="5"
        />
      </div>
      <p className="error">{hasInputError}</p>
      <div className="btn-container">
        <button className="btn primary" type="submit">
          Sign Up
        </button>
        <Link to="/register">
          {/* <button
            className="btn danger"
            type="button"
            // onClick={() => setModalIsOpen(true)}
          >
            Register
          </button> */}
        </Link>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          {/* <StudentDetailsRegistration /> */}
          {/* <StudentDetailsRegistration /> */}
          {/* <TestCode /> */}
          <button onClick={() => setModalIsOpen(false)}>Back</button>
        </Modal>
        <br />
        <div>
          <h1>{testResult}</h1>
        </div>
      </div>
    </form>
  );
}

export default TestCode;
