import React from "react";
import { useState } from "react";
import { IBusinessProfile } from "types/business-profile";
import Card from "pages/Home/components/Card/Card";
import Button from "components/Button/Button";
import { formatDays } from "../helper";
import "./BusinessCatalogue.scss";
interface IBusinessCatalogue {
  listOfBusinessProfiles: IBusinessProfile[] | null;
  onBusinessProfileSelect: (arg: IBusinessProfile) => void;
  onPageChange: (arg: number) => void;
  currentPage: number;
  totalPages: number;
}
const BusinessCatalogue = (props: IBusinessCatalogue) => {
  const [disabledNext, setDisabledNext] = useState<boolean>(false);
  const [disabledPrevious, setDisabledPrevious] = useState<boolean>(
    props.currentPage > 1 ? false : true
  );
  const handlePrevious = () => {
    console.log("Before" + props.currentPage);
    if (props.currentPage > 1) {
      setDisabledPrevious(false);
      props.onPageChange(props.currentPage - 1);
      if (disabledNext === true) {
        setDisabledNext(false);
      }
    } else {
      console.log("Here");
      setDisabledPrevious(true);
    }
    console.log("After" + props.currentPage);
  };
  const handleNext = () => {
    if (props.currentPage < props.totalPages) {
      setDisabledNext(false);
      props.onPageChange(props.currentPage + 1);
      if (disabledPrevious === true) {
        setDisabledPrevious(false);
      }
    } else {
      setDisabledNext(true);
    }
  };
  return (
    <div className="business-catalogue">
      <header>
        <h2>Business</h2>
        <p>
          Here is a list of all business associated with your account. you can
          update or delete your business
        </p>
      </header>
      {props.listOfBusinessProfiles &&
        props.listOfBusinessProfiles.map((thisBusinessProfile) => {
          let operationInfo =
            formatDays(thisBusinessProfile.daysOfOperation) +
            "(" +
            thisBusinessProfile.openTime +
            "-" +
            thisBusinessProfile.closeTime +
            ")";
          thisBusinessProfile.operationInfo = operationInfo;
          return (
            <div>
              <Card
                key={thisBusinessProfile.uuid}
                title={thisBusinessProfile?.name}
                openDays={operationInfo}
                phoneNumber={thisBusinessProfile?.phoneNumber}
                usedInBusinessCataloge={true}
                imagePath="https://www.w3schools.com/images/w3schools_green.jpg"
                action={
                  <Button
                    variant="primary"
                    label={`View ${thisBusinessProfile.name} Business`}
                    onClick={() => {
                      props.onBusinessProfileSelect(thisBusinessProfile);
                    }}
                  />
                }
              />
            </div>
          );
        })}
      <div className="business-catalogue navigation">
        <Button
          label="Previous"
          size="sm"
          variant="transparent"
          disabled={disabledPrevious}
          onClick={handlePrevious}
        />
        <Button
          label="Next"
          className="btn-adjusments"
          size="sm"
          variant="transparent"
          disabled={disabledNext}
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default BusinessCatalogue;
