import { FlexColCenter, FlexRowStart } from "@components/Flex";
import { Link, useNavigate } from "react-router-dom";
import { EmptyCart, ChevronRight } from "@components/icons";

interface NotfoundProps {
  message?: string;
}

const BusinessesNotfound = ({ message }: NotfoundProps) => {
  const navigate = useNavigate();
  return (
    <FlexColCenter className="w-full gap-4 min-h-[250px]">
      <EmptyCart
        size={25}
        strokeWidth={1}
        className="fill-gray-100 stroke-none"
      />
      <p className="text-[12px] font-normal font-inter text-gray-103">
        {message ?? "No similar businesses found."}
      </p>
      <Link
        className="flex flex-row items-start justify-start gap-4 cursor-pointer border-none outline-none bg-none"
        to="#"
        onClick={() => {
          // go back
          navigate(-1);
        }}
      >
        <FlexRowStart className="w-full">
          <p className="text-[13px] font-normal font-inter underline text-teal-100">
            Explore other business categories
          </p>
          <ChevronRight
            strokeWidth={1.5}
            size={20}
            className="relative stroke-teal-100"
          />
        </FlexRowStart>
      </Link>
    </FlexColCenter>
  );
};

export default BusinessesNotfound;
