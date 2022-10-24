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
  const [isWorking, SetWorking] = useState(
    JSON.parse(localStorage.getItem("working")) !== null
      ? Boolean(JSON.parse(localStorage.getItem("working")))
      : false
  );
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    console.log("working " + isWorking);
    localStorage.setItem("working", JSON.stringify(isWorking));
  }, [isWorking]);

  const createTask = (newTask) => {
    if (tasks.length < 12 && !JSON.parse(localStorage.getItem("working")))
      setTasks([newTask, ...tasks]);
  };
  const removeTask = (task) => {
    if (!JSON.parse(localStorage.getItem("working")))
      setTasks(tasks.filter((t) => t.id !== task.id));
  };
  const resetTasks = () => {
    // setTasks([]);
    if (!JSON.parse(localStorage.getItem("working"))) {
      const active_tasks = tasks.filter((t) => t.active === false);
      const unactive_tasks = tasks.filter((t) => t.active === true);
      console.log(unactive_tasks.length);
      if (unactive_tasks.length <= 0) {
        const conf = window.confirm(
          "В ToDo остались только активные задачи. Вы уверенны, что хотите их очиститЬ?"
        );
        if (conf) setTasks([]);
      } else setTasks(active_tasks);
    }
  };
  const sortTasks = (tasks_sort) => {
    setTasks(
      tasks_sort.sort(function (x, y) {
        console.log("hello!");
        return x.active === y.active ? 0 : x.active ? 1 : -1;
      })
    );
  };

  return (
    <div id="todo" className="todo">
      <h1>ToDo</h1>
      {!isWorking ? <Form create={createTask}></Form> : <div id="form"></div>}
      <TaskList tasks={tasks} removeTask={removeTask} sort={sortTasks} />
      {!isWorking ? (
        <Button
          classNames={
            (tasks.length > 0 ? "" : "todo__inactive") + " todo_reset"
          }
          onClick={resetTasks}
        >
          очистить
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Todo;
