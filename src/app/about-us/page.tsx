import Button from "@components/ui/button";
import { FlexColStartCenter } from "@components/Flex";

const AboutUs = () => {
  return (
    <FlexColStartCenter className="w-full px-2">
      <header className="text-center m-[24px]">
        <h2 className="mb-[16px] text-[32px] font-pp leading-40px font-extrabold text-blue-200">
          About Us{" "}
        </h2>
      </header>
      <img
        src={"/assets/images/about-page-image.png"}
        alt={"about-page-image"}
        className="w-full object-cover rounded-md"
      />
      <p className="font-normal p-[2rem] text-sm text-center font-pp leading-[24px]">
        BizConnect24 is powered by
        <a
          className="mx-[5px] my-[5px] underline text-blue-200 font-pp font-medium hover:text-red-301"
          href="https://www.luminescencegrp.com/"
          target="_blank"
        >
          Luminescence
        </a>
        Technologies Limited and is the number 1 service connecting Immigrant
        and Local business owners with their customers. If you know anyone who
        currently operates a business abroad and wants to boost their sales
        numbers, BizConnect24 is for them.
      </p>

      <a href="/search" className="w-full flex items-center justify-center">
        <Button
          intent="primary"
          className="w-[80%] mb-[1rem] text-[14px] font-pp font-semibold"
        >
          Search for business
        </Button>
      </a>
    </FlexColStartCenter>
  );
};

export default AboutUs;
