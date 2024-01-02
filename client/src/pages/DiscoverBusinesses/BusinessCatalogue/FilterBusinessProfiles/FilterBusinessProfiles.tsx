import { Country, State, City } from "../../../../../country-sate-city";
import { useFormik } from "formik";
import {
  BusinessCategories,
  IOption,
  businessCategories,
} from "types/business";
import { useEffect, useState } from "react";
import { allBusinessCategories } from "api/business";
import "./FilterBusinessProfiles.scss";
import Select from "components/Input/Select";
import MultiSelect from "components/Input/MultiSelect";
import Button from "components/Button/Button";
import { ISearch, IFilter } from "types/business-profile";
import CancelIcon from "assets/icons/cancel-icon.svg?react";
import { FILTERED_COUNTRY } from "utils/business-profile-utils";

export type BusinessProfileSearchFormikPropsValues = {
  businessCategory: string[];
  country: string;
  stateAndProvince: string;
  city: string;
};

interface FilterBusinessProps {
  onFilter: (payload: ISearch) => void;
  onCancle: () => void;
}

const FilterBusinessProfiles: React.FC<FilterBusinessProps> = ({
  onFilter,
  onCancle,
}) => {
  const [country, setCountry] = useState<IOption[]>();
  const [stateAndProvince, setStateAndProvince] = useState<IOption[]>();
  const [city, setCity] = useState<IOption[]>();
  const [error, setError] = useState<Boolean>(false);
  const [businessCategory, setBusinessCategory] = useState<IOption[]>();
  const onSubmit = async (values: BusinessProfileSearchFormikPropsValues) => {
    let countryFilter: IFilter;
    let stateAndProvinceFilter: IFilter;
    let cityFilter: IFilter;

    let searchFilters: IFilter[] = [];
    if (values.country) {
      countryFilter = {
        targetFieldName: "country",
        values: [values.country],
      };
      searchFilters.push(countryFilter);
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

    try {
      const allCat: BusinessCategories = (await allBusinessCategories()).data;
      if (allCat && allCat?.data?.businessCategories.length > 0) {
        let businessCategoryMap: { [description: string]: string } = {};
        let businessCategoryUUIDs: string[] = [];
        for (let i = 0; i < allCat?.data?.businessCategories.length; i++) {
          let thisCategory: businessCategories =
            allCat?.data?.businessCategories[i];
          businessCategoryMap[thisCategory.description] = thisCategory.uuid;
        }
        if (values.businessCategory && values.businessCategory.length > 0) {
          for (let j = 0; j < values.businessCategory.length; j++) {
            let thisBusinessCategory = values.businessCategory[j];
            businessCategoryUUIDs.push(
              businessCategoryMap[thisBusinessCategory]
            );
          }

          searchFilters.push({
            targetFieldName: "businessCategoryUuid",
            values: businessCategoryUUIDs,
          });
        }
      }
    } catch (error) {
      console.log(error);
      setError(true);
      alert(
        "There was an error submitting the form. Please Check your Business Categories option Please try again."
      );
    }

    const payload: ISearch = {
      filters: searchFilters,
    };
    if (!error) {
      onFilter(payload);
    }
  };
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
    try {
      allBusinessCategories().then((res) => {
        const resData: BusinessCategories = res.data;

        setBusinessCategory(
          resData.data.businessCategories.map((businessCat) => {
            return { uuid: businessCat.uuid, value: businessCat.description };
          })
        );

        setCountry(
          Country.getAllCountries().map((ct) => {
            return { uuid: ct.isoCode, value: ct.name };
          }).filter((ct)=>{
            return FILTERED_COUNTRY.includes(ct.value)
        })
        );
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
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

  return (
    <div className="filterForm">
      <div className="card">
        <div className="card__cancle">
          <span onClick={() => onCancle()}>{<CancelIcon />}</span>
        </div>
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
          formik={formik}
          options={businessCategory}
        />
        <Button
          type="submit"
          onClick={formik.submitForm}
          label="Show me businesses"
          variant="primary"
          size="lg"
        />
      </div>
    </div>
  );
};

export default FilterBusinessProfiles;
