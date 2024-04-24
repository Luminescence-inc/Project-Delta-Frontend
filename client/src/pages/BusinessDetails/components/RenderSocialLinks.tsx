import InstagramIcon from "assets/icons/instagram-icon-2.svg?react";
import FacebookIcon from "assets/icons/facebook-icon.svg?react";
import TwitterIcon from "assets/icons/twitter-icon.svg?react";
import LinkedInIcon from "assets/icons/linkedin-icon.svg?react";
import TikTokIcon from "assets/icons/tiktok-icon.svg?react";
import WebsiteIcon from "assets/icons/website-icon.svg?react";
import { cn } from "utils";
import { useEffect } from "react";

interface SocialMediaProps {
  url: string;
  name:
    | "facebook"
    | "instagram"
    | "twitter"
    | "linkedin"
    | "tiktok"
    | "website";
  activeTtip: string;
  setActiveTtip: (name: string) => void;
}

const RenderSocialLinks = ({
  url,
  name,
  setActiveTtip,
  activeTtip,
}: SocialMediaProps) => {
  const { valid } = isUrlValid(url);

  let icon = null;

  useEffect(() => {
    let timeout;
    if (activeTtip === name) {
      timeout = setTimeout(() => {
        setActiveTtip("");
      }, 2000);
    }

    return () => {
      clearTimeout(timeout!);
    };
  }, [activeTtip]);

  switch (name) {
    case "facebook":
      icon = <FacebookIcon />;
      break;

    case "instagram":
      icon = <InstagramIcon />;
      break;

    case "twitter":
      icon = <TwitterIcon />;
      break;

    case "linkedin":
      icon = <LinkedInIcon />;
      break;

    case "tiktok":
      icon = <TikTokIcon />;
      break;

    case "website":
      icon = <WebsiteIcon />;
      break;

    default:
      icon = null;
      break;
  }

  return (
    <div className="social-links-tooltip-container">
      <button
        className={cn(
          "w-[34px] h-[34px] flex flex-col items-center justify-center rounded-full",
          valid ? "cursor-pointer" : "cursor-not-allowed"
        )}
        style={{
          background: valid ? "#E7F2FF" : "#eee",
          opacity: valid ? 1 : 0.6,
          filter: valid ? "grayscale(0)" : "grayscale(100%)",
        }}
        onClick={() => {
          setActiveTtip(name);
          if (!valid) return;
          window.open(url, "_blank");
        }}
      >
        {icon}
      </button>
      {!valid && (
        <span
          className={cn(
            "tooltiptext w-[80px] text-center absolute bg-dark-105 font-inter text-white-100 px-[5px] py-[2px] rounded-[5px] top-10 left-0 z-10",
            activeTtip === name ? "visible" : "hidden"
          )}
        >
          No link found
        </span>
      )}
    </div>
  );
};

export default RenderSocialLinks;

const isUrlValid = (url: string) => {
  try {
    const urlObj = new URL(url);
    return { valid: true, obj: urlObj };
  } catch (e: any) {
    return { valid: false, obj: null };
  }
};
