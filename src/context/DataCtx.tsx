import usePathname from "@/hooks/usePathname";
import MetaTagsProvider from "@/provider/MetaTagsProvider";
import React, { PropsWithChildren, useState } from "react";

interface DataCtxProps {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
}

const DataContext = React.createContext({} as DataCtxProps);

interface DataCtxProviderProps extends PropsWithChildren {}

export const DataCtxProvider = ({ children }: DataCtxProviderProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { formattedPathname } = usePathname();

  const contextValues = {
    isAuth,
    setIsAuth,
  } satisfies DataCtxProps;

  return (
    <DataContext.Provider value={contextValues}>
      <MetaTagsProvider
        title={formattedPathname}
        og={{
          title: formattedPathname,
        }}
      />
      {children}
    </DataContext.Provider>
  );
};

export const useDataCtx = () => React.useContext(DataContext);