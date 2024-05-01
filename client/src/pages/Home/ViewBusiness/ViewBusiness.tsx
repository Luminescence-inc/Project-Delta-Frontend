/** @format */

import Button from "components/ui/button";
import { TOKEN_NAME } from "types/auth";
import { useState, useEffect, Fragment } from "react";
import Modal from "react-modal";
import {
  getUserBusinessProfileList,
  deleteUserBusinessProfile,
} from "api/business";
import { UserBusinessList, UserBusinessListResponse } from "types/business";
import { BaseResponseMessage } from "types/auth";
import { useNavigate } from "react-router-dom";
import { CloudinaryConfig } from "config";
import defaultImage from "assets/images/default-img.jpeg";
import { FlexColStart, FlexColStartCenter } from "components/Flex";

const ViewBusiness = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const authToken = localStorage.getItem(TOKEN_NAME) as string;
  const [userListOfBusinessProfile, setUserListOfBusinessProfile] = useState<
    UserBusinessList[] | []
  >([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [businessUuid, setBusinessUuid] = useState("");
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
    deleteUserBusinessProfile(authToken, businessProfileID)
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
    getUserBusinessProfileList(authToken).then((res) => {
      const businessListResponse: UserBusinessListResponse = res.data;
      setUserListOfBusinessProfile(businessListResponse.data?.businessProfiles);
    });
  }, []);

  return (
    <>
      <div className="w-full p-[16px] bg-gray-202">
        <header className="w-full text-center mt-[64px] mb-[64px]">
          <h2 className="mb-[16px] text-[32px] leading-[40px] font-bold font-inter">
            Business
          </h2>
          <p className="text-[16px] leading-[24px]">
            Here is a list of all business associated with your account. you can
            update or delete your business
          </p>
        </header>

        {userListOfBusinessProfile && userListOfBusinessProfile.length > 0 && (
          <FlexColStart className="w-full gap-10">
            {userListOfBusinessProfile.map((thisBusinessProfile) => {
              return (
                <div className="w-full">
                  <img
                    src={
                      thisBusinessProfile?.logoUrl
                        ? `https://res.cloudinary.com/${CloudinaryConfig.cloudName}/image/upload/c_fill,q_500/${thisBusinessProfile?.logoUrl}.jpg`
                        : defaultImage
                    }
                    alt="businessImage"
                  />
                  <h3 className="text-[16px] leading-[40px]">
                    {thisBusinessProfile.name}
                  </h3>
                  <p className="text-[16px] leading-[24px] mb-[32px]">
                    {thisBusinessProfile.description}
                  </p>

                  <Button
                    className="w-full mb-[10px] text-[14px] font-inter font-semibold"
                    intent="primary"
                    size="lg"
                    onClick={() =>
                      navigate(
                        `/signup/register-business?update=${thisBusinessProfile.uuid}`
                      )
                    }
                  >
                    <span>Update Business</span>
                  </Button>

                  <Button
                    className="w-full text-[14px] font-inter font-semibold"
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
            <h2 className="text-[16px] font-semibold font-inter">
              {confirmDelete ? "Are you sure?" : "Delete Succesful"}
            </h2>
            <p className="text-[12px] font-normal font-inter">
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
                  <span className="font-inter font-bold text-[14px]">
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
                    <span className="font-inter font-semibold text-[14px]">
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
                <span className="font-inter text-[14px]">
                  Click to Continue
                </span>
              </Button>
            )}
          </FlexColStartCenter>
        </Modal>
      </div>

      <FlexColStartCenter className="w-full bg-blue-200 text-white-100 py-[40px] px-[23px] gap-[24px] text-center">
        <h4 className="font-bold font-inter">Want to Add more businesses?</h4>
        <p className="mb-[8px]">
          You can add as many businesses as you wish. Click on the button below.
        </p>
        <Button
          className="text-white-100 border-white-100 w-full border-[1px]"
          intent="transparent"
          size="lg"
          onClick={() => navigate("/signup/register-business")}
        >
          <span className="font-inter font-bold text-[14px]">
            Create a new business profile
          </span>
        </Button>
      </FlexColStartCenter>
    </>
  );
};

export default ViewBusiness;
