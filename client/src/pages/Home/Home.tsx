/** @format */
import CtaArrow from "assets/icons/cta-btn-arrow.svg?react";
import WorldMap from "assets/icons/world-map.svg?react";
import SearchIcon from "assets/icons/mag-glass.svg?react";
import PlusIcon from "assets/icons/uil_plus.svg?react";
import VisibilityIcon from "assets/icons/visibility-icon.svg?react";
import AudienceIcon from "assets/icons/audience-icon.svg?react";
import GrowthIcon from "assets/icons/growth-icon.svg?react";
import CustomerBgImage from "assets/images/customer-homebg.png";
import ChoiceIcon from "assets/icons/choice-icon.svg?react";
import ConvenienceIcon from "assets/icons/convenience-icon.svg?react";
import CummunityIcon from "assets/icons/community-icon.svg?react";
import Button from "components/ui/button";
import DefaultWebView from "components/DefaultWebView/DefaultWebView";
import TitleCard from "./components/TitleCard/TitleCard";
import BusinessCard from "./components/BusinessCard/BusinessCard";
import CustomerCard from "./components/CustomerCard/CustomerCard";
import { useEffect, useState } from "react";
import { JwtPayload, TOKEN_NAME } from "types/auth";
import { isAuthenticated } from "api/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUserBusinessProfileList } from "api/business";
import { UserBusinessListResponse } from "types/business";
import "./Home.scss";
import {
  FlexColCenter,
  FlexColStart,
  FlexRowStartCenter,
} from "components/Flex";
import SearchCompIcon from "assets/icons/search-icon-3.svg?react";
import { useAuth } from "hooks/useAuth";
import { prevPageLocalKeyName } from "config";
import useTrackPagePath from "hooks/useTrackPagePath";

