import { Poppins, Open_Sans, Inter } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pp",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const open_sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-os",
  weight: ["300", "400", "600", "700", "800"],
});
