"use client";
import { prevPageLocalKeyName } from "@/config";
import { useEffect } from "react";

// This hook records the path of the previously visited page upon invocation, allowing the tracking of user navigation history.
const useTrackPagePath = (path?: string) => {
  useEffect(() => {
    localStorage.setItem(
      prevPageLocalKeyName,
      window.location.pathname ?? path
    );
  }, [path]);
};

export default useTrackPagePath;
