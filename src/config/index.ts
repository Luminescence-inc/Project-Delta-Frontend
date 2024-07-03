import env from "./env";

export const bizConnectAPI = {
  baseURL: env.baseURL,
};

export const CloudinaryConfig = {
  apiKey: env.apiKey!,
  cloudName: env.cloudName,
};

export const prevPageLocalKeyName = "bizconnect_prev_page";
export const prevPageSearchKeyName = "bizconnect_prev_page_search";
