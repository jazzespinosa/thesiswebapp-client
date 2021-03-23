import React, { useState, createContext, useMemo } from "react";

export const UserLoginStudentNumber = createContext(null);
export const UserLoginPassword = createContext(null);
export const UserLoginLastname = createContext(null);
export const UserLoginFirstName = createContext(null);
export const UserLoginMiddleName = createContext(null);
export const UserLoginCourse = createContext(null);
export const UserLoginYear = createContext(null);
export const UserLoginSection = createContext(null);
export const UserLoginPhNumber = createContext(null);

export const UserLoginProvider = (props) => {
  const [loginStudentNumber, setloginStudentNumber] = useState("");
  const valueLoginStudentNumber = useMemo(
    () => ({ loginStudentNumber, setloginStudentNumber }),
    [loginStudentNumber, setloginStudentNumber]
  );
  const [loginStudentPassword, setLoginStudentPassword] = useState("");
  const valueLoginStudentPassword = useMemo(
    () => ({ loginStudentPassword, setLoginStudentPassword }),
    [loginStudentPassword, setLoginStudentPassword]
  );
  const [loginLastName, setLoginLastName] = useState("");
  const valueLoginLastName = useMemo(
    () => ({ loginLastName, setLoginLastName }),
    [loginLastName, setLoginLastName]
  );
  const [loginFirstName, setLoginFirstName] = useState("");
  const valueLoginFirstName = useMemo(
    () => ({ loginFirstName, setLoginFirstName }),
    [loginFirstName, setLoginFirstName]
  );
  const [loginMiddleName, setLoginMiddleName] = useState("");
  const valueLoginMiddleName = useMemo(
    () => ({ loginMiddleName, setLoginMiddleName }),
    [loginMiddleName, setLoginMiddleName]
  );
  const [loginCourse, setLoginCourse] = useState("");
  const valueLoginCourse = useMemo(() => ({ loginCourse, setLoginCourse }), [
    loginCourse,
    setLoginCourse,
  ]);
  const [loginYear, setLoginYear] = useState("");
  const valueLoginYear = useMemo(() => ({ loginYear, setLoginYear }), [
    loginYear,
    setLoginYear,
  ]);
  const [loginSection, setLoginSection] = useState("");
  const valueLoginSection = useMemo(() => ({ loginSection, setLoginSection }), [
    loginSection,
    setLoginSection,
  ]);
  const [loginPhNumber, setLoginPhNumber] = useState("");
  const valueLoginPhNumber = useMemo(
    () => ({ loginPhNumber, setLoginPhNumber }),
    [loginPhNumber, setLoginPhNumber]
  );

  return (
    <UserLoginStudentNumber.Provider value={valueLoginStudentNumber}>
      <UserLoginPassword.Provider value={valueLoginStudentPassword}>
        <UserLoginLastname.Provider value={valueLoginLastName}>
          <UserLoginFirstName.Provider value={valueLoginFirstName}>
            <UserLoginMiddleName.Provider value={valueLoginMiddleName}>
              <UserLoginCourse.Provider value={valueLoginCourse}>
                <UserLoginYear.Provider value={valueLoginYear}>
                  <UserLoginSection.Provider value={valueLoginSection}>
                    <UserLoginPhNumber.Provider value={valueLoginPhNumber}>
                      {props.children}
                    </UserLoginPhNumber.Provider>
                  </UserLoginSection.Provider>
                </UserLoginYear.Provider>
              </UserLoginCourse.Provider>
            </UserLoginMiddleName.Provider>
          </UserLoginFirstName.Provider>
        </UserLoginLastname.Provider>
      </UserLoginPassword.Provider>
    </UserLoginStudentNumber.Provider>
  );
};
