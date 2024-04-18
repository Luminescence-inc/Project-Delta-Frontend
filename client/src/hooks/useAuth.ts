import { getUserDetails } from "api/auth";
import { useEffect, useState } from "react";
import { TOKEN_NAME, UserDetails } from "types/auth";

export const useAuth = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const authToken = localStorage.getItem(TOKEN_NAME) as string;
      const response = await getUserDetails(authToken!);
      const resData = response.data?.data?.userDetails;

      setUserDetails(resData);
      setLoading(false);
    } catch (e: any) {
      const msg = e.response.data.message;
      console.error(`Error fetching user details: ${msg}`);
      setLoading(false);
    }
  };

  return {
    loading,
    userDetails,
  };
};
