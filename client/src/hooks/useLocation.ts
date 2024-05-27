import React, { useEffect } from "react";

export const useLocation = () => {
  const [location, setLocation] = React.useState<{ country: string } | null>(
    null
  );

  // for now, supported location is default to Canada
  useEffect(() => {
    // get location from local storage
    const location = localStorage.getItem("location");
    if (!location) {
      // set canada in localstorage
      const location = {
        country: "Canada",
      };
      localStorage.setItem("location", JSON.stringify(location));
      setLocation(location);
    }
  }, []);

  return location;
};
