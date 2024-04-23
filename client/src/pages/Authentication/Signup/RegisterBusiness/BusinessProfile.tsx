/** @format */

import { FC, useEffect, useRef, useState } from "react";
import { FormikProps } from "formik";
import { getAllBusinessCategories } from "api/business";
import {
  BusinessCategories,
  BusinessProfileFormikPropsValues,
  IOption,
  RegisterBusinessTabs,
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
import Button from "components/ui/button";
import Select from "components/Input/Select";
import { CloudinaryConfig } from "config";
import defaultImg from "assets/images/default-img.jpeg";
import "../Signup.scss";
import { useBusinessCtx } from "context/BusinessCtx";
import { FlexColStart, FlexRowCenter } from "components/Flex";
import ErrorComponent from "pages/Authentication/ErrorComponent";
import { cn } from "utils";

interface BusinessProfileProps {
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  setSelectedTab: React.Dispatch<React.SetStateAction<RegisterBusinessTabs>>;
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
  socialEndRef: React.RefObject<HTMLDivElement>;
}

type SupportedSocialMedia = "instagram" | "website" | "linkedin" | "facebook";

const socialMediaLinksInput = [
  "instagram",
  "website",
  "linkedin",
  "facebook",
] as SupportedSocialMedia[];

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
  socialEndRef,
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
      tabsRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setActiveTab(1);
    setSelectedTab("operations-info");
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
        <h4 className="text-[16px] text-center font-normal font-hnM leading-[24px] mb-[24px] ">
          Complete Business Profile
        </h4>

        <ErrorComponent
          value={
            formik.touched.businessName && formik.errors.businessName
              ? formik.errors.businessName
              : ""
          }
        />
        <Input
          type="text"
          label="Business Name"
          name="businessName"
          value={formik.values.businessName}
          onChange={formik.handleChange}
          icon={<ContactIcon className="input-icon" />}
          placeholder="Enter Business Name"
        />

        <FlexColStart className="w-full ">
          <label className="text-[14px] font-extrabold font-hnL text-dark-100">
            Describe your business
          </label>
          <textarea
            name="description"
            className="w-full border-[1px] border-solid border-dark-103 tracking-[2px] text-[12px] text-blue-200 py-[10px] px-[10px] rounded-[5px] placeholder:text-dark-104"
            value={formik.values.description}
            onChange={formik.handleChange}
            rows={4}
            placeholder="Short sentence about your business"
          />
        </FlexColStart>
        <br />
        <ErrorComponent
          value={
            formik.touched.businessCategory && formik.errors.businessCategory
              ? formik.errors.businessCategory
              : ""
          }
        />
        <Select
          label="Business Category"
          name="businessCategory"
          formikValue={formik.values.businessCategory}
          formik={formik}
          placeholder={"Business Category"}
          options={businessCategory}
        />

        <br />

        <ErrorComponent
          value={
            formik.touched.country && formik.errors.country
              ? formik.errors.country
              : ""
          }
        />
        <Select
          label="Select Country"
          name="country"
          formikValue={formik.values.country}
          formik={formik}
          placeholder={"Select Country"}
          options={country}
        />

        <br />

        <ErrorComponent
          value={
            formik.touched.stateAndProvince && formik.errors.stateAndProvince
              ? formik.errors.stateAndProvince
              : ""
          }
        />
        <Select
          label="State and Province"
          name="stateAndProvince"
          formikValue={formik.values.stateAndProvince}
          formik={formik}
          placeholder={"State and Province"}
          options={stateAndProvince}
        />

        <br />

        <ErrorComponent
          value={
            formik.touched.city && formik.errors.city ? formik.errors.city : ""
          }
        />
        <Select
          label="Select City"
          name="city"
          formikValue={formik.values.city}
          formik={formik}
          placeholder={"Select City"}
          options={city}
        />

        <br />
        <Input
          name="street"
          type="text"
          label="Street"
          value={formik.values.street}
          onChange={formik.handleChange}
          placeholder="Enter Street Name"
        />
        <br />

        <Input
          type="text"
          name="postalCode"
          label="Zip code/Postal code"
          value={formik.values.postalCode}
          onChange={formik.handleChange}
          placeholder="Enter Postal Code"
        />
        <br />

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

        <div className="w-full relative font-inter border-[1px] border-white-200 rounded-[5px] mt-[10px] ">
          <FlexRowCenter className="w-full p-[16px] ">
            <span className=" flex-1 flex items-center justify-center text-blue-200 text-[10px] font-semibold font-inter leading-[14px] ">
              {imageFile ? imageFile.name : "Upload Your Logo (jpg/jpeg/png)"}
              <UploadIcon
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="ml-[10px] cursor-pointer"
              />
            </span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleImage(e.target.files)}
              className="hidden"
            />
            {imageFile && (
              <button className="delete-button" onClick={handleDelete}>
                <CancelIcon width={14} height={14} />
              </button>
            )}
          </FlexRowCenter>
        </div>
        {imageFile && (
          <div className="mt-2">
            <h3 className="pb-[20px] pt-[10px] font-inter font-medium">
              Selected Logo:
            </h3>
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Uploaded"
              className="max-w-[100%] w-[342px] h-[152px]"
            />
          </div>
        )}
        {!imageFile && businessId != null && logoUrl && (
          <div>
            <h3 className="font-inter font-medium pt-[20px] pb-[10px]">
              Current Logo:
            </h3>
            <img
              src={
                defaultImg ??
                `https://res.cloudinary.com/${CloudinaryConfig.cloudName}/image/upload/c_fill,q_400/${logoUrl}.jpg`
              }
              alt="Uploaded"
              className="max-w-[100%]"
            />
            <Button
              onClick={handleDeleteLogo}
              className="deleteLogo"
              type="submit"
              intent={!deleteLogo ? "error" : "primary"}
              size="md"
            >
              <span className="font-inter font-medium">Delete</span>
            </Button>
          </div>
        )}

        <h4 style={{ paddingTop: "40px" }}>Upload social media links</h4>

        {/* error msg for social links validation */}
        {socialLinksError && (
          <ErrorComponent _ref={socialEndRef} value={socialLinksError} />
        )}

        <br />

        {socialMediaLinksInput.map((socialIconName) => (
          <SocialMediaLinks
            formik={formik}
            socialIconName={socialIconName as SupportedSocialMedia}
          />
        ))}

        <Button
          onClick={handleNextButton}
          className="w-full rounded-[5px] mt-5"
          type="submit"
          intent="primary"
          size="lg"
        >
          <span className="font-inter text-[14px] font-medium">Next</span>
        </Button>
      </div>
    </div>
  );
};

