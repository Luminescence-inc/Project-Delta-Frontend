import {
  BusinessCreationBody,
  ContactSupportDataSchema,
} from "@/types/business";
import { bizConnectAPI } from "@/config";
import { IPaging, ISearch } from "@/types/business-profile";
import axios from "axios";

export const allBusinessCategories = () => {
  const url = `${bizConnectAPI.baseURL}/api/business_profile/categories`;
  return axios.get(url);
};

export const getAllBusinessCategories = () => {
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
  const url = `${bizConnectAPI.baseURL}/api/business_profile/search`;
  return axios.post(url, { paging, search: searchQuery || { filters: [] } });
};

export const getBusinessProfileById = (id: string) => {
  const url = `${bizConnectAPI.baseURL}/api/business_profile/list/${id}`;
  return axios.get(url);
};

export const getBusinsessCategories = () => {
  const url = `${bizConnectAPI.baseURL}/api/business_profile/categories`;
  // console.log(url);
  return axios.get(url);
};

export const getUserBusinessProfileDetail = (token: string, id: string) => {
  const url = `${bizConnectAPI.baseURL}/api/business_profile/list/${id}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserBusinessProfileDetail = (
  token: string,
  id: string,
  data: BusinessCreationBody
) => {
  const url = `${bizConnectAPI.baseURL}/api/business_profile/update/${id}`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUserBusinessProfile = (token: string, profileId: string) => {
  const url = `${bizConnectAPI.baseURL}/api/business_profile/delete/${profileId}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const submitContactRequest = (data: ContactSupportDataSchema) => {
  const url = `${bizConnectAPI.baseURL}/api/business_profile/contact/`;
  return axios.post(url, data);
};
