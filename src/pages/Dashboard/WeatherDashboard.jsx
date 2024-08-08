import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import className from "classnames/bind";
import style from "./WeatherDashboard.module.scss";
import { CustomBtn, CustomInput, WeatherInfo, WeatherItem } from "~/components";
import { fetchWeatherData } from "~/store/slices/weather.slice";
import {
  setToday,
  addKeyword,
  clearHistory,
} from "~/store/slices/history.slice";
import { useDebounce } from "~/hooks";
import { capitalizeFirstLetter } from "~/utils/common";

const cx = className.bind(style);

const schema = yup.object().shape({
  searchValue: yup
    .string()
    .required("City name is required")
    .min(2, "City name must be at least 2 characters"),
});

const WeatherDashboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const formValues = watch();
  const debouncedSearchValue = useDebounce(formValues.searchValue, 500);
  const { weatherCurrentData, weatherForecastData, status } = useSelector(
    (state) => state.weather
  );
  const { today: storedToday, keywords } = useSelector(
    (state) => state.history
  );
  const [coordinates, setCoordinates] = useState("");
  const [limitDays, setLimitDays] = useState(5);

  const getWeatherInfo = useCallback(
    (searchValue, limit = 5) => {
      dispatch(fetchWeatherData({ searchValue, limit }));
    },
    [dispatch]
  );

  useEffect(() => {
    getWeatherInfo(
      coordinates ||
        debouncedSearchValue ||
        location?.state?.searchValue ||
        "Vietnam",
      limitDays
    );
    location?.state?.searchValue &&
      handleSaveHistorySearch(location?.state?.searchValue);
  }, [getWeatherInfo, coordinates, location, limitDays]);

  const handleSearchCity = () => {
    if (!debouncedSearchValue?.trim()) {
      return;
    }
    setLimitDays(5);
    setCoordinates("");
    getWeatherInfo(debouncedSearchValue, 5);
    handleSaveHistorySearch(debouncedSearchValue);
  };

  const handleSaveHistorySearch = (searchValue) => {
    const today = new Date();
    const todayString = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    if (storedToday !== todayString) {
      dispatch(clearHistory());
      dispatch(setToday(todayString));
      dispatch(addKeyword(capitalizeFirstLetter(searchValue)));
    } else {
      if (!keywords.includes(capitalizeFirstLetter(searchValue))) {
        dispatch(setToday(todayString));
        dispatch(addKeyword(capitalizeFirstLetter(searchValue)));
      }
    }
  };

  const handleGetCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const stringCoordinates = `${latitude},${longitude}`;
        setCoordinates(stringCoordinates);
        setValue("searchValue", "");
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

  const handleLoadMore = () => {
    setLimitDays((prev) => prev + 4);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className={cx("weather-dashboard")}>
      <h1 className={cx("weather-title")}>Weather Dashboard</h1>
      <div className={cx("weather-container")}>
        <form
          onSubmit={handleSubmit(handleSearchCity)}
          className={cx("weather-form")}
        >
          <CustomInput
            name="searchValue"
            label="Enter a City Name"
            placeholder="E.g., New York, London, Tokyo"
            register={register}
            error={errors.searchValue}
          />
          <CustomBtn title="Search" type="submit" />
          <div className={cx("separator")}></div>
          <CustomBtn
            title="Use Current Location"
            className="location-btn"
            onClick={handleGetCurrentPosition}
          />
          <div className={cx("separator")}></div>
          <CustomBtn
            title="Go home"
            className="home-btn"
            onClick={handleGoHome}
          />
        </form>
        <div className={cx("weather-data")}>
          <WeatherInfo weatherCurrentData={weatherCurrentData} />
          <WeatherItem
            weatherForecastData={weatherForecastData?.slice(0, limitDays)}
          />
          {weatherForecastData?.length > 0 && limitDays < 15 && (
            <CustomBtn
              title="Load more"
              onClick={handleLoadMore}
              loading={status === "loading"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
