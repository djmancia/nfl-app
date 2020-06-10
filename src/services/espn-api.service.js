import axios from 'axios';
import { config } from './espn-config';

export default {
  getSchedules: {
    byWeek(week) {
      return axios
        .get(`${config.endpoint}/scoreboard?week=${week}`)
        .catch((err) => console.error(err));
    },
  },
  getSchedule(season) {
    return {
      byWeek(week) {
        return axios
          .get(`${config.endpoint2}/week/${week}/year/${season}?xhr=1`)
          .catch((err) => console.error(err));
      },
    };
  },
};
