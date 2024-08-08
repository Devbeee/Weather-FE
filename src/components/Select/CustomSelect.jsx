import React, { useState } from "react";
import className from "classnames/bind";
import style from "./CustomSelect.module.scss";
import { FaChevronDown, FaCheck } from "react-icons/fa6";
const cx = className.bind(style);

const CustomSelect = ({ label, value, onSelect, keywords }) => {
  const [show, setShow] = useState(false);
  return (
    <div
      className={cx("select-container")}
      onClick={() => setShow((prev) => !prev)}
    >
      <label htmlFor="custom-select" className={cx("form-label")}>
        {value || label}
      </label>
      <FaChevronDown size={20} color="blue" />
      {show && (
        <ul
          name="custom-select"
          id="custom-select"
          className={cx("select-list")}
          value={value}
          onChange={(e) => {
            e.preventDefault();
            onSelect(e.target.value);
          }}
        >
          {keywords?.length > 0 ? (
            keywords.map((keyword, index) => (
              <li
                key={index}
                value={keyword}
                className={cx("select-item")}
                onClick={() => onSelect(keyword)}
              >
                {keyword}
                {value === keyword && <FaCheck size={20} color="red" />}
              </li>
            ))
          ) : (
            <option value="" disabled  className={cx("select-item")}>
              No keywords available
            </option>
          )}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
