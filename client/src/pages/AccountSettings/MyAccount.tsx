/** @format */

import EyeIcon from "assets/icons/eye-icon.svg?react";
import ClosedEyeIcon from "assets/icons/closed-eye-icon.svg?react";
import MailIcon from "assets/icons/mail-icon.svg?react";
import EditIcon from "assets/icons/edit-icon.svg?react";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import { useFormik } from "formik";
import {
  SignUpData,
  TOKEN_NAME,
  JwtPayload,
  UserDetailsResponse,
  BaseResponseMessage,
} from "types/auth";
import { getUserDetails, isAuthenticated, updateUserDetails } from "api/auth";
import { useEffect, useState } from "react";
import "./MyAccount.scss";
import * as yup from "yup";
import Spinner from "components/Spinner/Spinner";
import { useAuth } from "hooks/useAuth";
import { LoaderComponent } from "components/Loader/index";

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
    const authToken = localStorage.getItem(TOKEN_NAME) as string;
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
        const res: BaseResponseMessage = (
          await updateUserDetails(authToken, data)
        ).data;
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
    <div className="my-account">
      <div className="card">
        <h4>My Account</h4>
        <p>Edit or update your information</p>

        {/* Display Error message */}
        {error && <span style={submitErrorMessageStyle}>{errorMessage}</span>}

        {/* Display Success message */}
        {success && (
          <span style={sucessMessageStyle}>
            Succesfully Updated your Profile
          </span>
        )}

        <form onSubmit={formik.handleSubmit}>
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
            icon={<EditIcon className="input-icon" width={22} height={22} />}
            onBlur={formik.handleBlur}
            placeholder="Enter First Name"
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
            icon={<EditIcon className="input-icon" width={22} height={22} />}
            placeholder="Enter Last Name"
          />

          <Input
            type="email"
            label="Email Address"
            name="email"
            disabled={true}
            value={formik.values.email}
            icon={<MailIcon className="input-icon" />}
            placeholder="Enter Email Address"
          />

          <span style={errorMessageStyle}>
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""}
          </span>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p
              style={{
                marginBottom: "0px",
                fontSize: "14px",
                color: "var(--black-color)",
              }}
            >
              Password
            </p>
            <p
              style={{
                marginBottom: "0px",
                color: "#0E2D52",
                fontWeight: "400",
                fontSize: "12px",
              }}
            >
              Reset Password
            </p>
          </div>
          <Input
            type={!showPassword ? "password" : "text"}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            icon={
              showPassword ? (
                <EyeIcon
                  onClick={() => setShowPassword(!showPassword)}
                  className="input-icon"
                />
              ) : (
                <ClosedEyeIcon
                  onClick={() => setShowPassword(!showPassword)}
                  className="input-icon"
                />
              )
            }
            placeholder="Enter Password"
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
            icon={
              showConfirmPassword ? (
                <EyeIcon
                  onClick={() => setShowConirmPassword(!showConfirmPassword)}
                  className="input-icon"
                />
              ) : (
                <ClosedEyeIcon
                  onClick={() => setShowConirmPassword(!showConfirmPassword)}
                  className="input-icon"
                />
              )
            }
            placeholder="Enter Password"
          />
          <div style={{ marginTop: "40px" }}>
            {!isLoading && (
              <Button
                type="submit"
                label="Update profile"
                variant="primary"
                size="lg"
              />
            )}
            {isLoading && (
              <Button
                type="submit"
                label={Spinner()}
                variant="primary"
                size="lg"
                disabled={true}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyAccount;
