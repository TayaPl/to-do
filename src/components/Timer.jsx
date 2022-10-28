import React, { useState, useEffect } from "react";
import Button from "./UI/button/Button";
import "../styles/Timer.css";

const States = {
  default: "default",
  work: "work",
  breakup: "breakup",
  wait_work: "wait_work",
  wait_breakup: "wait_breakup",
};

const Timer = ({ isWorking, SetWorking }) => {
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
  const [status, SetStatus] = useState(
    JSON.parse(localStorage.getItem("status")) !== undefined
      ? JSON.parse(localStorage.getItem("status"))
      : States.default
  ); //статус, в котором находится программа
  const [timeLeft, setTimeLeft] = useState(work == 0 ? breakup : work); // время таймера

  useEffect(() => {
    handleReset();
  }, []);
  useEffect(() => {
    localStorage.setItem("work", JSON.stringify(work));
    console.log("work " + work);
  }, [work]);
  useEffect(() => {
    localStorage.setItem("breakup", JSON.stringify(breakup));
    console.log("breakup " + breakup);
  }, [breakup]);
  useEffect(() => {
    localStorage.setItem("round", JSON.stringify(round));
    console.log("round " + round);
  }, [round]);
  useEffect(() => {
    localStorage.setItem("timeLeft", JSON.stringify(timeLeft));
    console.log("timeLeft " + timeLeft);
  }, [timeLeft]);
  useEffect(() => {
    if (status == States.work) SetWorking(true);
    else SetWorking(false);
    localStorage.setItem("status", JSON.stringify(status));
    console.log("status " + status);
  }, [status]);

  const twoNum = (n) => {
    if (String(n).length < 2) {
      return "0" + n;
    }
    return n;
  };

  const hours = twoNum(Math.floor(timeLeft / 3600));
  const minutes = twoNum(Math.floor((timeLeft % 3600) / 60));
  const seconds = twoNum(timeLeft % 60);

  useEffect(() => {
    if (status == States.default && isWorking) {
      console.log("status == States.default && isWorking");
      SetStatus(States.work);
      setTimeLeft(work);
    } else if (status == States.work && timeLeft <= 0) {
      console.log("status == States.work && setTimeLeft <= 0");
      SetStatus(States.breakup);
      setTimeLeft(breakup);
      const root = document.querySelector(":root");
      root.style.setProperty("--full_circle", "100%");
    } else if (status == States.breakup && timeLeft === 0) {
      console.log("timeLeft === 0");
      handleReset();
    }
    const interval = setInterval(() => {
      if (isWorking) {
        setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0));
        document.documentElement.style.setProperty(
          "--full_circle",
          getComputedStyle(document.body)
            .getPropertyValue("--full_circle")
            .replace("%", "") -
            100 / (status == States.work ? work : breakup) +
            "%"
        );
      }
    }, 1000);

    return () => {
      console.log("перерыв " + status);
      clearInterval(interval);
    };
  }, [timeLeft, isWorking]);

  const handleStart = () => {
    // if (
    //   status == States.default ||
    //   (status == States.wait_work && timeLeft > 0)
    // ) {
    //   SetStatus(States.work);
    //   setTimeLeft(work);
    // } else if (status == States.wait_breakup && timeLeft > 0) {
    //   SetStatus(States.work);
    //   setTimeLeft(work);
    // }
    SetWorking(true);
  };
  const handleStop = () => {
    SetStatus(
      status == States.work && isWorking
        ? States.wait_work
        : status == States.breakup && isWorking
        ? States.wait_breakup
        : status
    );

    SetWorking(false);
  };
  const handleReset = () => {
    SetWorking(false);
    SetWork(5);
    SetBreakup(10);
    SetRound(1);
    setTimeLeft(0);
    SetStatus(States.default);
    const root = document.querySelector(":root");
    root.style.setProperty("--full_circle", "100%");
    root.style.setProperty("--color_circle", "--color__work");
  };

  return (
    <div className="timer">
      <div id="pomodoro" className="pomodoro">
        <div
          className={
            (status == States.breakup || status == States.wait_breakup
              ? "breakup"
              : "work") + " pomodoro_drop"
          }
        >
          <div className="pomodoro_round">--</div>
        </div>
        <div
          className={
            (status == States.breakup || status == States.wait_breakup
              ? "breakup"
              : "work") + " pomodoro_tomato"
          }
        >
          <div className="pomodoro_timeline"></div>
        </div>

        <h1 className="counter">
          {hours > 0 ? <span>{hours}</span> : ""}
          {hours > 0 ? <span>:</span> : ""}
          <span>{minutes}</span>
          <span>:</span>
          <span>{seconds}</span>
        </h1>

        <div className="buttons">
          {isWorking ? (
            <Button
              classNames={
                (status == States.default &&
                (work <= 0 || round <= 0 || breakup <= 0)
                  ? "pomodoro__inactive"
                  : "") + " pomodoro_button"
              }
              onClick={handleStop}
            >
              Стоп
            </Button>
          ) : (
            <Button
              classNames={
                (status == States.default &&
                (work <= 0 || round <= 0 || breakup <= 0)
                  ? "pomodoro__inactive"
                  : "") + " pomodoro_button"
              }
              onClick={() => {
                if (work > 0 && round > 0 && breakup > 0) handleStart();
                else alert("Убедитесь, что заполнили все поля");
              }}
            >
              Старт
            </Button>
          )}

          <Button
            classNames={
              ((work <= 0 && breakup <= 0 && round <= 0) || isWorking
                ? "pomodoro__inactive"
                : "") + " pomodoro_button pomodoro_reset"
            }
            onClick={!isWorking ? handleReset : ""}
          >
            Сброс
          </Button>
        </div>

        {!isWorking && status === States.default ? (
          <div className="pomodoro_options">
            <div className="pomodoro_work">
              работа:
              <Button
                classNames={
                  (isWorking || !(status == States.default)
                    ? "pomodoro__inactive"
                    : "") + " pomodoro_buttonOption"
                }
                onClick={() => {
                  if (status == States.default && work < 18000)
                    SetWork(work + 60);
                }}
                onContextMenu={(e) => {
                  if (work > 0 && status == States.default) SetWork(work - 60);
                  e.preventDefault();
                  return false;
                }}
              >
                {!(status == States.default)
                  ? "00:00"
                  : work >= 3600
                  ? twoNum(Math.floor(work / 3600)) +
                    ":" +
                    twoNum(Math.floor((work % 3600) / 60)) +
                    ":" +
                    twoNum(work % 60)
                  : twoNum(Math.floor(work / 60)) + ":" + twoNum(work % 60)}
              </Button>
            </div>
            <div className="pomodoro_breakup">
              отдых:
              <Button
                classNames={
                  (isWorking || !(status == States.default)
                    ? "pomodoro__inactive"
                    : "") + " pomodoro_buttonOption"
                }
                onClick={() => {
                  if (breakup < work) {
                    if (status == States.default) SetBreakup(breakup + 60);
                  } else
                    alert(
                      "Отдыхать хорошо! Но отдых должен занимать меньше времени работы"
                    );
                }}
                onContextMenu={(e) => {
                  if (breakup > 0 && status == States.default)
                    SetBreakup(breakup - 60);
                  e.preventDefault();
                  return false;
                }}
              >
                {!(status == States.default)
                  ? "00:00"
                  : twoNum(Math.floor(breakup / 60)) +
                    ":" +
                    twoNum(breakup % 60)}
              </Button>
            </div>
            <div className="pomodoro_repeat">
              повторов:
              <Button
                classNames={
                  (isWorking || !(status == States.default)
                    ? "pomodoro__inactive"
                    : "") + " pomodoro_buttonOption"
                }
                onClick={() => {
                  if (status == States.default) SetRound(round + 1);
                }}
                onContextMenu={(e) => {
                  if (round > 0 && status == States.default)
                    SetRound(round - 1);
                  e.preventDefault();
                  return false;
                }}
              >
                {!(status == States.default) ? 0 : round}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Timer;
