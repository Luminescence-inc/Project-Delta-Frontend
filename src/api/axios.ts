import { bizConnectAPI } from "@/config";
import axios from "axios";

const token = localStorage.getItem("biz_token");

console.log(bizConnectAPI);

const $axios = axios.create({
  baseURL: `${bizConnectAPI.baseURL}/api`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default $axios;
