import { React, useState, useEffect } from "react";
import Button from "../button/Button.jsx";
import classses from "./Form.module.css";

const Form = ({ create }) => {
  const [task, setTask] = useState("");

  const maxLength = 200;

  const addNewTask = (e) => {
    e.preventDefault();
    const newTask = { id: Date.now(), task: task, active: false };
    if (task.length > 0 && task.trim() !== "") create(newTask);
    setTask("");
  };

  useEffect(() => {
    if (task[task.length - 1] == "\n") {
      const newTask = { id: Date.now(), task: task, active: false };
      if (task.length > 0 && task.trim() !== "") {
        create(newTask);
        setTask("");
      }
    }
    if (task.length >= maxLength) {
      setTask(task.substr(0, maxLength));
    }
  }, [task]);

  return (
    <div id="form">
      <form className={classses.form_container}>
        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          type="text"
          placeholder="Запланируйте задачу на сессию"
          className={classses.form_textarea}
        ></textarea>
        <Button
          classNames={
            (task.trim() == "" ? classses.form_button__inactive : "") +
            " " +
            classses.form_button
          }
          onClick={addNewTask}
        />
      </form>
    </div>
  );
};

export default Form;
