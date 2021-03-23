import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormControls from "../FormControls";
import { useHistory } from "react-router-dom";
import { UserFacultyID, UserFacultyPassword } from "../FacultyDetailsContext";

//path = /register/faculty/password
function FacultyPasswordRegistrarion() {
  const { userFacultyNumber } = useContext(UserFacultyID);
  const { userFacultyPassword, setuserFacultyPassword } = useContext(
    UserFacultyPassword
  );
  const history = useHistory();
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is Required")
      .min(8, "Password must be 8-32 characters")
      .max(32, "Password must be 8-32 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords does not match")
      .required("Confirm Password is Required"),
  });

  const onSubmit = (values) => {
    console.log(values);
    const passwordInput = values.password;
    setuserFacultyPassword(passwordInput);
    history.push("/register/faculty/confirm");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
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
              type="password"
              label="Password"
              name="password"
            />

            <FormControls
              control="input"
              type="password"
              label="Confirm Password"
              name="confirmPassword"
            />

            <button type="submit" disabled={!formik.isValid}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default FacultyPasswordRegistrarion;
