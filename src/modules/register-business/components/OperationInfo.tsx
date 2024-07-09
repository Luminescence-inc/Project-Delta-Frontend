"use client";

import { BusinessProfileFormikPropsValues } from "@/types/business";
import { FormikProps } from "formik";
import { FC } from "react";
import {
  DAYS_OF_OPERATIONS_OPTIONS,
  OPERATING_TIME_OPTIONS,
} from "@/utils/business-profile-utils";
import Input from "@/components/ui/input";
import Button from "@components/ui/button";
import Select from "@/components/Select";
import MultiSelect from "@/components/MultiSelect";
import { FlexColStart, FlexColStartCenter } from "@components/Flex";
import { Mail, Phone } from "@/components/icons";

interface OperationInfoProps {
  formik: FormikProps<BusinessProfileFormikPropsValues>;
  businessId?: string | null;
  isLoading: boolean;
}

const OperationInfo: FC<OperationInfoProps> = ({
  formik,
  businessId,
  isLoading,
}) => {
  const filterDaysOfOperation = DAYS_OF_OPERATIONS_OPTIONS.filter((days) => {
    const d = formik.values.daysOfOperation as Array<string>;
    return d.includes(days.value);
  });

  return (
    <FlexColStart className="w-full h-full bg-gray-200 pt-[40px] px-[16px] pb-[150px] ">
      <FlexColStartCenter className="w-full h-auto text-center bg-white-100 rounded-[8px] pt-[24px] px-[16px] pb-[23px] ">
        <h4 className="text-[16px] text-center font-semibold font-pp leading-[24px] mb-[24px] ">
          Operation Info
        </h4>

        <Input
          type="tel"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          label="Business Phone Number"
          rightIcon={
            <Phone className="stroke-none fill-blue-200 scale-[.75]" />
          }
          placeholder="Enter Phone Number"
          parentClassname="w-full px-0 border border-white-400/50 px-4"
          inputClassname="w-full px-3 outline-none border-none"
        />

        <Input
          type="email"
          name="businessEmail"
          value={formik.values.businessEmail}
          onChange={formik.handleChange}
          label="Business Email"
          rightIcon={
            <Mail
              strokeWidth={1}
              className="stroke-white-100 fill-blue-200 rounded-md scale-[.85]"
            />
          }
          placeholder="Enter Business Email"
          parentClassname="w-full px-0 border border-white-400/50 px-4"
          inputClassname="w-full px-3 outline-none border-none"
        />

        <Select
          label="Business open time"
          name="openTime"
          formikValue={formik.values.openTime}
          formik={formik}
          placeholder={"Business open time"}
          options={OPERATING_TIME_OPTIONS}
        />

        <Select
          label="Business close time"
          name="closeTime"
          formikValue={formik.values.closeTime}
          formik={formik}
          placeholder={"Business close time"}
          options={OPERATING_TIME_OPTIONS}
        />

        <MultiSelect
          label="Days of operation"
          placeholder={"Days of operation"}
          name="daysOfOperation"
          formikValue={filterDaysOfOperation}
          formik={formik}
          options={DAYS_OF_OPERATIONS_OPTIONS}
        />

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
