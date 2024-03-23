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
  const [error, setError] = useState<Boolean>(false);
  const [countryError, setCountryError] = useState<Boolean>(false);
  const onSubmit = async (values: BusinessProfileSearchFormikPropsValues) => {
    let countryFilter: IFilter;
    let stateAndProvinceFilter: IFilter;
    let cityFilter: IFilter;
    let countrySelected = false;

    let searchFilters: IFilter[] = [];
    if (values.country) {
      countrySelected = true;
      setCountryError(false);
      countryFilter = {
        targetFieldName: "country",
        values: [values.country],
      };
      searchFilters.push(countryFilter);
    } else {
      setCountryError(true);
    }

    if (values.stateAndProvince) {
      stateAndProvinceFilter = {
        targetFieldName: "stateAndProvince",
        values: [values.stateAndProvince],
      };
      searchFilters.push(stateAndProvinceFilter);
    }
    if (values.city) {
      cityFilter = {
        targetFieldName: "city",
        values: [values.city],
      };
      searchFilters.push(cityFilter);
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

      searchFilters.push({
        targetFieldName: "businessCategoryUuid",
        values: Object.keys(businessCategoryMap),
      });
    }

    const payload: ISearch = {
      filters: searchFilters,
    };
    if (!error && countrySelected) {
      onFilter(payload);
    }
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
    try {
      let country = getResult(searchQuery, "country");
      let stateAndProvince = getResult(searchQuery, "stateAndProvince");
      let city = getResult(searchQuery, "city");
      let category: { [uuid: string]: string } = {};
      let businessCategoriesUUIDs: string[] | undefined;
      let businessCategories: IOption[] = [];

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

      if (businessCategory && businessCategory.length > 0) {
        businessCategory.forEach((thisBusinessCategory) => {
          category[thisBusinessCategory.uuid] = thisBusinessCategory.value;
        });
      }

      if (searchQuery && searchQuery.filters) {
        businessCategoriesUUIDs = searchQuery.filters.find(
          (thisFilter) => thisFilter.targetFieldName === "businessCategoryUuid"
        )?.values;
      }

      if (businessCategoriesUUIDs && category) {
        businessCategories = businessCategoriesUUIDs.map((thisUUID) => {
          if (thisUUID) {
            return { uuid: thisUUID, value: category[thisUUID] } as IOption;
          }
        }) as IOption[];
      }
      if (businessCategories && businessCategories.length > 0) {
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
