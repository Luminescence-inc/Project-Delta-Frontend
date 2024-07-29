"use client";
import { useDataCtx } from "@/context/DataCtx";
import { useEffect } from "react";

export function UpdateNavbarBgColor() {
  const { setNavbarBgColor } = useDataCtx();

  useEffect(() => {
    setNavbarBgColor({
      parent: "#F6F8FA",
      child: "#fff",
    });
  }, []);
  return null;
}
