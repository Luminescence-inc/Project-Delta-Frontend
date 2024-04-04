import React, { useEffect } from "react";
import "./style.scss";
import CloseIcon from "assets/icons/close-icon.svg?react";
import CloseIcon2 from "assets/icons/close-icon-2.svg?react";
import SearchIcon from "assets/icons/search-icon-2.svg?react";
import MultiSearch from "./MultiSearch";
import { FILTERED_COUNTRY } from "utils/business-profile-utils";
import { Country, State, City } from "../../../country-sate-city";
import { FilterData, useBusinessCtx } from "context/BusinessCtx";

type OnfilterDataProps = {
  uuid?: string | undefined;
  value?: string | undefined;
  type?: string | undefined;
};

type Props = {
  getfilterData: (filterData: FilterData) => void;
  closeFilter: () => void;
  businessesCategories: { uuid: string; value: string }[] | null | undefined;
};

export default function BusinessesFilterComponent({
  getfilterData,
  closeFilter,
  businessesCategories,
}: Props) {
  const [errorMsg, setErrorMsg] = React.useState<string>("");
  const {
    activePanel,
    setActivePanel,
    filterData,
    setFilterData,
    filteredCities,
    setFilteredCities,
    filteredStates,
    setFilteredStates,
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
        // remove the value
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
  React.useEffect(() => {
    if (filterData.country) {
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
  }, [filterData.country]);

  //   monitor when the state and province gets changed
  React.useEffect(() => {
    if (filterData.stateAndProvince) {
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
  }, [filterData.stateAndProvince]);

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
  };

  const applyFilter = () => {
    // validate the filter
    if (!filterData.country) {
      setErrorMsg("Please select a country");
      return;
    }

    // apply the filter
    getfilterData(filterData);
    // hide the filter
    closeFilter();
  };

  return (
    <div className="ntw filter-container">
      <div className="ntw w-full flex flex-col items-start justify-start px-20 filter-card">
        <div className="ntw w-full header flex flex-row items-center justify-between ">
          <h2 className="ntw text-30 font-bold leading-42">Search</h2>
          <button
            className="ntw close-btn border-none outline-none"
            onClick={closeFilter}
          >
            <CloseIcon />
          </button>
        </div>

        {/* error msg */}
        <div className="ntw w-full pb-9 flex flex-col items-start justify-start error-cont">
          <span className="ntw text-12 py-10 font-normal">{errorMsg}</span>
        </div>

        {/* body */}
        <div className="ntw flex flex-col w-full h-auto gap-5">
          {/* SELECT BUSINESS CATEGORY */}
          <div className="ntw w-full flex flex-col items-start flex-start">
            <MultiSearch
              leftIcon={<SearchIcon fill="#fff" />}
              label="Business Category"
              type={"multi"}
              listsData={businessesCategories}
              selectedListData={filterData?.businessCategoryUuid}
              dataType="businessCategory"
              onChange={({ type, uuid, value }) =>
                onFilter({ type, uuid, value })
              }
              activePanel={activePanel}
              setActivePanel={setActivePanel}
            />

            {/* categories placeholders */}
            {filterData.businessCategoryUuid && (
              <div className="ntw flex flex-row flex-wrap items-start justify-start mt-20 filter-placeholders gap-3">
                {filterData.businessCategoryUuid?.map((it) => (
                  <div
                    key={it.uuid}
                    className="ntw px-12 py-5 rounded-30 flex flex-row items-center justify-start placeholder gap-2"
                  >
                    <span className="ntw text-12 font-normal">
                      {/* @ts-ignore */}
                      {it?.value ?? "CATEGORY"}
                    </span>
                    <button
                      className="ntw cursor-pointer border-none outline-none close-btn"
                      onClick={() => {
                        //  remove the selected category from filter
                        const updatedFilter =
                          filterData.businessCategoryUuid?.filter(
                            (c) => c.uuid !== it.uuid
                          );
                        setFilterData({
                          ...filterData,
                          businessCategoryUuid: updatedFilter,
                        });
                      }}
                    >
                      <CloseIcon2 />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

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
          <div className="ntw w-full flex items-center justify-between mt-20 filter-controls">
            <button
              className="ntw reset-btn w-120 h-55 rounded-6"
              onClick={resetFilter}
            >
              <span className="ntw text-14 leading-15 font-medium font-hn-medium">
                Reset
              </span>
            </button>
            <button
              className="ntw search-btn w-120 h-55 rounded-6"
              onClick={applyFilter}
            >
              <span className="ntw text-14 leading-15 font-medium font-hn-medium">
                Search
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
