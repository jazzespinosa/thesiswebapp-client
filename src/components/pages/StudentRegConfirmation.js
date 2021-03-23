import React, { useContext, useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import Axios from "axios";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import FormControls from "../FormControls";
import {
  UserStudentNumber,
  UserStudentPassword,
  UserStudentLastname,
  UserStudentFirstName,
  UserStudentMiddleName,
  UserStudentCourse,
  UserStudentYear,
  UserStudentSection,
  UserStudentPhNumber,
} from "../UserDetailsContext";

//path = /register/student/confirm
function StudentRegistrationConfirmation() {
  const { userStudentNumber, setUserStudentNumber } = useContext(
    UserStudentNumber
  );
  const { userStudentPassword, setuserStudentPassword } = useContext(
    UserStudentPassword
  );
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

    Axios.post("http://localhost:8000/insert/student", {
      studentNumber: userStudentNumber,
      studentPassword: userStudentPassword,
      lastname: lastName,
      firstName: firstName,
      middleName: middleName,
      course: course,
      year: year,
      section: section,
      phNumber: phNumber,
    }).then(() => {
      setLastName(lastName);
      setFirstName(firstName);
      setMiddleName(middleName);
      setCourse(course);
      setYear(year);
      setSection(section);
      setPhNumber(phNumber);
    });
    // history.push("");
  };

  useEffect(() => {
    setLastName(lastName);
    setFirstName(firstName);
    setMiddleName(middleName);
    setCourse(course);
    setYear(year);
    setSection(section);
    setPhNumber(phNumber);
  }, [lastName, firstName, middleName, course, year, section, phNumber]);

  const [editInputLN, setEditInputLN] = useState(false);
  const [disabledLN, setDisabledLN] = useState(true);
  const linkLastName = editInputLN ? "Confirm" : "Edit";
  const [editInputFN, setEditInputFN] = useState(false);
  const [disabledFN, setDisabledFN] = useState(true);
  const linkFirstName = editInputFN ? "Confirm" : "Edit";
  const [editInputMN, setEditInputMN] = useState(false);
  const [disabledMN, setDisabledMN] = useState(true);
  const linkMiddleName = editInputMN ? "Confirm" : "Edit";
  const [editInputCourse, setEditInputCourse] = useState(false);
  const [disabledCourse, setDisabledCousrse] = useState(true);
  const linkCourse = editInputCourse ? "Confirm" : "Edit";
  const [editInputYear, setEditInputYear] = useState(false);
  const [disabledYear, setDisabledYear] = useState(true);
  const linkYear = editInputYear ? "Confirm" : "Edit";
  const [editInputSection, setEditInputSection] = useState(false);
  const [disabledSection, setDisabledSection] = useState(true);
  const linkSection = editInputSection ? "Confirm" : "Edit";
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
            label="Course"
            name="course"
            onChange={formik.handleChange}
            disabled={disabledCourse}
          />
          <p
            onClick={() => {
              setCourse(formik.values.course);
              setDisabledCousrse(!disabledCourse);
              setEditInputCourse(!editInputCourse);
            }}
          >
            <div>
              <pre>{linkCourse}</pre>
            </div>
          </p>

          <FormControls
            control="select"
            label="Year"
            name="selectOption"
            onChange={formik.handleChange}
            options={dropdownOptions}
            disabled={disabledYear}
          />
          <p
            onClick={() => {
              setYear(formik.values.selectOption);
              setDisabledYear(!disabledYear);
              setEditInputYear(!editInputYear);
            }}
          >
            <div>
              <pre>{linkYear}</pre>
            </div>
          </p>

          <FormControls
            control="input"
            type="text"
            label="Section"
            name="section"
            onChange={formik.handleChange}
            disabled={disabledSection}
          />
          <p
            onClick={() => {
              setSection(formik.values.section);
              setDisabledSection(!disabledSection);
              setEditInputSection(!editInputSection);
            }}
          >
            <div>
              <pre>{linkSection}</pre>
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
                disabledCourse &&
                disabledYear &&
                disabledSection &&
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

export default StudentRegistrationConfirmation;
