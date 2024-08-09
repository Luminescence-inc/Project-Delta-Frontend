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
import AccessVettedCard from "@/modules/home/components/AccessVettedCard";
import {
  HeaderBusinessBtn,
  HeaderOnboardingComp,
  HeaderSearchComp,
} from "@/modules/home/components/HeaderComp";

// gerald first branch and pr, make a small change

const Home = () => {
  return (
    <div className="w-full h-full">
      <header className="w-full px-3 lg:px-0 py-4 bg-blue-203">
        <div className="md:hidden">
          <HeaderSearchComp />
        </div>
        <br />
        <div className="flex flex-1 max-w-full md:py-5">
          <FlexColStart className="flex gap-[10px] sm:ml-8 md:ml-20 flex-1">
            <h1 className="w-full text-[25px] md:text-[45px] font-bold leading-[38px] sm:leading-[54.94px] tracking-normal text-left text-blue-200 font-pp">
              Connecting Immigrant &
              local Business Owners
              with their Customers
            </h1>
            <p className="text-[13px] font-medium font-pp leading-[36px]  text-left text-gray-103 ">
              Seamlessly do business within your area and on the go
            </p>
            <div className="hidden md:block">
              <HeaderSearchComp />
              {/* <HeaderOnboardingComp /> */}
              <HeaderBusinessBtn />
            </div>


            <div className="hidden">
              <HeaderOnboardingComp />

              <HeaderBusinessBtn />
            </div>

          </FlexColStart>

          <div className="hidden md:flex flex-1">
            <img src="/global.svg" className="hidden md:block" alt="" />
          </div>
        </div>


        <div className="md:hidden">
          <HeaderOnboardingComp />

          <HeaderBusinessBtn />
        </div>

      </header>
      <div className="block md:hidden w-full pt-[40px] pb-20 bg-blue-203">
        <img
          src={"/assets/images/world-map.svg"}
          alt="world map"
          className="w-full h-auto"
          style={{ height: "auto", width: "100%" }}
        />
      </div>

      <section className="max-w-7xl mx-auto w-full h-auto py-4 pt-[40px] bg-white-100 ">
        <div className="w-full px-4 pb-[3em]">
          <TitleCard
            title={"FOR BUSINESSES"}
            header={"Unlock Boundless Opportunities"}
            subTitle={
              "We've built a platform to help immigrant & Local businesses showcase their products and services to consumers, addressing the challenges of navigating unfamiliar territories."
            }
          />

          {/* Businesses Card */}
          {/* <FlexColStart className="w-full mt-[20px] gap-[13px] pb-[5em]"> */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3  w-full mt-[20px] gap-[13px] pb-[5em]">
            <BusinessCard
              className={"business-card"}
              icon={
                <img
                  // className="w-[60px]"
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
                  // className="w-[60px]"
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
                  // className="w-[60px]"
                  src={"/assets/images/opportunities/growth-icon.svg"}
                />
              }
              header={"Business Growth"}
              subTitle={
                "With access to a larger customer base and tools to expand their reach, immigrant & Local business owners can experience accelerated growth and increased revenue opportunities."
              }
            />
          </div>

          <div className="hidden md:block w-full mt-5 h-[150px]">
            <TitleCard
              className={"title-card"}
              title={"FOR CUSTOMERS"}
              header={"Discover Businesses"}
              subTitle={
                "Bizconnect24 brings the best of local services to your fingertips, engage with businesses as a customer"
              }
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">


            <div className="md:order-1 w-full h-auto mt-5 px-[5px]">

              <div className="md:hidden  w-full mt-5 h-[150px]">
                <TitleCard
                  className={"title-card"}
                  title={"FOR CUSTOMERS"}
                  header={"Discover Businesses"}
                  subTitle={
                    "Bizconnect24 brings the best of local services to your fingertips, engage with businesses as a customer"
                  }
                />
              </div>
              <img
                style={{ width: "100%", height: "auto" }}
                src={"/assets/images/customer-homebg.jpeg"}
                alt={"customer-homebg"}
              />
            </div>

            {/* Customer Card */}
            {/* <FlexColCenter className="w-full mt-10 gap-[31px]"> */}
            <div className=" order-1 md:order-2 grid grid-cols-1 w-full mt-10 gap-[31px]">
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

              <FlexColCenter className="w-full">
                <Button
                  intent="primary"
                  href="/search"
                  // rightIcon={}
                  className="w-full max-w-[400px] h-[55px] mt-4 rounded-md pt-[10px] pr-[72px] pb-[10px] pl-[62px] gap-[7px] flex-center"
                  hardRefresh={true}
                >
                  <span className="font-pp font-medium text-[14px] leading-[14px] text-white-100 ">
                    Explore Businesses
                  </span>
                  <CtaArrow strokeWidth={0.4} className="stroke-white-100" />
                </Button>
              </FlexColCenter>
            </div>
          </div>

        </div>

      </section>
      <section className="bg-blue-204 py-10 md:py-20 px-3 lg:px-0">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-4">
              <div className="flex flex-col" style={{ flex: 2 }}>
                <h5 className="font-pp font-semibold text-[13px] leading-[24px] tracking-normal text-teal-100 h-[24px] ">
                  COGNITO
                </h5>
                <h1 className="font-pp font-bold text-[30px] leading-[36.63px] tracking-normal text-blue-200 mt-[6px]">
                  Access well vetted articles to kick start <br className="hidden md:block" />
                  your journey in a new country
                </h1>
              </div>
              <img src="/access-v.svg" alt="" />
            </div>


            <div className="hidden sm:flex items-end" >
              <Button
                intent="transparent"
                href="/search?cn=Canada"
                className="w-[303px] px-[15px] py-[15.5px] b !text-blue-200 bg-white-100 rounded-md border-[1px] border-white-100 "
                rightIcon={
                  <CtaArrow strokeWidth={0.4} className="stroke-white-100" />
                }
                hardRefresh={true}
              >
                <span className="font-hnM font-bold text-[15.5px] leading-[14px] text-left tex0 ">
                  View Other Articles
                </span>
              </Button>
            </div>
          </div>


          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
            <AccessVettedCard
              icon="/card1.svg"
              header="10 things to consider while making your first trip to Canada"
              subTitle="Blueprint fidelity between paper prototype and finished product traveling and Vancouver to study..."
            />
            <AccessVettedCard
              icon="/card2.svg"
              header="Are you a tourist in Canada? Visit these five places in Toronto "
              subTitle="Blueprint fidelity between paper prototype and finished product traveling and Vancouver to study..."
            />
            <AccessVettedCard
              icon="/card3.svg"
              header="Best places to live in Canada for Nigerian immigrants"
              subTitle="Blueprint fidelity between paper prototype and finished product traveling and Vancouver to study..."
            />
          </div>
        </div>
      </section>
      <FlexColCenter
        className="relative w-full py-20 md:py-40 top-0 right-0 bg-[url('/assets/images/join-network-bg.svg')] bg-blue-200"
        style={{
          marginTop: "35px",
          backgroundImage: `url("/assets/images/join-network-bg.svg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img src="/grow-network.svg" className="absolute right-0 top-0" alt="" />
        <img src="/grow-network2.svg" className="absolute hidden sm:block left-0 bottom-0" alt="" />
        <FlexColCenter className="w-full px-8 pb-[20px] text-center gap-[18px] max-w-4xl mx-auto">
          <h1 className="text-[30px] text-white-100 text-center font-pp font-semibold leading-[36.63px] ">
            Join Our Growing Network
          </h1>
          <p className="text-[15px] leading-[25px] font-pp font-normal text-white-100 ">
            Join immigrant entrepreneurs leveraging BizConnect24 to unlock
            your business growth. Sign up now for greater visibility and
            experience record breaking earnings
          </p>
        </FlexColCenter>
        <div className="flex items-center gap-10 flex-col md:flex-row py-4">
          <HomeSignupBtn />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              intent="primary"
              href="/search?cn=Canada"
              className="w-[303px] px-[15px] py-[15.5px] rounded-md border-[1px] border-white-100 "
              rightIcon={
                <CtaArrow strokeWidth={0.4} className="stroke-white-100" />
              }
              hardRefresh={true}
            >
              <span className="font-hnM font-bold text-[15.5px] leading-[14px] text-left text-white-100 ">
                Explore Businesses
              </span>
            </Button>
          </div>
        </div>
      </FlexColCenter>
    </div>
  );
};

export default Home;
