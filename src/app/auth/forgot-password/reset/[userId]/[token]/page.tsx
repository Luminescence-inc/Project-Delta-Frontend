"use client";

import { Eye, ClosedEye } from "@components/icons";
import Button from "@components/ui/button";
import Input from "@/components/ui/input";
import * as yup from "yup";
import { BaseResponseMessage, ResetPasswordData } from "@/types/auth";
import { useFormik } from "formik";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { resetUserPassword } from "@/api/auth";
import { FlexColStart, FlexRowCenter } from "@/components/Flex";
import ErrorComponent from "@/components/ErrorComponent";

const validationSchema = yup.object({
  password: yup.string().required("Please Enter your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const ForgotPassword = () => {
  let { userId, uniqueString } = useParams();
  const router = useRouter();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<String | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: ResetPasswordData) => {
    // to='/forgot-password-final'
    setIsLoading(true);
    try {
      const res = await resetUserPassword(
        userId as string,
        uniqueString as string,
        values
      ).catch((err) => {
        const errorResponse: BaseResponseMessage = err.response.data;
        setIsLoading(false);

        // Set error message
        const errorCode = errorResponse?.message.code;
        if (errorCode == 499) {
          setErrorMessage(errorResponse?.message.desc);
        } else {
          setErrorMessage("error occured while resetting password");
        }
        setError(true);
        console.error(err);
      });

      const resData: BaseResponseMessage = res?.data;

      if (resData?.success) {
        // route to forgot-password-final
        router.push("/auth/forgot-password-final");
        setError(false);
        // window.location.reload();
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(true);
      setErrorMessage("error occured while resetting password");
    }
  };

  useEffect(() => {
    // remove this during code refactoring
    setShowConirmPassword(false);
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <div className="w-full px-[16px] py-[150px] bg-gray-50">
      <FlexColStart className="w-full h-full rounded-[8px] bg-white-100 px-[16px] py-[32px] text-center">
        <FlexRowCenter className="w-full">
          <h4 className="text-[16px] font-semibold leading-[14px] text-center font-pp mb-10">
            Reset password
          </h4>
        </FlexRowCenter>

        {/* Display Error message */}
        {error && <ErrorComponent value={errorMessage as string} />}

        <form className="w-full" onSubmit={formik.handleSubmit}>
          <ErrorComponent
            value={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""
            }
          />
          <Input
            type={!showPassword ? "password" : "text"}
            label="Enter new password"
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
            placeholder="Enter password"
            parentClassname="w-full px-0 border border-white-400/50 px-4"
            inputClassname="w-full px-3 outline-none border-none"
          />

          <ErrorComponent
            value={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : ""
            }
          />
          <Input
            type={!showConfirmPassword ? "password" : "text"}
            label="Re-enter Password"
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
            placeholder="Re-Enter Password"
            parentClassname="w-full px-0 border border-white-400/50 px-4"
            inputClassname="w-full px-3 outline-none border-none"
          />

          <br />

          <Button
            type="submit"
            intent="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full font-pp font-semibold text-[14px]"
          >
            Confirm Password
          </Button>
        </form>
      </FlexColStart>
    </div>
  );
};

export default ForgotPassword;
