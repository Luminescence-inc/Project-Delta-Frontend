"use client";
/** @format */

import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "@components/Footer/Footer";
import Navbar from "@/components/Navbar";
import Home from "@pages/Home/Home";
import Onboarding from "@/pages/Onboarding";
import Login from "@pages/Authentication/Login/Login";
import ForgotPassword from "@pages/Authentication/ForgotPassword/ForgotPassword";
import ForgotPasswordFinal from "@pages/Authentication/ForgotPassword/ForgotPasswordFinal";
import Signup from "@pages/Authentication/Signup/Signup";
import ViewBusiness from "@pages/Home/ViewBusiness/ViewBusiness";
import Email from "@pages/Authentication/ForgotPassword/Email";
import VerifiedEmail from "@pages/Authentication/Verification/VerifiedEmail";
import VerifiedAccount from "@pages/Authentication/Verification/VerifyAccount";
import RegisterBusiness from "@pages/Authentication/Signup/RegisterBusiness/RegisterBusiness";
import MyAccount from "@pages/AccountSettings/MyAccount";
import AboutUs from "@/pages/AboutUs";
import ContactSupport from "@pages/ContactSupport/ContactSupport";
import BusinessContextProvider from "@context/BusinessCtx";
import ExploreBusiness from "@pages/ExploreBusiness";
import BusinessDetails from "@pages/BusinessDetails";
import { DataCtxProvider } from "@context/DataCtx";
import DefaultWebView from "@/components/DefaultWebView";
import { Toaster } from "react-hot-toast";
import { NotsupportedCountryBanner } from "./components/NotsupportedCountryBanner";

function App() {
  const { pathname } = useLocation();
  const [width, setWidth] = useState(window.innerWidth);

  const MobileConstraint = 700;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      setWidth(width);
    });

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, [width]);

  return (
    <>
      <div className={width > MobileConstraint ? "visible" : "hidden"}>
        <DefaultWebView />
      </div>
      <div
        id="app-container"
        className={
          width > MobileConstraint ? "invisible" : "visible font-ppReg"
        }
      >
        <DataCtxProvider>
          <NotsupportedCountryBanner />
          <Navbar />
          <BusinessContextProvider>
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/forgot-password/reset/:userId/:uniqueString"
                  element={<ForgotPassword />}
                />
                <Route
                  path="/verify-email/:userId/:uniqueString"
                  element={<VerifiedEmail />}
                />
                <Route path="/verify-account" element={<VerifiedAccount />} />
                <Route path="/forgot-password/email" element={<Email />} />
                <Route
                  path="/forgot-password-final"
                  element={<ForgotPasswordFinal />}
                />
                <Route path="/signup" element={<Signup />} />
                <Route path="/view-your-business" element={<ViewBusiness />} />

                {/* New */}
                <Route path="/search" element={<ExploreBusiness />} />
                <Route
                  path="/biz/:loc/:business_id"
                  element={<BusinessDetails />}
                />
                <Route
                  path="/signup/register-business"
                  element={<RegisterBusiness />}
                />
                <Route path="/account" element={<MyAccount />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-support" element={<ContactSupport />} />
              </Routes>
            </main>
            <Toaster
              toastOptions={{
                position: "top-center",
              }}
            />
          </BusinessContextProvider>
          <Footer />
        </DataCtxProvider>
      </div>
    </>
  );
}

export default App;
