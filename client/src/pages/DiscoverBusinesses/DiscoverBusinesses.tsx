import { useState, useEffect, useRef } from "react";
import { getListOfBusinsessProfile } from "api/business";
import BusinessCatalogue from "./BusinessCatalogue/BusinessCatalogue";
import BusinessDetails from "./BusinessDetails/BusinessDetails";
import { IBusinessProfile, ISearch } from "types/business-profile";
import FilterBusinessProfiles from "./BusinessCatalogue/FilterBusinessProfiles/FilterBusinessProfiles";
import { allBusinessCategories } from "api/business";
import { BusinessCategories, IOption } from "types/business";
import DefaultWebView from "components/DefaultWebView/DefaultWebView";
import { useBusinessCtx } from "context/BusinessCtx";

export const DiscoverBusinesses = () => {
  const [listOfBusinessProfiles, setListOfBusinessProfiles] = useState<
    IBusinessProfile[] | null
  >(null);
  const [selectedBusinessProfile, setSelectedBusinessProfile] =
    useState<IBusinessProfile | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { searchQuery, setSearchQuery } = useBusinessCtx();
  const [totalPages, setTotalPages] = useState<number>(1);
  const detailRef = useRef<HTMLDivElement>(null);

  const handleSelectBusinessProfile = (
    businessProfile: IBusinessProfile | null
  ): void => {
    // Set the selected item
    setSelectedBusinessProfile(businessProfile);

    if (detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const [businessCategory, setBusinessCategory] = useState<IOption[]>();

  // const handleReturnToBusinessCatalogue = (
  //   businessProfile: IBusinessProfile | null
  // ): void => {
  //   // Set the selected item
  //   setSelectedBusinessProfile(businessProfile);
  // };

  // const handleBackToBusinessCatalogue = () => {
  //   setListOfBusinessProfiles(null);
  // };

  useEffect(() => {
    try {
      allBusinessCategories().then((res) => {
        const resData: BusinessCategories = res.data;
        setBusinessCategory(
          resData.data.businessCategories.map((businessCat) => {
            return { uuid: businessCat.uuid, value: businessCat.description };
          })
        );
      });
    } catch (err) {}
  }, []);

  const handlePageChange = (
    page: number,
    searchParam: ISearch | null
  ): void => {
    setCurrentPage(page);
    setSearchQuery(searchParam);
  };

  useEffect(() => {
    getListOfBusinsessProfile(
      {
        page: currentPage,
        sortBy: "createdUtc",
        sortDirection: "asc",
        limit: 5,
      },
      searchQuery
    )
      .then((res) => {
        const { businessProfiles } = res.data?.data;
        setListOfBusinessProfiles(businessProfiles?.data);
        setTotalPages(businessProfiles?.totalPages);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentPage, searchQuery]);

  return (
    <div className="responsive-content">
      <div className="mobile-view" ref={detailRef}>
        {!searchQuery ? (
          <div>
            <FilterBusinessProfiles
              onFilter={(searchParam: ISearch) => {
                // handlePageChange(1, searchParam)
                setSearchQuery(searchParam);
              }}
              // searchParam={searchQuery}
              businessCategory={businessCategory}
            />
          </div>
        ) : (
          <div>
            {selectedBusinessProfile ? (
              <BusinessDetails
                businessProfile={selectedBusinessProfile}
                onClickReturnToBusinessCatalogue={handleSelectBusinessProfile}
              />
            ) : (
              <BusinessCatalogue
                listOfBusinessProfiles={listOfBusinessProfiles}
                onBusinessProfileSelect={handleSelectBusinessProfile}
                onPageChange={handlePageChange}
                currentPage={currentPage}
                totalPages={totalPages}
                searchQuery={searchQuery}
                businessCategory={businessCategory}
              />
            )}
          </div>
        )}
      </div>
      <div>
        <DefaultWebView className={"laptop-view"} />
      </div>
    </div>
  );
};
export default DiscoverBusinesses;
