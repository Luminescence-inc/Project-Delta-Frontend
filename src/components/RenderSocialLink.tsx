import { Globe } from "@components/icons";
import { cn } from "@/lib/utils";
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
      icon = RenderSocialIcons({ name });
      break;

    case "instagram":
      icon = RenderSocialIcons({ name });
      break;

    case "twitter":
      icon = RenderSocialIcons({ name });
      break;

    case "linkedin":
      icon = RenderSocialIcons({ name });
      break;

    case "website":
      icon = RenderSocialIcons({ name });
      break;

    default:
      icon = null;
      break;
  }

  return (
    <div className="w-auto relative">
      <a
        href={url}
        target="_blank"
        className={cn(
          "w-[34px] h-[34px] flex flex-col items-center justify-center rounded-full scale-[.90]",
          valid ? "cursor-pointer" : "cursor-not-allowed"
        )}
        style={{
          background: valid ? "#E7F2FF" : "#eee",
          opacity: valid ? 1 : 0.6,
          filter: valid ? "grayscale(0)" : "grayscale(100%)",
        }}
        onClick={(e) => {
          e.preventDefault();
          setActiveTtip(name);
          if (!valid) return;
          window.open(url, "_blank");
        }}
      >
        {icon}
      </a>
      {true && (
        <span
          className={cn(
            "tooltiptext text-[10px] w-[80px] text-center absolute bg-dark-105 font-inter text-white-100 px-[5px] py-[2px] rounded-[5px] top-10 -left-5 z-10",
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

function RenderSocialIcons({ name }: { name: string }) {
  let icon = null;
  switch (name) {
    case "instagram":
      icon = (
        <img className="w-[16px]" src={"/assets/images/logo/ig-logo.svg"} />
      );
      break;
    case "facebook":
      icon = (
        <img
          className="w-[10px]"
          src={"/assets/images/logo/facebook-logo.svg"}
        />
      );
      break;
    case "twitter":
      icon = (
        <img className="w-[16px]" src={"/assets/images/logo/x-logo.svg"} />
      );
      break;
    case "website":
      icon = <Globe size={17} className="text-blue-200" />;
      break;
    default:
      icon = null;
  }
  return icon;
}