const Home = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [tokenData, setTokenData] = useState<JwtPayload | null>(null);
  const [searchParams] = useSearchParams();
  const [businessPresent, setBusinessPresent] = useState(false);
  const login = searchParams.get("login");
  const { userDetails, loading } = useAuth();

  const authToken = localStorage.getItem(TOKEN_NAME) as string;

  const parsedToken: JwtPayload = authToken
    ? JSON.parse(atob(authToken?.split(".")[1]))
    : {};

  useEffect(() => {
    try {
      setTokenData(parsedToken);
      if (parsedToken.id) {
        isAuthenticated(authToken, parsedToken.id)
          .then(() => {
            setAuthenticated(true);
          })
          .catch((err) => {
            setAuthenticated(false);
            console.error(err);
          });
      }
      if (authToken) {
        getUserBusinessProfileList(authToken).then((res) => {
          const businessListResponse: UserBusinessListResponse = res.data;
          setBusinessPresent(
            businessListResponse.data?.businessProfiles.length > 0 || false
          );
        });
      }
    } catch (error) {
      console.error("Error parsing token: ", error);
    }
  }, []);

  // keep track of page path onMount
  useTrackPagePath();

  if (authenticated && !tokenData?.verified) {
    navigate("/verify-account");
  }

  if (login === "true" || login === "false") {
    if (parsedToken.id) {
      isAuthenticated(authToken, parsedToken.id)
        .then(() => {
          setAuthenticated(true);
        })
        .catch((err) => {
          setAuthenticated(false);
          console.error(err);
        });
    }
  }

  return (
    <div className="w-full h-full">
      <header className="w-full px-4 py-4">
        <div className="">
          {/* Search component */}
          <FlexColCenter className="w-full">
            <button
              className="w-full h-[44px] rounded-[10px] flex flex-row items-center justify-start px-[15px] gap-5 cursor-pointer bg-white border-[1px] border-solid border-blue-200 shadow-md"
              onClick={() => {
                // keep track of prev page route
                localStorage.setItem(
                  prevPageLocalKeyName,
                  window.location.pathname
                );

                navigate("/explore-businesses");
              }}
            >
              <FlexRowStartCenter className="w-full">
                <SearchCompIcon />
                <span
                  className="text-[12px] leading-[14px] font-hnL font-normal relative top-[2px]"
                  style={{
                    color: "#9090A7",
                  }}
                >
                  Search businesses
                </span>
              </FlexRowStartCenter>
            </button>
          </FlexColCenter>
          <br />
          <h1 className="w-full text-[25px] font-bold leading-[38px] tracking-normal text-left text-blue-200 font-hnB">
            Connecting Immigrant & Local Business Owners With Their Customers
          </h1>
          <p className="text-[15px] font-bold font-hnM leading-[25px] text-left text-gray-100 ">
            Seamlessly do business within your area and on the go
          </p>
          {!authenticated && (
            <div className="w-full">
              <Button
                intent="primary"
                href="/onboarding"
                rightIcon={<CtaArrow />}
                className="w-full mt-8 rounded-md h-[55px]"
              >
                <span className="font-hnM font-bold text-[14px] ">
                  Business Owner? Get Started
                </span>
              </Button>
            </div>
          )}
        </div>

        {authenticated && (
          <FlexColStart className="gap-[5px]">
            {businessPresent && (
              <Button
                intent="primary"
                href="/view-your-business"
                leftIcon={<SearchIcon />}
                className="w-full mt-8 rounded-md h-[55px]"
              >
                <span className="font-hnM font-bold text-[14px] ">
                  View your business
                </span>
              </Button>
            )}
            <Button
              intent="transparent"
              href="/signup/register-business"
              leftIcon={<PlusIcon />}
              className="w-full mt-8 rounded-md h-[55px]"
            >
              <span className="font-hnM font-bold text-[14px] ">
                {businessPresent
                  ? "Create a new business profile"
                  : "Create your first business profile"}
              </span>
            </Button>
          </FlexColStart>
        )}

        <div className="w-full mt-[40px] pb-20">
          <WorldMap />
        </div>
      </header>

      <section className="w-full h-auto py-4 pt-[40px] bg-white-100 ">
        <div className="w-full px-4">
          <TitleCard
            title={"FOR BUSINESS OWNERS"}
            header={"Unlock Boundless Opportunities"}
            subTitle={
              "We've built a platform to help immigrant & Local businesses showcase their products and services to consumers, addressing the challenges of navigating unfamiliar territories."
            }
          />

          {/* Businesses Card */}
          <FlexColStart className="w-full mt-[20px] gap-5">
            <BusinessCard
              className={"business-card"}
              icon={<VisibilityIcon />}
              header={"Increased Visibility"}
              subTitle={
                "With Bizconnect24, immigrant & Local business owners can showcase their products and services to a wider audience"
              }
            />
            <BusinessCard
              className={"business-card"}
              icon={<AudienceIcon />}
              header={"Access to Targeted Audience"}
              subTitle={
                "Bizconnect24 caters specifically to immigrant & Local communities, allowing business owners to connect with a highly targeted audience that is actively seeking their products or services"
              }
            />
            <BusinessCard
              className={"business-card"}
              icon={<GrowthIcon />}
              header={"Business Growth"}
              subTitle={
                "With access to a larger customer base and tools to expand their reach, immigrant & Local business owners can experience accelerated growth and increased revenue opportunities."
              }
            />
          </FlexColStart>

          <div style={{ marginTop: "55px" }}>
            <TitleCard
              className={"title-card"}
              title={"FOR CUSTOMERS"}
              header={"Discover Businesses"}
              subTitle={
                "Bizconnect24 brings the best of local services to your fingertips, engage with businesses as a customer"
              }
            />
          </div>
          <div
            style={{
              marginTop: "35px",
              marginLeft: "25px",
              marginRight: "25px",
            }}
          >
            <img
              width={349}
              height={357}
              src={CustomerBgImage}
              alt={CustomerBgImage}
            />
          </div>

          {/* Customer Card */}
          <div style={{ marginTop: "35px" }}>
            <CustomerCard
              icon={<ChoiceIcon />}
              header={"Choice"}
              subTitle={
                "With Bizconnect24, customers have a myriad of options at their fingertips, empowering them to explore diverse businesses and find the perfect fit for their needs and preferences"
              }
            />

            <CustomerCard
              icon={<ConvenienceIcon />}
              header={"Convenience"}
              subTitle={
                "Through the diverse options Bizconnect24 offers, customers are also effortlessly able to discover and engage with immigrant businesses closest to them"
              }
            />

            <CustomerCard
              icon={<CummunityIcon />}
              header={"Community"}
              subTitle={
                "Through Bizconnect24, customers become part of a vibrant and supportive community, connecting with fellow enthusiasts who share a passion for diversity, entrepreneurship, and cultural exchange"
              }
            />
          </div>

          <FlexColCenter className="w-full">
            <Button
              intent="primary"
              href="/explore-businesses"
              rightIcon={<CtaArrow />}
              className="w-full max-w-[303px] h-[55px] mt-8 rounded-md "
            >
              <span className="font-hnM font-bold text-[14px] leading-[14px] text-left text-white-100 ">
                Explore Businesses
              </span>
            </Button>
          </FlexColCenter>
        </div>

        <FlexColCenter
          className="w-full h-[497px]"
          style={{
            marginTop: "35px",
            backgroundImage: `url("/assets/icons/join-network-bg.svg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <FlexColCenter className="w-full px-8 pb-[20px] text-center">
            <h1 className="text-[30px] text-white-100 text-center font-hnM font-bold leading-[37px] ">
              Join Our Growing Network
            </h1>
            <p className="text-[15px] leading-[25px] font-hnL font-bold text-white-100 ">
              Join immigrant entrepreneurs leveraging BizConnect24 to unlock
              your business growth. Sign up now for greater visibility and
              experience record breaking earnings
            </p>
          </FlexColCenter>

          {!loading && userDetails && (
            <FlexColCenter
              className="w-full max-w-[197px] "
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "40px",
              }}
            >
              <Button
                intent="primary"
                href="/signup"
                className="w-full max-w-[197px] h-[55px] px-[15px] py-[15px] rounded-md bg-white-100 hover:bg-white-100/90 "
              >
                <span className="font-hnM font-bold text-[14px] leading-[14px] text-left text-blue-200 ">
                  Sign Up
                </span>
              </Button>
            </FlexColCenter>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "30px",
            }}
          >
            <Button
              intent="primary"
              href="/explore-businesses"
              className="w-[303px] h-[55px] px-[15px] py-[15px] rounded-md border-[1px] border-white-100 "
              rightIcon={<CtaArrow />}
            >
              <span className="font-hnM font-bold text-[15px] leading-[14px] text-left text-white-100 ">
                Explore Businesses
              </span>
            </Button>
            {/* <Button
              className="cta-btn-explore-second"
              label="Explore Businesses"
              variant="primary"
              to="/explore-businesses"
              iconRight={<CtaArrow />}
            /> */}
          </div>
        </FlexColCenter>
      </section>
    </div>
  );
};

export default Home;
