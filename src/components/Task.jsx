import React, { useState } from "react";
import Button from "./UI/button/Button.jsx";
import "../styles/Task.css";

const Task = ({ children, ...props }) => {
  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <div id="task" className="task">
      <div className="task_container">
        <Button
          classNames={(!isActive ? "task_button__active" : "") + " task_button"}
          onClick={handleToggle}
        ></Button>
        <div className={(!isActive ? "task_text__active" : "") + " task_text"}>
          Я задача
        </div>
      </div>
    </div>
  );
};

export default Task;
