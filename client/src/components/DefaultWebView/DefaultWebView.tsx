import LogoHeaderIcon from "assets/icons/logo-header-icon.svg?react";

interface IDefaultWebViewProps {
  className: string;
}

const DefaultWebView = ({ className }: IDefaultWebViewProps) => {
  return (
    <div className={className}>
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
          <div
            className="body-style"
            style={{
              padding: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h2 className="title-text">Web View Notification</h2>
          </div>
          <div
            className="body-style"
            style={{
              padding: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <p className="body-text">
              For an awesome experience, please switch to your mobile phone.
              Thanks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultWebView;
