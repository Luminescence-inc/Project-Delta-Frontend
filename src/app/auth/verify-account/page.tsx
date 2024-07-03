"use client";
import { FlexColCenter } from "@components/Flex";

const VerifiedAccount = () => {
  return (
    <FlexColCenter className="w-full h-full bg-gray-50 py-[80px] px-[16px] pb-[150px] gap-3 ">
      <div className="w-full rounded-[8px] pt-[24px] px-[16px] pb-[32px]  bg-white-100 text-center ">
        <h4 className="text-[16px] font-semibold leading-[24px] font-pp mb-[24px]">
          Your Account is not Verified
        </h4>
        <span className="font-pp text-sm">
          Check your Email for Verification Link
        </span>
      </div>
    </FlexColCenter>
  );
};

export default VerifiedAccount;
