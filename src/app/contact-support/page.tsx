import ContactSupportForm from "@/modules/contact-support/components/Form";
import { FlexColCenter, FlexRowCenter } from "@components/Flex";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Support",
};

const ContactSupport = () => {
  return (
    <div className="w-full p-[16px] bg-gray-200 ">
      <h2 className="text-center mb-[16px] text-[32px] leading-[40px] font-bold font-pp">
        Contact Support
      </h2>

      <FlexColCenter className="w-full pt-[24px] px-[16px] pb-[32px] rounded-[20px] text-center bg-white-100 ">
        <FlexRowCenter className="mb-[24px]">
          <FlexRowCenter className="w-[88px] h-[88px] rounded-[50%] p-[10px] bg-blue-202 ">
            <img src="/assets/icons/contact-support.svg" className="w-[35px]" />
          </FlexRowCenter>
        </FlexRowCenter>

        <h4 className="tetx-[16px] font-bold font-pp mb-[20px]">
          Please complete support form
        </h4>

        <ContactSupportForm />
      </FlexColCenter>
    </div>
  );
};

export default ContactSupport;
