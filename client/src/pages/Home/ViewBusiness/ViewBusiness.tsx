/** @format */

import Button from "components/Button/Button";
import "./ViewBusiness.scss";
import { JwtPayload, TOKEN_NAME } from "types/auth";
import { useState, useEffect } from "react";
import { isAuthenticated } from "api/auth";
import Modal from "react-modal";
import {
  getUserBusinessProfileList,
  deleteUserBusinessProfile,
} from "api/business";
import { UserBusinessList, UserBusinessListResponse } from "types/business";
import { BaseResponseMessage } from "types/auth";

import { useNavigate } from "react-router-dom";
import { CloudinaryConfig } from "config";

const ViewBusiness = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const authToken = localStorage.getItem(TOKEN_NAME) as string;
  const [authenticated, setAuthenticated] = useState(false);
  const [userListOfBusinessProfile, setUserListOfBusinessProfile] = useState<
    UserBusinessList[] | []
  >([]);

  const parsedToken: JwtPayload = authToken
    ? JSON.parse(atob(authToken?.split(".")[1]))
    : {};

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
  const handleDeleteBusinessProfile = (businessProfileID: string) => {
    if (parsedToken.id) {
      isAuthenticated(authToken, parsedToken.id)
        .then(() => {
          setAuthenticated(true);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
      deleteUserBusinessProfile(authToken, businessProfileID).then((res) => {
        const deletedResponse: BaseResponseMessage = res.data;
        if (deletedResponse?.success) {
          let updatedUserListOfBusinessProfile =
            userListOfBusinessProfile?.filter(
              (thisBusinessProfile) =>
                thisBusinessProfile.uuid !== businessProfileID
            );
          setUserListOfBusinessProfile(updatedUserListOfBusinessProfile);
          setIsModalOpen(true);
        }
      });
    }
  };
  useEffect(() => {
    isAuthenticated(authToken, parsedToken.id)
      .then(() => {
        setAuthenticated(true);
      })
      .catch((err) => {
        setAuthenticated(false);
        console.error(err);
      });

    getUserBusinessProfileList(authToken).then((res) => {
      const businessListResponse: UserBusinessListResponse = res.data;
      setUserListOfBusinessProfile(businessListResponse.data?.businessProfiles);
    });
  }, []);
  if (!authenticated) {
    navigate("/login");
  }

  return (
    <>
      <div className="view-business">
        <header>
          <h2>Business</h2>
          <p>
            Here is a list of all business associated with your account. you can
            update or delete your business
          </p>
        </header>

        {userListOfBusinessProfile && userListOfBusinessProfile.length > 0 && (
          <div className="businesses">
            {userListOfBusinessProfile.map((thisBusinessProfile) => {
              return (
                <div className="card card-home card-business">
                  <img
                    src={`https://res.cloudinary.com/${CloudinaryConfig.cloudName}/image/upload/c_fill,q_500/${thisBusinessProfile?.logoUrl}.jpg`}
                    alt="businessImage"
                  />
                  <h3>{thisBusinessProfile.name}</h3>
                  <p>{thisBusinessProfile.description}</p>

                  <Button
                    className="spacing"
                    label="Update Business"
                    variant="primary"
                    size="lg"
                    onClick={() =>
                      navigate(
                        `/signup/register-business?update=${thisBusinessProfile.uuid}`
                      )
                    }
                  />

                  <Button
                    label="Delete Business"
                    variant="secondary"
                    size="lg"
                    onClick={() => {
                      handleDeleteBusinessProfile(thisBusinessProfile.uuid);
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Success Modal"
          style={customStyles}
        >
          <div className="modal">
            <h2
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "16px",
                fontWeight: "700",
                marginBottom: "10px",
              }}
            >
              Delete Succesful
            </h2>
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "400",
                marginBottom: "20px",
              }}
            >
              You have successfully deleted your business profile
            </p>
            <Button
              type="submit"
              label="Click to Continue"
              variant="primary"
              size="lg"
              to="/view-your-business"
            />
          </div>
        </Modal>
      </div>

      <div className="add-new-business">
        <h4>Want to Add more businesses?</h4>
        <p>
          You can add as many businesses as you wish. Click on the button below.
        </p>
        <Button
          label="Add a new business"
          variant="transparent"
          size="lg"
          onClick={() => navigate("/signup/register-business")}
        />
      </div>
    </>
  );
};

export default ViewBusiness;
