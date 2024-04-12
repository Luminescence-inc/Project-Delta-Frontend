/** @format */

import { FC, useEffect, useRef, useState } from "react";
import { FormikProps } from "formik";
import { getAllBusinessCategories } from "api/business";
import {
  BusinessCategories,
  BusinessProfileFormikPropsValues,
  IOption,
} from "types/business";
import { Country, State, City } from "../../../../../country-sate-city";
import { FILE_TYPES, FILTERED_COUNTRY } from "utils/business-profile-utils";
import ContactIcon from "assets/icons/contact-icon.svg?react";
import UploadIcon from "assets/icons/upload-logo.svg?react";
import CancelIcon from "assets/icons/cancel-select-icon.svg?react";
import InstagramIcon from "assets/icons/instagram-icon.svg?react";
import LinkedinIcon from "assets/icons/linkedin-icon.svg?react";
import FaceBookIcon from "assets/icons/facebook-icon.svg?react";
import WebIcon from "assets/icons/web-icon.svg?react";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import Select from "components/Input/Select";
import { CloudinaryConfig } from "config";
import defaultImg from "assets/images/default-img.jpeg";
import "../Signup.scss";
import { useBusinessCtx } from "context/BusinessCtx";
import { FlexRowStart } from "components/Flex";

interface BusinessProfileProps {
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  setSelectedTab: React.Dispatch<React.SetStateAction<boolean>>;
  setImageFile: React.Dispatch<React.SetStateAction<File | null | undefined>>;
  setDeleteLogo: React.Dispatch<React.SetStateAction<boolean>>;
  deleteLogo: boolean;
  imageFile: File | null | undefined;
  tabsRef: React.RefObject<HTMLDivElement>;
  formik: FormikProps<BusinessProfileFormikPropsValues>;
  businessId?: string | null;
  logoUrl?: string | null;
  country: IOption[];
  setCountry: React.Dispatch<React.SetStateAction<IOption[]>>;
  stateAndProvince: IOption[];
  setStateAndProvince: React.Dispatch<React.SetStateAction<IOption[]>>;
  city: IOption[];
  setCity: React.Dispatch<React.SetStateAction<IOption[]>>;
}

