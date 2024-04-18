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
import Button from "components/Button/Button";
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
import { FlexColCenter } from "components/Flex";
import SearchCompIcon from "assets/icons/search-icon-3.svg?react";
import { useDataCtx } from "context/DataCtx";
import { useAuth } from "hooks/useAuth";

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
    <div className="responsive-content">
      <div className="home mobile-view">
        <header className="header-content">
          <div className="home-content-container header-content-text">
            {/* Search component */}
            <FlexColCenter className="w-full">
              <button
                className="ntw w-full h-44 rounded-10 search-component flex flex-row items-center justify-start px-15 gap-5 cursor-pointer bg-white"
                onClick={() => navigate("/explore-businesses")}
              >
                <SearchCompIcon />
                <span
                  className="ntw text-12 leading-14 font-hn-light font-normal relative top-2"
                  style={{
                    color: "#9090A7",
                  }}
                >
                  Search businesses
                </span>
              </button>
            </FlexColCenter>
            <br />
            <h1>
              Connecting Immigrant & Local Business Owners With Their Customers
            </h1>
            <p>Seamlessly do business within your area and on the go</p>
            {!authenticated && (
              <div className="">
                <Button
                  className="cta-btn"
                  label="Get Started"
                  variant="primary"
                  to="/onboarding"
                  iconRight={<CtaArrow />}
                />
              </div>
            )}
          </div>

          {authenticated && (
            <div className="button-wrapper home-content-container">
              <div style={{ marginTop: "60px" }}>
                {businessPresent && (
                  <Button
                    label="View your business"
                    variant="primary"
                    size="lg"
                    to="/view-your-business"
                    icon={<SearchIcon />}
                  />
                )}
                <Button
                  className={authenticated ? "auth-btn" : ""}
                  label={
                    businessPresent
                      ? "Create a new business profile"
                      : "Create your first business profile"
                  }
                  variant="transparent"
                  size="lg"
                  to="/signup/register-business"
                  icon={<PlusIcon />}
                />
              </div>
            </div>
          )}

          <div style={authenticated ? { marginTop: "60px" } : {}}>
            <WorldMap />
          </div>
        </header>

        <section className="body-content">
          <TitleCard
            className={"title-card"}
            title={"FOR BUSINESS OWNERS"}
            header={"Unlock Boundless Opportunities"}
            subTitle={
              "We've built a platform to help immigrant & Local businesses showcase their products and services to consumers, addressing the challenges of navigating unfamiliar territories."
            }
          />

          <div style={{ marginTop: "20px" }}>
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
          </div>

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

          <div style={{ marginTop: "35px" }}>
            <CustomerCard
              className={"customer-card"}
              icon={<ChoiceIcon />}
              header={"Choice"}
              subTitle={
                "With Bizconnect24, customers have a myriad of options at their fingertips, empowering them to explore diverse businesses and find the perfect fit for their needs and preferences"
              }
            />

            <CustomerCard
              className={"customer-card"}
              icon={<ConvenienceIcon />}
              header={"Convenience"}
              subTitle={
                "Through the diverse options Bizconnect24 offers, customers are also effortlessly able to discover and engage with immigrant businesses closest to them"
              }
            />

            <CustomerCard
              className={"customer-card"}
              icon={<CummunityIcon />}
              header={"Community"}
              subTitle={
                "Through Bizconnect24, customers become part of a vibrant and supportive community, connecting with fellow enthusiasts who share a passion for diversity, entrepreneurship, and cultural exchange"
              }
            />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              className="cta-btn-explore"
              label="Explore Businesses"
              variant="primary"
              to="/explore-businesses"
              iconRight={<CtaArrow />}
            />
          </div>

          <div className="network" style={{ marginTop: "35px" }}>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingBottom: "20px",
                }}
              >
                <h1>Join Our Growing Network</h1>
              </div>
              <p>
                Join immigrant entrepreneurs leveraging BizConnect24 to unlock
                your business growth. Sign up now for greater visibility and
                experience record breaking earnings
              </p>

              {!loading && !userDetails && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "40px",
                  }}
                >
                  <Button
                    className="ctn-btn-sign-up"
                    label="Sign Up"
                    variant="primary"
                    to="/signup"
                  />
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "30px",
                }}
              >
                <Button
                  className="cta-btn-explore-second"
                  label="Explore Businesses"
                  variant="primary"
                  to="/explore-businesses"
                  iconRight={<CtaArrow />}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div>
        <DefaultWebView className={"laptop-view"} />
      </div>
    </div>
  );
};

export default Home;
