import React from "react";
import Button from "../button/Button.jsx";
import classses from "./Form.module.css";

const Form = ({ ...props }) => {
  return (
    <div id="form">
      <form className={classses.form_container}>
        <input {...props} className={classses.form_input}></input>
        <Button classNames={classses.form_button} />
      </form>
    </div>
  );
};

export default Form;
