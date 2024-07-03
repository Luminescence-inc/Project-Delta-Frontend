"use client";
import { FlexColStart } from "@components/Flex";

interface IErrorComponent {
  value: string;
  _ref?: React.RefObject<HTMLDivElement>;
}

const ErrorComponent = ({ value, _ref }: IErrorComponent) => {
  return (
    <FlexColStart className="w-auto">
      <span ref={_ref} className="text-red-305 font-pp text-[13px]">
        {value}
      </span>
    </FlexColStart>
  );
};

export default ErrorComponent;
