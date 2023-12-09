import MailIcon from "assets/icons/mail-icon.svg?react";
import Button from "components/Button/Button";
import Input from "components/Input/Input";
import { useFormik } from "formik";
import "./ForgotPassword.scss";
import { LogInData, LogInResponse } from "types/auth";
import { generateVerificationEmail } from "api/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Email = () => {
  const navigate = useNavigate();
  const [sentEmail, setSentEmail] = useState<boolean>(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<String | null>(null);

  const onSubmit = async (values: LogInData) => {
    generateVerificationEmail;

    try {
      const res = await generateVerificationEmail(values.email).catch((err) => {
        // const errorResponse: LogInResponse = err.response.data;

        // Set error message
        // const errorCode = errorResponse?.message.code;
        // if(errorCode == 404 || errorCode == 401){
        // setErrorMessage(errorResponse?.message.desc)
        // }else{
        // setErrorMessage("error occured while login")
        // }
        // setError(true);

        setErrorMessage("Error occured while reseting link");

        console.error(err);
        setError(true);
      });

      const resData: LogInResponse = res?.data;

      if (resData?.success) {
        //res &&
        // Set token in local Storage
        // localStorage.setItem(TOKEN_NAME, resData.data.token.split(' ')[1]);

        // route to homepage

        // navigate('/');

        // setError(false);
        // window.location.reload();

        setSentEmail(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setErrorMessage("Error occured while reseting link");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validateOnBlur: true,
    onSubmit,
  });

  return (
    <>
      {!sentEmail && (
        <form onSubmit={formik.handleSubmit}>
          <div className="forgot-password">
            <div className="card">
              {/* Display Error message */}
              {error && <span>{errorMessage}</span>}

              <h4>Reset password</h4>

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

              <Button
                type="submit"
                label="Verify Email"
                variant="primary"
                size="lg"
              />
            </div>
          </div>
        </form>
      )}

      {sentEmail && (
        <div className="login">
          <div className="card">
            <h4 onClick={() => navigate("/")}>
              Password Reset Link sent to Email
            </h4>
          </div>
        </div>
      )}
    </>
  );
};

export default Email;
