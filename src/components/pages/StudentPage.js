import React, { useContext } from "react";
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

//path = /profile/student
function StudentPage() {
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

  // const middleInitial = loginMiddleName.charAt(0);

  return (
    <div>
      <h2>
        Hi {loginFirstName} {loginMiddleName} {loginLastName}!
      </h2>
      <h3>Student Number : {loginStudentNumber}</h3>
      <h3>Course : {loginCourse}</h3>
      <h3>Year : {loginYear}</h3>
      <h3>Section : {loginSection}</h3>
      <h3>Phone Number : {loginPhNumber}</h3>
    </div>
  );
}

export default StudentPage;
