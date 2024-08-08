"use client";
import { prevPageSearchKeyName, prevLocationSearchKeyName } from "@/config";
import { useEffect, useState } from "react";

// This hook records the path of the previously visited page upon invocation, allowing the tracking of user navigation history.
const useTrackPageSearch = () => {
  const [prevPageSearch, setPrevPageSearch] = useState("/search");
  const [prevLocationSearch, setPrevLocationSearch] = useState<{
    cn: string;
    st: string;
    ct: string;
  } | null>(null);

  useEffect(() => {
    const isSearchPage =
      window.location.pathname.split("/")[1].toLowerCase() === "search";

    if (isSearchPage) {
      const search = window.location.search ?? "/search";
      const urlParams = new URLSearchParams(search);

      let locationSearch = {
        cn: "",
        st: "",
        ct: "",
      };
      const country = urlParams.get("cn");
      const state = urlParams.get("st");
      const city = urlParams.get("ct");

      if (country) locationSearch.cn = country;
      if (state) locationSearch.st = state;
      if (city) locationSearch.ct = city;

      localStorage.setItem(prevPageSearchKeyName, search);
      localStorage.setItem(
        prevLocationSearchKeyName,
        JSON.stringify(locationSearch)
      );

      setPrevPageSearch(search);
      setPrevLocationSearch(locationSearch);
    } else {
      // get the previous page search query from LS
      const search = localStorage.getItem(prevPageSearchKeyName) || "/search";
      setPrevPageSearch(search);
    }
  }, []);

  return prevPageSearch;
};

export default useTrackPageSearch;
