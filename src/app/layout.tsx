import type { Metadata } from "next";
import { inter, open_sans, poppins } from "@/config/font";
import { cn } from "@/lib/utils";
import "./styles/global.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BusinessContextProvider from "@/context/BusinessCtx";
import { DataCtxProvider } from "@/context/DataCtx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NotsupportedCountryBanner } from "@/components/NotSupportedCountry";
import SITE_CONFIG from "@/config/site";
import { headers } from "next/headers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(inter.variable, poppins.variable, open_sans.variable)}
      >
        <DataCtxProvider>
          <NotsupportedCountryBanner />
          <Navbar />
          <BusinessContextProvider>{children}</BusinessContextProvider>
          <Footer />
          <ToastContainer />
        </DataCtxProvider>
      </body>
    </html>
  );
}

const routeNameMap = {
  "/": "Home",
  "/about-us": "About",
  "/search": "Discover Businesses",
  "/contact-support": "Support",
  "/auth/forgot-password/email": "Forgot Password",
  "/auth/forgot-password/reset": "Reset Password",
  "/auth/verify-email": "Verify Email",
  "/auth/verify-account": "Verify Account",
  "/auth/signup": "Signup",
  "/auth/login": "Login",
  "/view-business": "View Business",
  "/biz": "Business Details",
  "/register-business": "Register Business",
  "/account": "My Account",
  "/onboarding": "Onboarding",
} as Record<string, string>;

// Dyamically update page title based on the route. (SSR)
export function generateMetadata(): Metadata {
  const headersList = headers();
  const header_url = headersList.get("x-url") || "";
  const { pathname } = new URL(header_url);
  const pathSegments = pathname.split("/").filter(Boolean);

  const baseMetadata: Metadata = {
    description: SITE_CONFIG.description,
    authors: [{ name: "Bizconnect24" }],
    keywords: SITE_CONFIG.keywords,
    openGraph: {
      description: SITE_CONFIG.description,
      images: [{ url: SITE_CONFIG.image }],
    },
  };

  let pageTitle: string;

  if (pathSegments[0] === "auth") {
    const authPath = "/" + pathSegments.join("/");
    pageTitle = pathSegments.includes("reset")
      ? "Reset Password"
      : routeNameMap[authPath] || routeNameMap["/auth/login"];
  } else if (pathname === "/") {
    pageTitle = "Homepage";
  } else {
    pageTitle = routeNameMap["/" + pathSegments[0]] || "Page Not Found";
  }

  return {
    ...baseMetadata,
    title: `${pageTitle} | ${SITE_CONFIG.title}`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${pageTitle} | ${SITE_CONFIG.title}`,
    },
  };
}
