import React from "react";
import Form from "./UI/form/Form.jsx";
import Task from "./Task.jsx";
import "../styles/Todo.css";

const Todo = () => {
  return (
    <div id="todo" className="todo">
      <h1>ToDo</h1>
      <Form type="text" placeholder="Запланируйте задачу на сессию"></Form>
      <Task />
      <Task />
      <Task />
      <Task />
    </div>
  );
};

export default Todo;
