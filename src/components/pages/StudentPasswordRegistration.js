import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormControls from "../FormControls";
import { useHistory } from "react-router-dom";
import { UserStudentNumber, UserStudentPassword } from "../UserDetailsContext";

//path = /register/student/password
function StudentPasswordRegistration() {
  const { userStudentNumber } = useContext(UserStudentNumber);
  const { userStudentPassword, setuserStudentPassword } = useContext(
    UserStudentPassword
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
    setuserStudentPassword(passwordInput);
    history.push("/register/student/confirm");
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
              label="Student Number"
              name="studentNumber"
              value={userStudentNumber}
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

export default StudentPasswordRegistration;
