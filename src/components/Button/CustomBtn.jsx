import React from "react";
import className from "classnames/bind";
import style from "./CustomBtn.module.scss";
const cx = className.bind(style);
const CustomBtn = ({ title, className, onClick }) => {
  return (
    <button
      className={cx("wheather-btn", className)}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {title}
    </button>
  );
};

export default CustomBtn;
