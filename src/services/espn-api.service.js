import axios from "axios";
import { config } from "./espn-config";

export default {
  getSchedules: {
    byWeek(week) {
      return axios
        .get(`${config.endpoint}/scoreboard?week=${week}`)
        .catch((err) => console.error(err));
    },
  },
};
