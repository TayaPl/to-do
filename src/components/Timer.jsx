import React, { useState, useEffect } from "react";
import Button from "./UI/button/Button";
import "../styles/Timer.css";
import useSound from "use-sound";
import done from "../assets/pomodoro_done.mp3";
import start from "../assets/pomodoro_start.mp3";

const Timer = ({
  isWorking,
  SetWorking,
  status,
  SetStatus,
  States,
  tasksLength,
}) => {
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
  const [timeLeft, setTimeLeft] = useState(
    status == States.default
      ? work == 0
        ? breakup
        : work
      : JSON.parse(localStorage.getItem("timeLeft")) !== null
      ? parseInt(JSON.parse(localStorage.getItem("timeLeft")))
      : work == 0
      ? breakup
      : work
  ); // время таймера
  const [roundLeft, setRoundLeft] = useState(
    status == States.default
      ? 1
      : JSON.parse(localStorage.getItem("roundLeft")) !== null
      ? parseInt(JSON.parse(localStorage.getItem("roundLeft")))
      : 1
  ); // повтор таймера
  const [circleLeft, setCircleLeft] = useState(
    status == States.default
      ? 100
      : JSON.parse(localStorage.getItem("circleLeft")) !== null
      ? parseInt(JSON.parse(localStorage.getItem("circleLeft")))
      : 100
  ); // процент круга

  useEffect(() => {
    localStorage.setItem("work", JSON.stringify(work));
    // console.log("work " + work);
  }, [work]);
  useEffect(() => {
    localStorage.setItem("breakup", JSON.stringify(breakup));
    // console.log("breakup " + breakup);
  }, [breakup]);
  useEffect(() => {
    localStorage.setItem("round", JSON.stringify(round));
    // console.log("round " + round);
  }, [round]);
  useEffect(() => {
    localStorage.setItem("timeLeft", JSON.stringify(timeLeft));
    // console.log("timeLeft " + timeLeft);
  }, [timeLeft]);
  useEffect(() => {
    localStorage.setItem("roundLeft", JSON.stringify(roundLeft));
    // console.log("roundLeft " + roundLeft);
  }, [roundLeft]);
  useEffect(() => {
    const root = document.querySelector(":root");
    root.style.setProperty("--full_circle", circleLeft + "%");
    localStorage.setItem("circleLeft", JSON.stringify(circleLeft));
    // console.log("circleLeft " + circleLeft);
    // console.log(
    //   getComputedStyle(document.body).getPropertyValue("--full_circle")
    // );
  }, [circleLeft]);
  useEffect(() => {
    localStorage.setItem("status", JSON.stringify(status));
    // console.log("status " + status);
  }, [status]);

  const twoNum = (n) => {
    if (String(n).length < 2) {
      return "0" + n;
    }
    return n;
  };

  const [playSoundDone] = useSound(done);
  const [playSoundStart] = useSound(start);
  const hours = twoNum(Math.floor(timeLeft / 3600));
  const minutes = twoNum(Math.floor((timeLeft % 3600) / 60));
  const seconds = twoNum(timeLeft % 60);

  useEffect(() => {
    document.title = !isWorking
      ? "Focus.ru"
      : hours + ":" + minutes + ":" + seconds;
    if ((status == States.default || status == States.wait_work) && isWorking) {
      playSoundStart();
      console.log("status == States.default && isWorking");
      if (!(status == States.wait_work)) setTimeLeft(work);
      SetStatus(States.work);
    } else if (
      (status == States.work && timeLeft < 0) ||
      (status == States.wait_work && isWorking)
    ) {
      console.log("status == States.work && setTimeLeft <= 0");
      if (!(status == States.wait_work)) {
        playSoundDone();
        setTimeLeft(breakup);
        setCircleLeft(0);
      }
      SetStatus(States.breakup);
    } else if (timeLeft < 0 && isWorking) {
      setRoundLeft(roundLeft + 1);
      console.log("там " + round + " ? " + roundLeft);
      if (roundLeft < round) {
        playSoundStart();
        setTimeLeft(work);
        SetStatus(States.work);
        setCircleLeft(100);
      } else {
        playSoundDone();
        handleReset();
      }
    }
    const interval = setInterval(() => {
      if (isWorking) {
        setTimeLeft((timeLeft) => timeLeft - 1);
        setCircleLeft((circleLeft) =>
          status === States.work
            ? circleLeft - 100 / work
            : circleLeft + 100 / breakup
        );
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeLeft, isWorking, status, roundLeft, circleLeft]);

  const handleStart = () => {
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
    setRoundLeft(1);
    SetWorking(false);
    if (status == States.default && (work > 0 || breakup > 0 || round > 0)) {
      if (window.confirm("Сбросить все значения?")) {
        SetWork(0);
        SetBreakup(0);
        SetRound(0);
        // SetWork(5);
        // SetBreakup(20);
        // SetRound(1);
      }
    }
    setTimeLeft(0);
    SetStatus(States.default);
    setCircleLeft(100);
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
          style={
            status == States.breakup || status == States.wait_breakup
              ? { transform: "scale(1, 1)" }
              : null
          }
        >
          <div className="pomodoro_timeline"></div>
          {!(status == States.default) ? (
            <div
              className={
                (status == States.breakup || status == States.wait_breakup
                  ? "breakup"
                  : "work") + " pomodoro_counterRounds"
              }
              style={
                status == States.breakup || status == States.wait_breakup
                  ? { transform: "scale(1, 1)" }
                  : null
              }
            >
              {roundLeft}
            </div>
          ) : null}
        </div>

        {status === States.default ? (
          <h1 className="counter">00:00</h1>
        ) : (
          <h1 className="counter">
            {hours > 0 ? <span>{hours}</span> : ""}
            {hours > 0 ? <span>:</span> : ""}
            <span>{minutes}</span>
            <span>:</span>
            <span>{seconds}</span>
          </h1>
        )}

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
                ((status == States.default &&
                  (work <= 0 || round <= 0 || breakup <= 0)) ||
                tasksLength === 0
                  ? "pomodoro__inactive"
                  : "") + " pomodoro_button"
              }
              onClick={() => {
                tasksLength > 0
                  ? work > 0 && round > 0 && breakup > 0
                    ? handleStart()
                    : alert("Убедитесь, что заполнили все поля")
                  : alert("Добавьте задач для работы, чтобы не скучать");
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
            onClick={!isWorking ? handleReset : null}
          >
            Сброс
          </Button>
        </div>

        {!isWorking && status === States.default ? (
          <div className="pomodoro_options">
            <div className="pomodoro_work">
              <span className="pomodoro_options_text">работа:</span>
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
                  if (work >= 60 && status == States.default)
                    SetWork(work - 60);
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
              <span className="pomodoro_options_text">отдых:</span>
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
                  if (breakup >= 60 && status == States.default)
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
              <span className="pomodoro_options_text">повторов:</span>
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
                  if (round >= 1 && status == States.default)
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
