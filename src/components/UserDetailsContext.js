import React, { useState, createContext, useMemo } from "react";

export const UserStudentNumber = createContext(null);
export const UserStudentPassword = createContext(null);
export const UserStudentLastname = createContext(null);
export const UserStudentFirstName = createContext(null);
export const UserStudentMiddleName = createContext(null);
export const UserStudentCourse = createContext(null);
export const UserStudentYear = createContext(null);
export const UserStudentSection = createContext(null);
export const UserStudentPhNumber = createContext(null);

export const UserStudentDetailsProvider = (props) => {
  const [userStudentNumber, setUserStudentNumber] = useState("");
  const valueStudentNumber = useMemo(
    () => ({ userStudentNumber, setUserStudentNumber }),
    [userStudentNumber, setUserStudentNumber]
  );
  const [userStudentPassword, setuserStudentPassword] = useState("");
  const valueStudentPassword = useMemo(
    () => ({ userStudentPassword, setuserStudentPassword }),
    [userStudentPassword, setuserStudentPassword]
  );
  const [lastName, setLastName] = useState("");
  const valueStudentLastName = useMemo(() => ({ lastName, setLastName }), [
    lastName,
    setLastName,
  ]);
  const [firstName, setFirstName] = useState("");
  const valueStudentFirstName = useMemo(() => ({ firstName, setFirstName }), [
    firstName,
    setFirstName,
  ]);
  const [middleName, setMiddleName] = useState("");
  const valueStudentMiddleName = useMemo(
    () => ({ middleName, setMiddleName }),
    [middleName, setMiddleName]
  );
  const [course, setCourse] = useState("");
  const valueStudentCourse = useMemo(() => ({ course, setCourse }), [
    course,
    setCourse,
  ]);
  const [year, setYear] = useState("");
  const valueStudentYear = useMemo(() => ({ year, setYear }), [year, setYear]);
  const [section, setSection] = useState("");
  const valueStudentSection = useMemo(() => ({ section, setSection }), [
    section,
    setSection,
  ]);
  const [phNumber, setPhNumber] = useState("");
  const valueStudentPhNumber = useMemo(() => ({ phNumber, setPhNumber }), [
    phNumber,
    setPhNumber,
  ]);

  return (
    <UserStudentNumber.Provider value={valueStudentNumber}>
      <UserStudentPassword.Provider value={valueStudentPassword}>
        <UserStudentLastname.Provider value={valueStudentLastName}>
          <UserStudentFirstName.Provider value={valueStudentFirstName}>
            <UserStudentMiddleName.Provider value={valueStudentMiddleName}>
              <UserStudentCourse.Provider value={valueStudentCourse}>
                <UserStudentYear.Provider value={valueStudentYear}>
                  <UserStudentSection.Provider value={valueStudentSection}>
                    <UserStudentPhNumber.Provider value={valueStudentPhNumber}>
                      {props.children}
                    </UserStudentPhNumber.Provider>
                  </UserStudentSection.Provider>
                </UserStudentYear.Provider>
              </UserStudentCourse.Provider>
            </UserStudentMiddleName.Provider>
          </UserStudentFirstName.Provider>
        </UserStudentLastname.Provider>
      </UserStudentPassword.Provider>
    </UserStudentNumber.Provider>
  );
};
