import { FlexColCenter } from "@components/Flex";
import { useNavigate } from "react-router-dom";
import { EmptyCart, ChevronRight } from "@components/icons";

interface NotfoundProps {
  message?: string;
}

const BusinessesNotfound = ({ message }: NotfoundProps) => {
  const navigate = useNavigate();
  return (
    <FlexColCenter className="w-full gap-4 min-h-[250px]">
      <EmptyCart />
      <p className="text-[12px] font-normal font-inter text-gray-103">
        {message ?? "No similar businesses found."}
      </p>
      <button
        className="flex flex-row items-center justify-center gap-4 cursor-pointer border-none outline-none bg-none"
        onClick={() => navigate("/explore-businesses")}
      >
        <p className="text-[13px] font-normal font-inter underline text-teal-100">
          Explore other business categories
        </p>
        <ChevronRight />
      </button>
    </FlexColCenter>
  );
};

export default BusinessesNotfound;
