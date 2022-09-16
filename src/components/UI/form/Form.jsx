import { React, useState } from "react";
import Button from "../button/Button.jsx";
import classses from "./Form.module.css";

const Form = ({ create }) => {
  const [task, setTask] = useState("");

  const addNewTask = (e) => {
    e.preventDefault();
    const newTask = { id: Date.now(), task: task, active: false };
    if (task.length > 0 && task.trim() !== "") create(newTask);
    setTask("");
  };

  return (
    <div id="form">
      <form className={classses.form_container}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          type="text"
          placeholder="Запланируйте задачу на сессию"
          className={classses.form_input}
        ></input>
        <Button classNames={classses.form_button} onClick={addNewTask} />
      </form>
    </div>
  );
};

export default Form;
