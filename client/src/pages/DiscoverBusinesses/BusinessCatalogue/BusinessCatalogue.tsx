import { useState } from "react";
import { IBusinessProfile, ISearch } from "types/business-profile";
import Card from "pages/Home/components/Card/Card";
import Button from "components/Button/Button";
import { formatDays } from "../helper";
import { CloudinaryConfig } from "../../../config";
import "./BusinessCatalogue.scss";
import FilterBusinessProfiles from "./FilterBusinessProfiles/FilterBusinessProfiles";
import FilterIcon from "assets/icons/filter-icon.svg?react";
import NoResultFound from "components/NoResultFound/NoResultFound";
import { IOption } from "types/business";
import defaultImage from "assets/images/default-img.jpeg";

interface IBusinessCatalogue {
  listOfBusinessProfiles: IBusinessProfile[] | null;
  onBusinessProfileSelect: (arg: IBusinessProfile) => void;
  onPageChange: (arg: number, searchParam: ISearch | null) => void;
  currentPage: number;
  totalPages: number;
  searchQuery: ISearch | null;
  businessCategory: IOption[] | undefined;
}
const BusinessCatalogue: React.FC<IBusinessCatalogue> = ({
  listOfBusinessProfiles,
  currentPage,
  totalPages,
  searchQuery,
  onBusinessProfileSelect,
  onPageChange,
  businessCategory,
}) => {
  const [disabledNext, setDisabledNext] = useState<boolean>(
    currentPage < totalPages ? false : true
  );
  const [disabledPrevious, setDisabledPrevious] = useState<boolean>(
    currentPage > 1 ? false : true
  );
  const [isFilterOpen, setIsFilterOPen] = useState<boolean>(false);
  const handlePrevious = () => {
    if (currentPage > 1) {
      setDisabledPrevious(false);
      onPageChange(currentPage - 1, searchQuery);
      if (disabledNext === true) {
        setDisabledNext(false);
      }
    } else {
      setDisabledPrevious(true);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      setDisabledNext(false);
      onPageChange(currentPage + 1, searchQuery);
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
          Here is a list of business based on your search criteria. Click on
          view to see business details.
        </p>
      </header>

      <div className="business-catalogue__filter">
        <div className="business-catalogue__filter-icon">
          {!isFilterOpen && (
            <span onClick={() => setIsFilterOPen((prev) => !prev)}>
              {<FilterIcon />} Filter Businesses
            </span>
          )}
        </div>
        <div className="business-catalogue__filter-body">
          {isFilterOpen && (
            <FilterBusinessProfiles
              onFilter={(searchParam: ISearch) => {
                onPageChange(1, searchParam);
              }}
              onCancle={() => setIsFilterOPen((prev) => !prev)}
              businessCategory={businessCategory}
            />
          )}
        </div>
      </div>
      {listOfBusinessProfiles?.length ? (
        <div>
          {listOfBusinessProfiles.length &&
            listOfBusinessProfiles.map((thisBusinessProfile) => {
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
                    imagePath={
                      thisBusinessProfile?.logoUrl
                        ? `https://res.cloudinary.com/${CloudinaryConfig.cloudName}/image/upload/c_fill,q_500/${thisBusinessProfile?.logoUrl}.jpg`
                        : defaultImage
                    }
                    action={
                      <Button
                        className="view-button"
                        variant="primary"
                        label={`View ${thisBusinessProfile.name} Business`}
                        onClick={() => {
                          onBusinessProfileSelect(thisBusinessProfile);
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
      ) : (
        <NoResultFound
          message="Modify filter parameters and try again"
          title="No Result Found!"
        />
      )}
    </div>
  );
};

export default BusinessCatalogue;
