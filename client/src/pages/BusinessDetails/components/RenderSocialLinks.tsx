import {
  Facebook,
  Instagram,
  Twitter,
  Globe,
  LinkedIn,
} from "@components/icons";
import { cn } from "@/utils";
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
      icon = <Facebook />;
      break;

    case "instagram":
      icon = <Instagram />;
      break;

    case "twitter":
      icon = <Twitter />;
      break;

    case "linkedin":
      icon = <LinkedIn />;
      break;

    case "website":
      icon = <Globe />;
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
