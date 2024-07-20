import { useEffect, useState } from "react";

export const routeNameMap = {
  "/": "Home",
  "/about-us": "About",
  "/search": "Discover Businesses",
  "/contact-support": "Support",
  "/login": "Login",
  "/forgot-password": "Forgot Password",
  "/verify-email": "Verify Email",
  "/verify-account": "Verify Account",
  "/signup": "Signup",
  "/view-business": "View Business",
  "/biz": "Business Details",
  "/register-business": "Register Business",
  "/account": "My Account",
} as Record<string, string>;

const capitalizeFirstLetters = (str: string) => {
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};

const usePathname = () => {
  const [pathname, setPathname] = useState("");
  const [path, setPath] = useState("");
  const [formattedPathname, setFormattedPathname] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const pathname = window.location.pathname;
    const name = routeNameMap[pathname] ?? null;
    const search = window.location.search;

    setPath(pathname);
    setSearch(search);

    if (name) {
      setPathname(name);
      setFormattedPathname(`${name} | Bizconnect24`);
    } else {
      const formattedName = capitalizeFirstLetters(
        pathname.replace("/", "").replace(/-/g, " ").split("/")[0]
      );
      setPathname(formattedName);
      setFormattedPathname(`${formattedName} | Bizconnect24`);
    }
  });

  return { pathname, path, formattedPathname, search };
};

export default usePathname;
