import "./AboutUs.scss";
import aboutImg from "assets/images/about-page-image.png";
import Button from "components/Button/Button";
import DefaultWebView from "components/DefaultWebView/DefaultWebView";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div className="responsive-content">
      <div className="about mobile-view">
        <header>
          <h2>About Us </h2>
        </header>
        <img src={aboutImg} alt={aboutImg} />
        <p>
          BizConnect24 is powered by
          <a href="https://www.luminescencegrp.com/" target="_blank">
            Luminescence
          </a>
          Technologies Limited and is the number 1 service connecting Immigrant
          and Local business owners with their customers. If you know anyone who
          currently operates a business abroad and wants to boost their sales
          numbers, BizConnect24 is for them.
        </p>

        <div className="disc-btn">
          <Button
            label="Search for business"
            variant="primary"
            className="about_btn"
            onClick={() => {
              navigate("/explore-businesses");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
