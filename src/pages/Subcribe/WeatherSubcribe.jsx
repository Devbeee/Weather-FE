import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import className from "classnames/bind";
import style from "./WeatherSubcribe.module.scss";
import Swal from "sweetalert2";
import { emailRegex } from "~/utils/constant";
import {
  apiContactRegister,
  apiContactUnsubcribe,
} from "~/services/contact.service";
import { CustomBtn } from "~/components";
const cx = className.bind(style);

const WeatherSubcribe = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [place, setPlace] = useState("");
  const [error, setError] = useState({
    email: "",
    place: "",
  });
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email.trim() || !place.trim()) {
      setError((prev) => ({
        ...prev,
        email: !email.trim() ? "Email is required" : "",
        place: !place.trim() ? "Place is required" : "",
      }));
    } else if (!emailRegex.test(email)) {
      setError((prev) => ({
        ...prev,
        email: "Email is required",
      }));
    } else {
      const response = await apiContactRegister({ email, place });

      if (response?.data?.err === 0)
        Swal.fire({
          title: "Register successfully",
          text: "Please check and confirm your email",
          icon: "success",
        }).then(() => {
          setEmail("");
          navigate("/");
        });
    }
  };
  const handleUnsubcribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
    } else if (!emailRegex.test(email)) {
      setError("Email is invalid");
    } else {
      const response = await apiContactUnsubcribe({ email });

      if (response?.data?.err === 0)
        Swal.fire({
          title: "Unsubcribe successfully",
          text: "See you soon",
          icon: "success",
        }).then(() => {
          setEmail("");
          navigate("/");
        });
    }
  };
  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <div className={cx("container")}>
      <div className={cx("left")}>
        <div className={cx("header")}>
          <h2 className={cx("animation", "a1")}>
            Register to receive daily weather forecast information via email
            address or Unsubscribe
          </h2>
          <h4 className={cx("animation", "a2")}>Please type your email</h4>
        </div>
        <div className={cx("form")}>
          <div className={cx("form-control")}>
            <input
              type="email"
              className={cx("form-field", "animation", "a3")}
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() =>
                setError({
                  email: "",
                  place: "",
                })
              }
            />

            {error.email && <p className={cx("error-txt")}>{error.email}</p>}
          </div>
          <div className={cx("form-control")}>
            <input
              type="text"
              className={cx("form-field", "animation", "a3")}
              placeholder="Place"
              required
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              onFocus={() =>
                setError({
                  email: "",
                  place: "",
                })
              }
            />

            {error.place && <p className={cx("error-txt")}>{error.place}</p>}
          </div>
          <div className={cx("flex-btn")}>
            <button
              onClick={handleRegister}
              className={cx("animation", "register-btn", "a6")}
            >
              REGISTER
            </button>
            <button
              onClick={handleUnsubcribe}
              className={cx("animation", "unsubcribe-btn", "a6")}
            >
              UNSUBCRIBE
            </button>
          </div>
          <CustomBtn
            title="Go home"
            className={"home-btn"}
            onClick={handleGoHome}
          />
        </div>
      </div>
      <div className={cx("right")}></div>
    </div>
  );
};

export default WeatherSubcribe;
