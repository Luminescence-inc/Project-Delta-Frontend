/** @format */
import { useNavigate } from "react-router-dom";
import Logo from "assets/images/logo_img.png";
import FacebookIcon from "assets/icons/facebook-icon.svg?react";
import LinkedinIcon from "assets/icons/linkedin-icon.svg?react";
import InstagramIcon from "assets/icons/instagram-icon.svg?react";
import { Link } from "react-router-dom";

import "./Footer.scss";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer
      className="footer"
      onClick={(e) => {
        e.stopPropagation();
        console.log("Footer");
      }}
    >
      <div className="footer-main">
        <div className="top">
          {/* <LogoFooterIcon /> */}
          <img
            style={{ height: "59px", width: "132px" }}
            src={Logo}
            alt={Logo}
          />
          <p>
            Connecting Global small and medium Businesses with their customers
          </p>
        </div>
        <div className="bottom">
          <LinkedinIcon />
          <InstagramIcon />
          <FacebookIcon />
        </div>
      </div>
      <div className="footer-about">
        <p
          onClick={() => {
            navigate("/about-us");
          }}
        >
          About Us
        </p>
        <p
          onClick={() => {
            navigate("/discover-businesses");
          }}
        >
          Search for Business
        </p>
        <p
          onClick={() => {
            navigate("/contact-support");
          }}
        >
          Contact Support
        </p>
      </div>

      <h5 className="copyright">2023 Bizconnect. All right reserved</h5>
    </footer>
  );
};

export default Footer;
