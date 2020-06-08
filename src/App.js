import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./logo.svg";
import ESPN from "./services/espn-api.service";

function App() {
  const [week, setWeek] = useState("1");
  const [schedule, setSchedule] = useState("");

  useEffect(() => {
    ESPN.getSchedules.byWeek("1").then((res) => setSchedule(res.data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{schedule && schedule.events[0].name}</p>
        <p>{schedule && schedule.events[1].name}</p>
        <p>{schedule && schedule.events[2].name}</p>
        <p>{schedule && schedule.events[3].name}</p>
        <p>{schedule && schedule.events[4].name}</p>
        <p>{schedule && schedule.events[5].name}</p>
        <p>{schedule && schedule.events[6].name}</p>
        <p>{schedule && schedule.events[7].name}</p>
        <p>{schedule && schedule.events[8].name}</p>
        <select
          name="weeks"
          id="weeks"
          defaultValue={week}
          onChange={(event) => {
            ESPN.getSchedules
              .byWeek(event.target.value)
              .then((res) => setSchedule(res.data));
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
        </select>
      </header>
    </div>
  );
}
export default App;
