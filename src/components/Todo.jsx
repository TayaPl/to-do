import { React, useState, useEffect } from "react";
import Form from "./UI/form/Form.jsx";
import Button from "./UI/button/Button.jsx";
import TaskList from "./TaskList";
import "../styles/Todo.css";

const Todo = ({ status, States, tasks, SetTasks }) => {
  const createTask = (newTask) => {
    if (tasks.length < 7 && !JSON.parse(localStorage.getItem("working")))
      SetTasks([newTask, ...tasks]);
    else
      alert(
        "Ученые выяснили, что за раз человек лучше запоминает 5-9 единиц информации. Постарайтесь сосредоточиться на небольшом количестве задач!"
      );
  };
  const removeTask = (task) => {
    if (!JSON.parse(localStorage.getItem("working")))
      SetTasks(tasks.filter((t) => t.id !== task.id));
  };
  const resetTasks = () => {
    // setTasks([]);
    if (!JSON.parse(localStorage.getItem("working"))) {
      const active_tasks = tasks.filter((t) => t.active === false);
      const unactive_tasks = tasks.filter((t) => t.active === true);
      console.log(unactive_tasks.length);
      if (unactive_tasks.length <= 0) {
        const conf = window.confirm(
          "В ToDo остались только активные задачи. Вы уверенны, что хотите их очистить?"
        );
        if (conf) SetTasks([]);
      } else SetTasks(active_tasks);
    }
  };
  const sortTasks = (tasks_sort) => {
    SetTasks(
      tasks_sort.sort(function (x, y) {
        return x.active === y.active ? 0 : x.active ? 1 : -1;
      })
    );
  };

  return (
    <div id="todo" className="todo">
      {status == States.default || status == States.wait_work ? (
        <Form create={createTask}></Form>
      ) : null}
      <TaskList
        tasks={tasks}
        removeTask={removeTask}
        sort={sortTasks}
        setTasks={SetTasks}
      />
      {(status == States.default || status == States.wait_work) &&
      tasks.length > 0 ? (
        <Button classNames=" todo_reset" onClick={resetTasks}>
          очистить
        </Button>
      ) : null}
    </div>
  );
};

export default Todo;
