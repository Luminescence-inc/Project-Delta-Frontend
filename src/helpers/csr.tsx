"use client";
import { useAuth } from "@/hooks/useAuth";
import type { UserDetails } from "@/types/auth";
import React from "react";

/**
 * @description Client Side Rendering component (Only use in client side pages)
 * @param render exposes userDetails and loading props.
 * @returns JSX
 */
export function CSR({
  render,
}: {
  render: (props: {
    userDetails: UserDetails | null;
    loading: boolean;
  }) => React.ReactNode;
}) {
  const { userDetails, loading } = useAuth();
  return (
    <>
      {render({
        userDetails,
        loading,
      })}
    </>
  );
}
