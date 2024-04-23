/** @format */

import { BusinessProfileFormikPropsValues } from "types/business";
import { FormikProps } from "formik";
import { FC } from "react";
import {
  DAYS_OF_OPERATIONS_OPTIONS,
  OPERATING_TIME_OPTIONS,
} from "utils/business-profile-utils";
import PhoneIcon from "assets/icons/phone-icon.svg?react";
import MailIcon from "assets/icons/mail-icon.svg?react";
import Input from "components/Input/Input";
import Button from "components/ui/button";
import Select from "components/Input/Select";
import MultiSelect from "components/Input/MultiSelect";
import { FlexColStart, FlexColStartCenter } from "components/Flex";

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
        <h4 className="text-[16px] text-center font-normal font-hnM leading-[24px] mb-[24px] ">
          Operation Info
        </h4>

        <Input
          type="tel"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          label="Business Phone Number"
          icon={<PhoneIcon className="input-icon" />}
          placeholder="Enter Phone Number"
        />

        <Input
          type="email"
          name="businessEmail"
          value={formik.values.businessEmail}
          onChange={formik.handleChange}
          label="Business Email"
          icon={<MailIcon className="input-icon" />}
          placeholder="Enter Business Email"
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
          <span className="text-[14px] font-hnM">
            {businessId ? `Update Profile` : `Submit Profile`}
          </span>
        </Button>
      </FlexColStartCenter>
    </FlexColStart>
  );
};

export default OperationInfo;
