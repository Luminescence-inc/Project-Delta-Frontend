/** @format */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "assets/icons/menu-icon.svg?react";
import LogoHeaderIcon from "assets/icons/logo-header-icon.svg?react";
import CancelIcon from "assets/icons/cancel-icon.svg?react";
import ArrowUpIcon from "assets/icons/arrow-up.svg?react";
import EditIcon from "assets/icons/edit-icon.svg?react";
import PlusIcon from "assets/icons/uil_plus.svg?react";
import Button from "components/ui/button";
import { JwtPayload, TOKEN_NAME } from "types/auth";
import { isAuthenticated, logOut } from "api/auth";
import { useNavigate } from "react-router-dom";
import { UserBusinessList, UserBusinessListResponse } from "types/business";
import { getUserBusinessProfileList } from "api/business";
import {
  FlexColStart,
  FlexRowCenter,
  FlexRowCenterBtw,
  FlexRowStart,
  FlexRowStartBtw,
} from "components/Flex";
import { cn } from "utils";
import { useAuth } from "hooks/useAuth";

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

  const handleEditBusinessProfile = (id: string) => {
    navigate(`/signup/register-business?update=${id}`);
    setMenuOpen(false);
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
              <FlexRowCenterBtw className="w-full bg-white-100 mt-[24px] rounded-[5px] px-[27px] py-[18px] shadow-sm">
                <Link to="/">
                  <LogoHeaderIcon />
                </Link>
                <MenuIcon
                  className="icon-menu cursor-pointer"
                  onClick={() => {
                    handleMenuIcon();
                  }}
                />
              </FlexRowCenterBtw>
            )}
          </div>

          {menuOpen && (
            <div className="w-full h-full fixed md:absolute top-0 left-0 shadow-md px-[32px] py-[4em] bg-white-100 z-[999]">
              <LogoHeaderIcon />
              <CancelIcon
                className="absolute top-[4em] right-[24px] cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />

              <FlexColStart className="w-full mt-10 list-none">
                {navigationRoute.map((nav, i) => {
                  const pathname = window.location.pathname;
                  const currPage = pathname.split("/").pop();

                  return (
                    <li
                      key={i}
                      className={cn(
                        "w-full pb-[15px] font-hnM text-[20px] tracking-normal leading-14 text-gray-100 cursor-pointer",
                        currPage === nav.path.replace("/", "")
                          ? "text-teal-100"
                          : ""
                      )}
                      onClick={() => {
                        navigate(nav.path);
                        setMenuOpen(false);
                      }}
                    >
                      {nav.title}
                    </li>
                  );
                })}

                {!loading && userDetails && (
                  <>
                    <FlexRowCenterBtw
                      className="w-full mt-[24px]"
                      onClick={() => setEditProfileOpen((prev) => !prev)}
                    >
                      <p className="text-gray-100 text-[18px] font-hnM select-none cursor-pointer">
                        Edit Businesses Profile
                      </p>
                      <ArrowUpIcon
                        className={
                          editProfileOpen
                            ? "rotate-[360deg]"
                            : "rotate-[180deg]"
                        }
                        width={14}
                        height={14}
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
                            <FlexRowStartBtw
                              key={data.uuid}
                              className="w-full mt-[4px] px-[18px] cursor-pointer"
                              onClick={() =>
                                handleEditBusinessProfile(data.uuid)
                              }
                            >
                              <p className="text-[16px] font-normal font-hnL text-gray-100">
                                {data.name}
                              </p>
                              <EditIcon width={22} height={22} />
                            </FlexRowStartBtw>
                          );
                        })}
                      </FlexColStart>
                    )}
                    <Button
                      href={"/signup/register-business"}
                      className="w-full h-[37px] py-[22px] rounded-[5px] mt-5"
                      intent={"transparent"}
                      onClick={() => setMenuOpen(false)}
                      leftIcon={<PlusIcon />}
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
                      <p
                        onClick={() => {
                          navigate("/account");
                          setMenuOpen(false);
                        }}
                        className=" text-center mt-[40px] cursor-pointer"
                      >
                        My Account
                      </p>
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
