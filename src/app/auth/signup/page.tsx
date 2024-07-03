"use client";

import { Mail, ClosedEye, Eye, CircleUser } from "@components/icons";
import Input from "@/components/ui/input";
import { useFormik } from "formik";
import {
  SignUpResponse,
  SignUpData,
  TOKEN_NAME,
  LogInResponse,
} from "@/types/auth";
import { registerUser } from "@/api/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import {
  FlexColStart,
  FlexColStartCenter,
  FlexRowStartBtw,
} from "@components/Flex";
import Button from "@components/ui/button";
import ErrorComponent from "../../../components/ErrorComponent";
import withoutAuth from "@/utils/auth-helpers/withoutAuth";
import Link from "next/link";

const validationSchema = yup.object({
  firstName: yup
    .string()
    .min(1, "Enter valid First Name")
    .required("First Name is required!"),
  lastName: yup
    .string()
    .min(1, "Enter valid Last Name")
    .required("Last Name is required!"),
  email: yup.string().email("Enter valid email").required(),
  password: yup.string().required("Please Enter your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const Signup = () => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<String | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // remove this during code cleanup
    setShowConirmPassword(false);
  }, []);

  const onSubmit = async (values: SignUpData) => {
    const { confirmPassword, ...data } = values;
    setIsLoading(true);
    try {
      const res = await registerUser(data).catch((err) => {
        const errorResponse: LogInResponse = err.response.data;
        console.log(err.response.data);
        console.log("Information " + errorResponse?.message.code);
        // Set error message
        const errorCode = errorResponse?.message.code;
        if (errorCode == 409) {
          setErrorMessage(
            `User with email ${data.email} already exists, please login.`
          );
        } else {
          setErrorMessage("error occured while login");
        }
        setError(true);
        console.error(err);
        setIsLoading(false);
      });
      const resData: SignUpResponse = res?.data;

      if (res && resData?.success) {
        // setToken
        localStorage.setItem(TOKEN_NAME, resData.data.token.split(" ")[1]);
        setIsLoading(false);

        // route to verify-account
        router.push("/verify-account");
        window.location.reload();
      } else {
        // Set error message
        setError(true);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      setError(true);
      console.error(err);
      setErrorMessage("error occured while login");
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <FlexColStart className="w-full h-full bg-gray-200 pt-[40px] px-[16px] pb-[150px] ">
      <FlexColStartCenter className="w-full h-auto text-center bg-white-100 rounded-[8px] pt-[24px] px-[16px] pb-[23px] ">
        <h4 className="text-[16px] text-center font-semibold font-pp leading-[24px] mb-[24px] ">
          Create An Account
        </h4>

        {/* Display Error message */}
        {error && (
          <span className="text-red-100 text-[13px]">{errorMessage}</span>
        )}

        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <ErrorComponent
            value={
              formik.touched.firstName && formik.errors.firstName
                ? formik.errors.firstName
                : ""
            }
          />
          <Input
            type="text"
            label="First Name"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            rightIcon={<CircleUser className="stroke-none" />}
            onBlur={formik.handleBlur}
            placeholder="Enter First Name"
            parentClassname="w-full px-0 border border-white-400/50 px-4"
            inputClassname="w-full px-3 outline-none border-none"
          />
          <br />
          <ErrorComponent
            value={
              formik.touched.lastName && formik.errors.lastName
                ? formik.errors.lastName
                : ""
            }
          />
          <Input
            type="text"
            label="Last Name"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rightIcon={<CircleUser className="stroke-none" />}
            placeholder="Enter Last Name"
            parentClassname="w-full px-0 border border-white-400/50 px-4"
            inputClassname="w-full px-3 outline-none border-none"
          />

          <br />
          <ErrorComponent
            value={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
          />

          <Input
            type="email"
            label="Email Address"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rightIcon={
              <Mail
                strokeWidth={1}
                size={20}
                className="rounded-full stroke-white-100 fill-blue-200"
              />
            }
            placeholder="Enter Email Address"
            parentClassname="w-full px-0 border border-white-400/50 px-4"
            inputClassname="w-full px-3 outline-none border-none"
          />
          <br />
          <ErrorComponent
            value={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""
            }
          />
          <Input
            type={!showPassword ? "password" : "text"}
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rightIcon={
              showPassword ? (
                <Eye
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  size={20}
                />
              ) : (
                <ClosedEye
                  onClick={() => setShowPassword(!showPassword)}
                  size={20}
                  className="cursor-pointer"
                />
              )
            }
            placeholder="Enter Password"
            parentClassname="w-full px-0 border border-white-400/50 px-4"
            inputClassname="w-full px-3 outline-none border-none"
          />

          <br />
          <ErrorComponent
            value={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : ""
            }
          />

          <Input
            type={!showConfirmPassword ? "password" : "text"}
            label="Confirm Password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rightIcon={
              showConfirmPassword ? (
                <Eye
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  size={20}
                />
              ) : (
                <ClosedEye
                  onClick={() => setShowPassword(!showPassword)}
                  size={20}
                  className="cursor-pointer"
                />
              )
            }
            placeholder="Enter Password"
            parentClassname="w-full px-0 border border-white-400/50 px-4"
            inputClassname="w-full px-3 outline-none border-none"
          />

          <FlexRowStartBtw className="w-full py-10 mb-[24px]">
            <input type="checkbox" />
            <p className="font-pp font-normal text-blue-200 text-[12px] leading-[17px]">
              By clicking Sign Up you agree to our{" "}
              <a
                target="_blank"
                href="/docs/BizConnect24-Terms-of-Agreement.pdf"
                className="text-teal-100"
                // pointing to the public dir
              >
                Terms and Conditions
              </a>{" "}
              and that you have read our
              <a
                target="_blank"
                href="/docs/BizConnect24-Terms-of-Agreement.pdf" // pointing to the public dir
                className="text-teal-100"
              >
                Privacy Policy
              </a>
            </p>
          </FlexRowStartBtw>

          <Button
            intent={"primary"}
            size={"lg"}
            className="w-full rounded-sm"
            isLoading={isLoading}
            spinnerColor="#000"
            onClick={formik.handleSubmit as any}
          >
            <span className="text-[14px] font-pp">Submit</span>
          </Button>
        </form>

        <p className="text-dark-100/50 text-[14px] font-pp mt-[14px] ">
          Have an Account?{" "}
          <Link href="/login">
            <span className="text-blue-200 underline">Sign in</span>
          </Link>
        </p>
      </FlexColStartCenter>
    </FlexColStart>
  );
};

export default withoutAuth(Signup);
