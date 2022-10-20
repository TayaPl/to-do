import React, { useState, useEffect } from "react";
import Button from "./UI/button/Button.jsx";
import "../styles/Task.css";

const Task = ({ children, task, tasks, removeTask, sort, ...props }) => {
  const [isActive, setActive] = useState(task?.active);
  useEffect(() => {
    sort();
    localStorage.setItem(
      "tasks",
      JSON.stringify(
        tasks.map((t) => (t.id === task.id ? { ...t, active: t.active } : t))
      )
    );
  }, [isActive]);

  const handleToggle = () => {
    task.active = !task.active;
    setActive(task.active);
  };

  return (
    <div id="task" className="task">
      <div className="task_container">
        <Button
          classNames={(isActive ? "task_button__active" : "") + " task_button"}
          onClick={handleToggle}
          onContextMenu={(e) => {
            removeTask(task);
            e.preventDefault();
            return false;
          }}
        ></Button>
        <div className={(isActive ? "task_text__active" : "") + " task_text"}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Task;
