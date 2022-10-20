import React from "react";
import classes from "./Button.module.css";

const Button = ({ children, classNames, ...props }) => {
  return (
    <button
      onContextMenu={(e) => {
        e.preventDefault();
        return false;
      }}
      {...props}
      className={classes.button + " " + classNames}
    >
      {children}
    </button>
  );
};

export default Button;
