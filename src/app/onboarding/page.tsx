"use client";
import { Plus, Bag, SearchIcon } from "@components/icons";
import Pill from "@/components/Pill";
import { prevPageLocalKeyName } from "@/config";
import { FlexColStart } from "@components/Flex";
import { CSR } from "@/helpers/csr";

const Onboarding = () => {
  return (
    <div className="w-full h-full bg-gray-200 py-[100px] px-[16px]">
      <FlexColStart className="w-full gap-[30px] px-[16px] py-[32px] bg-white-100 ">
        <h4 className="text-[16px] font-normal font-hnM leading-[24px]">
          Select the option that suits you
        </h4>

        <CSR
          render={({ userDetails, loading }) => (
            <Pill
              path={userDetails ? "/auth/register-business" : "/auth/signup"}
              icon={
                <span className="w-[20px] h-[20px] rounded-sm flex items-center justify-center bg-orange-300">
                  <Plus
                    strokeWidth={1}
                    className=" stroke-none fill-white-100"
                  />
                </span>
              }
              title="New Business? Signup"
              variant="red"
            />
          )}
        />
        <Pill
          path="/auth/login"
          icon={<Bag className="stroke-none" />}
          title="Existing Business? Login"
          variant="pink"
        />
        <Pill
          path="/search"
          onClick={() => {
            // keep track of prev page
            localStorage.setItem(
              prevPageLocalKeyName,
              window.location.pathname
            );
          }}
          icon={<SearchIcon className="stroke-blue-102 fill-blue-102" />}
          title="Discover Business"
          variant="green"
        />
      </FlexColStart>
    </div>
  );
};

export default Onboarding;
