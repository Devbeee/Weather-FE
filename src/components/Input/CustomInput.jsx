import React from "react";
import className from "classnames/bind";
import style from "./CustomInput.module.scss";

const cx = className.bind(style);

const CustomInput = ({ name, label, placeholder, register, error }) => {
  return (
    <div className={cx("form-control")}>
      <label htmlFor={name} className={cx("form-label")}>
        {label}
      </label>
      {error && <p className={cx("error-txt")}>{error.message}</p>}
      <input
        id={name}
        name={name}
        placeholder={placeholder}
        {...register(name)}
      />
    </div>
  );
};

export default CustomInput;
