"use client";

import { FC, useEffect, useRef, useState } from "react";
import { FormikProps } from "formik";
import { getAllBusinessCategories } from "@/api/business";
import {
  BusinessCategories,
  BusinessProfileFormikPropsValues,
  IOption,
  RegisterBusinessTabs,
} from "@/types/business";
import Country from "@/helpers/countries-states-city/country";
import City from "@/helpers/countries-states-city/city";
import State from "@/helpers/countries-states-city/state";
import { FILE_TYPES, FILTERED_COUNTRY } from "@/utils/business-profile-utils";
import {
  Instagram,
  Facebook,
  LinkedIn,
  Globe,
  ArrowBigUpDash,
  X,
} from "@components/icons";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Select from "@/components/Select";
import { CloudinaryConfig } from "@/config";
import {
  FlexColStart,
  FlexColStartCenter,
  FlexRowCenter,
} from "@/components/Flex";
import ErrorComponent from "@/components/ErrorComponent";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";

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
  isRequiredFieldEmpty: () => boolean;
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
  isRequiredFieldEmpty,
}) => {
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
    if (isRequiredFieldEmpty()) {
      toast.error("Please fill all required fields");
      return;
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
    <FlexColStart className="w-full h-full bg-gray-200 pt-[40px] px-[16px] pb-[150px] ">
      <FlexColStartCenter className="w-full h-auto text-center bg-white-100 rounded-[8px] pt-[24px] px-[16px] pb-[23px] gap-0">
        <h4 className="text-[16px] text-center font-semibold font-pp leading-[24px] mb-[24px] ">
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
          label="Business Name (required)"
          name="businessName"
          value={formik.values.businessName}
          onChange={formik.handleChange}
          rightIcon={
            // <ContactIcon className="input-icon" />
            null
          }
          parentClassname="w-full px-0"
          inputClassname="w-full px-3 border-white-400/50"
          placeholder="Enter Business Name"
        />

        <FlexColStart className="w-full mt-5 mb-3">
          <label className="text-[14px] font-semibold font-pp text-dark-100/60">
            Describe your business (required)
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
          label="Business Category (required)"
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
          label="Select Country (required)"
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
          label="State and Province (required)"
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
          label="Select City (required)"
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
          parentClassname="w-full px-0"
          inputClassname="w-full px-3 border-white-400/50"
        />
        <br />

        <Input
          type="text"
          name="postalCode"
          label="Zip code/Postal code"
          value={formik.values.postalCode}
          onChange={formik.handleChange}
          placeholder="Enter Postal Code"
          parentClassname="w-full px-0"
          inputClassname="w-full px-3 border-white-400/50"
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

        <div className="w-full relative font-pp border-[1px] border-white-200 rounded-[5px] mt-[10px] ">
          <FlexRowCenter className="w-full p-[16px] relative ">
            <span
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="cursor-pointer flex items-center justify-center text-blue-200 text-[10px] font-semibold font-pp leading-[14px] "
            >
              {imageFile ? imageFile.name : "Upload Your Logo (jpg/jpeg/png)"}
              <ArrowBigUpDash
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                size={15}
                strokeWidth={2.5}
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
              <button
                className="p-1 rounded-full absolute top-[15px] right-5 bg-blue-200 flex flex-col items-center justify-center"
                onClick={handleDelete}
              >
                <X size={12} className="stroke-white-100" />
              </button>
            )}
          </FlexRowCenter>
        </div>
        {imageFile && (
          <div className="mt-2">
            <h3 className="pb-[20px] pt-[10px] font-pp font-medium">
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
          <div className="w-full">
            <h3 className="font-pp font-medium pt-[20px] pb-[10px]">
              Current Logo:
            </h3>
            <img
              src={
                logoUrl
                  ? `https://res.cloudinary.com/${CloudinaryConfig.cloudName}/image/upload/c_fill,q_400/${logoUrl}.jpg`
                  : "/assets/images/default-img.jpeg"
              }
              alt="Uploaded"
              className="max-w-[100%]"
            />
            <Button
              onClick={handleDeleteLogo}
              className="w-full rounded-[5px] mt-5 text-sm"
              type="submit"
              intent={!deleteLogo ? "error" : "primary"}
              size="md"
            >
              <span className="font-pp font-medium">
                {!deleteLogo ? "Delete Logo" : "Reverse"}
              </span>
            </Button>
          </div>
        )}

        <h4 style={{ paddingTop: "40px" }}>Upload social media links</h4>
        <br />
        {socialMediaLinksInput.map((socialIconName) => (
          <SocialMediaLinks
            formik={formik}
            key={socialIconName}
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
          <span className="font-pp text-[14px] font-medium">Next</span>
        </Button>
      </FlexColStartCenter>
    </FlexColStart>
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
  let defaultClass = "absolute left-4 scale-[.75] stroke-blue-200 ";
  switch (name) {
    case "instagram":
      icon = <Instagram className={cn(defaultClass, "left-5")} />;
      break;
    case "website":
      icon = <Globe className={cn(defaultClass, "left-5")} />;
      break;
    case "linkedin":
      icon = (
        <LinkedIn
          strokeWidth={2.5}
          className={cn(defaultClass, "left-5 fill-blue-200 stroke-none")}
        />
      );
      break;
    case "facebook":
      icon = (
        <Facebook
          className={cn(defaultClass, "left-5 stroke-none fill-blue-200")}
        />
      );
      break;
    default:
      break;
  }
  return icon;
};
