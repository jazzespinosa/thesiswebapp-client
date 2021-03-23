import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import FormControls from "../FormControls";
import {
  UserFacultyID,
  UserFacultyLastname,
  UserFacultyFirstName,
  UserFacultyMiddleName,
  UserFacultyPhNumber,
} from "../FacultyDetailsContext";

//path = "/register/faculty/details"
function FacultyDetailsRegistration() {
  const { userFacultyNumber } = useContext(UserFacultyID);
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
    console.log(values);
    history.push("/register/faculty/password");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
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
          />

          <FormControls
            control="input"
            type="text"
            label="First Name"
            name="firstName"
          />

          <FormControls
            control="input"
            type="text"
            label="Middle Name"
            name="middleName"
          />

          <FormControls
            control="input"
            type="text"
            label="Phone Number"
            name="phoneNumber"
          />

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default FacultyDetailsRegistration;
