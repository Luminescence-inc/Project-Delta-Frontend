import InstagramIcon from "assets/icons/instagram-icon-2.svg?react";
import FacebookIcon from "assets/icons/facebook-icon.svg?react";
import TwitterIcon from "assets/icons/twitter-icon.svg?react";
import LinkedInIcon from "assets/icons/linkedin-icon.svg?react";
import TikTokIcon from "assets/icons/tiktok-icon.svg?react";
import WebsiteIcon from "assets/icons/website-icon.svg?react";

type SocialMediaProps = {
  url: string;
  name:
    | "facebook"
    | "instagram"
    | "twitter"
    | "linkedin"
    | "tiktok"
    | "website";
};

export default function RenderSocialLinks({ url, name }: SocialMediaProps) {
  const { valid, obj } = isUrlValid(url);

  if (!valid) {
    return null;
  }

  const hostname = obj?.hostname.split(".")[0];
  let icon = null;

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
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="ntw w-34 h-34 flex flex-col items-center justify-center cursor-pointer rounded-100"
      style={{
        background: "#E7F2FF",
      }}
    >
      {icon}
    </a>
  );
}

const isUrlValid = (url: string) => {
  try {
    const urlObj = new URL(url);
    return { valid: true, obj: urlObj };
  } catch (e: any) {
    return { valid: false, obj: null };
  }
};
