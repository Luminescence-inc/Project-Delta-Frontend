"use client";
import { useDataCtx } from "@/context/DataCtx";
import { useEffect } from "react";

export function UpdateNavbarBgColor() {
  const { setNavbarBgColor } = useDataCtx();

  useEffect(() => {
    setNavbarBgColor({
      parent: "#f4f9ff",
      child: "#fff",
    });
  }, []);
  return null;
}
