import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.API_URL,
  headers: { "X-Custom-Header": "foobar" },
});

export default Axios;
