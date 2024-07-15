"use client";
import { cn } from "@/lib/utils";
import { FlexColStart, FlexRowStart } from "@components/Flex";

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
    link: "/search",
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
  return (
    <footer
      className="text-white-100 px-7 py-10"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="">
        <div className="">
          <a href="/">
            <img
              className="w-[200px]"
              src={"/assets/images/logo/logo-header.svg"}
            />
          </a>
          <p className="text-[14px] font-normal font-pp py-[20px] text-blue-200 pb-[30px]">
            Connecting Immigrant and Local Business Owners with their Customers
          </p>
        </div>
      </div>
      <FlexColStart className="w-full gap-1">
        {navigations.map((n, i) => (
          <a
            href={n.link}
            key={i}
            className={cn(
              "text-[14px] cursor-pointer font-medium font-pp pb-[10px] text-gray-100",
              "text-gray-100"
            )}
          >
            {n.name}
          </a>
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

      <h5 className="text-center text-gray-100 leading-[14px] font-normal text-[12px] font-pp mt-10">
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
          src={"/assets/images/logo/ig-logo.svg"}
        />
      );
      break;
    case "facebook":
      icon = (
        <img
          className={cn("w-[14px]", defaultStyle)}
          src={"/assets/images/logo/facebook-logo.svg"}
        />
      );
      break;
    case "twitter":
      icon = (
        <img
          className={cn("w-[20px]", defaultStyle)}
          src={"/assets/images/logo/x-logo.svg"}
        />
      );
      break;
    default:
      icon = null;
  }
  return icon;
}
