import React, { useCallback, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import className from "classnames/bind";
import style from "./Home.module.scss";
import search from "~/assets/icons/search.svg";
import {
  apiGetWeatherByCity,
  apiGetWeatherForecastByCity,
} from "~/services";
import {
  BackgroundImage,
  WeatherCard,
  WeatherMiniCard,
} from "~/components";
const cx = className.bind(style);
const Home = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [weatherCurrentData, setWeatherCurrentData] = useState({});
  const [weatherForecastData, setWeatherForecastData] = useState([]);

  const getWeatherInfo = useCallback(async (searchValue) => {
    const hourAtNow = new Date().getHours();
    setWeatherForecastData([]);
    try {
      const [response1, response2] = await Promise.all([
        apiGetWeatherByCity(searchValue),
        apiGetWeatherForecastByCity(searchValue, 7),
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
          heat: weatherCurrent?.current?.heatindex_c,
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
              }))
          );
        setWeatherForecastData(newForecastData);
      }
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  }, []);
  useEffect(() => {
    getWeatherInfo("Vietnam");
  }, [getWeatherInfo]);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  const handleSearch = () => {
    if (!searchValue.trim()) {
      return;
    }
    navigate("/dashboard", {
      state: { searchValue },
    });
  };
  const handleOverlayClick = () => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 500);
    return () => {
      clearInterval(timer);
    };
  };
  return (
    <div className={cx("container")}>
      <nav className={cx("nav")}>
        <div className={cx("modal", isOpen && "show")}>
          <div
            className={cx("modal-overlay")}
            onClick={handleOverlayClick}
          ></div>
          <ul className={cx("nav-menu", isOpen ? "open" : "close")}>
            <li className={cx("nav-item")}>
              <Link to="/">Home</Link>
            </li>
            <li className={cx("nav-item")}>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className={cx("nav-item")}>
              <Link to="/contact">Contact</Link>
            </li>
            <li className={cx("nav-item")}>
              <Link to="/history">History</Link>
            </li>
          </ul>
        </div>

        <div className={cx("menu")} onClick={toggleMenu}>
          <RxHamburgerMenu className={cx("icon")} />
        </div>
        <h1 className={cx("title")}>Weather App</h1>
        <ul className={cx("nav-list")}>
          <li className={cx("nav-item")}>
            <Link to="/">Home</Link>
          </li>
          <li className={cx("nav-item")}>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className={cx("nav-item")}>
            <Link to="/contact">Contact</Link>
          </li>
          <li className={cx("nav-item")}>
            <Link to="/history">History</Link>
          </li>
        </ul>
        <div className={cx("search")}>
          <button
            className={cx("btn-search")}
            onClick={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <img src={search} alt="" className={cx("img")} />
          </button>
          <input
            type="text"
            alt="search"
            className={cx("input")}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Type city name..."
          />
        </div>
      </nav>
      <BackgroundImage condition={weatherCurrentData?.text} />
      <main className={cx("main")}>
        <WeatherCard weatherCurrentData={weatherCurrentData} />
        <div className={cx("list")}>
          {weatherForecastData?.length > 0 &&
            weatherForecastData?.map((weather, index) => (
              <WeatherMiniCard key={index} weather={weather} />
            ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
