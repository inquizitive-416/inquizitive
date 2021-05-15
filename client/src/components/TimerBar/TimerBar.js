import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";


const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 115,
  strokeWidth: 5,
  trailColor: "#a8a8a8"
};

const renderTime = (dimension, time) => {
  return (
    <div style= {{ color: "orange"}} className="time-wrapper">
      <div style= {{fontSize: 25, paddingLeft:17}} className="time">{time}</div>
      <div style= {{color: "grey"}}>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;


const TimerBar = (props) =>  {
  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = stratTime + 800; // use UNIX timestamp in seconds
  
  const remainingTime = endTime - stratTime;
  return (
    <div style = {{backgroundColor: "#484848", paddingLeft: 10, paddingTop: 13, paddingBottom: 10, width: 390, paddingRight:10}} >
      <div style= {{display: "inline-block"}}> 
      <CountdownCircleTimer
        {...timerProps}
        colors={[["#FFA500"]]}
        duration={daySeconds}
        initialRemainingTime={remainingTime % daySeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > hourSeconds
        ]}
      >
        {({ elapsedTime }) =>
          renderTime("hours", getTimeHours(daySeconds - elapsedTime))
        }
      </CountdownCircleTimer>
      </div>
      <div style= {{display: "inline-block", paddingLeft: 10}}>
      <CountdownCircleTimer
        {...timerProps}
        colors={[["#FFA500"]]}
        duration={hourSeconds}
        initialRemainingTime={remainingTime % hourSeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > minuteSeconds
        ]}
      >
        {({ elapsedTime }) =>
          renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))
        }
      </CountdownCircleTimer>
      </div>
      <div style= {{display: "inline-block", paddingLeft:10}}>
      <CountdownCircleTimer
        {...timerProps}
        colors={[["#FFA500"]]}
        duration={minuteSeconds}
        initialRemainingTime={remainingTime % minuteSeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > 0
        ]}
      >
        {({ elapsedTime }) =>
          renderTime("seconds", getTimeSeconds(elapsedTime))
        }
      </CountdownCircleTimer>
      </div>
    </div>
  );
}
export default TimerBar;
