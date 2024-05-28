import { useDataCtx } from "@context/DataCtx";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

// to be used in the route component that
// shouldn't be accessible after authentication

export default function withoutAuth<P>(Component: React.ComponentType<P>) {
  const ComponentWithoutAuth = (props: P & any) => {
    const { setIsAuth } = useDataCtx();
    const { loading, userDetails } = useAuth();
    const [localIsAuth, setLocalIsAuth] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
      if (!loading && userDetails) {
        setIsAuth(true);
        setLocalIsAuth(true);

        navigate("/account");
      } else {
        setIsAuth(false);
        setLocalIsAuth(false);
      }
    }, [loading, userDetails]);

    return !localIsAuth ? <Component {...props} /> : null;
  };
  return ComponentWithoutAuth;
}
