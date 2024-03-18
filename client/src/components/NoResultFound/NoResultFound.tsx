import React from "react";
import noRsultImage from "assets/images/no-result.png";
import "./NoResultFound.scss";

interface INoResultFoundParams {
  title: string;
  message: string;
}

const NoResultFound: React.FC<INoResultFoundParams> = ({ message, title }) => {
  return (
    <div className="no-result-found-card">
      <div className="no-result-found-card no-result-found-card-home">
        <img src={noRsultImage} alt="no-result image" />
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default NoResultFound;
