import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactModal from "react-modal";
import { SearchIcon2, X } from "../icons";
import { FlexColCenter, FlexRowCenterBtw } from "../Flex";
import { NItemNotFound, NSelect, NSelectItems } from "./NSelect";
import type { BusinessCategories, IOption } from "@/types/business";
import { allBusinessCategories } from "@/api/business";
import City from "@/helpers/countries-states-city/city";
import Country from "@/helpers/countries-states-city/country";
import State from "@/helpers/countries-states-city/state";
import { FILTERED_COUNTRY } from "@/utils/business-profile-utils";
import { lowerCase } from "@/utils";
import type { INFilters } from "@/types/business-profile";
import countryHelpers from "@/helpers/countries-states-city/country";
import stateHelpers from "@/helpers/countries-states-city/state";
import cityHelpers from "@/helpers/countries-states-city/city";

interface NBusinessFilterProps {
  nFilters: INFilters;
  setNFilters: React.Dispatch<React.SetStateAction<INFilters>>;
  onClose: () => void;
  onApplyFilters: () => void;
  resetFilters: () => void;
  opened: boolean;
}

const NFilterComponents = [
  {
    name: "category",
    title: "Business Category",
    placeholder: "Select a Category",
  },
  { name: "country", title: "Select Country", placeholder: "Select Country" },
  {
    name: "stateAndProvince",
    title: "Select State",
    placeholder: "Select State",
  },
  { name: "city", title: "Select City", placeholder: "Select City" },
] as const;

