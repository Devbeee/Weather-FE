import React, { memo } from "react";
import className from "classnames/bind";
import style from "./WeatherInfo.module.scss";
const cx = className.bind(style);
const WeatherInfo = ({ weatherCurrentData }) => {
  const { cityName, localTime, temp, wind, humidity, text, icon } =
    weatherCurrentData;
  return (
    <div className={cx("weather-current")}>
      <div className={cx("weather-detais")}>
        <h2 className={cx("weather-location")}>
          {cityName} ({localTime})
        </h2>
        <h4 className={cx("weather-attr")}>
          Temperature: {temp}
          <sup className={cx("temp-sup")}>o</sup>C
        </h4>
        <h4 className={cx("weather-attr")}>Wind: {wind} m/h</h4>
        <h4 className={cx("weather-attr")}>Humidity: {humidity}%</h4>
      </div>
      <div className={cx("icon")}>
        <img src={icon} alt="weather-icon" className={cx("weather-icon-img")} />
        <h4 className={cx("weather-text")}>{text}</h4>
      </div>
    </div>
  );
};

export default memo(WeatherInfo);
