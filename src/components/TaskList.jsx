import React from "react";
import Task from "./Task";

const TaskList = ({ tasks, removeTask }) => {
  return (
    <div id="taskList" className="taskList">
      {tasks?.map((t) => (
        <Task key={t.id} task={t} tasks={tasks} removeTask={removeTask}>
          {t.task}
        </Task>
      ))}
    </div>
  );
};

export default TaskList;
