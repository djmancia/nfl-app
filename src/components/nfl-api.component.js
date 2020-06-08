import { useState, useEffect } from "react";
import axios from "axios";
import { api, authParams } from "../assets/nfl-authParams";

function NFL(props) {
  const [authToken, setAuthToken] = useState("");
  const [req, setReq] = useState("");

  useEffect(() => {
    getAuth().then((res) => setAuthToken(res));
  }, []);

  if (authToken) {
    handleGetReq(props.get, authToken);
  }
  return "";
  // return authToken;
}

function getAuth() {
  const data = Object.entries(authParams)
    .map((e) => e.join("="))
    .join("&");

  return axios
    .post(`${api.endpoint}/oauth/token`, data)
    .then((response) => response.data.access_token)
    .catch((err) => {
      console.log(err);
      return null;
    });
}

function handleGetReq(req, token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const body = { key: "value" };
  return axios
    .post(`${api.endpoint}/${req}`, body, config)
    .then((response) => response.data.data);
}

export default NFL;
