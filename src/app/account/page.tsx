"use client";
import { Eye, ClosedEye, Mail, Edit } from "@components/icons";
import Input from "@/components/ui/input";
import Button from "@components/ui/button";
import { useFormik } from "formik";
import { SignUpData, BaseResponseMessage } from "@/types/auth";
import { updateUserDetails } from "@/api/auth";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useAuth } from "@hooks/useAuth";
import { LoaderComponent } from "@components/Loader";
import { FlexColCenter, FlexRowStartBtw } from "@/components/Flex";
import withAuth from "@/utils/auth-helpers/withAuth";

const validationSchema = yup.object({
  firstName: yup
    .string()
    .min(1, "Enter valid First Name")
    .required("First Name is required!"),
  lastName: yup
    .string()
    .min(1, "Enter valid Last Name")
    .required("Last Name is required!"),
  password: yup.string(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const MyAccount = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<String | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { loading, userDetails } = useAuth();

  useEffect(() => {
    if (!loading && userDetails) {
      formik.setFieldValue("firstName", userDetails.firstName);
      formik.setFieldValue("lastName", userDetails.lastName);
      formik.setFieldValue("email", userDetails.email);
    }
  }, [loading, userDetails]);

  const onSubmit = async (values: SignUpData) => {
    const { confirmPassword, email, ...data } = values;
    setIsLoading(true);

    let updateProfile = false;
    setSuccess(false);
    setError(false);
    const password = values.password as string;
    const confPass = values.confirmPassword as string;

    if (password.length == 0 && confPass.length == 0) {
      updateProfile = true;
    }

    if ((password.length > 0 || confPass.length > 0) && password === confPass) {
      updateProfile = true;
    }

    if (updateProfile) {
      try {
        const res: BaseResponseMessage = (await updateUserDetails(data)).data;
        if (res.success) {
          setSuccess(true);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setError(true);
          setErrorMessage("error occured while updating profile");
        }
      } catch (err) {
        setIsLoading(false);
        setError(true);
        console.error(err);
        setErrorMessage("error occured while updating profile");
      }
    } else {
      setIsLoading(false);
      setError(true);
      setErrorMessage("password doesn't match");
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

  // Custom Styles
  const errorMessageStyle = {
    color: "red",
    display: "flex",
    fontSize: "13px",
  };

  const submitErrorMessageStyle = {
    color: "red",
    fontSize: "13px",
  };

  const sucessMessageStyle = {
    color: "green",
    fontSize: "13px",
  };

  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <FlexColCenter className="w-full bg-gray-201/20 px-5">
      <FlexColCenter className="w-full bg-white-100 px-5 py-9 gap-1 ">
        <h4 className="font-pp font-semibold leading-0">My Account</h4>
        <p className="font-pp text-[13px] text-white-400 mb-5">
          Edit or update your information
        </p>

        {/* Display Error message */}
        {error && <span style={submitErrorMessageStyle}>{errorMessage}</span>}

        {/* Display Success message */}
        {success && (
          <span style={sucessMessageStyle}>
            Succesfully Updated your Profile
          </span>
        )}

        <form onSubmit={formik.handleSubmit} className="w-full">
          <span style={errorMessageStyle}>
            {formik.touched.firstName && formik.errors.firstName
              ? formik.errors.firstName
              : ""}
          </span>
          <Input
            type="text"
            label="First Name"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            rightIcon={
              <Edit
                strokeWidth={1}
                className="stroke-white-100 fill-blue-200"
                size={20}
              />
            }
            onBlur={formik.handleBlur}
            placeholder="Enter First Name"
            parentClassname="w-full px-0 border border-white-400/50 px-4"
            inputClassname="w-full px-3 outline-none border-none"
          />

          <span style={errorMessageStyle}>
            {formik.touched.lastName && formik.errors.lastName
              ? formik.errors.lastName
              : ""}
          </span>
          <Input
            type="text"
            label="Last Name"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rightIcon={
              <Edit
                strokeWidth={1}
                className="stroke-white-100 fill-blue-200"
                size={20}
              />
            }
            placeholder="Enter Last Name"
            parentClassname="w-full px-0 border border-white-400/50 px-4"
            inputClassname="w-full px-3 outline-none border-none"
          />

          <Input
            type="email"
            label="Email Address"
            name="email"
            disabled={true}
            value={formik.values.email}
            rightIcon={
              <Mail
                strokeWidth={1}
                className="rounded-full stroke-white-100 fill-blue-200"
              />
            }
            placeholder="Enter Email Address"
            parentClassname="w-full px-0 border border-white-400/50 px-4"
            inputClassname="w-full px-3 outline-none border-none"
          />

          <span style={errorMessageStyle}>
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""}
          </span>
          <FlexRowStartBtw className="w-full">
            <p className="text-[14px] font-pp font-normal text-dark-100/60">
              Password
            </p>
            <a
              href="/auth/forgot-password/email"
              className="text-[12px] font-pp font-semibold text-dark-100/60 underline"
            >
              Reset Password
            </a>
          </FlexRowStartBtw>
          <Input
            type={!showPassword ? "password" : "text"}
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

          <span style={errorMessageStyle}>
            {formik.touched.confirmPassword && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : ""}
          </span>
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
                  onClick={() => setShowConirmPassword(!showConfirmPassword)}
                  className="cursor-pointer"
                  size={20}
                />
              ) : (
                <ClosedEye
                  onClick={() => setShowConirmPassword(!showConfirmPassword)}
                  className="cursor-pointer"
                  size={20}
                />
              )
            }
            placeholder="Enter Password"
            parentClassname="w-full px-0 border border-white-400/50 px-4"
            inputClassname="w-full px-3 outline-none border-none"
          />
          <div className="mt-4 w-full">
            <Button
              type="submit"
              intent="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full font-pp font-semibold text-[14px]"
            >
              Update profile
            </Button>
          </div>
        </form>
      </FlexColCenter>
    </FlexColCenter>
  );
};

export default withAuth(MyAccount);
