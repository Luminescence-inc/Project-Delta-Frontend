/** @format */
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/utils";
import { FlexColStart, FlexRowStart } from "@components/Flex";
import { Facebook, Instagram, Twitter } from "@components/icons";

const navigations = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/about-us",
  },
  {
    name: "Discover Businesses",
    link: "/explore-businesses",
  },
  {
    name: "Support",
    link: "/contact-support",
  },
];

const Footer = () => {
  const navigate = useNavigate();
  const pathname = window.location.pathname.replace("/", "");

  return (
    <footer
      className="text-white-100 px-7 py-10"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="">
        <div className="">
          <Link to="/">
            <img src={"/assets/images/logos/logo-header.svg"} />
          </Link>
          <p className="text-[14px] font-normal font-inter py-[20px] text-blue-200 pb-[30px]">
            Connecting Immigrant and Local Business Owners with their Customers
          </p>
        </div>
      </div>
      <FlexColStart className="w-full">
        {navigations.map((n, i) => (
          <p
            key={i}
            className={cn(
              "text-[14px] cursor-pointer font-medium font-inter pb-[20px] text-gray-100",
              pathname === n.link.toLowerCase().replace("/", "")
                ? "text-teal-100"
                : "text-gray-100"
            )}
            onClick={() => navigate(n.link)}
          >
            {n.name}
          </p>
        ))}
      </FlexColStart>

      <FlexRowStart className="w-full gap-[16px] my-[16px]">
        <Instagram />
        <Facebook />
        <Twitter />
      </FlexRowStart>

      <h5 className="text-center text-gray-100 leading-[14px] font-normal text-[12px] font-inter mt-10">
        2024 Bizconnect24. All right reserved
      </h5>
    </footer>
  );
};

export default Footer;
