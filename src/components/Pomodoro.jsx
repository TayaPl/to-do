import React, { useState, useEffect } from "react";
import Button from "./UI/button/Button.jsx";
import "../styles/Pomodoro.css";

const States = {
  default: "default",
  work: "work",
  wait: "wait"
};

const Pomodoro = function () {
  //время
  const [work, SetWork] = useState(
    JSON.parse(localStorage.getItem("work")) !== null
      ? parseInt(JSON.parse(localStorage.getItem("work")))
      : 0
  ); //время работы
  const [breakup, SetBreakup] = useState(
    JSON.parse(localStorage.getItem("breakup")) !== null
      ? parseInt(JSON.parse(localStorage.getItem("breakup")))
      : 0
  ); //время отдыха
  const [round, SetRound] = useState(
    JSON.parse(localStorage.getItem("round")) !== null
      ? parseInt(JSON.parse(localStorage.getItem("round")))
      : 0
  ); //количество повторов
  const [isWorking, SetWorking] = useState(
    JSON.parse(localStorage.getItem("working")) !== null
      ? Boolean(JSON.parse(localStorage.getItem("working")))
      : false
  );
  const [status, SetStatus] = useState(
    JSON.parse(localStorage.getItem("status")) !== undefined
      ? JSON.parse(localStorage.getItem("status"))
      : States.wait
  );

  useEffect(() => {
    resetPomodoro()
  }, []);
  useEffect(() => {
    localStorage.setItem("work", JSON.stringify(work));
    console.log("work " + work)
  }, [work]);
  useEffect(() => {
    localStorage.setItem("breakup", JSON.stringify(breakup));
    console.log("breakup " + breakup)
  }, [breakup]);
  useEffect(() => {
    localStorage.setItem("round", JSON.stringify(round));
  }, [round]);
  useEffect(() => {
    localStorage.setItem("working", JSON.stringify(isWorking));
  }, [isWorking]);
  useEffect(() => {
    if(status == States.work)
      SetWorking(true)
    else
      SetWorking(false)
    localStorage.setItem("status", JSON.stringify(status));
  }, [status]);

  const twoNum = (n) => {
    if (String(n).length < 2) {
      return "0" + n;
    }
    return n;
  };

  const iteraction = () =>{
    console.log("зашла в setInterval")
    if(work > 0){
      console.log("зашла в work > 0 " + work)
      SetWork((work) => work - 1)}
    else if (work == 0 && breakup != 0){
      console.log("зашла в work == 0 && breakup != 0")
      SetBreakup((breakup) => breakup - 1)
    }
    else{
      console.log("отмена"); 
      clearInterval(window.timerId);
      resetPomodoro();
    }
  }

  const timer = () => {
    console.log("зашла в таймер")
    if(status == States.default || status == States.wait){
      console.log("зашла в default wait")
      SetStatus(States.work)
      window.timerId = setInterval(iteraction, 1000);
    }
    else if(status == States.work){
      console.log("зашла в work")
      clearInterval(window.timerId)
      SetStatus(States.wait)
    }
  }

  const resetPomodoro = () => {
    SetWork(5);
    SetBreakup(0);
    SetRound(0);
    SetWorking(false);
    SetStatus(States.default);
    const root = document.querySelector(":root");
    const rootStyles = getComputedStyle(root);
    const circle = rootStyles
      .getPropertyValue("--full_circle")
      .replace("%", "");
      console.log(circle)
    root.style.setProperty("--full_circle", "100%");
  };

  return (
    <div id="pomodoro" className="pomodoro">
      <div className="pomodoro_drop">
        <div className="pomodoro_round">--</div>
      </div>
      <div className="pomodoro_tomato">
        <div className="pomodoro_timeline"></div>
      </div>
      <h1
        className="pomodoro_time"
        onClick={() => {if(status == States.default)SetWork(work + 60)}}
        onContextMenu={(e) => {
          if (work > 0 && status == States.default) SetWork(work - 60);
          e.preventDefault();
          return false;
        }}
      >
        {(work == 0 && isWorking)
          ? twoNum(Math.floor(breakup / 60)) + ":" + twoNum(Math.floor(breakup % 60))
          : twoNum(Math.floor(work / 60)) + ":" + twoNum(Math.floor(work % 60))}
      </h1>
      <Button
        id="start"
        classNames={
          (!(work > 0 && breakup > 0 && round > 0) && !(States.wait == status) || isWorking 
            ? "pomodoro__inactive"
            : "") + " pomodoro_button"
        }
        onClick = {timer}
      >
        старт
      </Button>
      <Button
        id="stop"
        classNames={
          (!isWorking ? "pomodoro__inactive" : "") + " pomodoro_button"
        }
        onClick = {timer}
      >
        стоп
      </Button>
      <div className="pomodoro_options">
        <div className="pomodoro_repeat">
          повторов:
          <Button
            classNames="pomodoro_repeatCounter"
            onClick={() => {if(status == States.default)SetRound(round + 1)}}
            onContextMenu={(e) => {
              if (round > 0 && status == States.default) SetRound(round - 1);
              e.preventDefault();
              return false;
            }}
          >
            {!(status == States.default) ? 0 : round}
          </Button>
        </div>
        <div className="pomodoro_breakup">
          отдых:
          <Button
            classNames="pomodoro_breakupTime"
            onClick={() => {if(status == States.default)SetBreakup(breakup + 60)}}
            onContextMenu={(e) => {
              if (breakup > 0 && status == States.default) SetBreakup(breakup - 60);
              e.preventDefault();
              return false;
            }}
          >
            {!(status == States.default) ? "00:00" :( twoNum(breakup / 60) + ":" + twoNum(breakup % 60))}
          </Button>
        </div>
      </div>
      <Button
        classNames={
          (work <= 0 && breakup <= 0 && round <= 0 || isWorking
            ? "pomodoro__inactive"
            : "") + " pomodoro_reset"
        }
        onClick={resetPomodoro}
      >
        сброс
      </Button>
    </div>
  );
};

export default Pomodoro;
