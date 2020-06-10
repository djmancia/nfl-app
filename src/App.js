import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.svg';
import ESPN from './services/espn-api.service';
import { Dropdown } from 'primereact';

function App() {
  const [week, setWeek] = useState('1');
  const [schedule, setSchedule] = useState('');

  useEffect(() => {
    ESPN.getSchedules.byWeek('1').then(res => {
      console.log(res.data);
      return setSchedule(res.data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}
export default App;
