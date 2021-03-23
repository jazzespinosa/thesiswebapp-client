import Axios from "axios";
import React, { useState, useRef, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserStudentNumber } from "../UserDetailsContext";

function StudentNumberRegistration() {
  const [hasInputError, setHasInputError] = useState("");
  const [studentNumber, setStudentNumber] = useState("");

  const [input, setInput] = useState({
    studentNumber1: "",
    studentNumber2: "",
    studentNumber3: "",
    inputError: "",
  });

  const studentNumberString = `${input.studentNumber1}-${input.studentNumber2}-${input.studentNumber3}`;

  const [testResult, setTestResult] = useState("");

  const validateInput = (value) => {
    let inputError = "";

    if (!value || value.length < 3) inputError = "Required!";
    else if (value.length !== 12)
      inputError = "Invalid student number format. ex: 2000-0-00000";
    else inputError = null;
    return inputError;
  };

  const HandleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
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
    setStudentNumber(studentNumberString);

    if (!inputError) {
      setTimeout(() => {
        //alert(studentNumberString);
        setStudentNumber(studentNumberString);
        setHasInputError(null);
        checkStudentNumber(studentNumberString);
        // setModalIsOpen(true);
      }, 300);
    } else {
      setHasInputError(inputError);
    }
  };

  const history = useHistory();
  const { userStudentNumber, setUserStudentNumber } = useContext(
    UserStudentNumber
  );

  const checkStudentNumber = () => {
    Axios.post("http://localhost:8000/check/student/profile", {
      studentNumber: studentNumber,
    }).then((response) => {
      console.log(response.data.length);
      if (response.data.length !== 0) {
        console.log("Student Number already exists.");
        setTimeout(() => {
          alert(`Student Number ${studentNumber} already exists.`);
        }, 300);
      } else {
        Axios.post("http://localhost:8000/check/student/regrequest", {
          studentNumber: studentNumber,
        }).then((response) => {
          console.log(response.data.length);
          if (response.data.length !== 0) {
            console.log("Student Number already exists.");
            setTimeout(() => {
              alert(`Student Number ${studentNumber} already exists.`);
            }, 300);
          } else {
            console.log("Valid");
            console.log(studentNumber);
            setUserStudentNumber(studentNumber);
            history.push("/register/student/details");
          }
        });
      }
    });
  };

  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();

  useEffect(() => {
    setStudentNumber(studentNumberString);
    if (studentNumberString.length === 12) {
      setHasInputError(null);
    }
  }, [studentNumberString]);

  const HandleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
    console.log(event);

    let formData = {
      targetValue: event.target.value,
      targetName: event.target.name,
    };
    const { targetValue, targetName } = formData;
    console.log(targetValue);

    const studentNumber1Filled = targetValue.length === 4;
    const studentNumber2Filled = targetValue.length === 1;

    if (studentNumber1Filled && event.target.name === "studentNumber1") {
      inputRef2.current.focus();
    } else if (studentNumber2Filled && event.target.name === "studentNumber2") {
      inputRef3.current.focus();
    }

    const studentNumberString = `${targetValue}-${targetValue}-${targetValue}`;
    setStudentNumber(studentNumberString);
    console.log(studentNumberString);

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
    <form className="form-control" onSubmit={HandleSubmit}>
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
          value={input.studentNumber1}
          onChange={HandleChange}
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
          onChange={HandleChange}
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
          onChange={HandleChange}
          onKeyPress={handleKeyPress}
          maxLength="5"
        />
      </div>
      <p className="error">{hasInputError}</p>
      <div className="btn-container">
        <button className="btn primary" type="submit">
          Sign Up
        </button>
        <br />
        <div>
          <h1>{testResult}</h1>
        </div>
      </div>
    </form>
  );
}

export default StudentNumberRegistration;
