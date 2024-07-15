"use client";
import React from "react";
import ContactSupportSubmitModal from "./SubmitModal";
import { useState } from "react";
import { ContactSupportDataSchema } from "@/types/business";
import { BaseResponseMessage } from "@/types/auth";
import { submitContactRequest } from "@/api/business";
import { useFormik, FormikHelpers } from "formik";
import * as yup from "yup";
import Input from "@/components/ui/input";
import Button from "@components/ui/button";
import { FlexColStart } from "@components/Flex";
import ErrorComponent from "@/components/ErrorComponent";

const validationSchema = yup.object({
  personName: yup
    .string()
    .min(1, "Enter valid Name")
    .required("First Name is required!"),
  email: yup.string().email("Enter valid email").required(),
  phoneNumber: yup
    .string()
    .matches(/^\+(?:[0-9]\s?){6,14}[0-9]$/, "Invalid phone number"),
  problemDescription: yup
    .string()
    .min(1, "Describe the issue you are having")
    .required("Issue description is required"),
});

export default function ContactSupportForm() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<String | null>(null);
  const [successMessage, setSuccessMessage] = useState<String | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async (
    values: ContactSupportDataSchema,
    { resetForm }: FormikHelpers<ContactSupportDataSchema>
  ) => {
    setIsLoading(true);
    try {
      const res = await submitContactRequest(values).catch((err) => {
        const errorResponse: BaseResponseMessage = err.response.data;
        // Set error message
        const errorCode = errorResponse?.message.code;
        if (errorCode == 409) {
          setErrorMessage(errorResponse?.message.desc);
        } else {
          setErrorMessage("error occured while login");
        }
        setError(true);
        console.error("The Error that occured is " + err);
        setIsLoading(false);
      });
      const resData: BaseResponseMessage = res?.data;
      setSuccessMessage(resData?.message?.desc);
      resetForm();
      setIsModalOpen(true);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(true);
      console.error(err);
      setErrorMessage("error occured while login");
    }
  };

  const formik = useFormik({
    initialValues: {
      personName: "",
      email: "",
      phoneNumber: "",
      problemDescription: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Display Error message */}
      {error && <ErrorComponent value={errorMessage as string} />}
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <FlexColStart className="w-full gap-0 m-0 p-0">
          <ErrorComponent value={formik.errors.personName ?? ""} />

          <Input
            type="text"
            label="Name"
            name="personName"
            value={formik.values.personName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter Name"
          />
          <ErrorComponent
            value={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
          />

          <Input
            type="text"
            label="Your Email Address"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter Your Email"
          />
          <ErrorComponent
            value={
              formik.touched.phoneNumber && formik.errors.phoneNumber
                ? formik.errors.phoneNumber
                : ""
            }
          />

          <Input
            type="text"
            label="Your Phone Number"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter Your Phone Number"
          />
          <ErrorComponent
            value={
              formik.touched.problemDescription &&
              formik.errors.problemDescription
                ? formik.errors.problemDescription
                : ""
            }
          />

          <FlexColStart className="w-full mb-[24px]">
            <label htmlFor="">Describe problem</label>
            <textarea
              name="problemDescription"
              value={formik.values.problemDescription}
              onChange={formik.handleChange}
              rows={4}
              className="w-full px-3 py-2 font-pp font-normal text-[12px] bg-white-200/10 border-[1px] border-white-200/40 rounded-[5px]"
              placeholder="describe the issue you are having"
            />
          </FlexColStart>

          <Button
            type="submit"
            intent="primary"
            size="lg"
            disabled={isLoading}
            isLoading={isLoading}
            className="w-full rounded-[5px] mt-10"
          >
            <span className="font-pp font-medium text-[14px]">
              Submit Request
            </span>
          </Button>
        </FlexColStart>
      </form>

      <ContactSupportSubmitModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        successMessage={successMessage as string}
        errorMessage={errorMessage as string}
      />
    </>
  );
}
