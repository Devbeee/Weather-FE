import React, { memo } from "react";
import className from "classnames/bind";
import style from "./WeatherItem.module.scss";
const cx = className.bind(style);
const WeatherItem = ({ weatherForecastData }) => {
  return (
    <div className={cx("weather-forecast-days")}>
      <h2 className={cx("weather-forecast-title")}>
        {weatherForecastData?.length}-Day Forecast
      </h2>
      {weatherForecastData?.length > 0 && (
        <ul className={cx("weather-list")}>
          {weatherForecastData?.map((weather, index) => (
            <li className={cx("weather-item")} key={index}>
              <h3 className={cx("weather-location")}>({weather?.localTime})</h3>
              <img
                src={weather?.icon}
                alt="weather-icon"
                className={cx("weather-icon-img")}
              />
              <h4 className={cx("weather-attr")}>
                Temperature: {weather?.temp}
                <sup className={cx("temp-sup")}>o</sup>C
              </h4>
              <h4 className={cx("weather-attr")}>Wind: {weather?.wind} m/h</h4>
              <h4 className={cx("weather-attr")}>
                Humidity: {weather?.humidity}%
              </h4>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default memo(WeatherItem);
