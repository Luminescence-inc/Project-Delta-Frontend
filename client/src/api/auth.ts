import { LogInData, ResetPasswordData, SignUpData } from "types/auth";
// import {bizConnectAPI} from "../config";
import axios from "axios";

const tempUrl =
  "https://backend.bizconnect24.com/";

export const registerUser = (data: SignUpData) => {
  const url = `${tempUrl}/api/user/register`;
  // const url = `${bizConnectAPI.baseURL}/api/user/register`;
  return axios.post(url, data);
};

export const loginUser = (data: LogInData) => {
  const url = `${tempUrl}/api/user/login`;
  // const url = `${bizConnectAPI.baseURL}/api/user/register`;
  return axios.post(url, data);
};

export const resetUserPassword = (
  userId: string,
  uniqueString: string,
  data: ResetPasswordData
) => {
  const url = `${tempUrl}/api/user/reset_password/${userId}/${uniqueString}`;
  // const url = `${bizConnectAPI.baseURL}/api/user/register`;
  return axios.post(url, { newPassword: data.password });
};

export const verifyUserAccount = (userId: string, uniqueString: string) => {
  const url = `${tempUrl}/api/user/verify/${userId}/${uniqueString}`;
  // const url = `${bizConnectAPI.baseURL}/api/user/register`;
  return axios.get(url);
};

export const isAuthenticated = (token: string, userId: string) => {
  const url = `${tempUrl}/api/user/authenticated/${userId}`;
  // const url = `${bizConnectAPI.baseURL}/api/user/register`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const logOut = (token: string, userId: string) => {
  const url = `${tempUrl}/api/user/logout/${userId}`;
  // const url = `${bizConnectAPI.baseURL}/api/user/register`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const generateVerificationEmail = (email: string) => {
  const url = `${tempUrl}/api/user/generate/forgot_password/${email}`;
  // const url = `${bizConnectAPI.baseURL}/api/user/register`;
  return axios.get(url);
};
