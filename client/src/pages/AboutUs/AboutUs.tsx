import aboutImg from "assets/images/about-page-image.png";
import Button from "components/ui/button";
import { FlexColCenter, FlexColStartCenter } from "components/Flex";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <FlexColStartCenter className="w-full px-2">
      <header className="text-center m-[24px]">
        <h2 className="mb-[16px] text-[32px] leading-40px font-bold">
          About Us{" "}
        </h2>
      </header>
      <img
        src={aboutImg}
        alt={aboutImg}
        className="w-full object-cover rounded-md"
      />
      <p className="font-normal p-[2rem] text-center font-inter leading-[24px]">
        BizConnect24 is powered by
        <a
          className="mx-[5px] my-[5px] underline text-blue-200 font-inter font-medium hover:text-red-301"
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

      <FlexColCenter className="w-full">
        <Button
          intent="primary"
          className="w-[80%] mb-[1rem] text-[14px] font-inter"
          onClick={() => {
            navigate("/explore-businesses");
          }}
        >
          Search for business
        </Button>
      </FlexColCenter>
    </FlexColStartCenter>
  );
};

export default AboutUs;
