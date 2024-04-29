import LogoHeaderIcon from "assets/icons/logo-header-icon.svg?react";
import { FlexColCenter } from "components/Flex";

interface IDefaultWebViewProps {}

const DefaultWebView = ({}: IDefaultWebViewProps) => {
  return (
    <FlexColCenter className={"w-full"}>
      <div
        className="email-container"
        style={{ padding: "32px", display: "flex", justifyContent: "center" }}
      >
        <div className="email-header">
          <div
            className="body-style"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <LogoHeaderIcon />
          </div>
          <FlexColCenter className="w-full p-5 text-center">
            <h2 className="font-hnB font-bold">Web View Notification</h2>
            <p className="font-hnL font-extrabold text-[14px]">
              For an awesome experience, please switch to your mobile phone.
              Thanks
            </p>
          </FlexColCenter>
        </div>
      </div>
    </FlexColCenter>
  );
};

export default DefaultWebView;
