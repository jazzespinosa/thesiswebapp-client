import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { UserFacultyID } from "../FacultyDetailsContext";

function FacultyIDRegistration() {
  const [hasInputError, setHasInputError] = useState("");
  const [facultyID, setFacultyID] = useState("");

  const [input, setInput] = useState({
    facultyID: "",
    inputError: "",
  });

  const [testResult, setTestResult] = useState("");

  const validateInput = (value) => {
    let inputError = "";

    if (!value || value.length < 3) inputError = "Required!";
    else if (value.length !== 12)
      inputError = "Invalid format. ex: 2000-0-00000";
    else inputError = null;
    return inputError;
  };

  const HandleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    let formData = { facultyID: event.target[0].value };

    const { facultyID } = formData;
    const inputError = validateInput(facultyID);
    console.log(facultyID);
    setTestResult(facultyID);
    setFacultyID(facultyID);

    if (!inputError) {
      setTimeout(() => {
        setFacultyID(facultyID);
        setHasInputError(null);
        checkFacultyID(facultyID);
        // setModalIsOpen(true);
      }, 300);
    } else {
      setHasInputError(inputError);
    }
  };

  const history = useHistory();
  const { userFacultyNumber, setUserFacultyNumber } = useContext(UserFacultyID);

  const checkFacultyID = () => {
    Axios.post("http://localhost:8000/check/faculty/profile", {
      facultyID: facultyID,
    }).then((response) => {
      console.log(response.data.length);
      if (response.data.length !== 0) {
        console.log("Faculty ID already exists.");
        setTimeout(() => {
          alert(`Faculty ID ${facultyID} already exists.`);
        }, 300);
      } else {
        Axios.post("http://localhost:8000/check/faculty/regrequest", {
          facultyID: facultyID,
        }).then((response) => {
          console.log(response.data.length);
          if (response.data.length !== 0) {
            console.log("Faculty ID already on request.");
            setTimeout(() => {
              alert(`Faculty ID ${facultyID} already on request.`);
            }, 300);
          } else {
            console.log("Valid");
            console.log(facultyID);
            setUserFacultyNumber(facultyID);
            history.push("/register/faculty/details");
          }
        });
      }
    });
  };

  const handleKeyPress = (e) => {
    const re = /[0-9-]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    setFacultyID(facultyID);
    if (facultyID.length === 12) {
      setHasInputError(null);
    }
  }, [facultyID]);

  return (
    <form className="form-control" onSubmit={HandleSubmit}>
      <header>Sign Up</header>
      <h1>Enter Faculty ID</h1>
      <div className="input-container">
        <div className="label">Faculty ID</div>
        <input
          className="input facultyID"
          type="text"
          name="facultyID"
          placeholder="xxxx-x-xxxxx"
          onChange={(e) => setFacultyID(e.target.value)}
          onKeyPress={handleKeyPress}
          maxLength="12"
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

export default FacultyIDRegistration;
