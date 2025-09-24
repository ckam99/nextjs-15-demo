import redaxios from "redaxios";


const axios = redaxios.create({
  baseURL: "/api", // or GlobalConfig.apiURL
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
});

export default axios;
