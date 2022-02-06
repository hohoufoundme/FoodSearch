import React from "react";
import LoadingIcon from "../../img/LoadingIcon.png";
import cl from "./LoadingAnimation.module.css";

const LoadingAnimation = () => {
  return (
    <div>
      <img className={cl.loader} src={LoadingIcon} />
    </div>
  );
};

export default LoadingAnimation;
