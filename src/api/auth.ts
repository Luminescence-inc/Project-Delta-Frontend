import {
  LogInData,
  ResetPasswordData,
  SignUpData,
  updateUserData,
} from "@/types/auth";
import $axios from "./axios";

export const registerUser = (data: SignUpData) => {
  const url = `/user/register`;
  return $axios.post(url, data);
};

export const loginUser = (data: LogInData) => {
  const url = `/user/login`;
  return $axios.post(url, data);
};

export const resetUserPassword = (
  userId: string,
  uniqueString: string,
  data: ResetPasswordData
) => {
  const url = `/user/reset_password/${userId}/${uniqueString}`;
  return $axios.post(url, { newPassword: data.password });
};

export const verifyUserAccount = (userId: string, uniqueString: string) => {
  const url = `/user/verify/${userId}/${uniqueString}`;
  return $axios.get(url);
};

export const isAuthenticated = (userId: string) => {
  const url = `/user/authenticated/${userId}`;
  return $axios.get(url);
};

export const logOut = (userId: string) => {
  const url = `/user/logout/${userId}`;
  return $axios.get(url);
};

export const generateVerificationEmail = (email: string) => {
  const url = `/user/generate/forgot_password/${email}`;
  return $axios.get(url);
};

export const getUserDetails = () => {
  const url = `/user/details`;
  return $axios.get(url);
};

export const updateUserDetails = (data: updateUserData) => {
  const url = `/user/details/update`;
  return $axios.post(url, data);
};
