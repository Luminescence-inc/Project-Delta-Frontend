import React, { useEffect } from "react";
import { FlexRowStart } from "./Flex";
import { TriangleAlert } from "./icons";
import { useLocation } from "@/hooks/useLocation";
import { cn } from "@/utils";
import countryHelpers from "@/helpers/country-sate-city/country";

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
      <FlexRowStart
        className={cn("w-full px-4 py-3 bg-red-305 text-white-100 gap-2")}
      >
        <TriangleAlert size={15} color="#fff" />
        <span className="text-white-100 text-xs font-semibold font-inter">
          Country not yet supported!.
        </span>
      </FlexRowStart>
    </div>
  );
};
