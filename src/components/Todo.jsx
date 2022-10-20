import { React, useState, useEffect } from "react";
import Form from "./UI/form/Form.jsx";
import Button from "./UI/button/Button.jsx";
import TaskList from "./TaskList";
import "../styles/Todo.css";

const Todo = () => {
  const [tasks, setTasks] = useState(
    // [{ id: 1, task: "task", active: false },{ id: 2, task: "task2", active: true },]
    JSON.parse(localStorage.getItem("tasks")) !== null
      ? JSON.parse(localStorage.getItem("tasks"))
      : []
  );
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const createTask = (newTask) => {
    if(tasks.length < 12)
      setTasks([newTask, ...tasks]);
  };
  const removeTask = (task) => {
    setTasks(tasks.filter((t) => t.id !== task.id));
  };
  const resetTasks = () => {
    // setTasks([]);
    setTasks(tasks.filter((t) => t.active === false));
  };
  const sortTasks = () => {
    setTasks(tasks.sort(function(x, y) {
      console.log('hello!')
      return (x.active === y.active) ? 0 : x.active ? 1 : -1;
  }))
  }

  return (
    <div id="todo" className="todo">
      <h1>ToDo</h1>
      <Form create={createTask}></Form>
      <TaskList tasks={tasks} removeTask={removeTask} sort={sortTasks}/>
      <Button
        classNames={(tasks.length > 0 ? "" : "todo__inactive") + " todo_reset"}
        onClick={resetTasks}
      >
        очистить
      </Button>
    </div>
  );
};

export default Todo;
