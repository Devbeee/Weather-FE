import React from "react";
import className from "classnames/bind";
import style from "./CustomBtn.module.scss";
const cx = className.bind(style);
const CustomBtn = ({
  title,
  type = "button",
  className,
  loading,
  onClick = () => {},
}) => {
  return (
    <button
      type={type}
      className={cx("wheather-btn", className)}
      onClick={(e) => {
        // e.preventDefault();
        onClick();
      }}
    >
      {title}
      {loading && <span className={cx("loader")}></span>}
    </button>
  );
};

export default CustomBtn;
