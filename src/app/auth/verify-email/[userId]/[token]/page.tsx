"use client";
/** @format */

import Button from "@components/ui/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { verifyUserAccount } from "@/api/auth";
import { BaseResponseMessage } from "@/types/auth";
import ErrorComponent from "@/components/ErrorComponent";
import { FlexColCenter } from "@/components/Flex";

const VerifiedEmail = () => {
  const { userId, uniqueString } = useParams();
  const [error, setError] = useState(false);
  const [verified, setVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState<String | null>(null);

  useEffect(() => {
    try {
      verifyUserAccount(userId as string, uniqueString as string)
        .catch((err) => {
          const errorResponse: BaseResponseMessage = err.response.data;

          // Set error message
          const errorCode = errorResponse?.message.code;
          if (errorCode == 499) {
            setErrorMessage(errorResponse?.message.desc);
          } else {
            setErrorMessage("error occured while verifying acount");
          }
          setError(true);
          console.error(err);
        })
        .then((res) => {
          const resData: BaseResponseMessage = res?.data;
          if (resData?.success) {
            setVerified(true);
          }
        });
    } catch (error) {
      setError(true);
      setErrorMessage("error occured while verifying acount");
    }
  }, []);

  return (
    <div className="pt-[80px] px-[16px] py-[150px] bg-gray-200">
      <div className="w-full h-full rounded-[8px] bg-white-100 px-[16px] py-[32px] text-center">
        {verified && (
          <>
            <h4 className="text-[16px] font-semibold leading-[14px] font-pp ">
              Your Account is Verified
            </h4>

            <Button
              type="submit"
              intent="primary"
              size="lg"
              href="/login"
              className="w-full rounded-[5px] mt-3 font-pp font-semibold"
            >
              Login
            </Button>
          </>
        )}
        {/* Display Error message */}
        {!verified && error && (
          <FlexColCenter className="w-full text-center">
            <h4 className="text-[16px] font-semibold leading-[14px] font-pp ">
              Your Account is not Verified
            </h4>
            <ErrorComponent value={errorMessage as string} />
          </FlexColCenter>
        )}
      </div>
    </div>
  );
};

export default VerifiedEmail;
