import { Country, State, City } from "../../../../../country-sate-city";
import { useFormik } from "formik";
import { IOption } from "types/business";
import { useEffect, useState } from "react";
import "./FilterBusinessProfiles.scss";
import Select from "components/Input/Select";
import MultiSelect from "components/Input/MultiSelect";
import Button from "components/Button/Button";
import { ISearch, IFilter } from "types/business-profile";
import CancelIcon from "assets/icons/cancel-icon.svg?react";
import { FILTERED_COUNTRY } from "utils/business-profile-utils";
import { useBusinessCtx } from "context/BusinessCtx";

export type BusinessProfileSearchFormikPropsValues = {
  businessCategory: string[];
  country: string;
  stateAndProvince: string;
  city: string;
};

interface FilterBusinessProps {
  onFilter: (payload: ISearch) => void;
  onCancle?: () => void;
  businessCategory: IOption[] | undefined;
}

const FilterBusinessProfiles: React.FC<FilterBusinessProps> = ({
  onFilter,
  onCancle,
  businessCategory,
}) => {
  const { searchQuery } = useBusinessCtx();
  const [country, setCountry] = useState<IOption[]>();
  const [stateAndProvince, setStateAndProvince] = useState<IOption[]>();
  const [city, setCity] = useState<IOption[]>();
  const [selectedBusinessCategory, setSelectedBusinessCategory] =
    useState<IOption[]>();
  const [_searchFilters, setSearchFilters] = useState<IFilter[]>([]);
  const [error, setError] = useState<Boolean>(false);
  const [countryError, setCountryError] = useState<Boolean>(false);

  const onSubmit = async (values: BusinessProfileSearchFormikPropsValues) => {
    let countryFilter: IFilter;
    let stateAndProvinceFilter: IFilter;
    let cityFilter: IFilter;
    let countrySelected = false;
    let searchFilters: IFilter[] = _searchFilters ?? [];

    // console.log(values);

    if (values.country) {
      countrySelected = true;
      setCountryError(false);
      countryFilter = {
        targetFieldName: "country",
        values: [values.country],
      };
      searchFilters.push(countryFilter);
      addSearchFilters("country", values.country);
    } else {
      setCountryError(true);
    }

    if (values.stateAndProvince) {
      stateAndProvinceFilter = {
        targetFieldName: "stateAndProvince",
        values: [values.stateAndProvince],
      };
      searchFilters.push(stateAndProvinceFilter);
      addSearchFilters("stateAndProvince", values.stateAndProvince);
    }
    if (values.city) {
      cityFilter = {
        targetFieldName: "city",
        values: [values.city],
      };
      searchFilters.push(cityFilter);
      addSearchFilters("city", values.city);
    }
    if (values.businessCategory) {
      let businessCategoryMap: { [key: string]: string } = {};

      values.businessCategory?.forEach((thisBusinessCategory) => {
        const thisBusinessCategoryOption = businessCategory?.find(
          (thisOption) => thisOption.value === thisBusinessCategory
        );
        if (thisBusinessCategoryOption) {
          businessCategoryMap[thisBusinessCategoryOption.uuid] =
            thisBusinessCategoryOption.value;
        }
      });

      // loop through the map
      const businessCategories: IOption[] = [];
      for (const [key, value] of Object.entries(businessCategoryMap)) {
        businessCategories.push({ uuid: key, value: value });
      }
      setSelectedBusinessCategory(businessCategories);

      if (Object.entries(businessCategoryMap).length > 0) {
        searchFilters.push({
          targetFieldName: "businessCategoryUuid",
          values: Object.keys(businessCategoryMap),
        });
      }

      addSearchFilters(
        "businessCategoryUuid",
        Object.keys(businessCategoryMap)
      );
    }

    const payload: ISearch = {
      filters: searchFilters,
    };
    if (!error && countrySelected) {
      onFilter(payload);
    }

    console.log("searchFilters", searchFilters);
  };

  useEffect(() => {
    try {
      setCountry(
        Country.getAllCountries()
          .map((ct) => {
            return { uuid: ct.isoCode, value: ct.name };
          })
          .filter((ct) => {
            return FILTERED_COUNTRY.includes(ct.value);
          })
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getResult = (
    searchParam: ISearch | null,
    filterTag: String
  ): string | undefined => {
    if (searchParam && searchParam.filters) {
      let data = searchParam.filters.find(
        (thisFilter) =>
          thisFilter.targetFieldName.toLowerCase() === filterTag.toLowerCase()
      )?.values[0];
      return data;
    }
  };

  const getStateFormData = (country: string) => {
    const countryCode = Country.getAllCountries().find(
      (c) => c.name.toLowerCase() === country?.toLowerCase()
    )?.isoCode;
    const states = State.getStatesOfCountry(countryCode);
    return { states, countryCode };
  };

  const getCityFormData = (countryCode: string, state: string) => {
    const cities = City.getCitiesOfState(countryCode, state);
    return { cities };
  };

  useEffect(() => {
    console.log(searchQuery);
  }, []);

  useEffect(() => {
    console.log("searchFilters", _searchFilters);
  }, [_searchFilters]);

  useEffect(() => {
    try {
      let country = getResult(searchQuery, "country");
      let stateAndProvince = getResult(searchQuery, "stateAndProvince");
      let city = getResult(searchQuery, "city");
      let category: { [uuid: string]: string } = {};
      let businessCategoriesUUIDs: string[] | undefined;
      let businessCategories: IOption[] = [];

      // console.log("businessCat", businessCategory);

      // prefill the stateAndProvinces form field back when filter is applied or not
      if (country) {
        const { states } = getStateFormData(country!);

        setStateAndProvince(
          states.map((st) => {
            return { uuid: st.isoCode, value: st.name };
          })
        );
      }

      if (country) {
        formik.setFieldValue("country", country);
      }
      if (stateAndProvince) {
        formik.setFieldValue("stateAndProvince", stateAndProvince);
      }

      if (city) {
        formik.setFieldValue("city", city);
      }

      // if (businessCategory && businessCategory.length > 0) {
      //   businessCategory.forEach((thisBusinessCategory) => {
      //     category[thisBusinessCategory.uuid] = thisBusinessCategory.value;
      //   });
      // }

      if (searchQuery && searchQuery.filters) {
        businessCategoriesUUIDs = searchQuery.filters.find(
          (thisFilter) => thisFilter.targetFieldName === "businessCategoryUuid"
        )?.values;

        console.log("businessCategoriesUUIDs", {
          businessCategoriesUUIDs,
          selectedBusinessCategory,
        });

        if (businessCategoriesUUIDs && businessCategoriesUUIDs?.length > 0) {
          businessCategoriesUUIDs?.forEach((thisUUID) => {
            const thisCategory = businessCategory?.find(
              (thisOption) => thisOption.uuid === thisUUID
            );
            if (thisCategory) {
              category[thisUUID] = thisCategory.value;
            }
          });
        }
      }

      if (businessCategoriesUUIDs && Object.entries(category).length > 0) {
        businessCategories = businessCategoriesUUIDs.map((thisUUID) => {
          if (thisUUID) {
            return { uuid: thisUUID, value: category[thisUUID] } as IOption;
          }
        }) as IOption[];
        console.log("exists here", businessCategories);
      }
      if (businessCategories && businessCategories.length > 0) {
        console.log("e4hyyy", businessCategories);
        setSelectedBusinessCategory(businessCategories);
        formik.setFieldValue("businessCategory", businessCategories);
      }
    } catch (err) {}
  }, [searchQuery, country]);

  const formik = useFormik({
    initialValues: {
      businessCategory: [],
      country: "",
      stateAndProvince: "",
      city: "",
    },
    validateOnBlur: true,
    onSubmit,
  });

  useEffect(() => {
    if (formik.values.country != "") {
      const selectedCountry = country?.find((ct) => {
        return ct.value === formik.values.country;
      });
      const states = State.getStatesOfCountry(selectedCountry?.uuid);
      setStateAndProvince(
        states.map((st) => {
          return { uuid: st.isoCode, value: st.name };
        })
      );

      //reset state and city
      formik.setFieldValue("stateAndProvince", "");
      formik.setFieldValue("city", "");
      setCity([]);
    }
  }, [formik.values.country]);

  useEffect(() => {
    if (formik.values.country != "" && formik.values.stateAndProvince != "") {
      const selectedCountry = country?.find((ct) => {
        return ct.value === formik.values.country;
      });
      const selectedState = stateAndProvince?.find((st) => {
        return st.value === formik.values.stateAndProvince;
      });
      const cities = City.getCitiesOfState(
        selectedCountry?.uuid as string,
        selectedState?.uuid as string
      );
      setCity(
        cities.map((ct) => {
          return { uuid: ct.name, value: ct.name };
        })
      );

      //reset city
      formik.setFieldValue("city", "");
    }
  }, [formik.values.stateAndProvince]);

  const addSearchFilters = (
    targetName:
      | "country"
      | "stateAndProvince"
      | "businessCategoryUuid"
      | "city",
    value: string | string[]
  ) => {
    const filterExists = _searchFilters.find(
      (thisFilter) =>
        thisFilter.targetFieldName.toLowerCase() === targetName.toLowerCase()
    );
    if (filterExists) {
      // update the filter
      const updatedFilters = _searchFilters.map((thisFilter) => {
        if (
          thisFilter.targetFieldName.toLowerCase() === targetName.toLowerCase()
        ) {
          return {
            targetFieldName: targetName,
            values: value instanceof Array ? value : [value],
          };
        }
        return thisFilter;
      });
      const restFilters = _searchFilters.filter(
        (thisFilter) => thisFilter.targetFieldName !== targetName
      );

      setSearchFilters([...restFilters, ...updatedFilters]);
      console.log("update");
    } else {
      console.log("add");
      // add the filter
      const newFilter = {
        targetFieldName: targetName,
        values: value instanceof Array ? value : [value],
      };
      if (
        _searchFilters.find(
          (thisFilter) =>
            thisFilter.targetFieldName.toLowerCase() ===
            targetName.toLowerCase()
        ) === undefined
      ) {
        setSearchFilters([..._searchFilters, newFilter]);
      }
    }
  };

  // useEffect(() => {
  //   // country
  //   if (formik.values.country != "") {
  //     const selectedCountry = country?.find((ct) => {
  //       return ct.value === formik.values.country;
  //     });
  //     const states = State.getStatesOfCountry(selectedCountry?.uuid);
  //     setStateAndProvince(
  //       states.map((st) => {
  //         return { uuid: st.isoCode, value: st.name };
  //       })
  //     );

  //     //reset state and city
  //     formik.setFieldValue("stateAndProvince", "");
  //     formik.setFieldValue("city", "");
  //     setCity([]);

  //     // set the filter search
  //     // setSearchFilters((prev) => [
  //     //   ...prev,
  //     //   { targetFieldName: "country", values: [formik.values.country] },
  //     // ]);
  //     addSearchFilters("country", formik.values.country);
  //   }
  //   // stateAndProvince
  //   if (formik.values.stateAndProvince != "") {
  //     const selectedCountry = country?.find((ct) => {
  //       return ct.value === formik.values.country;
  //     });
  //     const selectedState = stateAndProvince?.find((st) => {
  //       return st.value === formik.values.stateAndProvince;
  //     });
  //     const cities = City.getCitiesOfState(
  //       selectedCountry?.uuid as string,
  //       selectedState?.uuid as string
  //     );
  //     setCity(
  //       cities.map((ct) => {
  //         return { uuid: ct.name, value: ct.name };
  //       })
  //     );

  //     //reset city
  //     formik.setFieldValue("city", "");

  //     // set the filter search
  //     // setSearchFilters((prev) => [
  //     //   ...prev,
  //     //   {
  //     //     targetFieldName: "stateAndProvince",
  //     //     values: [formik.values.stateAndProvince],
  //     //   },
  //     // ]);
  //     addSearchFilters("stateAndProvince", formik.values.stateAndProvince);
  //   }
  //   // cities
  //   if (formik.values.city !== "") {
  //     // setSearchFilters((prev) => [
  //     //   ...prev,
  //     //   { targetFieldName: "city", values: [formik.values.city] },
  //     // ]);
  //     addSearchFilters("city", formik.values.city);
  //   }
  //   // categories
  //   if (formik.values.businessCategory.length > 0) {
  //     let businessCategoryMap: { [key: string]: string } = {};
  //     formik.values.businessCategory.forEach((thisBusinessCategory) => {
  //       const thisBusinessCategoryOption = businessCategory?.find(
  //         (thisOption) => thisOption.value === thisBusinessCategory
  //       );
  //       if (thisBusinessCategoryOption) {
  //         businessCategoryMap[thisBusinessCategoryOption.uuid] =
  //           thisBusinessCategoryOption.value;
  //       }
  //     });
  //     // loop through the map
  //     let businessCategories = [];
  //     for (const [key, value] of Object.entries(businessCategoryMap)) {
  //       businessCategories.push({ uuid: key, value: value });
  //     }

  //     // set the filter search
  //     // setSearchFilters((prev) => [
  //     //   ...prev,
  //     //   {
  //     //     targetFieldName: "businessCategoryUuid",
  //     //     values: Object.keys(businessCategoryMap),
  //     //   },
  //     // ]);
  //     addSearchFilters(
  //       "businessCategoryUuid",
  //       Object.keys(businessCategoryMap)
  //     );
  //   }
  // }, [formik.values]);

  // Custom Styles
  const errorMessageStyle = {
    color: "red",
    display: "flex",
    fontSize: "13px",
  };

  return (
    <div className="filterForm">
      <div className="card">
        <div className="card__cancle">
          {onCancle && <span onClick={() => onCancle()}>{<CancelIcon />}</span>}
        </div>
        {countryError && (
          <span style={errorMessageStyle}>Please select a country</span>
        )}
        <Select
          label="Select Country"
          name="country"
          formikValue={formik.values.country}
          formik={formik}
          placeholder={"Select Country"}
          options={country}
        />
        <Select
          label="State and Province"
          name="stateAndProvince"
          formikValue={formik.values.stateAndProvince}
          formik={formik}
          placeholder={"State and Province"}
          options={stateAndProvince}
        />
        <Select
          label="Select City"
          name="city"
          formikValue={formik.values.city}
          formik={formik}
          placeholder={"Select City"}
          options={city}
        />
        <MultiSelect
          label="Category"
          placeholder={"Select Categories"}
          name="businessCategory"
          formikValue={selectedBusinessCategory}
          formik={formik}
          options={businessCategory}
        />
        <Button
          type="submit"
          onClick={() => {
            formik.submitForm();
            {
              onCancle && onCancle();
            }
          }}
          label="Show me businesses"
          variant="primary"
          size="lg"
        />
      </div>
    </div>
  );
};

export default FilterBusinessProfiles;
