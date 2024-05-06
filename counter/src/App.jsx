import React, { useState, useEffect } from "react";
import './App.css'

function App() {
  const [counter, setCounter] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [formData, setFormData] = useState("");


  const playCounter = () => {
    setIsPaused(false);
  };

  const togglePause = () => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  };

  const resetCounter = () => {
    setCounter(0);
    setIsPaused(false);
    document.cookie = "timerCount=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  useEffect(() => {
    let timer;
    if (!isPaused) {
      timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    const timerId = setInterval(() => {
      document.cookie = `timerCount=${counter}`;
    }, 1000);
    return () => clearInterval(timerId);
  }, [counter]);

  const timerStyle = {
    backgroundColor: counter % 2 === 0 ? "pink" : "skyblue",
  };

  return (
    <div className="container">
      <h1>Counter App</h1>
      <div className="counter" style={timerStyle}>
        <span>{counter}</span>
        <br />
        <button className="pause" onClick={togglePause}>{isPaused ? "Resume" : "Pause"}</button>
        <button className="stop" onClick={resetCounter}>Stop</button>
        <button className="play" onClick={playCounter}>Play</button>
      </div>
      {/* <form>
        <input type="text" value={formData} onChange={handleChange} placeholder="Enter your data" />
        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
};

export default App;


 

