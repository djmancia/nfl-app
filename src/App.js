import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';

import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import ESPN from './services/espn-api.service';

function App() {
  const [schedule, setSchedule] = useState(['']);
  const [week, setWeek] = useState('');
  const [city, setCity] = useState(null);

  let weeks = [
    { week: 1, name: 'Week 1' },
    { week: 2, name: 'Week 2' },
    { week: 3, name: 'Week 3' },
    { week: 4, name: 'Week 4' },
    { week: 5, name: 'Week 5' },
    { week: 6, name: 'Week 6' },
    { week: 7, name: 'Week 7' },
    { week: 8, name: 'Week 8' },
    { week: 9, name: 'Week 9' },
    { week: 10, name: 'Week 10' },
    { week: 11, name: 'Week 11' },
    { week: 12, name: 'Week 12' },
    { week: 13, name: 'Week 13' },
    { week: 14, name: 'Week 14' },
    { week: 15, name: 'Week 15' },
    { week: 16, name: 'Week 16' },
    { week: 17, name: 'Week 17' },
  ];

  useEffect(() => {
    setWeek(weeks[0]);
    ESPN.getSchedules.byWeek('1').then((res) => {
      console.log(res.data);
      return setSchedule(res.data);
    });

    // ESPN.getSchedule('2019')
    //   .byWeek('1')
    //   .then((res) => {
    //     console.log(res.data.content);
    //   return setSchedule(res.data);
    //   });
  }, []);

  const onWeekChange = (e) => {
    setWeek(e.value);
    ESPN.getSchedules.byWeek(e.value.week).then((res) => {
      console.log(res.data);
      return setSchedule(res.data);
    });
  };

  return (
    <div className="App">
      <h3>Schedule</h3>
      <Dropdown
        value={week}
        options={weeks}
        onChange={onWeekChange}
        placeholder="Select a Week"
        optionLabel="name"
        style={{ width: '12em' }}
      />
      <DataTable value={schedule.events} style={{width: '75%' }}>
        <Column field="name" header="Matchup" id="id" style={{width: '50%' }}/>
         
        <Column
          field={(e) => {
            const { city, state } = e.competitions[0].venue.address;
            return state ? `${city}, ${state}` : city;
          }}
          header="Location"
          style={{width: '20%' }}
        />
        <Column
          field={(e) => {
            const date = new Date(e.date);
            return date.toLocaleString();
          }}
          header="Time"
          style={{width: '15%' }}
        />
        <Column
          field={(e) => {
            return e.competitions[0].broadcasts[0].names[0];
          }}
          header="Nat TV"
           style={{width: '5%' }}
        />
        <Column
          field={(e) => {
            return [<img src= {e.competitions[0].competitors[1].team.logo} style={{width: '32px', height: '32px'}}/>,
                    <img src= {e.competitions[0].competitors[0].team.logo} style={{width: '32px', height: '32px'}}/>];    
          }}

          
          header="logo"
          style={{width: '7%' }}
        />
      </DataTable>
    </div>
  );
}
export default App;
