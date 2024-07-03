"use client";
import React, { useEffect } from "react";
import { FlexRowStartCenter } from "./Flex";
import { Info } from "./icons";
import { useLocation } from "@/hooks/useLocation";
import { cn } from "@/lib/utils";
import countryHelpers from "@/helpers/countries-states-city/country";

export const NotsupportedCountryBanner = () => {
  const { location, loading } = useLocation();
  const [isSupported, setIsSupported] = React.useState<boolean>(true);

  const supportedRoutes = ["/search"];

  useEffect(() => {
    if (loading) return;
    // check if country is in supported locations
    const supportedCountries = countryHelpers.getAllCountries();
    const isSupported = supportedCountries.find(
      (country) => country.isoCode === location?.countryCode
    );

    if (!isSupported || Object.keys(location!).length === 0) {
      setIsSupported(false);
      return;
    }
  }, [location]);

  if (isSupported) return null;

  if (!supportedRoutes.includes(window.location.pathname)) return null;

  return (
    <div className="w-full bg-white-105">
      <FlexRowStartCenter
        className={cn("w-full px-4 py-3 bg-yellow-100 text-white-102 gap-2")}
      >
        <Info size={20} color="#fff" />
        <span className="text-white-100 text-xs font-semibold font-inter drop-shadow">
          Country not yet supported!.
        </span>
      </FlexRowStartCenter>
    </div>
  );
};