export default BusinessProfile;

interface ISocialMediaLinks {
  formik: FormikProps<BusinessProfileFormikPropsValues>;
  socialIconName: SupportedSocialMedia;
}

const SocialMediaLinks = ({ formik, socialIconName }: ISocialMediaLinks) => {
  const formattedSocialIconName =
    socialIconName.charAt(0).toUpperCase() + socialIconName.slice(1);
  const linkName = socialIconName.toLowerCase() + "Url";
  return (
    <div className="w-full mb-[24px]">
      <FlexRowCenter className="w-full relative">
        {renderSocialMediaIcons(socialIconName)}
        <input
          className="w-full rounded-[5px]  p-[16px] border-[1px] border-dark-103 text-[12px] font-medium leading-[14px] tracking-wide text-blue-200 pl-[60px]"
          name={linkName}
          type="url"
          placeholder={`Add ${formattedSocialIconName} Link`}
          // @ts-expect-error
          value={formik.values[linkName as any]}
          onChange={formik.handleChange}
        />
      </FlexRowCenter>
    </div>
  );
};

const renderSocialMediaIcons = (name: SupportedSocialMedia) => {
  let icon = null;
  let defaultClass = "absolute left-4";
  switch (name) {
    case "instagram":
      icon = <InstagramIcon className={cn(defaultClass)} />;
      break;
    case "website":
      icon = <WebIcon className={cn(defaultClass, "left-6")} />;
      break;
    case "linkedin":
      icon = <LinkedinIcon className={cn(defaultClass)} />;
      break;
    case "facebook":
      icon = <FaceBookIcon className={cn(defaultClass, "left-8")} />;
      break;
    default:
      break;
  }
  return icon;
};
