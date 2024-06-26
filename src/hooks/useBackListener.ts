import { useEffect } from "react";

/**
 * @name useBackListener
 * @param callback - function to be called when the back button is pressed
 * @description This hook listens for the back button event and calls the callback function
 * @returns null
 */

export const useBackListener = (callback: () => void) => {
  useEffect(() => {
    if (!callback) return;
    if (!window) return;

    const handleBackButton = (event: any) => {
      event.preventDefault();
      callback();
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [callback]);
};
