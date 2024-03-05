/** @format */

import { Link } from "react-router-dom";
import EyeIcon from "assets/icons/eye-icon.svg?react";
import ClosedEyeIcon from "assets/icons/closed-eye-icon.svg?react";
import MailIcon from "assets/icons/mail-icon.svg?react";
import ContactIcon from "assets/icons/contact-icon.svg?react";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import { useFormik } from "formik";
import {
  SignUpResponse,
  SignUpData,
  TOKEN_NAME,
  LogInResponse,
} from "types/auth";
import { registerUser } from "api/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.scss";
import * as yup from "yup";
import Spinner from "components/Spinner/Spinner";
import DefaultWebView from "components/DefaultWebView/DefaultWebView";

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
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<String | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
          setErrorMessage(errorResponse?.message.desc);
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
        navigate("/verify-account");
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

  return (
    <div className="responsive-content">
      <div className="signup mobile-view">
        <div className="card">
          <h4>Quick write about signing up</h4>

          {/* Display Error message */}
          {error && <span style={submitErrorMessageStyle}>{errorMessage}</span>}

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
              icon={<ContactIcon className="input-icon" />}
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
              icon={<ContactIcon className="input-icon" />}
              placeholder="Enter Last Name"
            />

            <span style={errorMessageStyle}>
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""}
            </span>
            <Input
              type="email"
              label="Email Address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              icon={<MailIcon className="input-icon" />}
              placeholder="Enter Email Address"
            />

            <span style={errorMessageStyle}>
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""}
            </span>
            <Input
              type={!showPassword ? "password" : "text"}
              label="Password"
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

            <div className="confirm-terms">
              <input type="checkbox" />
              <p>
                By clicking Sign Up you agree to our{" "}
                <span>Terms and Conditions</span> and that you have read our{" "}
                <span>Privacy Policy</span>
              </p>
            </div>

            {!isLoading && (
              <Button
                type="submit"
                label="Submit"
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
          </form>

          <p className="no-account">
            Have an Account?{" "}
            <Link to="/login">
              <span>Sign in</span>
            </Link>
          </p>
        </div>
      </div>
      <div>
        <DefaultWebView className={"laptop-view"} />
      </div>
    </div>
  );
};

export default Signup;

// (e)=>{formik.setFieldValue("firstName",e.target.value)}
