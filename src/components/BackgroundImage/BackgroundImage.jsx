import React, { useEffect, useState } from "react";
import className from "classnames/bind";
import style from "./BackgroundImage.module.scss";
import Clear from "~/assets/images/Clear.jpg";
import Fog from "~/assets/images/fog.png";
import Cloudy from "~/assets/images/Cloudy.jpg";
import Rainy from "~/assets/images/Rainy.jpg";
import Snow from "~/assets/images/snow.jpg";
import Stormy from "~/assets/images/Stormy.jpg";
const cx = className.bind(style);
const BackgroundImage = ({ condition }) => {
  const [image, setImage] = useState(Clear);

  useEffect(() => {
    if (condition) {
      let imageString = condition;
      if (imageString.toLowerCase().includes("clear")) {
        setImage(Clear);
      } else if (imageString.toLowerCase().includes("cloud")) {
        setImage(Cloudy);
      } else if (
        imageString.toLowerCase().includes("rain") ||
        imageString.toLowerCase().includes("shower")
      ) {
        setImage(Rainy);
      } else if (imageString.toLowerCase().includes("snow")) {
        setImage(Snow);
      } else if (imageString.toLowerCase().includes("fog")) {
        setImage(Fog);
      } else if (
        imageString.toLowerCase().includes("thunder") ||
        imageString.toLowerCase().includes("storm")
      ) {
        setImage(Stormy);
      }
    }
  }, [condition]);

  return <img src={image} alt="weather_image" className={cx("bg-img")} />;
};

export default BackgroundImage;
