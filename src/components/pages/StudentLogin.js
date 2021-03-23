import React, { useState, useRef, useEffect, useContext } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import {
  UserLoginCourse,
  UserLoginFirstName,
  UserLoginLastname,
  UserLoginMiddleName,
  UserLoginPhNumber,
  UserLoginSection,
  UserLoginStudentNumber,
  UserLoginYear,
} from "../UserLoginContext";

function StudentLogin() {
  const [hasInputError, setHasInputError] = useState("");
  const [hasPasswordError, setHasPasswordError] = useState("");
  const [input, setInput] = useState({
    studentNumber1: "",
    studentNumber2: "",
    studentNumber3: "",
    password: "",
    inputError: "",
    passwordError: "",
  });

  const studentNumberString = `${input.studentNumber1}-${input.studentNumber2}-${input.studentNumber3}`;

  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const { loginStudentNumber, setloginStudentNumber } = useContext(
    UserLoginStudentNumber
  );
  const { loginLastName, setLoginLastName } = useContext(UserLoginLastname);
  const { loginFirstName, setLoginFirstName } = useContext(UserLoginFirstName);
  const { loginMiddleName, setLoginMiddleName } = useContext(
    UserLoginMiddleName
  );
  const { loginCourse, setLoginCourse } = useContext(UserLoginCourse);
  const { loginYear, setLoginYear } = useContext(UserLoginYear);
  const { loginSection, setLoginSection } = useContext(UserLoginSection);
  const { loginPhNumber, setLoginPhNumber } = useContext(UserLoginPhNumber);

  const [testResult, setTestResult] = useState("");
  const [passwordResult, setPasswordResult] = useState("");

  const validateInput = (value) => {
    let inputError = "";

    if (!value || value.length < 3) inputError = "Required!";
    else if (value.length !== 12)
      inputError = "Invalid student format. ex: 2000-0-00000";
    //else error = "No error";
    return inputError;
  };

  const validatePassword = (value) => {
    let passwordError = "";

    if (!value || value.length < 1) passwordError = "Required!";
    else if (value.length < 8)
      passwordError = "Password too short. Must be 8 to 32 characters.";
    else if (value.length > 32)
      passwordError = "Password too long. Must be 8 to 32 characters.";
    else passwordError = "";
    return passwordError;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = {
      studentNumber1: event.target[0].value,
      studentNumber2: event.target[1].value,
      studentNumber3: event.target[2].value,
      passwordinput: event.target[3].value,
    };
    const {
      studentNumber1,
      studentNumber2,
      studentNumber3,
      passwordinput,
    } = formData;
    const studentNumberString = `${studentNumber1}-${studentNumber2}-${studentNumber3}`;
    const inputError = validateInput(studentNumberString);
    const passwordError = validatePassword(passwordinput);
    console.log(studentNumberString);
    setTestResult(studentNumberString);
    setPasswordResult(passwordinput);
    console.log(inputError, passwordError);

    if (!inputError && !passwordError) {
      setTimeout(() => {
        setStudentNumber(studentNumberString);
        setPassword(passwordinput);
        checkStudentNumber();
      }, 300);
    } else {
      setHasInputError(inputError);
      setHasPasswordError(passwordError);
    }
  };

  const checkStudentNumber = () => {
    Axios.get(
      "https://webappservertest-env.eba-pmm4yv2p.ap-southeast-1.elasticbeanstalk.com/login/student/profile",
      {
        studentNumber: studentNumber,
        password: password,
      }
    ).then((response) => {
      console.log(response.data.length, "first");
      if (response.data.length !== 0) {
        console.log("Valid");
        console.log(response.data);
        setloginStudentNumber(response.data[0].studentNumber);
        setLoginLastName(response.data[0].lastName);
        setLoginFirstName(response.data[0].firstName);
        setLoginMiddleName(response.data[0].middleName);
        setLoginCourse(response.data[0].course);
        setLoginSection(response.data[0].section);
        setLoginYear(response.data[0].year);
        setLoginPhNumber(response.data[0].phoneNumber);
        setTimeout(() => {
          alert(`Student Number ${studentNumber} is valid.`);
        }, 300);
        history.push("/profile/student");
      } else {
        Axios.get(
          "https://webappservertest-env.eba-pmm4yv2p.ap-southeast-1.elasticbeanstalk.com/login/student/regrequest",
          {
            studentNumber: studentNumber,
            password: password,
          }
        ).then((response) => {
          console.log(response.data.length, "second");
          if (response.data.length !== 0) {
            console.log("Student Number is valid.");
            console.log(response.data);
            setloginStudentNumber(response.data[0].studentNumber);
            setLoginLastName(response.data[0].lastName);
            setLoginFirstName(response.data[0].firstName);
            setLoginMiddleName(response.data[0].middleName);
            setLoginCourse(response.data[0].course);
            setLoginSection(response.data[0].section);
            setLoginYear(response.data[0].year);
            setLoginPhNumber(response.data[0].phoneNumber);
            setTimeout(() => {
              alert(`Student Number ${studentNumber} is valid.`);
            }, 300);
            history.push("/profile/student");
          } else {
            console.log("Not valid.");
            console.log(studentNumber);
            console.log(password);
            alert(`Student Number/Password is incorrect.`);
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
    setPassword(input.password);
    if (studentNumberString.length === 12) {
      setHasInputError(null);
    }
  }, [studentNumberString, input.password]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });

    const formData = {
      studentNumber1: e.target.value,
      studentNumber2: e.target.value,
      studentNumber3: e.target.value,
      studentNumber1name: e.target.name,
      studentNumber2name: e.target.name,
      studentNumber3name: e.target.name,
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

  const handlePasswordChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });

    const formData = {
      passwordinput: e.target.value,
      passwordname: e.target.name,
    };
    const { passwordinput } = formData;
    const passwordError = validatePassword(passwordinput);
    console.log(passwordinput);
    if (passwordinput.length > 0) {
      if (!passwordError) {
        setHasPasswordError("");
      } else setHasPasswordError(passwordError);
    }
  };

  const handleKeyPress = (e) => {
    const re = /[0-9]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
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
      <p className="error">{hasInputError}</p>
      <div className="input-container">
        <div className="label">Password</div>
        <input
          type="password"
          name="password"
          value={input.password}
          placeholder="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <p className="error">{hasPasswordError}</p>
      <div className="btn-container">
        <button className="btn primary" type="submit">
          Login
        </button>
        <br />
        <div>
          <h1>{testResult}</h1>
          <h1>{passwordResult}</h1>
        </div>
      </div>
    </form>
  );
}

export default StudentLogin;
