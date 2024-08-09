"use client";
import React, { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface DataCtxProps {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  navbarBgColor: NavbarBgColor;
  setNavbarBgColor: ({ parent, child }: NavbarBgColor) => void;
}

type NavbarBgColor = {
  parent?: string;
  child?: string;
};

const DataContext = React.createContext({} as DataCtxProps);

interface DataCtxProviderProps extends PropsWithChildren {}

const queryClient = new QueryClient();

export const DataCtxProvider = ({ children }: DataCtxProviderProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [navbarBgColor, setNavbarBgColor] = useState<NavbarBgColor>({
    parent: "",
    child: "",
  });

  const contextValues = {
    isAuth,
    setIsAuth,
    navbarBgColor,
    setNavbarBgColor,
  } satisfies DataCtxProps;

  return (
    <QueryClientProvider client={queryClient}>
      <DataContext.Provider value={contextValues}>
        {children}
      </DataContext.Provider>
    </QueryClientProvider>
  );
};

export const useDataCtx = () => React.useContext(DataContext);
