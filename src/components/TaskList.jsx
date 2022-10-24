import React from "react";
import Task from "./Task";

const TaskList = ({ tasks, removeTask, sort }) => {
  return (
    <div id="taskList" className="taskList">
      {tasks?.map((t) => (
        <Task
          key={t.id}
          task={t}
          tasks={tasks}
          removeTask={removeTask}
          sort={sort}
        >
          {t.task}
        </Task>
      ))}
    </div>
  );
};

export default TaskList;
