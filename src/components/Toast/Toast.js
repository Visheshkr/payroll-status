import React, { useState, useEffect } from "react";
import Style from "./Toast.module.css";
import CheckIcon from "../../assets/images/check.svg";
import ErrorIcon from "../../assets/images/error.svg";
import WarningIcon from "../../assets/images/warningToast.svg";
import InfoIcon from "../../assets/images/info.svg";
import { removeMessage } from "../../redux/actions/ShowMessage";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

function Toast(props) {
  const {
    title,
    description,
    position = "topRight",
    autoDelete,
    autoDeleteTime,
    variant,
    linkText,
    link
  } = props;

  let imagePath;
  switch (variant) {
    case "success":
      imagePath = CheckIcon;
      break;
    case "error":
      imagePath = ErrorIcon;
      break;
    case "info":
      imagePath = InfoIcon;
      break;
    case "warning":
      imagePath = WarningIcon;
      break;
    default:
      imagePath = WarningIcon;
  }

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(function () {
      dispatch(removeMessage());
    }, 6000);
  }, [dispatch]);

  const handleCancel = () => {
    dispatch(removeMessage());
  };

  return (
    <div className={[Style.notificationContainer, Style[position]].join(" ")}>
      <div
        className={[
          Style.notification,
          Style.toast,
          Style[position],
          Style[variant],
        ].join(" ")}
      >
        {/* <button onClick={handleCancel}>
          <CloseIcon color="#000000" width="16px" height="16px" />
        </button> */}
        <div className={Style.notificationImage}>
          <img src={imagePath} alt="" />
        </div>
        <div>
          <p className={Style.notificationTitle}>{title}</p>
          <p className={Style.notificationMessage}>{description}</p>
          <Link style={{color: "#fff",fontSize:16,textDecoration: "underline"}} to={link} onClick={handleCancel}>{linkText}</Link>
        </div>
      </div>
    </div>
  );
}

export default Toast;
