"use client";
import Button from "@components/ui/button";
import { BaseResponseMessage } from "@/types/auth";
import { useState, useEffect, Fragment } from "react";
import Modal from "react-modal";
import {
  getUserBusinessProfileList,
  deleteUserBusinessProfile,
} from "@/api/business";
import { UserBusinessList, UserBusinessListResponse } from "@/types/business";
import { useRouter } from "next/navigation";
import { CloudinaryConfig } from "@/config";
import {
  FlexColCenter,
  FlexColStart,
  FlexColStartCenter,
} from "@components/Flex";
import { LoaderComponent } from "@components/Loader";
import ReadMoreText from "@/components/ReadMoreText";
import withAuth from "@/utils/auth-helpers/withAuth";
import Input from "@/components/ui/input";
import { SearchIcon2 } from "@/components/icons";

const ViewBusiness = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userListOfBusinessProfile, setUserListOfBusinessProfile] = useState<
    UserBusinessList[] | []
  >([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [businessUuid, setBusinessUuid] = useState("");
  const [businessesLoading, setBusinessesLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const customStyles = {
    content: {
      top: "35%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-90%",
      transform: "translate(-50%, -50%)",
      maxWidth: "90%",
      maxHeight: "80vh",
      overflow: "auto",
    },
    overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  };

  const handleDeleteButton = (name: string, uuid: string) => {
    setIsModalOpen(true);
    setConfirmDelete(true);
    setBusinessName(name);
    setBusinessUuid(uuid);
  };

  const handleDeleteBusinessProfile = (businessProfileID: string) => {
    setIsLoading(true);
    deleteUserBusinessProfile(businessProfileID)
      .then((res) => {
        const deletedResponse: BaseResponseMessage = res.data;
        if (deletedResponse?.success) {
          let updatedUserListOfBusinessProfile =
            userListOfBusinessProfile?.filter(
              (thisBusinessProfile) =>
                thisBusinessProfile.uuid !== businessProfileID
            );
          setUserListOfBusinessProfile(updatedUserListOfBusinessProfile);
          setConfirmDelete(false);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  };

  useEffect(() => {
    setBusinessesLoading(true);
    getUserBusinessProfileList()
      .then((res) => {
        setBusinessesLoading(false);
        const businessListResponse: UserBusinessListResponse = res.data;
        setUserListOfBusinessProfile(
          businessListResponse.data?.businessProfiles
        );
      })
      .catch((err) => {
        setBusinessesLoading(false);
        console.error(err);
      });
  }, []);

  return (
    <>
      <div className="w-full p-[16px] bg-gray-202">
        <header className="w-full text- mt-[64px] mb-[64px]">
          <h2 className="mb-[16px] text-[32px] leading-[40px] font-semibold font-pp text-blue-200">
          My Businesses
          </h2>
          <p className="text-[13px] font-pp leading-[24px] text-gray-103">
            Here is a list of all business associated with your account.
          </p>
        </header>

        <div>
        <Input
            type="search"
            label="Search business name"
            name="search"
            // value={formik.values.email}
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            
            leftIcon={<SearchIcon2 size={20} className="stroke-gray-103" strokeWidth={1} />}
            placeholder="Enter Email Address"
            parentClassname="w-full px-0 border border-white-400/50 px-4"
            inputClassname="w-full px-3 outline-none border-none"
          />
        </div>

        {businessesLoading && (
          <FlexColCenter className="w-full">
            <LoaderComponent />
          </FlexColCenter>
        )}

        {userListOfBusinessProfile && userListOfBusinessProfile.length > 0 && (
          <FlexColStart className="w-full gap-10">
            {userListOfBusinessProfile.map((thisBusinessProfile, i) => {
              return (
                <div className="w-full" key={i}>
                  <img
                    src={
                      thisBusinessProfile?.logoUrl
                        ? `https://res.cloudinary.com/${CloudinaryConfig.cloudName}/image/upload/c_fill,q_500/${thisBusinessProfile?.logoUrl}.jpg`
                        : "/assets/images/default-img.jpeg"
                    }
                    alt="businessImage"
                  />
                  <h3 className="text-[16px] font-pp font-semibold leading-[40px]">
                    {thisBusinessProfile.name}
                  </h3>
                  <p className="text-[16px] leading-[24px] mb-[32px]">
                    <ReadMoreText text={thisBusinessProfile.description!} />
                  </p>

                  <Button
                    className="w-full mb-[10px] text-[14px] font-pp font-semibold"
                    intent="primary"
                    size="lg"
                    onClick={() =>
                      router.push(
                        `/register-business?update=${thisBusinessProfile.uuid}`
                      )
                    }
                  >
                    <span>Update Business</span>
                  </Button>

                  <Button
                    className="w-full text-[14px] font-pp font-semibold"
                    intent="error"
                    size="lg"
                    onClick={() =>
                      handleDeleteButton(
                        thisBusinessProfile.name,
                        thisBusinessProfile.uuid
                      )
                    }
                  >
                    <span>Delete Business</span>
                  </Button>
                </div>
              );
            })}
          </FlexColStart>
        )}

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Success Modal"
          style={customStyles}
        >
          <FlexColStartCenter className="w-full text-center gap-1 max-w-[350px] px-3">
            <h2 className="text-[16px] font-semibold font-pp">
              {confirmDelete ? "Are you sure?" : "Delete Succesful"}
            </h2>
            <p className="text-[12px] font-normal font-pp">
              {confirmDelete
                ? `You’re about to delete (${businessName}) business, you can’t undo this request.`
                : "You have successfully deleted your business profile"}
            </p>
            {confirmDelete && (
              <Fragment>
                <Button
                  className="w-full mt-3"
                  type="submit"
                  intent="transparent"
                  size="lg"
                  onClick={() => {
                    setIsModalOpen(false);
                    setConfirmDelete(false);
                  }}
                  isLoading={isLoading}
                >
                  <span className="font-pp font-semibold text-[14px]">
                    Cancel
                  </span>
                </Button>
                {!isLoading && (
                  <Button
                    className="w-full mt-3"
                    type="submit"
                    intent="primary"
                    size="lg"
                    onClick={() => {
                      handleDeleteBusinessProfile(businessUuid);
                    }}
                  >
                    <span className="font-pp font-semibold text-[14px]">
                      Yes, delete business
                    </span>
                  </Button>
                )}
              </Fragment>
            )}
            {!confirmDelete && (
              <Button
                className="mt-3 w-full"
                type="submit"
                intent="primary"
                size="lg"
                onClick={() => setIsModalOpen(false)}
              >
                <span className="font-pp text-[14px]">Click to Continue</span>
              </Button>
            )}
          </FlexColStartCenter>
        </Modal>
      </div>

      <FlexColStartCenter className="w-full bg-blue-200 text-white-100 py-[40px] px-[23px] gap-[24px] text-center">
        <h4 className="font-semibold text-sm font-pp">
          Want to Add more businesses?
        </h4>
        <p className="mb-[8px] text-xs">
          You can add as many businesses as you wish. Click on the button below.
        </p>
        <Button
          className="text-white-100 border-white-100 w-full border-[1px]"
          intent="transparent"
          size="lg"
          onClick={() => router.push("/register-business")}
        >
          <span className="font-pp font-semibold text-[14px]">
            Create a new business profile
          </span>
        </Button>
      </FlexColStartCenter>
    </>
  );
};

export default withAuth(ViewBusiness);
