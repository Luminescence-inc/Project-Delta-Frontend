import { BusinessCreationBody } from "types/business";
import {bizConnectAPI} from "../config";
import axios from "axios";

export const allBusinessCategories = () => {
    const url = `${bizConnectAPI.baseURL}/api/business_profile/categories`;
    return axios.get(url);
};

export const getUploadSignature = (token: string, folder: string) => {
  const url = `${bizConnectAPI.baseURL}/api/business_profile/upload_signature`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      folderName: folder
    }
  });
};

export const createBusinessProfile = (token: string, data: BusinessCreationBody) => {
  const url = `${bizConnectAPI.baseURL}/api/business_profile/create`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};

export const getUserBusinessProfileList = (token: string) => {
  const url = `${bizConnectAPI.baseURL}/api/business_profile/list`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};

// https://res.cloudinary.com/dshq6chfl/image/upload/w_200,h_100,c_fill,q_100/BizConnect/Logo/d1d5f052-f390-4876-bf14-0789cac256c5/jxsdi8hxuybbzlwgpbog.jpg