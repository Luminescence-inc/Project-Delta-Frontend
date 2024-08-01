"use client";
import { useEffect, useState } from "react";
import { SearchIcon2, X } from "@components/icons";
import MultiSearch from "./MultiSearch";
import { FILTERED_COUNTRY } from "@/utils/business-profile-utils";
import City from "../helpers/countries-states-city/city";
import Country from "../helpers/countries-states-city/country";
import State from "../helpers/countries-states-city/state";
import { FilterData, useBusinessCtx } from "@context/BusinessCtx";
import { BusinessFilterType } from "@/types/business";
import { FlexColStart, FlexRowCenterBtw } from "@components/Flex";
import type { IFilter, ISearch } from "@/types/business-profile";
import { cn } from "@/lib/utils";
import { extractQueryParams } from "@/utils";

interface OnfilterDataProps {
  uuid?: string | undefined;
  value?: string | undefined;
  type?: BusinessFilterType | undefined;
}

interface BusinessFilterComponentProps {
  getfilterData: (filterData: FilterData) => void;
  closeFilter: () => void;
  showFilter: boolean;
  businessesCategories: { uuid: string; value: string }[] | null | undefined;
}

const BusinessesFilterComponent = ({
  getfilterData,
  closeFilter,
  businessesCategories,
  showFilter,
}: BusinessFilterComponentProps) => {
  const [errorMsg, setErrorMsg] = useState<string>("");
  const {
    activePanel,
    setActivePanel,
    filterData,
    setFilterData,
    filteredCities,
    setFilteredCities,
    filteredStates,
    setFilteredStates,
    setSearchQuery,
    setBusinesses,
  } = useBusinessCtx();
  const formatedCountries = () => {
    return FILTERED_COUNTRY.map((country) => {
      return {
        uuid: country,
        value: country,
      };
    });
  };

  const onFilter = ({ uuid, value, type }: OnfilterDataProps) => {
    if (type === "businessCategory") {
      const valueExists = filterData.businessCategoryUuid?.find(
        (item) => item.uuid === uuid
      );
      if (valueExists) {
        // remove the value
        const updatedValue = filterData.businessCategoryUuid?.filter(
          (item) => item.uuid !== uuid
        );
        setFilterData({
          ...filterData,
          businessCategoryUuid:
            updatedValue!.length > 0 ? updatedValue : undefined,
        });
      } else {
        // add the value
        const updatedValue = filterData.businessCategoryUuid
          ? [...filterData.businessCategoryUuid, { uuid: uuid!, value }]
          : [{ uuid: uuid!, value }];
        setFilterData({
          ...filterData,
          businessCategoryUuid: updatedValue,
        });
      }
    }
    if (type === "country") {
      //check if the value exists
      const valueExists = filterData.country?.uuid === uuid;
      if (valueExists) {
        // remove the value
        setFilterData({
          ...filterData,
          country: undefined,
        });
      } else {
        // add the value
        setFilterData({
          ...filterData,
          country: { uuid: uuid! },
        });
      }
    }
    if (type === "stateAndProvince") {
      const valueExists = filterData.stateAndProvince?.uuid === uuid;
      if (valueExists) {
        setFilterData({
          ...filterData,
          stateAndProvince: undefined,
        });
      } else {
        // add the value
        setFilterData({
          ...filterData,
          stateAndProvince: { uuid: uuid! },
        });
      }
    }
    if (type === "city") {
      const valueExists = filterData.city?.uuid === uuid;
      if (valueExists) {
        // remove the value
        setFilterData({
          ...filterData,
          city: undefined,
        });
      } else {
        // add the value
        setFilterData({
          ...filterData,
          city: { uuid: uuid! },
        });
      }
    }
  };

  const getFilteredStates = (country: string) => {
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

  const getFilteredCities = (country: string) => {
    const countryISO = Country.getAllCountries().find(
      (c) => c.name.toLowerCase() === country.toLowerCase()
    )?.isoCode;
    const states = State.getStatesOfCountry(countryISO!);
    const _matchedState = states.find(
      (s) => s.name === filterData.stateAndProvince?.uuid
    );
    const stateCode = _matchedState?.isoCode;
    const cities = City.getCitiesOfState(countryISO!, stateCode!);

    const formatedCities = cities.map((city) => ({
      uuid: city.name,
      value: city.name,
    }));
    return formatedCities;
  };

  // monitor when the country state gets changed
  useEffect(() => {
    if (filterData?.country) {
      const formatedStates = getFilteredStates(filterData.country?.uuid);
      setFilteredStates(formatedStates);

      // reset the state and province
      // if the selected country is changed and state doesn;t exist in the selected country
      const SAP = filterData?.stateAndProvince?.uuid;
      const filteredStates = getFilteredStates(filterData?.country?.uuid);
      const stateExists = filteredStates.some((state) => state.uuid === SAP);
      if (!stateExists) {
        // @ts-expect-error
        setFilterData((prevFilterData) => ({
          ...prevFilterData,
          stateAndProvince: undefined,
        }));

        // @ts-expect-error
        setFilterData((prevFilterData) => ({
          ...prevFilterData,
          city: undefined,
        }));
      }
    }
  }, [filterData?.country]);

  // monitor when the state and province gets changed
  useEffect(() => {
    if (filterData?.stateAndProvince) {
      const formattedCities = getFilteredCities(filterData.country!?.uuid);
      setFilteredCities(formattedCities);

      // reset the city if the selected state and province is changed and city doesn't exist in the selected state and province
      const _city = filterData?.city?.uuid;
      const filteredCities = getFilteredCities(filterData.country!?.uuid);
      const cityExists = filteredCities.some((city) => city.uuid === _city!);
      if (!cityExists) {
        // @ts-expect-error
        setFilterData((prevFilterData) => ({
          ...prevFilterData,
          city: undefined,
        }));
      }
    }
  }, [filterData?.stateAndProvince]);

  // clear err msg
  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    }
  }, [errorMsg]);

  const resetFilter = () => {
    setFilterData({
      businessCategoryUuid: undefined,
      stateAndProvince: undefined,
      city: undefined,
      country: undefined,
    });
    setErrorMsg("");
    setSearchQuery(null);

    // clear the search query
    window.location.href = "/search";
  };

  const applyFilter = () => {
    const { filters } = extractQueryParams();
    // validate the filter
    if (!filterData.country) {
      setErrorMsg("Please select a country");
      return;
    }

    let mergedFilterData = { ...filterData };

    for (const filter of filters) {
      const { targetFieldName, values } = filter;
      const keyExistsInFilterData =
        Object.keys(mergedFilterData).includes(targetFieldName);

      if (!keyExistsInFilterData) {
        // @ts-expect-error
        mergedFilterData[targetFieldName] = {
          uuid: values[0],
        };
      }
    }

    setBusinesses([]);
    closeFilter();
    getfilterData(mergedFilterData);
  };

  return (
    <FlexColStart
      className={cn(
        "w-full h-full fixed top-0 left-0 z-[999] bg-white-100",
        showFilter ? "flex" : "hidden"
      )}
    >
      <div className="w-full h-auto flex flex-col items-start justify-start px-[20px] py-[50px] bg-white-100">
        <div className="w-full h-auto flex flex-row items-center justify-between ">
          <h2 className="text-[30px] font-bold font-inter text-blue-200">Filter</h2>
          <button
            className="be-none border-none outline-none cursor-pointer"
            onClick={() => {
              // if there isn't any filter applied, navigate to unboarding page
              // else close the filter
              // if (!filterData.country) {
              //   // get prev page visited from LS.
              //   const prevPagePath = localStorage.getItem(prevPageLocalKeyName);
              //   if (prevPagePath) {
              //     navigate(prevPagePath);
              //   } else {
              //     navigate("/onboarding");
              //   }
              //   return;
              // }
              closeFilter();
            }}
          >
            <X size={25} />
          </button>
        </div>

        {/* error msg */}
        <div className="w-full pb-[9px] flex flex-col items-start justify-start min-h-[50px] ">
          <span className="text-[12px] py-[10px] font-normal font-inter text-red-305">
            {errorMsg}
          </span>
        </div>

        {/* body */}
        <FlexColStart className="w-full h-auto gap-[5px] transition-all duration-300">
          {/* SELECT BUSINESS CATEGORY */}
          <FlexColStart className="w-full">
            <MultiSearch
              leftIcon={<SearchIcon2 size={20} strokeWidth={1.4} />}
              label="Business Category"
              type={"single"}
              is_link={true}
              listsData={businessesCategories}
              selectedListData={filterData?.businessCategoryUuid}
              dataType="businessCategory"
              isSearch
              onChange={() => {
                // close filter
                closeFilter();
              }}
              activePanel={activePanel}
              setActivePanel={setActivePanel}
            />

            {/* categories placeholder */}
            {filterData?.businessCategoryUuid &&
              filterData?.businessCategoryUuid.find(
                (d) =>
                  typeof d.uuid !== "undefined" ||
                  typeof d.value !== "undefined"
              ) && (
                <div className="flex flex-row flex-wrap items-start justify-start mt-0 filter-placeholders gap-[3px] pb-[15px]">
                  {filterData?.businessCategoryUuid?.map((categories) => (
                    <div
                      key={categories.uuid}
                      className="ntw px-[12px] py-[5px] rounded-full flex flex-row items-center justify-start placeholder gap-[2px] bg-white-300/80"
                    >
                      <span className="text-[12px] font-inter font-normal">
                        {/* @ts-ignore */}
                        {categories?.value}
                      </span>
                      <button
                        className="cursor-pointer border-none outline-none close-btn"
                        onClick={() => {
                          //  remove the selected category from filter
                          const updatedFilter =
                            filterData?.businessCategoryUuid?.filter(
                              (c) => c.uuid !== categories.uuid
                            );
                          setFilterData({
                            ...filterData,
                            businessCategoryUuid: updatedFilter,
                          });

                          // @ts-ignore
                          // remove the selected category from search query
                          setSearchQuery((prevSearchQuery: ISearch) => {
                            const updatedFilters =
                              prevSearchQuery?.filters?.filter(
                                (filter: IFilter) =>
                                  filter.targetFieldName !==
                                  "businessCategoryUuid"
                              );

                            const combo = {
                              ...prevSearchQuery,
                              filters: updatedFilters,
                            };

                            return combo as ISearch;
                          });
                        }}
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
          </FlexColStart>

          {/* SELECT COUNTRY */}
          <MultiSearch
            label="Select Country"
            placeholder="Select Country"
            type={"single"}
            listsData={formatedCountries()}
            selectedListData={filterData?.country!}
            dataType="country"
            onChange={({ type, uuid, value }) =>
              onFilter({ type, uuid, value })
            }
            isSearch
            activePanel={activePanel}
            setActivePanel={setActivePanel}
          />

          {/* SELECT STATE AND PROVINCES */}
          <MultiSearch
            label="State and Province"
            placeholder="Search for State and Province"
            type={"single"}
            listsData={filteredStates}
            selectedListData={filterData?.stateAndProvince!}
            dataType="stateAndProvince"
            isSearch
            onChange={({ type, uuid, value }) =>
              onFilter({ type, uuid, value })
            }
            onClick={() => {
              if (filterData?.country === undefined) {
                setErrorMsg("Please select a country first");
                return;
              }
            }}
            disableTrigger={typeof filterData?.country === "undefined"}
            activePanel={activePanel}
            setActivePanel={setActivePanel}
          />

          {/* CITY */}
          <MultiSearch
            label="Select City"
            placeholder="Select City"
            type={"single"}
            listsData={filteredCities}
            selectedListData={filterData?.city!}
            dataType="city"
            isSearch
            onChange={({ type, uuid, value }) =>
              onFilter({ type, uuid, value })
            }
            onClick={() => {
              if (filterData?.country === undefined) {
                setErrorMsg("Please select state and province first");
                return;
              }
            }}
            disableTrigger={typeof filterData?.stateAndProvince === "undefined"}
            activePanel={activePanel}
            setActivePanel={setActivePanel}
          />

          {/* CONTROL BUTTON */}
          <FlexRowCenterBtw className="w-full mt-[20px]">
            <button
              className="text-dark-100 w-[120px] h-[55px] rounded-[6px] bg-none"
              onClick={resetFilter}
            >
              <span className="text-[14px] leading-[15px] font-medium font-inter">
                Reset
              </span>
            </button>
            <button
              onClick={applyFilter}
              className="bg-blue-200 text-white-100 w-[120px] h-[55px] rounded-[6px]"
            >
              <span className="text-[14px] leading-[15px] font-medium font-inter">
                Search
              </span>
            </button>
          </FlexRowCenterBtw>
        </FlexColStart>
      </div>
    </FlexColStart>
  );
};

export default BusinessesFilterComponent;
