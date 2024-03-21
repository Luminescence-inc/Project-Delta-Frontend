export interface IBusinessProfile {
  uuid: string;
  userUuid: string;
  name: string;
  description: string;
  businessCategoryUuid: string;
  country?: string;
  stateAndProvince?: string;
  city?: string;
  street?: string;
  postalCode?: string;
  logoUrl?: string;
  phoneNumber?: string;
  businessEmail?: string;
  openTime?: string;
  closeTime?: string;
  daysOfOperation?: string[];
  websiteUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  facebookUrl?: string;
  createdUtc: string;
  modifiedUtc: string;
  businessCategory: IBusinessCategory;
  operationInfo: string;
}

export interface IBusinessCategory {
  uuid: string;
  description: string | undefined;
}

export interface IPaging {
  page: number;
  limit?: number;
  sortBy?: "createdUtc" | "modifiedUtc";
  sortDirection?: "asc" | "desc";
}

export interface IFilter {
  targetFieldName: string;
  values: string[];
}

export interface ISearch {
  filters: IFilter[];
}
