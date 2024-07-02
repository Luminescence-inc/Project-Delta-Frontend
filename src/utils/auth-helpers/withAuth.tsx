"use client";
import { useDataCtx } from "@context/DataCtx";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";

// to be used in the route component that needs authentication

export default function withAuth<P>(Component: React.ComponentType<P>) {
  const ComponentWithAuth = (props: P & any) => {
    const { loading, userDetails } = useAuth();
    const { setIsAuth } = useDataCtx();
    const [localIsAuth, setLocalIsAuth] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
      if (!loading && !userDetails) {
        console.log(`Error authenticating user`);
        setIsAuth(false);
        setLocalIsAuth(false);

        // redirect to login page
        localStorage.clear();
        window.location.href = "/login";
        router.push("/login");
      } else {
        setIsAuth(true);
        setLocalIsAuth(true);
      }
    }, [userDetails, loading]);

    return localIsAuth ? <Component {...props} /> : null;
  };
  return ComponentWithAuth;
}