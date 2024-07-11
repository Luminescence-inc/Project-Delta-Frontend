import { FlexColCenter, FlexColStart } from "@/components/Flex";
import { CtaArrow } from "@/components/icons";
import Button from "@/components/ui/button";
import SITE_CONFIG from "@/config/site";
import {
  BusinessCard,
  CustomerCard,
  HomeSignupBtn,
  TitleCard,
} from "@/modules/home/components";
import {
  HeaderBusinessBtn,
  HeaderOnboardingComp,
  HeaderSearchComp,
} from "@/modules/home/components/HeaderComp";
import type { Metadata } from "next";

const Home = () => {
  return (
    <div className="w-full h-full">
      <header className="w-full px-4 py-4">
        <HeaderSearchComp />
        <br />
        <h1 className="w-full text-[30px] font-bold leading-[38px] tracking-normal text-left text-blue-200 font-pp">
          Connecting Immigrant & Local Business Owners With Their Customers
        </h1>
        <p className="text-[15px] font-semibold font-pp leading-[25px] text-left text-gray-100 ">
          Seamlessly do business within your area and on the go
        </p>

        <HeaderOnboardingComp />

        <HeaderBusinessBtn />

        <div className="w-full mt-[40px] pb-20">
          <img
            src={"/assets/images/world-map.svg"}
            alt="world map"
            className="w-full h-auto"
            style={{ height: "auto", width: "100%" }}
          />
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
              icon={
                <img
                  className="w-[60px]"
                  src={"/assets/images/opportunities/visibility-icon.svg"}
                />
              }
              header={"Increased Visibility"}
              subTitle={
                "With Bizconnect24, immigrant & Local business owners can showcase their products and services to a wider audience"
              }
            />
            <BusinessCard
              className={"business-card"}
              icon={
                <img
                  className="w-[60px]"
                  src={"/assets/images/opportunities/audience-icon.svg"}
                />
              }
              header={"Access to Targeted Audience"}
              subTitle={
                "Bizconnect24 caters specifically to immigrant & Local communities, allowing business owners to connect with a highly targeted audience that is actively seeking their products or services"
              }
            />
            <BusinessCard
              className={"business-card"}
              icon={
                <img
                  className="w-[60px]"
                  src={"/assets/images/opportunities/growth-icon.svg"}
                />
              }
              header={"Business Growth"}
              subTitle={
                "With access to a larger customer base and tools to expand their reach, immigrant & Local business owners can experience accelerated growth and increased revenue opportunities."
              }
            />
          </FlexColStart>

          <div className="w-full mt-5">
            <TitleCard
              className={"title-card"}
              title={"FOR CUSTOMERS"}
              header={"Discover Businesses"}
              subTitle={
                "Bizconnect24 brings the best of local services to your fingertips, engage with businesses as a customer"
              }
            />
          </div>
          <div className="w-full h-auto mt-5 px-5">
            <img
              style={{ width: "100%", height: "auto" }}
              src={"/assets/images/customer-homebg.jpeg"}
              alt={"customer-homebg"}
            />
          </div>

          {/* Customer Card */}
          <div className="w-full mt-5">
            <CustomerCard
              icon={
                <img
                  className="w-[60px] mr-[20px]"
                  src={"/assets/images/opportunities/choice-icon.svg"}
                />
              }
              header={"Choice"}
              subTitle={
                "With Bizconnect24, customers have a myriad of options at their fingertips, empowering them to explore diverse businesses and find the perfect fit for their needs and preferences"
              }
            />

            <CustomerCard
              icon={
                <img
                  className="w-[60px] mr-[20px]"
                  src={"/assets/images/opportunities/convenience-icon.svg"}
                />
              }
              header={"Convenience"}
              subTitle={
                "Through the diverse options Bizconnect24 offers, customers are also effortlessly able to discover and engage with immigrant businesses closest to them"
              }
            />

            <CustomerCard
              icon={
                <img
                  className="w-[60px] mr-[20px]"
                  src={"/assets/images/opportunities/community-icon.svg"}
                />
              }
              header={"Community"}
              subTitle={
                "Through Bizconnect24, customers become part of a vibrant and supportive community, connecting with fellow enthusiasts who share a passion for diversity, entrepreneurship, and cultural exchange"
              }
            />
          </div>

          <FlexColCenter className="w-full">
            <Button
              intent="primary"
              href="/search"
              rightIcon={
                <CtaArrow strokeWidth={0.4} className="stroke-white-100" />
              }
              className="w-full max-w-[303px] h-[55px] mt-8 rounded-md "
              hardRefresh={true}
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
            backgroundImage: `url("/assets/images/join-network-bg.svg")`,
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

          <HomeSignupBtn />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "30px",
            }}
          >
            <Button
              intent="primary"
              href="/search"
              className="w-[303px] h-[55px] px-[15px] py-[15px] rounded-md border-[1px] border-white-100 "
              rightIcon={
                <CtaArrow strokeWidth={0.4} className="stroke-white-100" />
              }
              hardRefresh={true}
            >
              <span className="font-hnM font-bold text-[15px] leading-[14px] text-left text-white-100 ">
                Explore Businesses
              </span>
            </Button>
          </div>
        </FlexColCenter>
      </section>
    </div>
  );
};

export default Home;
