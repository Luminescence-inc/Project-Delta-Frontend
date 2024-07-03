"use client";
import { bizConnectAPI } from "@/config";
import axios from "axios";

const token =
  typeof window !== "undefined"
    ? window.localStorage.getItem("biz_token")
    : null;

const $axios = axios.create({
  baseURL: `${bizConnectAPI.baseURL}/api`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default $axios;
