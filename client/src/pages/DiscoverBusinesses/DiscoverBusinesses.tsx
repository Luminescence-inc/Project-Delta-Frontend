import { useState, useEffect, useRef } from "react";
import { getListOfBusinsessProfile } from "api/business";
import BusinessCatalogue from "./BusinessCatalogue/BusinessCatalogue";
import BusinessDetails from "./BusinessDetails/BusinessDetails";
import { IBusinessProfile, ISearch } from "types/business-profile";

export const DiscoverBusinesses = () => {
  const [listOfBusinessProfiles, setListOfBusinessProfiles] = useState<
    IBusinessProfile[] | null
  >(null);
  const [selectedBusinessProfile, setSelectedBusinessProfile] =
    useState<IBusinessProfile | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<ISearch | null>(null);
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

  
  const handleReturnToBusinessCatalogue= (
    businessProfile: IBusinessProfile | null
  ): void => {
    // Set the selected item
    setSelectedBusinessProfile(businessProfile);
  };
  

  // const handleBackToBusinessCatalogue = () => {
  //   setListOfBusinessProfiles(null);
  // };

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
        limit: 25,
      },
      searchQuery
    )
      .then((res) => {
        // console.log(res.data);
        const { businessProfiles } = res.data?.data;
        // console.log(businessProfiles);
        setListOfBusinessProfiles(businessProfiles?.data);
        // console.log("Total Page" + businessProfiles?.totalPages);
        setTotalPages(businessProfiles?.totalPages);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentPage, searchQuery]);

  return (
    <div ref={detailRef}>
      {selectedBusinessProfile ? (
        <BusinessDetails
          businessProfile={selectedBusinessProfile}
          onClickReturnToBusinessCatalogue={handleReturnToBusinessCatalogue}
        />
      ) : (
        <BusinessCatalogue
          listOfBusinessProfiles={listOfBusinessProfiles}
          onBusinessProfileSelect={handleSelectBusinessProfile}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
          searchQuery={searchQuery}
        />
      )}
    </div>
  );
};
export default DiscoverBusinesses;