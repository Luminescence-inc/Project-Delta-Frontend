"use client";
import { useEffect, useState } from "react";
import Button from "@components/ui/button";
import { JwtPayload, TOKEN_NAME } from "@/types/auth";
import { logOut } from "@/api/auth";
import { UserBusinessList, UserBusinessListResponse } from "@/types/business";
import { getUserBusinessProfileList } from "@/api/business";
import {
  FlexColStart,
  FlexRowCenter,
  FlexRowCenterBtw,
  FlexRowStart,
  FlexRowStartBtw,
} from "@components/Flex";
import { cn } from "@/lib/utils";
import { useAuth } from "@hooks/useAuth";
import { Cancel, ChevronDown, Edit, Menu, Plus } from "./icons";
import { useRouter } from "next/navigation";
import { useDataCtx } from "@/context/DataCtx";
import Link from "next/link";

const navigationRoute = [
  { title: "Home", name: "home", path: "/" },
  { title: "About", name: "about", path: "/about-us" },
  {
    title: "Discover Businesses",
    name: "discover-business",
    path: "/search",
  },
  { title: "Support", name: "", path: "/contact-support" },
];

const Navbar = () => {
  const { navbarBgColor } = useDataCtx();
  const router = useRouter();
  const [tokenData, setTokenData] = useState<JwtPayload | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [userBusinessListData, setUserBusinessListData] = useState<
    UserBusinessList[]
  >([]);
  const { loading, userDetails } = useAuth();

  useEffect(() => {
    const authToken = localStorage.getItem(TOKEN_NAME) as string;
    if (authToken === null) return;
    try {
      const parsedToken = JSON.parse(atob(authToken?.split(".")[1]));
      setTokenData(parsedToken);
    } catch (e: any) {
      console.error("Error parsing token: ", e);
    }
  }, []);

  const handleLogOut = () => {
    logOut(tokenData?.id || "")
      .then(() => {
        localStorage.removeItem(TOKEN_NAME);
        router.push("/?login=false");
        setMenuOpen(false);

        // force reload the page to clear all active states.
        window && window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleMenuIcon = () => {
    if (!loading && userDetails) {
      getUserBusinessProfileList().then((res) => {
        const resData: UserBusinessListResponse = res.data;
        setUserBusinessListData(resData.data.businessProfiles);
      });
    }
    setMenuOpen(true);
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <FlexColStart
          className="w-full h-full bg-blue-203"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            className="w-full max-w-7xl mx-auto px-3 lg:px-0 py-4 bg-blue-203"
            style={{
              backgroundColor: navbarBgColor?.parent ?? "",
            }}
          >
            {!menuOpen && (
              <FlexRowCenterBtw
                className="w-full mt-[24px] rounded-[5px] px-3 py-[18px] md:bg-white-100"
                style={{
                  backgroundColor: navbarBgColor?.child ?? "",
                }}
              >
                <a href="/">
                  <img src={"/assets/images/logo/logo-header.svg"} />
                </a>

                <div className="justify-between items-center hidden md:flex font-medium text-sm leading-[14px] text-gray-100">
                  <Link href="/" className={`${window.location.pathname === '/' && ' text-brand-green-shade99'} mx-3 sm:mx-4 p-3`}>Home</Link>
                  <Link href="/about" className={`${window.location.pathname === '/about' && ' text-brand-green-shade99'} mx-3 sm:mx-4 p-3`}>About</Link>
                  <Link href="/search" className={`${window.location.pathname === '/search' && ' text-brand-green-shade99'} mx-3 sm:mx-4 p-3`}>FDiscover Businessesaq</Link>
                  <Link href="#" className={`${window.location.pathname === '/' && ' text-brand-green-shade99'} mx-3 sm:mx-4 p-3`}>Cognito</Link>
                  <Link href="/contact-support" className={`${window.location.pathname === '/contact-support' && ' text-brand-green-shade99'} mx-3 sm:mx-4 p-3`}>Support</Link>
                </div>

                  <Menu
                    size={30}
                    className="stroke-blue-200 cursor-pointer relative top-3 lg:hidden"
                    onClick={() => {
                      handleMenuIcon();
                    }}
                    />
                    <div className="flex items-center gap-3">
                  <Button
                    intent="transparent"
                    href="/auth/login"
                    className="px-[15px] py-[15.5px] b !text-blue-200 bg-white-100 rounded-md border-[1px] border-white-100 hidden lg:flex text-center items-center justify-center"
                    hardRefresh={true}
                  >
                    <span className="font-hnM text-sm leading-[15px] font-medium">
                      Log In
                    </span>
                  </Button>
                  <Button
                    intent="primary"
                    href="/auth/signup"
                    className="px-[20px] py-[15.5px] hidden lg:flex text-center items-center justify-center"
                    hardRefresh={true}
                  >
                    <span className="font-hnM text-sm leading-[15px] font-medium">
                      Sign Up
                    </span>
                  </Button>
                </div>
              </FlexRowCenterBtw>
            )}
          </div>

          {menuOpen && (
            <div className="w-full h-full fixed md:absolute top-0 left-0 shadow-md px-[32px] py-[4em] bg-white-100 z-[999]">
              <img
                className="w-[180px]"
                src={"/assets/images/logo/logo-header.svg"}
              />
              <Cancel
                className="absolute top-[4em] right-[24px] cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />

              <FlexColStart className="w-full mt-10 list-none">
                {navigationRoute.map((nav, i) => {
                  const pathname = window.location.pathname;
                  const currPage = pathname.split("/").pop();

                  return (
                    <a
                      href={nav.path}
                      key={i}
                      className={cn(
                        "w-full pb-[15px] font-pp font-medium text-[15px] md:text-[18px] tracking-normal leading-14 text-gray-100 cursor-pointer",
                        currPage === nav.path.replace("/", "")
                          ? "text-teal-100"
                          : ""
                      )}
                      onClick={() => setMenuOpen(false)}
                    >
                      {nav.title}
                    </a>
                  );
                })}

                {!loading && userDetails && (
                  <>
                    <FlexRowCenterBtw
                      className="w-full mt-[24px] cursor-pointer"
                      onClick={() => setEditProfileOpen((prev) => !prev)}
                    >
                      <p className="text-gray-100 text-[18px] font-hnM select-none cursor-pointer">
                        Edit Businesses Profile
                      </p>
                      <ChevronDown
                        className={
                          editProfileOpen
                            ? "rotate-[180deg]"
                            : "rotate-[360deg]"
                        }
                        size={20}
                      />
                    </FlexRowCenterBtw>
                    {editProfileOpen && userBusinessListData.length > 0 && (
                      <FlexColStart
                        className={cn(
                          "w-full max-h-[300px] overflow-scroll hideScrollBar "
                        )}
                      >
                        {userBusinessListData?.map((data) => {
                          return (
                            <a
                              href={`/register-business?update=${data.uuid}`}
                              key={data.uuid}
                              className="w-full mt-[4px] px-[18px] cursor-pointer flex items-start justify-between"
                              onClick={() => {
                                setMenuOpen(false);
                                setEditProfileOpen(false);
                              }}
                            >
                              <p className="text-[16px] font-normal font-hnL text-gray-100">
                                {data.name}
                              </p>
                              <Edit
                                strokeWidth={1}
                                className="stroke-white-100 fill-blue-200"
                                size={20}
                              />
                            </a>
                          );
                        })}
                      </FlexColStart>
                    )}
                    <Button
                      href={"/register-business"}
                      className="w-full h-[37px] py-[22px] rounded-[5px] mt-5"
                      intent={"transparent"}
                      onClick={() => setMenuOpen(false)}
                      leftIcon={
                        <Plus strokeWidth={2} className="stroke-none" />
                      }
                    >
                      <span className="font-hnM">
                        Create a new business profile
                      </span>
                    </Button>
                  </>
                )}
                {!loading && !userDetails && (
                  <FlexRowStart className="w-full mt-[30px]">
                    <Button
                      href={"/auth/signup"}
                      className="w-full max-w-[120px] h-[55px] p-[8px] rounded-[6px]"
                      intent={"primary"}
                      onClick={() => setMenuOpen(false)}
                    >
                      Signup
                    </Button>
                    <Button
                      href={"/auth/login"}
                      className="w-full max-w-[120px] h-[55px] p-[8px] rounded-[6px]"
                      intent={"transparent"}
                      onClick={() => setMenuOpen(false)}
                    >
                      Login
                    </Button>
                  </FlexRowStart>
                )}
                {userDetails && (
                  <>
                    <Button
                      className="w-full h-[37px] py-[20px] rounded-[5px] mt-3"
                      intent={"transparent"}
                      onClick={handleLogOut}
                    >
                      <span className="font-hnM">Logout</span>
                    </Button>
                    <FlexRowCenter className="w-full">
                      <a
                        href="/account"
                        onClick={() => setMenuOpen(false)}
                        className="text-center font-inter font-semibold mt-[20px] cursor-pointer"
                      >
                        My Account
                      </a>
                    </FlexRowCenter>
                  </>
                )}
              </FlexColStart>
            </div>
          )}
        </FlexColStart>
      </div>
    </div>
  );
};

export default Navbar;
