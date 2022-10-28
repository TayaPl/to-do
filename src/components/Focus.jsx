import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import Todo from "./Todo";
import "../styles/Focus.css";

const Focus = () => {
  const [isWorking, SetWorking] = useState(
    JSON.parse(localStorage.getItem("working")) !== null
      ? Boolean(JSON.parse(localStorage.getItem("working")))
      : false
  );
  useEffect(() => {
    localStorage.setItem("working", JSON.stringify(isWorking));
  }, [isWorking]);
  const setter = (el) => {
    SetWorking(el);
  };
  return (
    <div id="focus">
      <Timer isWorking={isWorking} SetWorking={setter} />
      <Todo isWorking={isWorking} SetWorking={setter} />
    </div>
  );
};

export default Focus;
