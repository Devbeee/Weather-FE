import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import className from "classnames/bind";
import style from "./WeatherHistorySearch.module.scss";
import {
  CustomBtn,
  CustomSelect,
  WeatherInfo,
  WeatherItem,
} from "~/components";
import { fetchWeatherData } from "~/store/slices/weather.slice";
const cx = className.bind(style);

const WeatherHistorySearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { weatherCurrentData, weatherForecastData, status } = useSelector(
    (state) => state.weather
  );
  const { keywords } = useSelector((state) => state.history);
  const [searchValue, setSearchValue] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [limitDays, setLimitDays] = useState(5);

  const getWeatherInfo = useCallback(
    (searchValue, limit = 5) => {
      dispatch(fetchWeatherData({ searchValue, limit }));
    },
    [dispatch]
  );
  useEffect(() => {
    getWeatherInfo(coordinates || searchValue || "Vietnam", limitDays);
  }, [getWeatherInfo, coordinates, searchValue, limitDays]);
  const handleGetCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const stringCoordinates = `${latitude},${longitude}`;
        setCoordinates(stringCoordinates);
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          alert(
            "Geolocation request denied. Please reset location permission and try again"
          );
        }
      }
    );
  };
  const handleLoadMore = async () => {
    setLimitDays((prev) => prev + 4);
  };
  const handleGoHome = () => {
    navigate("/");
  };
  const handleSelectCity = (value) => {
    setCoordinates("");
    setSearchValue(value);
    setLimitDays(5);
  };
  return (
    <div className={cx("weather-dashboard")}>
      <h1 className={cx("weather-title")}>History Weather Search</h1>
      <div className={cx("weather-container")}>
        <form action="" className={cx("weather-form")}>
          <CustomSelect
            label={"History search"}
            value={searchValue}
            onSelect={handleSelectCity}
            keywords={keywords}
          />
          <CustomBtn
            title="Use Current Location"
            className={"location-btn"}
            onClick={handleGetCurrentPosition}
          />
          <div className={cx("separator")}></div>
          <CustomBtn
            title="Go home"
            className={"home-btn"}
            onClick={handleGoHome}
          />
        </form>
        <div className={cx("weather-data")}>
          <WeatherInfo weatherCurrentData={weatherCurrentData} />
          <WeatherItem weatherForecastData={weatherForecastData} />
          {weatherForecastData?.length > 0 && limitDays < 15 && (
            <CustomBtn
              title="Load more"
              loading={status === "loading" ? true : false}
              onClick={handleLoadMore}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherHistorySearch;
