import React from "react";
import className from "classnames/bind";
import style from "./CustomInput.module.scss";
const cx = className.bind(style);
const CustomInput = ({ label, placeholder, value, setValue }) => {
  return (
    <div className={cx("form-control")}>
      <label htmlFor="" className={cx("form-label")}>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default CustomInput;
