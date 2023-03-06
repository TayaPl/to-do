import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import Todo from "./Todo";
import "../styles/Focus.css";

const States = {
  default: "default",
  work: "work",
  breakup: "breakup",
  wait_work: "wait_work",
  wait_breakup: "wait_breakup",
};

const Focus = () => {
  const [isWorking, SetWorking] = useState(
    JSON.parse(localStorage.getItem("working")) !== null
      ? Boolean(JSON.parse(localStorage.getItem("working")))
      : false
  );
  const [status, SetStatus] = useState(
    JSON.parse(localStorage.getItem("status")) !== null
      ? JSON.parse(localStorage.getItem("status"))
      : States.default
  ); //статус, в котором находится программа
  const [tasks, SetTasks] = useState(
    // [{ id: 1, task: "task", active: false },{ id: 2, task: "task2", active: true },]
    JSON.parse(localStorage.getItem("tasks")) !== null
      ? JSON.parse(localStorage.getItem("tasks"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // console.log("tasks " + tasks);
  }, [tasks]);
  useEffect(() => {
    localStorage.setItem("working", JSON.stringify(isWorking));
    // console.log("isWorking " + isWorking);
  }, [isWorking]);
  useEffect(() => {
    localStorage.setItem("status", JSON.stringify(status));
    // console.log("status " + status);
  }, [status]);

  return (
    <div id="focus">
      <Timer
        isWorking={isWorking}
        SetWorking={(el) => SetWorking(el)}
        status={status}
        SetStatus={(el) => SetStatus(el)}
        States={States}
        tasksLength={tasks.length}
      />
      {status == States.default ||
      status == States.work ||
      status == States.wait_work ? (
        <Todo
          status={status}
          States={States}
          tasks={tasks}
          SetTasks={(el) => SetTasks(el)}
        />
      ) : null}
    </div>
  );
};

export default Focus;
