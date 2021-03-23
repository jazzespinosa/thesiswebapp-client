import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import FormControls from "../FormControls";
import {
  UserStudentNumber,
  UserStudentLastname,
  UserStudentFirstName,
  UserStudentMiddleName,
  UserStudentCourse,
  UserStudentYear,
  UserStudentSection,
  UserStudentPhNumber,
} from "../UserDetailsContext";

//path = "/register/student/details"
function StudentDetailsRegistration() {
  const { userStudentNumber } = useContext(UserStudentNumber);
  const { lastName, setLastName } = useContext(UserStudentLastname);
  const { firstName, setFirstName } = useContext(UserStudentFirstName);
  const { middleName, setMiddleName } = useContext(UserStudentMiddleName);
  const { course, setCourse } = useContext(UserStudentCourse);
  const { year, setYear } = useContext(UserStudentYear);
  const { section, setSection } = useContext(UserStudentSection);
  const { phNumber, setPhNumber } = useContext(UserStudentPhNumber);
  const history = useHistory();

  const initialValues = {
    studentNumber: userStudentNumber,
    lastName: lastName,
    firstName: firstName,
    middleName: middleName,
    course: course,
    selectOption: year,
    section: section,
    phoneNumber: phNumber,
  };

  const dropdownOptions = [
    { key: "Select year", value: "" },
    { key: "First Year", value: "1" },
    { key: "Second Year", value: "2" },
    { key: "Third Year", value: "3" },
    { key: "Fourth Year", value: "4" },
    { key: "Fifth Year", value: "5" },
  ];

  const phoneRegExp = /^\s*(\d{11})\s*$/;

  const validationSchema = Yup.object({
    lastName: Yup.string()
      .required("Required")
      .max(32, "Must be 32 characters or less"),
    firstName: Yup.string()
      .required("Required")
      .max(32, "Must be 32 characters or less"),
    middleName: Yup.string().max(32, "Must be 32 characters or less"),
    course: Yup.string()
      .required("Required")
      .max(32, "Must be 32 characters or less"),
    selectOption: Yup.string().required("Required"),
    section: Yup.string()
      .required("Required")
      .max(32, "Must be 32 characters or less"),
    phoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  });

  const onSubmit = (values) => {
    console.log(values);

    let formData = {
      input1: values.lastName,
      input2: values.firstName,
      input3: values.middleName,
      input4: values.course,
      input5: values.selectOption,
      input6: values.section,
      input7: values.phoneNumber,
    };
    const { input1, input2, input3, input4, input5, input6, input7 } = formData;

    setLastName(input1);
    setFirstName(input2);
    setMiddleName(input3);
    setCourse(input4);
    setYear(input5);
    setSection(input6);
    setPhNumber(input7);
    history.push("/register/student/password");
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
            label="Student Number"
            name="studentNumber"
            value={userStudentNumber}
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
            label="Course"
            name="course"
          />

          <FormControls
            control="select"
            label="Year"
            name="selectOption"
            options={dropdownOptions}
          />

          <FormControls
            control="input"
            type="text"
            label="Section"
            name="section"
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

export default StudentDetailsRegistration;
