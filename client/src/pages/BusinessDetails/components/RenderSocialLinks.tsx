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
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "ntw w-34 h-34 flex flex-col items-center justify-center rounded-100 cursor-pointer"
        )}
        style={{
          background: valid ? "#E7F2FF" : "#eee",
          opacity: valid ? 1 : 0.6,
          filter: valid ? "grayscale(0)" : "grayscale(100%)",
        }}
        onClick={() => setActiveTtip(name)}
      >
        {icon}
      </a>
      {!valid && (
        <span
          className={cn(
            "ntw tooltiptext w-80 text-center absolute bg-black font-hn-normal text-white px-5 py-2 rounded-5 top-0 left-0 z-10",
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
