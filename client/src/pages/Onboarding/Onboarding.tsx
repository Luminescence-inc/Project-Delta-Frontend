/** @format */

import PlusIcon from "assets/icons/plus-icon.svg?react";
import BagIcon from "assets/icons/bag-icon.svg?react";
import SearchIcon from "assets/icons/search-icon.svg?react";
import Pill from "./components/Pill/Pill";
import { JwtPayload, TOKEN_NAME } from "types/auth";
import { isAuthenticated } from "api/auth";
import { useNavigate } from "react-router-dom";
import "./Onboarding.scss";

const Onboarding = () => {
  const navigate = useNavigate();

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
          console.log("Onb-auth");
        });
    } catch (error) {
      navigate("/signup");
      console.log(error);
    }
  };
  return (
    <div className="onboarding">
      <div className="card">
        <h4>Select the option that suits you</h4>

        <Pill
          onClick={handleNewBusiness}
          icon={<PlusIcon />}
          title="New business"
          variant="red"
        />
        <Pill icon={<BagIcon />} title="Existing businesses" variant="pink" />
        <Pill
          onClick={() => navigate("/discover-businesses")}
          icon={<SearchIcon />}
          title="Discover businesses"
          variant="green"
        />
      </div>
    </div>
  );
};

export default Onboarding;
