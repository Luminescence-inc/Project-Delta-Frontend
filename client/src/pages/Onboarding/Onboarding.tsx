/** @format */

import PlusIcon from "assets/icons/plus-icon.svg?react";
import BagIcon from "assets/icons/bag-icon.svg?react";
import SearchIcon from "assets/icons/search-icon.svg?react";
import Pill from "./components/Pill/Pill";
import { JwtPayload, TOKEN_NAME } from "types/auth";
import { isAuthenticated } from "api/auth";
import { useNavigate } from "react-router-dom";
import "./Onboarding.scss";
import DefaultWebView from "components/DefaultWebView/DefaultWebView";
import { prevPageLocalKeyName } from "config";
import useTrackPagePath from "hooks/useTrackPagePath";

const Onboarding = () => {
  const navigate = useNavigate();

  // keep track of page path onMount
  useTrackPagePath();

  const handleNewBusiness = () => {
    try {
      const authToken = localStorage.getItem(TOKEN_NAME) as string;
      const parsedToken: JwtPayload = JSON.parse(atob(authToken.split(".")[1]));

      isAuthenticated(authToken, parsedToken.id)
        .then(() => {
          navigate("/signup/register-business");
        })
        .catch((err) => {
          navigate("/signup");
          console.log(err);
          // console.log("Onb-auth");
        });
    } catch (error) {
      navigate("/signup");
      console.log(error);
    }
  };

  return (
    <div className="responsive-content">
      <div className="onboarding mobile-view">
        <div className="card">
          <h4>Select the option that suits you</h4>

          <Pill
            onClick={handleNewBusiness}
            icon={<PlusIcon />}
            title="New Business? Signup"
            variant="red"
          />
          <Pill
            icon={<BagIcon />}
            onClick={() => navigate("/login")}
            title="Existing Business? Login"
            variant="pink"
          />
          <Pill
            onClick={() => {
              // keep track of prev page
              localStorage.setItem(
                prevPageLocalKeyName,
                window.location.pathname
              );

              navigate("/explore-businesses");
            }}
            icon={<SearchIcon />}
            title="Discover Business"
            variant="green"
          />
        </div>
      </div>
      <div>
        <DefaultWebView className={"laptop-view"} />
      </div>
    </div>
  );
};

export default Onboarding;
