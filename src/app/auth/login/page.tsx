"use client";
import { Eye, ClosedEye, Mail } from "@components/icons";
import Button from "@components/ui/button";
import Input from "@/components/ui/input";
import { useFormik } from "formik";
import { LogInData, LogInResponse, TOKEN_NAME, JwtPayload } from "@/types/auth";
import { loginUser } from "@/api/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { FlexColStart, FlexColStartCenter } from "@components/Flex";
import ErrorComponent from "../../../components/ErrorComponent";
import withoutAuth from "@/utils/auth-helpers/withoutAuth";

const validationSchema = yup.object({
  email: yup.string().email("Enter valid email").required(),
  password: yup.string().required("Please Enter your password"),
});

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<String | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const noAccount = "Don't have an Account? ";

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

          // this is done to reload the page after login
          // so every component can get the updated data
          window.location.href = "/?login=true";
        } else {
          router.push("/verify-account");
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

  return (
    <FlexColStart className="w-full h-full px-[16px] pt-[24px] pb-[32px]">
      <FlexColStartCenter className="w-full px-[16px] pt-[24px] pb-[32px] bg-white-100 text-center ">
        <h4 className="text-[16px] font-pp font-semibold leading-[24px] mb-[24px]">
          Sign in
        </h4>
        {/* Display Error message */}
        {error && (
          <span className="text-red-100 text-[13px]">{errorMessage}</span>
        )}
        <form className="w-full" onSubmit={formik.handleSubmit}>
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

          <Button
            intent={"primary"}
            size={"lg"}
            className="w-full rounded-[6px] mt-5"
            isLoading={isLoading}
            spinnerColor="#000"
            onClick={formik.handleSubmit as any}
          >
            <span className="text-[14px] font-pp">Submit</span>
          </Button>
        </form>
        <a
          className="forgot font-pp text-sm underline"
          href="/forgot-password/email"
        >
          <p>Forgot password?</p>
        </a>

        <p className="text-dark-100/50 text-[14px] font-pp mt-[14px] ">
          {noAccount}
          <a href="/signup">
            <span className="text-blue-200 underline">Sign up</span>
          </a>
        </p>
      </FlexColStartCenter>
    </FlexColStart>
  );
};

export default withoutAuth(Login);
