import { BusinessCreationBody } from "types/business";
import { bizConnectAPI } from "../config";
import { IPaging, ISearch } from "types/business-profile";
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
      folderName: folder,
    },
  });
};

export const createBusinessProfile = (
  token: string,
  data: BusinessCreationBody
) => {
  const url = `${bizConnectAPI.baseURL}/api/business_profile/create`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserBusinessProfileList = (token: string) => {
  const url = `${bizConnectAPI.baseURL}/api/business_profile/list`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getListOfBusinsessProfile = (
  paging: IPaging,
  search: ISearch | null
) => {
  let searchQuery: ISearch = search || ({ filters: [] } as ISearch);
  const url = `${bizConnectAPI}/api/business_profile/search`;
  console.log(url);
  return axios.post(url, { paging, search: searchQuery || { filters: [] } });
};

export const getBusinsessCategories = () => {
  const url = `${bizConnectAPI}/api/business_profile/categories`;
  console.log(url);
  return axios.get(url);
};

// https://res.cloudinary.com/dshq6chfl/image/upload/w_200,h_100,c_fill,q_100/BizConnect/Logo/d1d5f052-f390-4876-bf14-0789cac256c5/jxsdi8hxuybbzlwgpbog.jpg
