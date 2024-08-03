import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import className from "classnames/bind";
import style from "./WeatherHistorySearch.module.scss";
import {
  CustomBtn,
  CustomSelect,
  WeatherInfo,
  WeatherItem,
} from "~/components";
import {
  apiGetWeatherByCity,
  apiGetWeatherForecastByCity,
} from "~/services";
import { limitDaysForecast } from "~/utils/constant";
const cx = className.bind(style);

const WeatherHistorySearch = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchKeywords, setSearchKeywords] = useState([]);
  const [coordinates, setCoordinates] = useState("");
  const [limitDays, setLimitDays] = useState(limitDaysForecast);
  const [weatherCurrentData, setWeatherCurrentData] = useState({});
  const [weatherForecastData, setWeatherForecastData] = useState([]);

  const getWeatherInfo = useCallback(async (searchValue) => {
    const hourAtNow = new Date().getHours();
    setWeatherForecastData([]);
    try {
      const [response1, response2] = await Promise.all([
        apiGetWeatherByCity(searchValue),
        apiGetWeatherForecastByCity(searchValue, limitDaysForecast),
      ]);

      if (response1.status === 200 && response2.status === 200) {
        const { data: weatherCurrent } = response1;
        const { data: weatherForecast } = response2;
        setWeatherCurrentData({
          cityName: weatherCurrent?.location?.name,
          localTime: weatherCurrent?.location?.localtime?.split(" ")[0],
          temp: weatherCurrent?.current?.temp_c,
          wind: weatherCurrent?.current?.wind_mph,
          humidity: weatherCurrent?.current?.humidity,
          text: weatherCurrent?.current?.condition?.text,
          icon: weatherCurrent?.current?.condition?.icon,
        });

        const newForecastData = weatherForecast?.forecast?.forecastday
          ?.slice(1)
          .flatMap((day) =>
            day?.hour
              ?.filter(
                (weather) => new Date(weather?.time).getHours() === hourAtNow
              )
              ?.map((weather) => ({
                localTime: weather?.time?.split(" ")[0],
                icon: weather?.condition?.icon,
                temp: weather?.temp_c,
                wind: weather?.wind_mph,
                humidity: weather?.humidity,
              }))
          );
        setWeatherForecastData(newForecastData);
      }
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  }, []);
  const getHistorySearch = useCallback(async () => {
    const today = new Date();
    const todayString = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    let historySearchData = localStorage.getItem("historySearchData");
    if (historySearchData) {
      historySearchData = JSON.parse(historySearchData);
      if (historySearchData.today === todayString) {
        setSearchKeywords(historySearchData.keywords);
      } else {
        historySearchData.today = todayString;
        historySearchData.keywords = [];
      }
    } else {
      historySearchData = {
        today: todayString,
        keywords: [],
      };
    }
    localStorage.setItem(
      "historySearchData",
      JSON.stringify(historySearchData)
    );
  }, []);
  useEffect(() => {
    getWeatherInfo(coordinates || "Vietnam");
  }, [getWeatherInfo, coordinates]);
  useEffect(() => {
    getHistorySearch();
  }, [getHistorySearch]);
  const handleSearchCity = async () => {
    if (!searchValue.trim()) {
      return;
    }
    setLimitDays(limitDaysForecast);
    getWeatherInfo(searchValue);
  };
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
    const newLimitDayForecast = limitDays + 4;
    try {
      const response = await apiGetWeatherForecastByCity(
        "Vietnam" || searchValue,
        newLimitDayForecast
      );
      if (response.status === 200) {
        const hourAtNow = new Date().getHours();
        const { data: weatherForecast } = response;
        const newForecastData = weatherForecast?.forecast?.forecastday
          ?.slice(limitDays)
          .flatMap((day) =>
            day?.hour
              ?.filter(
                (weather) => new Date(weather?.time).getHours() === hourAtNow
              )
              ?.map((weather) => ({
                localTime: weather?.time?.split(" ")[0],
                icon: weather?.condition?.icon,
                temp: weather?.temp_c,
                wind: weather?.wind_mph,
                humidity: weather?.humidity,
              }))
          );
        setWeatherForecastData((prev) => [...prev, ...newForecastData]);
        setLimitDays(newLimitDayForecast);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <div className={cx("weather-dashboard")}>
      <h1 className={cx("weather-title")}>History Weather Search</h1>
      <div className={cx("weather-container")}>
        <form action="" className={cx("weather-form")}>
          <CustomSelect
            label={"History search"}
            value={searchValue}
            setValue={setSearchValue}
            keywords={searchKeywords}
          />
          <CustomBtn title="Search" onClick={handleSearchCity} />
          <div className={cx("separator")}></div>
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
            <CustomBtn title="Load more" onClick={handleLoadMore} />
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherHistorySearch;
