"use client";

import { BusinessProfileFormikPropsValues, RegisterBusinessTabs } from "@/types/business";
import { FormikProps } from "formik";
import { FC, useState } from "react";
import {
  DAYS_OF_OPERATIONS_OPTIONS,
  FILE_TYPES,
  OPERATING_TIME_OPTIONS,
} from "@/utils/business-profile-utils";
import Input from "@/components/ui/input";
import Button from "@components/ui/button";
import Select from "@/components/Select";
import { FlexColStart, FlexColStartCenter, FlexRowCenter } from "@components/Flex";
import { Mail, Phone, AddMore, AddMoreClose } from "@/components/icons";
import {
  Instagram,
  Facebook,
  LinkedIn,
  Globe,
  X,
} from "@components/icons";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";

interface OperationInfoProps {
  formik: FormikProps<BusinessProfileFormikPropsValues>;
  businessId?: string | null;
  isLoading: boolean;
}


type SupportedSocialMedia = "instagram" | "website" | "linkedin" | "facebook";

const socialMediaLinksInput = [
  "instagram",
  "website",
  "linkedin",
  "facebook",
] as SupportedSocialMedia[];

interface OperationField {
  days: string;
  openTime: string;
  closeTime: string;
}


const OperationInfo: FC<OperationInfoProps> = ({
  formik,
  businessId,
  isLoading
}) => {
  const [count, setCount] = useState(1)
  const [fields, setFields] = useState<OperationField[]>([
    { days: DAYS_OF_OPERATIONS_OPTIONS[0].value, openTime: "", closeTime: "" }
  ]);

  const getNextDay = (currentDay: string) => {
    const days = DAYS_OF_OPERATIONS_OPTIONS.map(option => option.value);
    const currentIndex = days.indexOf(currentDay);
    return currentIndex !== -1 ? days[(currentIndex + 1) % days.length] : "";
    // return currentIndex !== -1 ? days[(currentIndex + 1) % days.length] : days[0];
  };

  const addField = () => {
    const usedDays = fields.map(field => field.days).filter(day => day !== "");
    if (usedDays.length >= DAYS_OF_OPERATIONS_OPTIONS.length) return;

    const lastDay = usedDays.length > 0 ? usedDays[usedDays.length - 1] : "";
    const nextDay = getNextDay(lastDay);

    setFields([...fields, { days: nextDay, openTime: "", closeTime: "" }]);
  };

  const getAvailableDays = (index: number) => {
    const usedDays = fields.map((field, i) => i !== index && field.days).filter(day => day !== "");
    return DAYS_OF_OPERATIONS_OPTIONS.filter(option => !usedDays.includes(option.value));
  };

  // const handleFieldChange = (index: number, field: keyof OperationField, value: string) => {
  //   const newFields = [...fields];
  //   newFields[index] = { ...newFields[index], [field]: value };
  //   setFields(newFields);
  // };

  const handleFieldChange = (index: number, field: keyof OperationField, value: string) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], [field]: value };

    // If the day is changed, update subsequent days to follow the sequence
    if (field === 'days') {
      for (let i = index + 1; i < newFields.length; i++) {
        newFields[i].days = getNextDay(newFields[i - 1].days);
      }
    }

    setFields(newFields);
    console.log(newFields, "newFields"); // Log the fields to check the values
  };

  console.log(fields, 'fields')

  const filterDaysOfOperation = DAYS_OF_OPERATIONS_OPTIONS.filter((days) => {
    const d = formik.values.daysOfOperation as Array<string>;
    return d.includes(days.value);
  });


  // ** Deletes form
  // const deleteForm = (e: any, index: number) => {
  //   e.preventDefault()
  //   e.target.closest('.repeater-wrapper').remove()
  //   // setFields(fields.filter((_, i) => i !== index));
  // }
  // what is expected to use
  const deleteForm = (e: React.MouseEvent<HTMLButtonElement>, day: string) => {
    e.preventDefault();
    setFields(prev => prev.filter(ff => ff.days !== day));
    setCount(prev => prev - 1);
  };

  return (
    <FlexColStart className="w-full h-full bg-gray-200  pb-[150px] ">
      <FlexColStartCenter className="w-full h-auto text-center bg-white-100 px-3 pb-[23px] gap-0">
        <div className="flex flex-col items-center justify-center my-[24px]">
          <h4 className="text-[16px] text-center font-bold font-pp leading-[24px] text-blue-200">Setup your business Profile</h4>
          <h6 className="text-[15px] text-gray-103">Operation Info</h6>
        </div>

        <Input
          type="tel"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          label="Business Phone Number"
          required
          rightIcon={
            <Phone className="stroke-none fill-blue-200 scale-[.75]" />
          }
          placeholder="Enter Phone Number"
          parentClassname="w-full px-0 border border-white-400/50 px-3"
          inputClassname="w-full px-3 outline-none border-none"
        />

        <Input
          type="email"
          name="businessEmail"
          value={formik.values.businessEmail}
          onChange={formik.handleChange}
          label="Business Email"
          required
          rightIcon={
            <Mail
              strokeWidth={1}
              className="stroke-white-100 fill-blue-200 rounded-md scale-[.85]"
            />
          }
          placeholder="Enter Business Email"
          parentClassname="w-full px-0 border border-white-400/50 px-3"
          inputClassname="w-full px-3 outline-none border-none"
        />

        <div className="flex items-start text-start w-full">
          <label className="w-full text-start text-[14px] font-semibold font-inter text-dark-100/60 whitespace-nowrap mb-1">
            Business open time<span className="text-[#F75B4E]">*</span>
          </label>
        </div>

        <div className="grid grid-cols-3 gap-4 w-full text-[13px] text-start font-normal text-gray-202 leading-[15.51px]">
          <span>Day</span>
          <span>Opening hour</span>
          <span>Closing hour</span>
        </div>

        {fields.map((field, i) => (
          <div key={i} className="relative w-full mb-4 repeater-wrapper">
            {fields.length > 1 && (
              <span className={`absolute -right-1 -top-1 z-50 cursor-pointer ${i === 0 ? "hidden" : ""}`}>
                <button
                  className="p-1 rounded-full bg-blue-200 flex flex-col items-center justify-center"
                  // onClick={(e) => deleteField(e, i)}
                  onClick={(e) => deleteForm(e, field.days)}
                >
                  <X size={12} className="stroke-white-100" />
                </button>
              </span>
            )}
            <div className="grid grid-cols-3 items-start gap-4 w-full">
              <div className="flex flex-col">
                <Select
                  name={`daysOfOperation${i}`}
                  formikValue={field.days}
                  formik={formik}
                  options={getAvailableDays(i)}
                  // options={DAYS_OF_OPERATIONS_OPTIONS}
                  placeholder="Select days"
                  // onChange={formik.handleChange}
                  onChange={(e: any) => handleFieldChange(i, 'days', e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <Select
                  name={`openTime${i}`}
                  formikValue={field.openTime}
                  formik={formik}
                  options={OPERATING_TIME_OPTIONS}
                  placeholder="Select opening time"
                  // onChange={formik.handleChange}
                  onChange={(e: any) => handleFieldChange(i, 'openTime', e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <Select
                  name={`closeTime${i}`}
                  formikValue={field.closeTime}
                  formik={formik}
                  options={OPERATING_TIME_OPTIONS}
                  placeholder="Select closing time"
                  // onChange={formik.handleChange}
                  onChange={(e: any) => handleFieldChange(i, 'closeTime', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}


        {fields.length < DAYS_OF_OPERATIONS_OPTIONS.length && (
          <div className='flex items-start w-full gap-3'>
            <div className='flex items-center gap-2 text-[13px] leading-[15.87px] font-medium bg-white-100 text-blue-200 p-4 cursor-pointer'
              onClick={addField}>
              <img src="/plus-add.svg" alt="" />
              <span className='underline'>Add more</span>
            </div>
          </div>
        )}


        <hr className="border border-blue-200 border-dashed my-4" />


        <h4 className="mt-[30px] text-[13px] text-base leading-[21.79px] font-pp font-semibold text-blue-200">
          Upload social media links<span className="text-gray-103 text-[13px] leading-[17.7px]">(optional)</span>
        </h4>
        <br />
        {socialMediaLinksInput.map((socialIconName) => (
          <SocialMediaLinks
            formik={formik}
            key={socialIconName}
            socialIconName={socialIconName as SupportedSocialMedia}
          />
        ))}

        <Button
          intent={"primary"}
          size={"lg"}
          className="w-full rounded-[5px] mt-5"
          isLoading={isLoading}
          spinnerColor="#000"
          onClick={formik.submitForm as any}
          type="submit"
        >
          <span className="text-[14px] font-pp">
            {businessId ? `Update Profile` : `Submit Profile`}
          </span>
        </Button>
      </FlexColStartCenter>
    </FlexColStart>
  );
};

export default OperationInfo;




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
          className="w-full rounded-[5px]  p-[16px] border-[1px] border-dark-103 text-[12px] font-pp font-medium leading-[14px] tracking-wide text-blue-200 pl-[60px]"
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
