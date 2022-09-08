import React, { useState } from "react";
import Button from "./UI/button/Button.jsx";
import "../styles/Pomodoro.css";

const Pomodoro = function () {
  const [work, SetWork] = useState(0); //время работы
  const [breakup, SetBreakup] = useState(0); //время отдыха
  const [round, SetRound] = useState(0); //количество повторов

  function twoNum(n) {
    if (String(n).length < 2) {
      return "0" + n;
    }
    return n;
  }

  return (
    <div id="pomodoro" className="pomodoro">
      <div className="pomodoro_drop">
        <div className="pomodoro_round">1</div>
      </div>
      <div className="pomodoro_tomato">
        <div className="pomodoro_timeline"></div>
      </div>
      <h1
        className="pomodoro_time"
        onClick={() => SetWork(work + 60)}
        onContextMenu={(e) => {
          if (work > 0) SetWork(work - 60);
          e.preventDefault();
          return false;
        }}
      >
        {twoNum(work / 60) + ":" + twoNum(work % 60)}
      </h1>
      <Button id="start" classNames="pomodoro_button">
        старт
      </Button>
      <Button id="stop" classNames="pomodoro_button pomodoro__inactive">
        стоп
      </Button>
      <div className="pomodoro_options">
        <div className="pomodoro_repeat">
          повторов:
          <Button
            classNames="pomodoro_repeatCounter"
            onClick={() => SetRound(round + 1)}
            onContextMenu={(e) => {
              if (round > 0) SetRound(round - 1);
              e.preventDefault();
              return false;
            }}
          >
            {round}
          </Button>
        </div>
        <div className="pomodoro_breakup">
          отдых:
          <Button
            classNames="pomodoro_breakupTime"
            onClick={() => SetBreakup(breakup + 60)}
            onContextMenu={(e) => {
              if (breakup > 0) SetBreakup(breakup - 60);
              e.preventDefault();
              return false;
            }}
          >
            {twoNum(breakup / 60) + ":" + twoNum(breakup % 60)}
          </Button>
        </div>
      </div>
      <Button classNames="pomodoro_reset pomodoro__inactive">сброс</Button>
    </div>
  );
};

export default Pomodoro;
