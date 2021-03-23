import React from "react";
import Input from "./Input";
import Select from "./Select";

function FormControls(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
    case "select":
      return <Select {...rest} />;
    case "radio":
    case "checkbox":
    case "date":
    default:
      return null;
  }
}

export default FormControls;
