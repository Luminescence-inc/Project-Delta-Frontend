import { LogInData, ResetPasswordData, SignUpData } from "types/auth";
import {bizConnectAPI} from "../config";
import axios from "axios";

export const registerUser = (data: SignUpData) => {
  const url = `${bizConnectAPI.baseURL}/api/user/register`;
  return axios.post(url, data);
};

export const loginUser = (data: LogInData) => {
  const url = `${bizConnectAPI.baseURL}/api/user/login`;
  return axios.post(url, data);
};

export const resetUserPassword = (
  userId: string,
  uniqueString: string,
  data: ResetPasswordData
) => {
  const url = `${bizConnectAPI.baseURL}/api/user/reset_password/${userId}/${uniqueString}`;
  return axios.post(url, { newPassword: data.password });
};

export const verifyUserAccount = (userId: string, uniqueString: string) => {
  const url = `${bizConnectAPI.baseURL}/api/user/verify/${userId}/${uniqueString}`;
  return axios.get(url);
};

export const isAuthenticated = (token: string, userId: string) => {
  const url = `${bizConnectAPI.baseURL}/api/user/authenticated/${userId}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const logOut = (token: string, userId: string) => {
  const url = `${bizConnectAPI.baseURL}/api/user/logout/${userId}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const generateVerificationEmail = (email: string) => {
  const url = `${bizConnectAPI.baseURL}/api/user/generate/forgot_password/${email}`;
  return axios.get(url);
};
