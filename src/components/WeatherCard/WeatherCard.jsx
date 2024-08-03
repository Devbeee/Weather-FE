import React from "react";
import className from "classnames/bind";
import style from "./WeatherCard.module.scss";
const cx = className.bind(style);
const WeatherCard = ({ weatherCurrentData }) => {
  const { cityName, localTime, temp, wind, humidity, heat, text, icon } =
    weatherCurrentData;

  return (
    <div className={cx("container")}>
      <div className={cx("temperature")}>
        <img src={icon} alt="weather_icon" className={cx("icon")} />
        <p>{temp} &deg;C</p>
      </div>
      <div className={cx("place")}>{cityName}</div>
      <div className={cx("time")}>
        <p>{new Date().toDateString()}</p>
        <p>{localTime}</p>
      </div>
      <div className={cx("wind-humidity")}>
        <p className={cx("wind")}>
          <strong>Wind speed</strong>
          <span>{wind} m/h</span>
        </p>
        <p className={cx("humidity")}>
          <strong>Humidity</strong>
          <span>{humidity} gm/m&#179;</span>
        </p>
      </div>
      <div className={cx("heat")}>
        <p>
          <strong>Heat Index</strong>
        </p>
        <p>{heat ? heat : "N/A"}</p>
      </div>
      <hr className={cx("separate")} />
      <div className={cx("conditions")}>{text}</div>
    </div>
  );
};

export default WeatherCard;
