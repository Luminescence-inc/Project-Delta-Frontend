"use client";
import type { Metadata } from "next";
import { inter, open_sans, poppins } from "@/config/font";
import { cn } from "@/lib/utils";
import "./styles/global.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BusinessContextProvider, {
  BusinessContext,
} from "@/context/BusinessCtx";
import { DataCtxProvider } from "@/context/DataCtx";

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
        <Navbar />
        <DataCtxProvider>
          <BusinessContextProvider>{children}</BusinessContextProvider>
        </DataCtxProvider>
        <Footer />
      </body>
    </html>
  );
}
