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
        BizConnect is powered by
        <a href="https://www.luminescencegrp.com/" target="_blank">
          Luminescence
        </a>
        and is the number 1 service that connects African and Caribbean business
        owners abroad with their customers. It is a service that currently
        operates in the United States, Canada, Germany and Uk. If you know
        anyone who is African or Caribbean and has a business, tell them to get
        registered on BizConnect and start improving their business numbers.
      </p>

      <Button
        label="Search for business"
        variant="primary"
        className="about_btn"
        onClick={() => {
          navigate("/discover-businesses");
        }}
      />
    </div>
    <div>
      <DefaultWebView className={"laptop-view"} />
    </div>
    </div>
  );
};

export default AboutUs;
