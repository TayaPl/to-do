import React from "react";
import Button from "./UI/button/Button.jsx";
import "../styles/Task.css";

const Task = ({ children, ...props }) => {
  return (
    <div id="task" className="task">
      <div className="task_container">
        <Button classNames="task_button"></Button>
        <div className="task_text">Я задача</div>
      </div>
    </div>
  );
};

export default Task;
