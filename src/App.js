import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Modal from "react-modal";
import StudentLogin from "./components/pages/StudentLogin";
import StudentDetailsRegistration from "./components/pages/StudentDetailsRegistration";
import StudentPasswordRegistration from "./components/pages/StudentPasswordRegistration";
import LoginSelection from "./components/pages/LoginSelection";
import StudentNumberRegistration from "./components/pages/StudentNumberRegistration";
import ErrorPage from "./components/pages/ErrorPage";
import TestComponent from "./components/testingCodes/TestComponent";
import TestCode from "./components/testingCodes/TestCode";
import TestUserContext from "./components/testingCodes/TestUserContext";
import SignUpSelection from "./components/pages/SignUpSelection";
import { UserStudentDetailsProvider } from "./components/UserDetailsContext";
import StudentRegistrationConfirmation from "./components/pages/StudentRegConfirmation";
import { UserFacultyDetailsProvider } from "./components/FacultyDetailsContext";
import FacultyDetailsRegistration from "./components/pages/FacultyDetailsRegistration";
import FacultyPasswordRegistrarion from "./components/pages/FacultyPasswordRegistrarion";
import FacultyRegConfirmation from "./components/pages/FacultyRegConfirmation";
import { UserLoginProvider } from "./components/UserLoginContext";
import StudentPage from "./components/pages/StudentPage";

//path = "/"
function App() {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [signUpModalIsOpen, setSignUpModalIsOpen] = useState(false);

  const Home = () => (
    <div>
      <h1>Welcome</h1>
      <br />
      {/* <TestCode /> */}
      <button onClick={() => setLoginModalIsOpen(true)}>Login</button>
      <Modal
        isOpen={loginModalIsOpen}
        onRequestClose={() => setLoginModalIsOpen(false)}
      >
        <LoginSelection />
        {/* <TestCode /> */}
        <button onClick={() => setLoginModalIsOpen(false)}>Back</button>
      </Modal>
      <br />
      <button onClick={() => setSignUpModalIsOpen(true)}>Sign Up</button>
      <Modal
        isOpen={signUpModalIsOpen}
        onRequestClose={() => setSignUpModalIsOpen(false)}
      >
        <SignUpSelection />
        <button onClick={() => setSignUpModalIsOpen(false)}>Back</button>
      </Modal>
    </div>
  );

  return (
    <Router>
      <header>
        <h1>LPU LAB APP</h1>
      </header>
      {/* <TestCode /> */}
      {/* <TestComponent /> */}
      <div className="App">
        {/* <LoginSelection/> */}
        {/* <StudentLogin/> */}
        {/* <StudentNumberRegistration/> */}
        {/* <StudentDetailsRegistration/> */}
        {/* <StudentPasswordRegistration/> */}
        <UserStudentDetailsProvider>
          <UserFacultyDetailsProvider>
            <UserLoginProvider>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={LoginSelection} />
                <Route
                  path="/register/student/details"
                  exact
                  component={StudentDetailsRegistration}
                />
                <Route
                  path="/register/faculty/details"
                  exact
                  component={FacultyDetailsRegistration}
                />
                <Route
                  path="/register/student/password"
                  exact
                  component={StudentPasswordRegistration}
                />
                <Route
                  path="/register/faculty/password"
                  exact
                  component={FacultyPasswordRegistrarion}
                />
                <Route
                  path="/register/student/confirm"
                  exact
                  component={StudentRegistrationConfirmation}
                />
                <Route
                  path="/register/faculty/confirm"
                  exact
                  component={FacultyRegConfirmation}
                />
                <Route path="/profile/student" exact component={StudentPage} />
                <Route exact component={ErrorPage} />
              </Switch>
            </UserLoginProvider>
          </UserFacultyDetailsProvider>
        </UserStudentDetailsProvider>
      </div>
    </Router>
  );
}

export default App;
