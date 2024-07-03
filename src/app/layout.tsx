"use client";
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
        <ToastContainer />
      </body>
    </html>
  );
}
