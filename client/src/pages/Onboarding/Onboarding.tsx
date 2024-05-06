/** @format */
import { Plus, Bag, SearchIcon } from "@components/icons";
import Pill from "./components/Pill";
import { JwtPayload, TOKEN_NAME } from "@/types/auth";
import { isAuthenticated } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { prevPageLocalKeyName } from "@/config";
import useTrackPagePath from "@/hooks/useTrackPagePath";
import { FlexColStart } from "@components/Flex";

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
    <div className="w-full h-full bg-gray-200 py-[100px] px-[16px]">
      <FlexColStart className="w-full gap-[30px] px-[16px] py-[32px] bg-white-100 ">
        <h4 className="text-[16px] font-normal font-hnM leading-[24px]">
          Select the option that suits you
        </h4>

        <Pill
          onClick={handleNewBusiness}
          icon={<Plus />}
          title="New Business? Signup"
          variant="red"
        />
        <Pill
          icon={<Bag />}
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
      </FlexColStart>
    </div>
  );
};

export default Onboarding;
