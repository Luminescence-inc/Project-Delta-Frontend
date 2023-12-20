import { useState, useEffect } from "react";
import { getListOfBusinsessProfile } from "api/business";
import BusinessCatalogue from "./BusinessCatalogue/BusinessCatalogue";
import BusinessDetails from "./BusinessDetails/BusinessDetails";
import { IBusinessProfile } from "types/business-profile";

export const DiscoverBusinesses = () => {
  const [listOfBusinessProfiles, setListOfBusinessProfiles] = useState<
    IBusinessProfile[] | null
  >(null);
  const [selectedBusinessProfile, setSelectedBusinessProfile] =
    useState<IBusinessProfile | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [searchQuery, setSearchQuery] = useState<ISearch | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const handleSelectBusinessProfile = (
    businessProfile: IBusinessProfile | null
  ): void => {
    // Set the selected item
    setSelectedBusinessProfile(businessProfile);
  };

  // const handleBackToBusinessCatalogue = () => {
  //   setListOfBusinessProfiles(null);
  // };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getListOfBusinsessProfile(
      {
        page: currentPage,
        sortBy: "createdUtc",
        sortDirection: "asc",
        limit: 100,
      },
      null
    )
      .then((res) => {
        //console.log(res.data);
        const { businessProfiles } = res.data?.data;
        console.log(businessProfiles);
        setListOfBusinessProfiles(businessProfiles?.data);
        //console.log("Total Page" + businessProfiles?.totalPages);
        setTotalPages(businessProfiles?.totalPages);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentPage]);

  return (
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
        />
      )}
    </div>
  );
};
export default DiscoverBusinesses;
