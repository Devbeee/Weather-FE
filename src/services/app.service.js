import axios from "axios";
import { baseUrl, apiKey } from "~/utils/constant";
export const apiGetWeatherByCity = async (searchValue) => {
  try {
    const response = await axios.get(`${baseUrl}/current.json`, {
      params: {
        key: apiKey,
        q: searchValue,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const apiGetWeatherForecastByCity = async (searchValue,limitDayForecast) => {
  try {
    const response = await axios.get(`${baseUrl}/forecast.json`, {
      params: {
        key: apiKey,
        q: searchValue,
        days: +limitDayForecast,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
