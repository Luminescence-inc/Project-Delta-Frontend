"use client";

import { BusinessProfileFormikPropsValues, RegisterBusinessTabs } from "@/types/business";
import { FormikProps } from "formik";
import { FC, useRef, useState } from "react";
import {
  DAYS_OF_OPERATIONS_OPTIONS,
  FILE_TYPES,
  OPERATING_TIME_OPTIONS,
} from "@/utils/business-profile-utils";
import Input from "@/components/ui/input";
import Button from "@components/ui/button";
import Select from "@/components/Select";
import MultiSelect from "@/components/MultiSelect";
import { FlexColStart, FlexColStartCenter, FlexRowCenter } from "@components/Flex";
import { Mail, Phone, AddMore, AddMoreClose } from "@/components/icons";
import {
  Instagram,
  Facebook,
  LinkedIn,
  Globe,
  X,
  CircleUser,
} from "@components/icons";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import Repeater from "@/components/Repeater";
import { SlideDown } from 'react-slidedown'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
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

const OperationInfo: FC<OperationInfoProps> = ({
  formik,
  businessId,
  isLoading
}) => {
  const [count, setCount] = useState(1)

  const filterDaysOfOperation = DAYS_OF_OPERATIONS_OPTIONS.filter((days) => {
    const d = formik.values.daysOfOperation as Array<string>;
    return d.includes(days.value);
  });
 

  // ** Deletes form
  const deleteForm = (e: any) => {
    e.preventDefault()
    e.target.closest('.repeater-wrapper').remove()
  }

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

        <Repeater {...{ count }}>
          {(i: number) => {
            const Tag = i === 0 ? 'div' : SlideDown
            return (
              <Tag key={i} className='repeater-wrapper  w-full'>
                {count > 1 && <span className={`${i == 0 ? "hidden" : ""} absolute -right-1 -top-1 z-50 cursor-pointer`} onClick={deleteForm}>
                  <button
                    className={`${i == 0 ? "hidden" : ""} p-1 rounded-full  bg-blue-200 flex flex-col items-center justify-center`}
                    onClick={deleteForm}
                  >
                    <X size={12} className="stroke-white-100" />
                  </button>
                </span>}

                <div className="grid grid-cols-3 items-start gap-4 w-full">
                  <div className="flex flex-col">
                    {/* <MultiSelect
                      placeholder={"Days"}
                      name="daysOfOperation"
                      isSearch={false}
                      formikValue={filterDaysOfOperation}
                      formik={formik}
                      options={DAYS_OF_OPERATIONS_OPTIONS}
                    /> */}
                    <Select
                      name="Days"
                      formikValue={formik.values.daysOfOperationOG}
                      formik={formik}
                      placeholder={"--"}
                      options={DAYS_OF_OPERATIONS_OPTIONS}
                    />
                  </div>

                  <div className="flex flex-col">
                    <Select
                      name="openTime"
                      formikValue={formik.values.openTime}
                      formik={formik}
                      placeholder={"--"}
                      options={OPERATING_TIME_OPTIONS}
                    />
                  </div>

                  <div className="flex flex-col">

                    <Select
                      name="closeTime"
                      formikValue={formik.values.closeTime}
                      formik={formik}
                      placeholder={"--"}
                      options={OPERATING_TIME_OPTIONS}
                    />
                  </div>

                </div>
              </Tag>
            )
          }}
        </Repeater>

        <div className='flex items-start w-full gap-3'>
          <div className='flex items-center gap-2 text-[13px] leading-[15.87px] font-medium bg-white-100 text-blue-200 p-4 cursor-pointer' onClick={() => setCount(count + 1)}>
            {/* <AddMore className='me-4' />  */}
            <img src="/plus-add.svg" alt="" />
            <span className='underline'>Add more</span>
          </div>
        </div>


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