const BusinessProfile: FC<BusinessProfileProps> = ({
  setActiveTab,
  setSelectedTab,
  setImageFile,
  setDeleteLogo,
  imageFile,
  tabsRef,
  formik,
  businessId,
  logoUrl,
  deleteLogo,
  setCountry,
  country,
  setStateAndProvince,
  stateAndProvince,
  city,
  setCity,
}) => {
  const { socialLinksError } = useBusinessCtx();
  const [businessCategory, setBusinessCategory] = useState<IOption[]>();
  const [error, setError] = useState<Boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      getAllBusinessCategories().then(async (res) => {
        const resData: BusinessCategories = res.data;

        setBusinessCategory(
          resData.data.businessCategories.map((businessCat) => {
            return { uuid: businessCat.uuid, value: businessCat.description };
          })
        );

        setCountry(
          Country.getAllCountries()
            .map((ct) => {
              return { uuid: ct.isoCode, value: ct.name };
            })
            .filter((ct) => {
              return FILTERED_COUNTRY.includes(ct.value);
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
      setCity([]);
    }
  }, [formik.values.country, businessId]);

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
    }
  }, [formik.values.stateAndProvince, businessId]);

  const handleNextButton = () => {
    if (tabsRef.current) {
      tabsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActiveTab(1);
    setSelectedTab(false);
  };

  const handleImage = (files: FileList | null) => {
    if (files) {
      const uploadedFile: File = files[0];
      const fileTypeExsit = FILE_TYPES.find((ft) => {
        return ft === uploadedFile.type;
      });
      if (fileTypeExsit) {
        setImageFile(uploadedFile);
        setError(false);
      } else {
        setError(true);
      }
    }
  };

  const handleDelete = () => {
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDeleteLogo = () => {
    setDeleteLogo(!deleteLogo);
  };

  // Custom Styles
  const errorMessageStyle = {
    color: "red",
    display: "flex",
    fontSize: "13px",
    margin: "0px",
  };

  return (
    <div className="signup">
      <div className="card">
        <h4>Complete Business Profile</h4>

        <span style={errorMessageStyle}>
          {formik.touched.businessName && formik.errors.businessName
            ? formik.errors.businessName
            : ""}
        </span>
        <Input
          type="text"
          label="Business Name"
          name="businessName"
          value={formik.values.businessName}
          onChange={formik.handleChange}
          icon={<ContactIcon className="input-icon" />}
          placeholder="Enter Business Name"
        />

        <div className="form-group">
          <label htmlFor="">Describe your business</label>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            rows={4}
            placeholder="Short sentence about your business"
          />
        </div>

        <span style={errorMessageStyle}>
          {formik.touched.businessCategory && formik.errors.businessCategory
            ? formik.errors.businessCategory
            : ""}
        </span>
        <Select
          label="Business Category"
          name="businessCategory"
          formikValue={formik.values.businessCategory}
          formik={formik}
          placeholder={"Business Category"}
          options={businessCategory}
        />

        <span style={errorMessageStyle}>
          {formik.touched.country && formik.errors.country
            ? formik.errors.country
            : ""}
        </span>
        <Select
          label="Select Country"
          name="country"
          formikValue={formik.values.country}
          formik={formik}
          placeholder={"Select Country"}
          options={country}
        />

        <span style={errorMessageStyle}>
          {formik.touched.stateAndProvince && formik.errors.stateAndProvince
            ? formik.errors.stateAndProvince
            : ""}
        </span>
        <Select
          label="State and Province"
          name="stateAndProvince"
          formikValue={formik.values.stateAndProvince}
          formik={formik}
          placeholder={"State and Province"}
          options={stateAndProvince}
        />

        <span style={errorMessageStyle}>
          {formik.touched.city && formik.errors.city ? formik.errors.city : ""}
        </span>
        <Select
          label="Select City"
          name="city"
          formikValue={formik.values.city}
          formik={formik}
          placeholder={"Select City"}
          options={city}
        />

        <Input
          name="street"
          type="text"
          label="Street"
          value={formik.values.street}
          onChange={formik.handleChange}
          placeholder="Enter Street Name"
        />

        <Input
          type="text"
          name="postalCode"
          label="Zip code/Postal code"
          value={formik.values.postalCode}
          onChange={formik.handleChange}
          placeholder="Enter Postal Code"
        />

        {error && (
          <span style={errorMessageStyle}>File Type not Supported</span>
        )}
        {error && (
          <span style={errorMessageStyle}>Supported format: jpg/jpeg/png</span>
        )}
        {imageFile && businessId != null && logoUrl && (
          <span style={errorMessageStyle}>
            NB: Uploading a new logo will override the previous Logo
          </span>
        )}
        <div className="file-upload">
          <label className="file-upload-label">
            <span className="placeholder-text">
              {imageFile ? imageFile.name : "Upload Your Logo (jpg/jpeg/png)"}
              <UploadIcon
                className="upload-arrow"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              />
            </span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                handleImage(e.target.files);
              }}
              style={{ display: "none" }}
            />
            {imageFile && (
              <button className="delete-button" onClick={handleDelete}>
                <CancelIcon width={14} height={14} />
              </button>
            )}
          </label>
        </div>
        {imageFile && (
          <div>
            <h3 style={{ paddingTop: "20px", paddingBottom: "10px" }}>
              Selected Logo:
            </h3>
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Uploaded"
              style={{ maxWidth: "100%", width: "342px", height: "152px" }}
            />
          </div>
        )}
        {!imageFile && businessId != null && logoUrl && (
          <div>
            <h3 style={{ paddingTop: "20px", paddingBottom: "10px" }}>
              Current Logo:
            </h3>
            <img
              src={
                defaultImg ??
                `https://res.cloudinary.com/${CloudinaryConfig.cloudName}/image/upload/c_fill,q_400/${logoUrl}.jpg`
              }
              alt="Uploaded"
              style={{ maxWidth: "100%" }}
            />
            <Button
              onClick={handleDeleteLogo}
              className={!deleteLogo ? "deleteLogo" : "reverse-delete-logo"}
              type="submit"
              label={!deleteLogo ? "Delete" : "Reverse"}
              variant="primary"
              size="md"
            />
          </div>
        )}

        <h4 style={{ paddingTop: "40px" }}>Upload social media links</h4>

        {/* error msg for social links validation */}
        {socialLinksError && (
          <FlexRowStart className="w-full">
            <p
              className="ntw text-13 font-medium font-hn-medium"
              style={{
                color: "red",
              }}
            >
              {socialLinksError}
            </p>
          </FlexRowStart>
        )}

        <br />

        <div className="form-group">
          <div className="input-wrapper">
            {<InstagramIcon className="input-icon-social" />}
            <input
              className="input-text-social"
              name="instagramUrl"
              type="text"
              placeholder="Add Instagram Link"
              value={formik.values.instagramUrl}
              onChange={formik.handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="input-wrapper">
            {<WebIcon className="input-icon-social" style={{ left: "30px" }} />}
            <input
              className="input-text-social"
              name="websiteUrl"
              type="text"
              placeholder="Add Website Link"
              value={formik.values.websiteUrl}
              onChange={formik.handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="input-wrapper">
            {<LinkedinIcon className="input-icon-social" />}
            <input
              className="input-text-social"
              name="linkedinUrl"
              type="text"
              placeholder="Add Linkedin Link"
              value={formik.values.linkedinUrl}
              onChange={formik.handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="input-wrapper">
            {<FaceBookIcon className="input-icon-social" />}
            <input
              className="input-text-social"
              name="facebookUrl"
              type="text"
              placeholder="Add Facebook Link"
              value={formik.values.facebookUrl}
              onChange={formik.handleChange}
            />
          </div>
        </div>

        <Button
          label="Next"
          variant="primary"
          size="lg"
          onClick={handleNextButton}
        />
      </div>
    </div>
  );
};

export default BusinessProfile;