const NBusinessFilter: React.FC<NBusinessFilterProps> = React.memo(
  ({
    nFilters,
    opened,
    resetFilters,
    setNFilters,
    onClose,
    onApplyFilters,
  }) => {
    const [businessCategories, setBusinessCategories] = useState<IOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const getCategories = useCallback(async () => {
      try {
        setIsLoading(true);
        const resp = await allBusinessCategories();
        const data = resp.data as BusinessCategories;
        setBusinessCategories(
          data.data.businessCategories.map((d) => ({
            uuid: d.uuid,
            value: d.description,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    }, []);

    useEffect(() => {
      getCategories();
    }, [getCategories]);

    const getFilteredStates = (country: string) => {
      if (!country) return [];
      const countryISO = Country.getAllCountries().find(
        (c) => c.name.toLowerCase() === country.toLowerCase()
      )?.isoCode;
      const states = State.getStatesOfCountry(countryISO!);
      const formatedStates = states.map((state) => ({
        uuid: state.name,
        value: state.name,
      }));
      return formatedStates;
    };

    const getFilteredCities = (country: string, state: string) => {
      if (!country || !state) return [];

      const countryISO = Country.getAllCountries().find(
        (c) => lowerCase(c.name) === lowerCase(country)
      )?.isoCode;
      const states = State.getStatesOfCountry(countryISO!);
      const _matchedState = states.find(
        (s) => s.name === nFilters.stateAndProvince
      );
      const stateCode = _matchedState?.isoCode;
      const cities = City.getCitiesOfState(countryISO!, stateCode!);

      const formatedCities = cities.map((city) => ({
        uuid: city.name,
        value: city.name,
      }));
      return formatedCities;
    };

    const formattedCountries = useMemo(
      () =>
        FILTERED_COUNTRY.map((country) => ({ uuid: country, value: country })),
      []
    );

    const listCategories = useMemo(
      () => businessCategories.map((c) => ({ value: c.value })),
      [businessCategories]
    );

    const listStates = useMemo(
      () => getFilteredStates(nFilters.country!),
      [nFilters.country, getFilteredStates]
    );

    const listCities = useMemo(
      () => getFilteredCities(nFilters.country!, nFilters.stateAndProvince!),
      [nFilters.country, nFilters.stateAndProvince, getFilteredCities]
    );

    const getLists = useCallback(
      (name: keyof INFilters) => {
        switch (name) {
          case "category":
            return listCategories;
          case "country":
            return formattedCountries;
          case "stateAndProvince":
            return listStates;
          case "city":
            return listCities;
          default:
            return [];
        }
      },
      [listCategories, formattedCountries, listStates, listCities]
    );

    const handleItemClick = useCallback(
      (name: keyof INFilters, value: string, closePanel?: () => void) => {
        setNFilters((prev) => {
          const newFilters = { ...prev };
          if (prev[name] === value) {
            // Deselect if the same value is selected again
            // @ts-ignore
            newFilters[name] = null;
            if (name === "country") {
              newFilters.stateAndProvince = null;
              newFilters.city = null;
            } else if (name === "stateAndProvince") {
              newFilters.city = null;
            }
          } else {
            // Select new value
            newFilters[name] = value;
            if (name === "country") {
              newFilters.stateAndProvince = null;
              newFilters.city = null;
            } else if (name === "stateAndProvince") {
              newFilters.city = null;
            }
          }
          return newFilters;
        });

        // Close the panel if the name is not category
        if (name !== "category") {
          closePanel && closePanel();
        }
      },
      [setNFilters]
    );

    const getHref = (name: keyof INFilters, value: string) => {
      if (name === "category") {
        // make sure prev query is not removed
        const prevQuery = window.location.search;
        return `/search${prevQuery}&cat=${value}`;
      }
      return undefined;
    };

    const getPlaceholder = (name: string) => {
      if (name === "country" && nFilters.country) {
        const isCountrySupported = countryHelpers.isCountrySupportedByName(
          nFilters.country!
        );
        return isCountrySupported ? nFilters.country : null;
      }
      if (name === "stateAndProvince" && nFilters.stateAndProvince) {
        const isStateSupported = stateHelpers.isStateSupportedByName(
          nFilters.stateAndProvince!
        );
        return isStateSupported ? nFilters.stateAndProvince : null;
      }
      if (name === "city" && nFilters.city) {
        const isCitySupported = cityHelpers.isCitySupportedByName(
          nFilters.city!
        );
        return isCitySupported ? nFilters.city : null;
      }
      return name !== "pagination" ? nFilters[name as keyof INFilters] : null;
    };

    return (
      <ReactModal
        isOpen={opened}
        contentLabel="Filter"
        className="w-full h-full bg-white-100 relative px-[20px] py-[50px]"
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        onRequestClose={onClose}
      >
        <FlexRowCenterBtw className="w-full h-auto min-h-[50px]">
          <h2 className="text-[30px] font-bold font-inter">Search</h2>
          <button className="enableBounceEffect" onClick={onClose}>
            <X className="stroke-dark-100" size={25} />
          </button>
        </FlexRowCenterBtw>

        <FlexColCenter className="w-full gap-5">
          {NFilterComponents.map(({ name, title, placeholder }) => (
            <NSelect
              key={name}
              label={title}
              placeholder={placeholder}
              value={getPlaceholder(name as string) as string}
              items={getLists(name as keyof INFilters)}
              leftIcon={
                name === "category" ? (
                  <SearchIcon2 size={16} className="stroke-white-400" />
                ) : undefined
              }
              className=""
              searchKey="value"
              disabled={
                name === "category"
                  ? isLoading
                  : name === "stateAndProvince"
                  ? !nFilters.country
                  : name === "city"
                  ? !nFilters.stateAndProvince
                  : false
              }
              loading={name === "category" && isLoading}
              render={({ searchResult, closePanel, searchValue }) => (
                <ul className="w-full max-h-[200px] overflow-y-auto">
                  {(searchValue.length > 0
                    ? searchResult
                    : getLists(name as keyof INFilters)
                  ).length > 0 ? (
                    (searchValue.length > 0
                      ? searchResult
                      : getLists(name as keyof INFilters)
                    ).map((item) => (
                      <NSelectItems
                        key={item.value}
                        onClick={() =>
                          handleItemClick(
                            name as keyof INFilters,
                            item.value,
                            closePanel
                          )
                        }
                        value={item.value}
                        active={
                          item.value === nFilters[name as keyof INFilters]
                        }
                        // only for category
                        href={getHref(name, item.value)}
                      />
                    ))
                  ) : (
                    <NItemNotFound />
                  )}
                </ul>
              )}
            />
          ))}

          <FlexRowCenterBtw className="w-full mt-[20px]">
            <button
              className="text-dark-100 w-[120px] h-[55px] rounded-[6px] bg-none"
              onClick={resetFilters}
            >
              <span className="text-[14px] leading-[15px] font-medium font-inter">
                Reset
              </span>
            </button>
            <button
              onClick={() => onApplyFilters && onApplyFilters()}
              className="bg-blue-200 text-white-100 w-[120px] h-[55px] rounded-[6px]"
            >
              <span className="text-[14px] leading-[15px] font-medium font-inter">
                Search
              </span>
            </button>
          </FlexRowCenterBtw>
        </FlexColCenter>
      </ReactModal>
    );
  }
);

export default NBusinessFilter;
