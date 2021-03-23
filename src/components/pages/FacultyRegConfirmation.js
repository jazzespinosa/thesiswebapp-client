import React, { useContext, useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import Axios from "axios";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import FormControls from "../FormControls";
import {
  UserFacultyID,
  UserFacultyPassword,
  UserFacultyLastname,
  UserFacultyFirstName,
  UserFacultyMiddleName,
  UserFacultyPhNumber,
} from "../FacultyDetailsContext";

//path = /register/faculty/confirm
function FacultyRegConfirmation() {
  const { userFacultyNumber, setUserFacultyNumber } = useContext(UserFacultyID);
  const { userFacultyPassword, setuserFacultyPassword } = useContext(
    UserFacultyPassword
  );
  const { lastName, setLastName } = useContext(UserFacultyLastname);
  const { firstName, setFirstName } = useContext(UserFacultyFirstName);
  const { middleName, setMiddleName } = useContext(UserFacultyMiddleName);
  const { phNumber, setPhNumber } = useContext(UserFacultyPhNumber);
  const history = useHistory();

  const initialValues = {
    facultyID: userFacultyNumber,
    lastName: lastName,
    firstName: firstName,
    middleName: middleName,
    phoneNumber: phNumber,
  };

  const phoneRegExp = /^\s*(\d{11})\s*$/;

  const validationSchema = Yup.object({
    lastName: Yup.string()
      .required("Required")
      .max(32, "Must be 32 characters or less"),
    firstName: Yup.string()
      .required("Required")
      .max(32, "Must be 32 characters or less"),
    middleName: Yup.string().max(32, "Must be 32 characters or less"),
    phoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
    eula: Yup.boolean()
      .required("You must agree with EULA.")
      .isTrue("You must agree with EULA."),
  });

  const onSubmit = (values) => {
    console.log(values);

    let formData = {
      input1: values.lastName,
      input2: values.firstName,
      input3: values.middleName,
      input4: values.phoneNumber,
    };
    const { input1, input2, input3, input4 } = formData;

    setLastName(input1);
    setFirstName(input2);
    setMiddleName(input3);
    setPhNumber(input4);

    Axios.post("http://localhost:8000/insert/faculty", {
      facultyID: userFacultyNumber,
      facultyPassword: userFacultyPassword,
      lastname: lastName,
      firstName: firstName,
      middleName: middleName,
      phNumber: phNumber,
    }).then(() => {
      setLastName(lastName);
      setFirstName(firstName);
      setMiddleName(middleName);
      setPhNumber(phNumber);
    });
    // history.push("");
  };

  useEffect(() => {
    setLastName(lastName);
    setFirstName(firstName);
    setMiddleName(middleName);
    setPhNumber(phNumber);
  }, [lastName, firstName, middleName, phNumber]);

  const [editInputLN, setEditInputLN] = useState(false);
  const [disabledLN, setDisabledLN] = useState(true);
  const linkLastName = editInputLN ? "Confirm" : "Edit";
  const [editInputFN, setEditInputFN] = useState(false);
  const [disabledFN, setDisabledFN] = useState(true);
  const linkFirstName = editInputFN ? "Confirm" : "Edit";
  const [editInputMN, setEditInputMN] = useState(false);
  const [disabledMN, setDisabledMN] = useState(true);
  const linkMiddleName = editInputMN ? "Confirm" : "Edit";
  const [editInputPhNumber, setEditInputPhNumber] = useState(false);
  const [disabledPhNumber, setDisabledPhNumber] = useState(true);
  const linkPhNumber = editInputPhNumber ? "Confirm" : "Edit";

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <h2>Confirm Details</h2>
          <FormControls
            control="input"
            type="text"
            label="Faculty Number"
            name="facultyNumber"
            value={userFacultyNumber}
            disabled={true}
          />

          <FormControls
            control="input"
            type="text"
            label="Last Name"
            name="lastName"
            onChange={formik.handleChange}
            disabled={disabledLN}
          />
          <p
            onClick={() => {
              setLastName(formik.values.lastName);
              setDisabledLN(!disabledLN);
              setEditInputLN(!editInputLN);
            }}
          >
            <div>
              <pre>{linkLastName}</pre>
            </div>
          </p>

          <FormControls
            control="input"
            type="text"
            label="First Name"
            name="firstName"
            onChange={formik.handleChange}
            disabled={disabledFN}
          />
          <p
            onClick={() => {
              setFirstName(formik.values.firstName);
              setDisabledFN(!disabledFN);
              setEditInputFN(!editInputFN);
            }}
          >
            <div>
              <pre>{linkFirstName}</pre>
            </div>
          </p>

          <FormControls
            control="input"
            type="text"
            label="Middle Name"
            name="middleName"
            onChange={formik.handleChange}
            disabled={disabledMN}
          />
          <p
            onClick={() => {
              setMiddleName(formik.values.middleName);
              setDisabledMN(!disabledMN);
              setEditInputMN(!editInputMN);
            }}
          >
            <div>
              <pre>{linkMiddleName}</pre>
            </div>
          </p>

          <FormControls
            control="input"
            type="text"
            label="Phone Number"
            name="phoneNumber"
            onChange={formik.handleChange}
            disabled={disabledPhNumber}
          />
          <p
            onClick={() => {
              setPhNumber(formik.values.phoneNumber);
              setDisabledPhNumber(!disabledPhNumber);
              setEditInputPhNumber(!editInputPhNumber);
            }}
          >
            <div>
              <pre>{linkPhNumber}</pre>
            </div>
          </p>
          <label>
            <Field type="checkbox" name="eula" />
            {`I agree to EULA.`}
          </label>
          <br />
          <button
            type="submit"
            disabled={
              !(
                formik.isValid &&
                formik.dirty &&
                disabledLN &&
                disabledFN &&
                disabledMN &&
                disabledPhNumber
              )
            }
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default FacultyRegConfirmation;
