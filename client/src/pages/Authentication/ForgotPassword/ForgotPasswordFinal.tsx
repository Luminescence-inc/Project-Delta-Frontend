/** @format */

import Button from "@/components/ui/button";
import { FlexColStart } from "@/components/Flex";

const ForgotPasswordFinal = () => {
  return (
    <div className="w-full px-5 mt-10">
      <FlexColStart className="w-full h-full rounded-[8px] bg-white-100 px-[16px] py-[32px] text-center">
        <h4 className="text-[16px] font-medium leading-[14px] font-inter ">
          Your password reset is complete
        </h4>

        <Button
          type="submit"
          intent="primary"
          size="lg"
          href="/login"
          className="w-full rounded-[5px] mt-3 font-inter font-semibold"
        >
          Login
        </Button>
      </FlexColStart>
    </div>
  );
};

export default ForgotPasswordFinal;
