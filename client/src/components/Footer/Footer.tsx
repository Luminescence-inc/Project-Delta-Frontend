/** @format */
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/utils";
import { FlexColStart, FlexRowCenter, FlexRowStart } from "@components/Flex";

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

const socialLinks = [
  { name: "instagram" },
  { name: "facebook" },
  { name: "twitter" },
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
            <img
              className="w-[200px]"
              src={"/assets/images/logos/logo-header.svg"}
            />
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
        {socialLinks.map((s, i) => (
          <a
            href="#"
            key={i}
            className="w-[30px] h-[30px] flex items-center justify-center rounded-full bg-blue-200/10"
          >
            <RenderSocialIcons name={s.name} />
          </a>
        ))}
      </FlexRowStart>

      <h5 className="text-center text-gray-100 leading-[14px] font-normal text-[12px] font-inter mt-10">
        2024 Bizconnect24. All right reserved
      </h5>
    </footer>
  );
};

export default Footer;

function RenderSocialIcons({ name }: { name: string }) {
  let icon = null;
  let defaultStyle = "scale-[.80]";
  switch (name) {
    case "instagram":
      icon = (
        <img
          className={cn("w-[20px]", defaultStyle)}
          src={"/assets/images/logos/ig-logo.svg"}
        />
      );
      break;
    case "facebook":
      icon = (
        <img
          className={cn("w-[14px]", defaultStyle)}
          src={"/assets/images/logos/facebook-logo.svg"}
        />
      );
      break;
    case "twitter":
      icon = (
        <img
          className={cn("w-[20px]", defaultStyle)}
          src={"/assets/images/logos/x-logo.svg"}
        />
      );
      break;
    default:
      icon = null;
  }
  return icon;
}
