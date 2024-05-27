import { isAuthenticated } from "@/api/auth";
import { useDataCtx } from "@context/DataCtx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JwtPayload, TOKEN_NAME } from "@/types/auth";

// to be used in the route component that needs authentication

export default function withAuth<P>(Component: React.ComponentType<P>) {
  const ComponentWithAuth = (props: P & any) => {
    const { setIsAuth } = useDataCtx();
    const [localIsAuth, setLocalIsAuth] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem(TOKEN_NAME);
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        checkIsAuthenticated(payload!);
      } else {
        navigate("/login");
      }
    }, []);

    const checkIsAuthenticated = async (parsedToken: JwtPayload) => {
      try {
        await isAuthenticated(parsedToken?.id);
        setIsAuth(true);
        setLocalIsAuth(true);
      } catch (e: any) {
        console.log(`Error authenticating user: ${e}`);
        setIsAuth(false);
        setLocalIsAuth(false);

        // redirect to login page
        localStorage.clear();
        window.location.href = "/login";
      }
    };

    return localIsAuth ? <Component {...props} /> : null;
  };
  return ComponentWithAuth;
}
