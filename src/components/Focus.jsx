import React from "react";
import Pomodoro from "./Pomodoro";
import Todo from "./Todo";
import "../styles/Focus.css";

const Focus = () => {
  return (
    <div id="focus">
      <Pomodoro />
      <Todo />
    </div>
  );
};

export default Focus;
