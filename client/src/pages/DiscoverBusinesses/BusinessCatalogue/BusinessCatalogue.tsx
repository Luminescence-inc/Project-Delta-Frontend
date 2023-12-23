import { useState } from "react";
import { IBusinessProfile, ISearch } from "types/business-profile";
import Card from "pages/Home/components/Card/Card";
import Button from "components/Button/Button";
import { formatDays } from "../helper";
import { CloudinaryConfig } from "../../../config";
import "./BusinessCatalogue.scss";
import FilterBusinessProfiles from "./FilterBusinessProfiles/FilterBusinessProfiles";
import FilterIcon from "assets/icons/filter-icon.svg?react";

interface IBusinessCatalogue {
  listOfBusinessProfiles: IBusinessProfile[] | null;
  onBusinessProfileSelect: (arg: IBusinessProfile) => void;
  onPageChange: (arg: number, searchParam: ISearch | null) => void;
  currentPage: number;
  totalPages: number;
  searchQuery: ISearch | null;
}
const BusinessCatalogue = (props: IBusinessCatalogue) => {
  const [disabledNext, setDisabledNext] = useState<boolean>(false);
  const [disabledPrevious, setDisabledPrevious] = useState<boolean>(
    props.currentPage > 1 ? false : true
  );
  const [isFilterOpen, setIsFilterOPen] = useState<boolean>(false);
  const handlePrevious = () => {
    //console.log("Before" + props.currentPage);
    if (props.currentPage > 1) {
      setDisabledPrevious(false);
      props.onPageChange(props.currentPage - 1, props.searchQuery);
      if (disabledNext === true) {
        setDisabledNext(false);
      }
    } else {
      setDisabledPrevious(true);
    }
  };
  const handleNext = () => {
    if (props.currentPage < props.totalPages) {
      setDisabledNext(false);
      props.onPageChange(props.currentPage + 1, props.searchQuery);
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
        Here is a list of business based on your search criteria. Click on view to see business details.
        </p>
      </header>
      <div className="business-catalogue__filter">
        <div className="business-catalogue__filter-icon">
          {!isFilterOpen && (
            <span onClick={() => setIsFilterOPen((prev) => !prev)}>
              {<FilterIcon />} Filter
            </span>
          )}
        </div>
        <div className="business-catalogue__filter-body">
          {isFilterOpen && (
            <FilterBusinessProfiles
              onFilter={(searchParam: ISearch) =>
                props.onPageChange(1, searchParam)
              }
              onCancle={() => setIsFilterOPen((prev) => !prev)}
            />
          )}
        </div>
      </div>
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
            <div className="profiles" key={thisBusinessProfile.uuid}>
              <Card
                title={thisBusinessProfile?.name}
                openDays={operationInfo}
                phoneNumber={thisBusinessProfile?.phoneNumber}
                usedInBusinessCataloge={true}
                imagePath={`https://res.cloudinary.com/${CloudinaryConfig.cloudName}/image/upload/c_fill,q_500/${thisBusinessProfile?.logoUrl}.jpg`}
                action={
                  <Button
                    className="view-button"
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
