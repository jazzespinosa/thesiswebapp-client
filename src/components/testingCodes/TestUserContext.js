import React, { useState } from "react";

function TestUserContext() {
  const [input, setInput] = useState({ Input1: "", Input2: "" });
  const [button, setButton] = useState("Button");
  console.log(input);

  const _handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  //   function _handleSubmit(e) {
  //     e.preventDefault();
  //     setInput({ Input1: "", Input2: "" });
  //     setButton("Submitted");
  //     setTimeout(() => setButton("Button"), 1000);
  //     console.log("Submitted");
  //   }

  return (
    <form>
      <input
        type={"text"}
        placeholder={"Input1"}
        name={"Input1"}
        onChange={_handleChange}
      />
      <input
        type={"text"}
        placeholder={"Input2"}
        name={"Input2"}
        onChange={_handleChange}
      />
      <button text="Save" type="submit">
        {button}
      </button>
    </form>
  );
}

export default TestUserContext;
