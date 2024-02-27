/** @format */
import { Link, useNavigate } from "react-router-dom";
import LogoHeaderIcon from "assets/icons/logo-header-icon.svg?react";
import FacebookIcon from "assets/icons/new-facebook-icon.svg?react";
import InstagramIcon from "assets/icons/new-insta-icon.svg?react";
import TwitterIcon from "assets/icons/new-twitter-icon.svg?react";

import "./Footer.scss";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="responsive-content">
      <footer
        className="footer mobile-view"
        onClick={(e) => {
          e.stopPropagation();
          console.log("Footer");
        }}
      >
        <div className="footer-main">
          <div className="top">
            <Link to="/">
              <LogoHeaderIcon />
            </Link>
            <p>
              Connecting Immigrant Business Owners with their Customers
            </p>
          </div>
          
        </div>
        <div className="footer-about" style={{paddingLeft:"7px"}}>
          <p
            onClick={() => {
              navigate("/");
            }}
            style={{color:"#17BEBB"}}
          >
           Home
          </p>
          <p
            onClick={() => {
              navigate("/about-us");
            }}
          >
            About
          </p>
          <p
            onClick={() => {
              navigate("/discover-businesses");
            }}
          >
            Discover Businesses
          </p>
          <p
            onClick={() => {
              navigate("/contact-support");
            }}
          >
            Support
          </p>
        </div>

        <div className="bottom" style={{paddingLeft:"7px"}}>
            <span style={{marginRight:"15px"}}><InstagramIcon /></span> 
            <span style={{marginRight:"15px"}}><FacebookIcon /></span>
            <span><TwitterIcon /></span>
        </div>

        <h5 className="copyright">2024 Bizconnect24. All right reserved</h5>
      </footer>
    </div>
  );
};

export default Footer;
