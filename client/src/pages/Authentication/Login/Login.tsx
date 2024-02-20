/** @format */
import { Link } from "react-router-dom";
import EyeIcon from "assets/icons/eye-icon.svg?react";
import ClosedEyeIcon from "assets/icons/closed-eye-icon.svg?react";
import MailIcon from "assets/icons/mail-icon.svg?react";
import Button from "components/Button/Button";
import Input from "components/Input/Input";
import { useFormik } from "formik";
import { LogInData, LogInResponse, TOKEN_NAME, JwtPayload } from "types/auth";
import { loginUser } from "api/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import Spinner from "components/Spinner/Spinner";
import * as yup from "yup";
import DefaultWebView from "components/DefaultWebView/DefaultWebView";

const validationSchema = yup.object({
  email: yup.string().email("Enter valid email").required(),
  password: yup.string().required("Please Enter your password"),
});

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<String | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: LogInData) => {
    const { ...data } = values;
    setIsLoading(true);
    try {
      const res = await loginUser(data).catch((err) => {
        const errorResponse: LogInResponse = err.response.data;
        console.log(err.response.data);
        // Set error message
        const errorCode = errorResponse?.message.code;
        if (errorCode == 404 || errorCode == 401) {
          setErrorMessage(errorResponse?.message.desc);
        } else {
          setErrorMessage("error occured while login");
        }
        setError(true);
        console.error(err);
        setIsLoading(false);
      });

      const resData: LogInResponse = res?.data;

      if (resData?.success) {
        //res &&
        // Set token in local Storage
        const tokenString = resData.data.token.split(" ")[1];
        localStorage.setItem(TOKEN_NAME, tokenString);
        setIsLoading(false);

        // const authToken = localStorage.getItem(TOKEN_NAME) as string;
        const parsedToken: JwtPayload = tokenString
          ? JSON.parse(atob(tokenString?.split(".")[1]))
          : {}; //check atob

        // route to homepage
        //check token and route accourdingly
        if (parsedToken.verified) {
          // window.location.reload();

          //add spinner - todo
          navigate("/?login=true");
          // window.location.reload();
        } else {
          navigate("/verify-account");
          window.location.reload();
        }

        setError(false);
        // window.location.reload();
      }
    } catch (err) {
      setIsLoading(false);
      setError(true);
      setErrorMessage("error occured while login");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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
      <div className="login mobile-view">
        <div className="card">
          <h4>Sign in</h4>

          {/* Display Error message */}
          {error && <span style={submitErrorMessageStyle}>{errorMessage}</span>}

          <form onSubmit={formik.handleSubmit}>
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

            {!isLoading && (
              <Button
                label="Submit"
                variant="primary"
                size="lg"
                type="submit"
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

          <Link className="forgot" to="/forgot-password/email">
            <p>Forgot password?</p>
          </Link>

          <p className="no-account">
            Don't have an Account?{" "}
            <Link to="/signup">
              <span>Sign up</span>
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

export default Login;
