/** @format */

import "./Card.scss";
import MailIcon from "assets/icons/mail-icon.svg?react";
import PhoneIcon from "assets/icons/phone-icon.svg?react";
import AddressIcon from "assets/icons/address-icon.svg?react";
import ClockIcon from "assets/icons/clock-icon.svg?react";
import LinkedInIcon from "assets/icons/linkedIn-icon-business-details.svg?react";
import InstagramIcon from "assets/icons/instagram-icon-business-details.svg?react";
import FacebookIcon from "assets/icons/facebook-icon-business-details.svg?react";
import { useState } from "react";

interface ICategory {
  name: string | undefined;
  style: string;
}
interface ISocials {
  url: string;
  name: string;
}
interface Icard {
  icon?: React.ReactNode;
  imagePath?: string;
  title: string;
  description?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  openDays?: string;
  closeDays?: string | null;
  categories?: ICategory[];
  socials?: ISocials[];
  action?: React.ReactNode;
  usedInBusinessCataloge: boolean;
}

const Card = (props: Icard) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const isContactSectionAvailable =
    !!props.email &&
    !!props.phoneNumber &&
    !!props.address &&
    !props.usedInBusinessCataloge;
  const isBusinessSectionAvailable =
    !!props.openDays && !!props.closeDays && !props.usedInBusinessCataloge;
  const isCategorySectionAvailable =
    !!props.categories && props.categories.length > 0;
  const isSocialMediaSectionAvailable =
    !!props.socials && props.socials.length > 0;

    const handleSocialClick = (url: string) => {
      if (url) {
        window.location.href = url;
      } else {
        setShowTooltip(true);
      }
    };
  
  return (
    <div className="card card-home">
      {props.icon && props.icon}
      {props.imagePath && <img src={props.imagePath} alt="businessImage" />}
      <h3 className="title">{props.title && props.title}</h3>
      <p>{props.description && props.description}</p>
      {/* Contact info Section */}
      <h3>{isContactSectionAvailable && "Contact Info"}</h3>

      {isContactSectionAvailable && (
        <div className="card card-section-info-col">
          {props.email && (
            <div className="card card-section-info-col card-section-info-col__contact">
              <span className="card-section-info-col__contact card-section-info-col__contact-icon">
                <MailIcon />
              </span>
              <span className="card-section-info-col__contact card-section-info-col__contact-data">
                {props.email}
              </span>
            </div>
          )}
          {props.phoneNumber && (
            <div className="card card-section-info-col card-section-info-col__contact">
              <span className="card-section-info-col__contact card-section-info-col__contact-icon">
                <PhoneIcon />
              </span>

              <span className="card-section-info-col__contact card-section-info-col__contact-data">
                {props.phoneNumber}
              </span>
            </div>
          )}
          {props.address && (
            <div className="card card-section-info-col card-section-info-col__contact">
              <span className="card-section-info-col__contact card-section-info-col__contact-icon">
                <AddressIcon />
              </span>
              <span className="card-section-info-col__contact card-section-info-col__contact-data">
                {props.address}
              </span>
            </div>
          )}
        </div>
      )}
      <h3>{isBusinessSectionAvailable && "Business Open and Closed Times"}</h3>
      {props.openDays && (
        <div className="card card-section-info-col">
          {props.openDays && (
            <div className="card card-section-info-col__business">
              <span className="card-section-info-col__business-icon">
                <ClockIcon />
              </span>
              <span className="card-section-info-col__business-data">
                <b>{props.openDays}</b>
              </span>
            </div>
          )}
          {props.closeDays && (
            <div className="card card-section-info-col__business">
              <span className="card-section-info-col__business-icon">
                <ClockIcon />
              </span>
              <span className="card-section-info-col__business-data">
                <b>{props.closeDays}</b>
                <span style={{ color: "#ef0a0a " }}>(Closed)</span>
              </span>
            </div>
          )}
          {props.usedInBusinessCataloge && (
            <div className="card card-section-info-col__business">
              <span className="card-section-info-col__business-icon">
                <PhoneIcon />
              </span>
              <span className="card-section-info-col__business-data">
                <b>{props.phoneNumber}</b>
              </span>
            </div>
          )}
        </div>
      )}
      <h3>{isCategorySectionAvailable && "Category"}</h3>
      {isCategorySectionAvailable && (
        <div className="card card-section-info-row">
          {props.categories?.map((thisCategory) => {
            //console.log("Cat" + thisCategory.name);
            return (
              <span
                key={thisCategory.name}
                className="card card-section-info-row card-section-info-row__category"
                style={{ backgroundColor: `${thisCategory.style}` }}
              >
                {thisCategory.name}
              </span>
            );
          })}
        </div>
      )}
      <h3>{isSocialMediaSectionAvailable && "Follow our social media"}</h3>
      {isSocialMediaSectionAvailable && (
        <div className="card card-section-info-row">
        {props.socials?.map((thisSocials) => {
            return (
              <div
                key={thisSocials.name}
                className="card card-section-info-row card-section-info-row__socials"
                onClick={() => handleSocialClick(thisSocials.url)}
              >
                {thisSocials.name === "linkedIn" ? (
                  <LinkedInIcon />
                ) : thisSocials.name === "instagram" ? (
                  <InstagramIcon />
                ) : (
                  <FacebookIcon />
                )} 
              </div>
            );
          })}
      </div>
      )}
      {showTooltip && (<div style={{marginBottom: "20px"}}>No social media found</div>)}
      {props.action && props.action}
    </div>
  );
};

export default Card;
