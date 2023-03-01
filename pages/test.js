import React, { Fragment, useState, useEffect } from "react";

function Solution() {
  const [inMinutes, setInMinutes] = useState(17);
  const [inSeconds, setInSeconds] = useState(21);
  const [outMinutes, setOutMinutes] = useState("0");
  const [outSeconds, setOutSeconds] = useState("0");
  const [timer, setTimer] = useState(null);
  const [status, setStatus] = useState("stopped");

  const onClickStart = () => {
    clearInterval(timer);
    let min = inMinutes + Math.floor(inSeconds / 60),
      sec = inSeconds % 60;
    setOutMinutes(min);
    setOutSeconds(sec);
    console.log(
      inSeconds % 60,
      typeof (inMinutes + Math.floor(inSeconds / 60))
    );
    let _timer = setInterval(() => {
      console.log(outSeconds);
      setOutSeconds(parseInt(outSeconds) - 1);
      setOutMinutes(parseInt(outMinutes) - 1);
    }, 1000);
    setTimer(_timer);
    setStatus("working");
  };
  useEffect(() => {
    setTimeout(() => setOutSeconds(outSeconds - 1), 1000);
  }, [outSeconds]);
  const onClickPauseResume = () => {
    if (status == "working") {
      clearInterval(timer);
      setStatus("stopped");
    } else {
      let _timer = setInterval(() => {
        setOutSeconds(parseInt(outSeconds) - 1);
        setOutMinutes(parseInt(outMinutes) - 1);
      }, 1000);
      setTimer(_timer);
      setStatus("working");
    }
  };
  const onClickReset = () => {
    setStatus("stopped");
    setInSeconds(0);
    setInMinutes(0);
    setOutSeconds(0);
    setOutMinutes(0);
    clearInterval(timer);
  };
  console.log(outSeconds);
  return (
    <Fragment>
      <label>
        <input
          type="number"
          value={inMinutes}
          onChange={(e) => setInMinutes(Number(e.target.value))}
        />
        Minutes
      </label>
      <label>
        <input
          type="number"
          value={inSeconds}
          onChange={(e) => setInSeconds(Number(e.target.value))}
        />
        Seconds
      </label>

      <button onClick={() => onClickStart()}>START</button>
      <button onClick={() => onClickPauseResume()}>PAUSE / RESUME</button>
      <button onClick={() => onClickReset()}>RESET</button>

      <h1 data-testid="running-clock">
        {outMinutes < 10 ? "0" + outMinutes : outMinutes}:
        {outSeconds < 10 ? "0" + outSeconds : outSeconds}
      </h1>
    </Fragment>
  );
}

export default Solution;
