import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import className from "classnames/bind";
import style from "./WeatherSubcribe.module.scss";
import { emailRegex } from "~/utils/constant";
import {
  apiContactRegister,
  apiContactUnsubcribe,
} from "~/services/contact.service";
import { CustomBtn } from "~/components";

const cx = className.bind(style);

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(emailRegex, "Email is invalid"),
  place: yup.string().required("Place is required"),
});

const WeatherSubcribe = () => {
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const formValues = watch();
  const onSubmit = async (data) => {
    const { email, place } = data;
    const response = await apiContactRegister({ email, place });

    if (response?.data?.err === 0) {
      Swal.fire({
        title: "Register successfully",
        text: "Please check and confirm your email",
        icon: "success",
      }).then(() => {
        reset();
        navigate("/");
      });
    }
  };

  const onUnsubcribe = async () => {
    const { email } = formValues;
    const response = await apiContactUnsubcribe({ email });

    if (response?.data?.err === 0) {
      Swal.fire({
        title: "Unsubscribe successfully",
        text: "See you soon",
        icon: "success",
      }).then(() => {
        reset();
        navigate("/");
      });
    }
    else {
      Swal.fire({
        title: "Unsubscribe failed",
        text: "Your email has not been registerd",
        icon: "error",
      })
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("left")}>
        <div className={cx("header")}>
          <h2 className={cx("animation", "a1")}>
            Register to receive daily weather forecast information via email or
            Unsubscribe
          </h2>
          <h4 className={cx("animation", "a2")}>Please type your email</h4>
        </div>
        <form className={cx("form")} onSubmit={handleSubmit(onSubmit)}>
          <div className={cx("form-control")}>
            <input
              type="email"
              className={cx("form-field", "animation", "a3")}
              placeholder="Email Address"
              {...register("email")}
            />
            {errors.email && (
              <p className={cx("error-txt")}>{errors.email.message}</p>
            )}
          </div>
          <div className={cx("form-control")}>
            <input
              type="text"
              className={cx("form-field", "animation", "a3")}
              placeholder="Place"
              {...register("place")}
            />
            {errors.place && (
              <p className={cx("error-txt")}>{errors.place.message}</p>
            )}
          </div>
          <div className={cx("flex-btn")}>
            <button
              type="submit"
              className={cx("animation", "register-btn", "a6")}
            >
              REGISTER
            </button>
            <button
              type="button"
              onClick={handleSubmit(onUnsubcribe)}
              className={cx("animation", "unsubcribe-btn", "a6")}
            >
              UNSUBSCRIBE
            </button>
          </div>
          <CustomBtn
            title="Go home"
            className={"home-btn"}
            onClick={() => navigate("/")}
          />
        </form>
      </div>
      <div className={cx("right")}></div>
    </div>
  );
};

export default WeatherSubcribe;
