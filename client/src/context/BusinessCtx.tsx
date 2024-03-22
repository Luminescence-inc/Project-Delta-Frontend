import React, { PropsWithChildren, useState } from "react";
import { ISearch } from "types/business-profile";

export const BusinessContext = React.createContext<ContextValues>({} as any);

type ContextValues = {
  searchQuery: ISearch | null;
  setSearchQuery: (searchQuery: ISearch | null) => void;
};

interface BusinessContextProviderProps extends PropsWithChildren {}

export default function BusinessContextProvider({
  children,
}: BusinessContextProviderProps) {
  // for filtering business profiles
  const [searchQuery, setSearchQuery] = useState<ISearch | null>(null);

  const ctxValues = {
    searchQuery,
    setSearchQuery,
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
