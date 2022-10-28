import React, { useState, useEffect } from "react";
import Button from "./UI/button/Button.jsx";
import "../styles/Task.css";
import { Reorder } from "framer-motion";

const Task = ({ children, task, tasks, removeTask, sort, ...props }) => {
  const [isActive, setActive] = useState(task?.active);
  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(
        tasks.map((t) => (t.id === task.id ? { ...t, active: t.active } : t))
      )
    );
    sort(JSON.parse(localStorage.getItem("tasks")));
  }, [isActive]);

  const handleToggle = () => {
    if (!JSON.parse(localStorage.getItem("working"))) {
      task.active = !task.active;
      setActive(task.active);
    }
  };

  return (
    <Reorder.Item
      key={task}
      value={task}
      whileDrag={{
        scale: 1.1,
        backgroundColor: "white",
        boxShadow: "rgba(0,0,0,0.12) 0px 1px 3px, rgba(0,0,0,0.24) 0px 1px 2px",
      }}
    >
      <div id="task" className="task">
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
    </Reorder.Item>
  );
};

export default Task;
