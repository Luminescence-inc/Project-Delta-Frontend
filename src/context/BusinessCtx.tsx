"use client";
import { allBusinessCategories, searchForBusinesses } from "@/api/business";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { BusinessCategories, IOption } from "@/types/business";

export const BusinessContext = React.createContext<ContextValues>({} as any);

export interface FilterData {
  businessCategoryUuid: { uuid?: string; value?: string }[] | undefined;
  stateAndProvince: { uuid: string } | undefined;
  city: { uuid: string } | undefined;
  country: { uuid: string } | undefined;
  page?: { uuid: string } | undefined;
}

interface ContextValues {
  businessCategory: IOption[] | undefined;
  setBusinessCategory: (businessCategory: IOption[] | undefined) => void;
  socialLinksError: string | null;
  setSocialLinksError: (error: string | null) => void;
}

interface BusinessContextProviderProps extends PropsWithChildren {}

export default function BusinessContextProvider({
  children,
}: BusinessContextProviderProps) {
  const [businessCategory, setBusinessCategory] = useState<IOption[]>();

  // businss registeration.
  const [socialLinksError, setSocialLinksError] = useState<string | null>(null);

  // all business categories
  useEffect(() => {
    try {
      allBusinessCategories().then((res) => {
        const resData: BusinessCategories = res.data;
        setBusinessCategory(
          resData.data.businessCategories.map((businessCat) => {
            return { uuid: businessCat.uuid, value: businessCat.description };
          })
        );
      });
    } catch (err) {}
  }, []);

  const ctxValues = {
    businessCategory,
    setBusinessCategory,
    socialLinksError,
    setSocialLinksError,
  } satisfies ContextValues;

  return (
    <BusinessContext.Provider value={ctxValues}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusinessCtx() {
  return React.useContext(BusinessContext);
}
