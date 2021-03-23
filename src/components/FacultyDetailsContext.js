import React, { useState, createContext, useMemo } from "react";

export const UserFacultyID = createContext(null);
export const UserFacultyPassword = createContext(null);
export const UserFacultyLastname = createContext(null);
export const UserFacultyFirstName = createContext(null);
export const UserFacultyMiddleName = createContext(null);
export const UserFacultyPhNumber = createContext(null);

export const UserFacultyDetailsProvider = (props) => {
  const [userFacultyNumber, setUserFacultyNumber] = useState("");
  const valueFacultyNumber = useMemo(
    () => ({ userFacultyNumber, setUserFacultyNumber }),
    [userFacultyNumber, setUserFacultyNumber]
  );
  const [userFacultyPassword, setuserFacultyPassword] = useState("");
  const valueFacultyPassword = useMemo(
    () => ({ userFacultyPassword, setuserFacultyPassword }),
    [userFacultyPassword, setuserFacultyPassword]
  );
  const [lastName, setLastName] = useState("");
  const valueFacultyLastName = useMemo(() => ({ lastName, setLastName }), [
    lastName,
    setLastName,
  ]);
  const [firstName, setFirstName] = useState("");
  const valueFacultyFirstName = useMemo(() => ({ firstName, setFirstName }), [
    firstName,
    setFirstName,
  ]);
  const [middleName, setMiddleName] = useState("");
  const valueFacultyMiddleName = useMemo(
    () => ({ middleName, setMiddleName }),
    [middleName, setMiddleName]
  );
  const [phNumber, setPhNumber] = useState("");
  const valueFacultyPhNumber = useMemo(() => ({ phNumber, setPhNumber }), [
    phNumber,
    setPhNumber,
  ]);

  return (
    <UserFacultyID.Provider value={valueFacultyNumber}>
      <UserFacultyPassword.Provider value={valueFacultyPassword}>
        <UserFacultyLastname.Provider value={valueFacultyLastName}>
          <UserFacultyFirstName.Provider value={valueFacultyFirstName}>
            <UserFacultyMiddleName.Provider value={valueFacultyMiddleName}>
              <UserFacultyPhNumber.Provider value={valueFacultyPhNumber}>
                {props.children}
              </UserFacultyPhNumber.Provider>
            </UserFacultyMiddleName.Provider>
          </UserFacultyFirstName.Provider>
        </UserFacultyLastname.Provider>
      </UserFacultyPassword.Provider>
    </UserFacultyID.Provider>
  );
};
