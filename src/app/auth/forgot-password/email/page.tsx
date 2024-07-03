"use client";
import { Mail } from "@components/icons";
import Button from "@components/ui/button";
import Input from "@/components/ui/input";
import { useFormik } from "formik";
import { LogInData, LogInResponse } from "@/types/auth";
import { generateVerificationEmail } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FlexColCenter, FlexColStart, FlexRowCenter } from "@components/Flex";
import ErrorComponent from "@/components/ErrorComponent";
import { toast } from "react-toastify";

const Email = () => {
  const router = useRouter();
  const [sentEmail, setSentEmail] = useState<boolean>(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<String | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: LogInData) => {
    // generateVerificationEmail;
    setIsLoading(true);
    try {
      const res = await generateVerificationEmail(values.email).catch((err) => {
        const msg =
          err.response.data.message?.desc.replace(/{|}/g, "") ??
          "Error occured while reseting link";
        setIsLoading(false);
        setErrorMessage(msg);
        toast.error(msg);

        console.error(msg);
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
        toast.success("Password reset link sent to email");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error occured while reseting link");
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

              <FlexRowCenter className="w-full">
                <h4 className="text-[16px] font-semibold font-pp leading-[24px] mb-[24px] ">
                  Reset password
                </h4>
              </FlexRowCenter>

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
                    className="rounded-full stroke-white-100 fill-blue-200"
                  />
                }
                placeholder="Enter Email Address"
                parentClassname="w-full px-0 border border-white-400/50 px-4"
                inputClassname="w-full px-3 outline-none border-none"
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
                <span className="text-[14px] font-semibold font-pp">
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
            <h4 onClick={() => router.push("/")}>
              Password Reset Link sent to Email
            </h4>
          </FlexRowCenter>
        </FlexColCenter>
      )}
    </>
  );
};

export default Email;
