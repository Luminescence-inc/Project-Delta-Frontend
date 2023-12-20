import axios from "axios";
import { IPaging, ISearch } from "types/business-profile";
import { tempUrl } from "./auth";

export const getListOfBusinsessProfile = (
  paging: IPaging,
  search: ISearch | null
) => {
  let searchQuery: ISearch = search || ({ filters: [] } as ISearch);
  const url = `${tempUrl}/api/business_profile/search`;
  console.log(url);
  return axios.post(url, { paging, search: searchQuery || { filters: [] } });
};

export const getBusinsessCategories = () => {
  const url = `${tempUrl}/api/business_profile/categories`;
  console.log(url);
  return axios.get(url);
};
