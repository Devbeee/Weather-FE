import React from "react";
import className from "classnames/bind";
import style from "./WeatherMiniCard.module.scss";
const cx = className.bind(style);

const WeatherMiniCard = ({ weather }) => {
  return (
    <div className={cx("container")}>
      <p className={cx("time")}>{weather?.localTime}</p>
      <hr />
      <div className={cx("img-container")}>
        <img
          src={weather?.icon}
          alt="forecast not available"
          className={cx("img")}
        />
      </div>
      <p className={cx("temp")}>{weather?.temp}&deg;C</p>
    </div>
  );
};

export default WeatherMiniCard;
