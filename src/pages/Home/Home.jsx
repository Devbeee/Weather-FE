import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import className from "classnames/bind";
import style from "./Home.module.scss";
import search from "~/assets/icons/search.svg";
import { BackgroundImage, WeatherCard, WeatherMiniCard } from "~/components";
import { fetchWeatherData } from "~/store/slices/weather.slice";

const cx = className.bind(style);
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { weatherCurrentData, weatherForecastData } = useSelector(
    (state) => state.weather
  );
  const getWeatherInfo = useCallback(
    (searchValue, limit = 14) => {
      dispatch(fetchWeatherData({ searchValue, limit }));
    },
    [dispatch]
  );

  useEffect(() => {
    getWeatherInfo("Vietnam");
  }, [getWeatherInfo]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

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
            weatherForecastData
              ?.slice(0, 6)
              ?.map((weather, index) => (
                <WeatherMiniCard key={index} weather={weather} />
              ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
