/** @format */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "assets/icons/menu-icon.svg?react";
import LogoHeaderIcon from "assets/icons/logo-header-icon.svg?react";
import CancelIcon from "assets/icons/cancel-icon.svg?react";
import ArrowUpIcon from "assets/icons/arrow-up.svg?react";
import EditIcon from "assets/icons/edit-icon.svg?react";
import PlusIcon from "assets/icons/uil_plus.svg?react";
import Button from "components/Button/Button";
import { JwtPayload, TOKEN_NAME } from "types/auth";
import { isAuthenticated, logOut } from "api/auth";
import { useNavigate } from "react-router-dom";
import { UserBusinessList, UserBusinessListResponse } from "types/business";
import { getUserBusinessProfileList } from "api/business";
import "./Navbar.scss";

const Navbar = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem(TOKEN_NAME) as string;
  const parsedToken: JwtPayload = authToken
    ? JSON.parse(atob(authToken?.split(".")[1]))
    : {};
  const [authenticated, setAuthenticated] = useState(false);
  const [tokenData, setTokenData] = useState<JwtPayload | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [userBusinessListData, setUserBusinessListData] = useState<
    UserBusinessList[]
  >([]);

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
    } catch (error) {
      console.error("Error parsing token: ", error);
    }
  }, []);

  const handleLogOut = () => {
    const authToken = localStorage.getItem(TOKEN_NAME) as string;
    console.log("token-id: ",tokenData?.id)
    logOut(authToken, tokenData?.id || "")
      .then(() => {
        localStorage.removeItem(TOKEN_NAME);
        setAuthenticated(false);
        navigate("/?login=false");
        setMenuOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleMenuIcon = () => {
    if (parsedToken.id) {
      isAuthenticated(authToken, parsedToken.id)
        .then(() => {
          setAuthenticated(true);
          setMenuOpen(true);
          getUserBusinessProfileList(authToken).then((res) => {
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
    <div className=" responsive-content">
      <div className="navbar-main mobile-view">
      <div  
      className="navbar"
      onClick={(e) => {
        e.stopPropagation();
      }}>
      {!menuOpen && (
        <nav>
          <Link to="/">
            <LogoHeaderIcon />
          </Link>
          <MenuIcon
            className="icon-menu"
            onClick={() => {
              handleMenuIcon();
            }}
          />
        </nav>
      )}
      {menuOpen && (
        <div className="nav-content">
          <LogoHeaderIcon />
          <CancelIcon
            className="icon-cancel"
            onClick={() => setMenuOpen(false)}
          />

          <ul className="nav-content-items">
            <li>
              <p
                onClick={() => {
                  navigate("/");
                  setMenuOpen(false);
                }}
                style={{color:"#17BEBB"}}
              >
                Home
              </p>
            </li>
            <li>
              <p
                onClick={() => {
                  navigate("/about-us");
                  setMenuOpen(false);
                }}
              >
                About
              </p>
            </li>
            <li>
              <p
                onClick={() => {
                  navigate("/discover-businesses");
                  setMenuOpen(false);
                }}
              >
                Discover Businesses
              </p>
            </li>
            <li>
              <p
                onClick={() => {
                  navigate("/contact-support");
                  setMenuOpen(false);
                }}
              >
                Support
              </p>
            </li>
            {authenticated && (
              <>
                <li
                  className="edit-business"
                  onClick={() => setEditProfileOpen((prev) => !prev)}
                >
                  <p>Edit Businesses Profile</p>
                  <ArrowUpIcon
                    className={editProfileOpen ? "" : "arrow-down"}
                    width={14}
                    height={14}
                  />
                </li>
                {editProfileOpen && (
                  <>
                    {userBusinessListData?.map((data) => {
                      return (
                        <li
                          key={data.uuid}
                          className="business-list-item"
                          onClick={() => handleEditBusinessProfile(data.uuid)}
                        >
                          <p>{data.name}</p>
                          <EditIcon width={22} height={22} />
                        </li>
                      );
                    })}
                  </>
                )}

                <Button
                  className="add-bus-btn"
                  label="Add a new business"
                  variant="transparent"
                  size="lg"
                  icon={<PlusIcon />}
                  to="/signup/register-business"
                  onClick={() => setMenuOpen(false)}
                />
              </>
            )}
            {!authenticated && (
              <>
                <div className="cta">
                  <Button
                    label="Sign up"
                    className="signup"
                    variant="primary"
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                  />
                  <Button
                    label="Log In"
                    className="login"
                    variant="transparent"
                    to="/login"
                    onClick={() => {
                      setMenuOpen(false);
                    }}
                  />
                </div>
              </>
            )}
            {authenticated && (
              <>
                <Button
                  label="Log out"
                  className="logout"
                  variant="transparent"
                  onClick={() => {
                    handleLogOut();
                  }}
                />
                <p
                  onClick={() => {
                    navigate("/account");
                    setMenuOpen(false);
                  }}
                  className="my-account-nav"
                >
                  My Account
                </p>
              </>
            )}
          </ul>
        </div>
      )}
      </div>
      </div>
    </div>
  );
};

export default Navbar;
