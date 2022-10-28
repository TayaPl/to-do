import React from "react";
import Task from "./Task";
import "../styles/TaskList.css";
import { Reorder } from "framer-motion";

const TaskList = ({ tasks, removeTask, sort, setTasks }) => {
  return (
    <div id="taskList" className="taskList">
      <Reorder.Group axys="y" values={tasks} onReorder={setTasks}>
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
      </Reorder.Group>
    </div>
  );
};

export default TaskList;
