import { Mail } from "@components/icons";
import Button from "@components/ui/button";
import Input from "@components/Input/Input";
import { useFormik } from "formik";
import { LogInData, LogInResponse } from "@/types/auth";
import { generateVerificationEmail } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FlexColCenter, FlexColStart, FlexRowCenter } from "@components/Flex";
import ErrorComponent from "../ErrorComponent";

const Email = () => {
  const navigate = useNavigate();
  const [sentEmail, setSentEmail] = useState<boolean>(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<String | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: LogInData) => {
    // generateVerificationEmail;
    setIsLoading(true);
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

        setIsLoading(false);
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
        setIsLoading(false);
        setSentEmail(true);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
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
          <div className="pt-[80px] px-[16px] py-[150px] bg-gray-200">
            <FlexColStart className="w-full pt-[24px] px-[16px] py-[32px] rounded-[8px] bg-white-100 ">
              {/* Display Error message */}
              {error && <ErrorComponent value={errorMessage as string} />}

              <h4 className="text-[16px] font-bold font-inter leading-[24px] mb-[24px] ">
                Reset password
              </h4>

              <Input
                type="email"
                label="Email Address"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                icon={<Mail className="input-icon" />}
                placeholder="Enter Email Address"
              />

              <Button
                intent={"primary"}
                size={"lg"}
                className="w-full rounded-[5px] mt-3"
                isLoading={isLoading}
                spinnerColor="#000"
                onClick={formik.submitForm as any}
                type="submit"
                disabled={formik.values.email === ""}
              >
                <span className="text-[14px] font-semibold font-inter">
                  Verify Email
                </span>
              </Button>
            </FlexColStart>
          </div>
        </form>
      )}

      {sentEmail && (
        <FlexColCenter className="w-full">
          <FlexRowCenter className="w-full px-5 py-6">
            <h4 onClick={() => navigate("/")}>
              Password Reset Link sent to Email
            </h4>
          </FlexRowCenter>
        </FlexColCenter>
      )}
    </>
  );
};

export default Email;
