"use client";
import { prevPageSearchKeyName } from "@/config";
import { useEffect, useState } from "react";

// This hook records the path of the previously visited page upon invocation, allowing the tracking of user navigation history.
const useTrackPageSearch = () => {
  const [prevPageSearch, setPrevPageSearch] = useState("/search");
  useEffect(() => {
    const isSearchPage =
      window.location.pathname.split("/")[1].toLowerCase() === "search";

    if (isSearchPage) {
      const search = window.location.search ?? "/search";
      localStorage.setItem(prevPageSearchKeyName, search);

      setPrevPageSearch(search);
    } else {
      // get the previous page search query from LS
      const search = localStorage.getItem(prevPageSearchKeyName) || "/search";
      setPrevPageSearch(search);
    }
  });

  return prevPageSearch;
};

export default useTrackPageSearch;
