import { isAuthenticated } from "@/api/auth";
import { useDataCtx } from "@context/DataCtx";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JwtPayload, TOKEN_NAME } from "@/types/auth";

// to be used in the route component that
// shouldn't be accessible after authentication

export default function withoutAuth<P>(Component: React.ComponentType<P>) {
  const ComponentWithoutAuth = (props: P & any) => {
    const { setIsAuth } = useDataCtx();
    const [localIsAuth, setLocalIsAuth] = useState<boolean>(false);
    const [authToken, setAuthToken] = useState<string | null>(
      localStorage.getItem(TOKEN_NAME) || null
    );
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem(TOKEN_NAME);
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setAuthToken(token);
        checkIsAuthenticated(payload!);
      }
    }, []);

    const checkIsAuthenticated = async (parsedToken: JwtPayload) => {
      try {
        await isAuthenticated(authToken!, parsedToken?.id);
        setIsAuth(true);
        setLocalIsAuth(true);

        navigate("/account");
      } catch (e: any) {
        console.log(`Error authenticating user: ${e}`);
        setIsAuth(false);
        setLocalIsAuth(false);
      }
    };
    return !localIsAuth ? <Component {...props} /> : null;
  };
  return ComponentWithoutAuth;
}
