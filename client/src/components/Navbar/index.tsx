/** @format */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@components/ui/button";
import { JwtPayload, TOKEN_NAME } from "@/types/auth";
import { isAuthenticated, logOut } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { UserBusinessList, UserBusinessListResponse } from "@/types/business";
import { getUserBusinessProfileList } from "@/api/business";
import {
  FlexColStart,
  FlexRowCenter,
  FlexRowCenterBtw,
  FlexRowStart,
  FlexRowStartBtw,
} from "@components/Flex";
import { cn } from "@/utils";
import { useAuth } from "@hooks/useAuth";
import { Cancel, ChevronDown, Edit, Menu, Plus } from "../icons";

const navigationRoute = [
  { title: "Home", name: "home", path: "/" },
  { title: "About", name: "about", path: "/about-us" },
  {
    title: "Discover Businesses",
    name: "discover-business",
    path: "/explore-businesses",
  },
  { title: "Support", name: "", path: "/contact-support" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [parsedToken, setParsedToken] = useState<JwtPayload | null>(null);
  const [authToken, setAuthToken] = useState<string | null>("");
  const [authenticated, setAuthenticated] = useState(false);
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
      setAuthToken(authToken);
      setParsedToken(parsedToken);
      setTokenData(parsedToken);
    } catch (e: any) {
      console.error("Error parsing token: ", e);
    }
  }, []);

  useEffect(() => {
    try {
      if (parsedToken?.id) {
        isAuthenticated(authToken!, parsedToken.id)
          .then(() => {
            setAuthenticated(true);
          })
          .catch((err) => {
            setAuthenticated(false);
            console.error(err);
          });
      }
    } catch (error) {
      console.error("Error parsing token: ", error);
    }
  }, []);

  const handleLogOut = () => {
    const authToken = localStorage.getItem(TOKEN_NAME) as string;
    console.log("token-id: ", tokenData?.id);
    logOut(authToken, tokenData?.id || "")
      .then(() => {
        localStorage.removeItem(TOKEN_NAME);
        setAuthenticated(false);
        navigate("/?login=false");
        setMenuOpen(false);

        // force reload the page to clear all active states.
        window && window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleMenuIcon = () => {
    if (parsedToken?.id) {
      isAuthenticated(authToken!, parsedToken.id)
        .then(() => {
          setAuthenticated(true);
          setMenuOpen(true);
          getUserBusinessProfileList(authToken!).then((res) => {
            const resData: UserBusinessListResponse = res.data;
            setUserBusinessListData(resData.data.businessProfiles);
          });
        })
        .catch((err) => {
          setAuthenticated(false);
          setMenuOpen(true);
          console.error(err);
        });
    } else {
      setMenuOpen(true);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full bg-white-105">
        <FlexColStart
          className="w-full h-full"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="w-full px-4 py-4 ">
            {!menuOpen && (
              <FlexRowStartBtw className="w-full bg-white-100 mt-[24px] rounded-[5px] px-[27px] py-[18px] shadow-sm">
                <Link to="/">
                  <img src={"/assets/images/logo/logo-header.svg"} />
                </Link>
                <Menu
                  size={30}
                  className="stroke-blue-200 cursor-pointer relative top-3"
                  onClick={() => {
                    handleMenuIcon();
                  }}
                />
              </FlexRowStartBtw>
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
                    <Link
                      to={nav.path}
                      key={i}
                      className={cn(
                        "w-full pb-[15px] font-hnM text-[20px] tracking-normal leading-14 text-gray-100 cursor-pointer",
                        currPage === nav.path.replace("/", "")
                          ? "text-teal-100"
                          : ""
                      )}
                    >
                      {nav.title}
                    </Link>
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
                            <Link
                              to={`/signup/register-business?update=${data.uuid}`}
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
                            </Link>
                          );
                        })}
                      </FlexColStart>
                    )}
                    <Button
                      href={"/signup/register-business"}
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
                      href={"/signup"}
                      className="w-full max-w-[120px] h-[55px] p-[8px] rounded-[6px]"
                      intent={"primary"}
                      onClick={() => setMenuOpen(false)}
                    >
                      Signup
                    </Button>
                    <Button
                      href={"/login"}
                      className="w-full max-w-[120px] h-[55px] p-[8px] rounded-[6px]"
                      intent={"transparent"}
                      onClick={() => setMenuOpen(false)}
                    >
                      Login
                    </Button>
                  </FlexRowStart>
                )}
                {authenticated && (
                  <>
                    <Button
                      className="w-full h-[37px] py-[20px] rounded-[5px] mt-3"
                      intent={"transparent"}
                      onClick={handleLogOut}
                    >
                      <span className="font-hnM">Logout</span>
                    </Button>
                    <FlexRowCenter className="w-full">
                      <Link
                        to="/account"
                        onClick={() => setMenuOpen(false)}
                        className="text-center font-inter font-semibold mt-[20px] cursor-pointer"
                      >
                        My Account
                      </Link>
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
