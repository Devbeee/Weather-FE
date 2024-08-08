import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetWeatherByCity, apiGetWeatherForecastByCity } from "~/services";

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async ({ searchValue, limit }) => { 
    const hourAtNow = new Date().getHours();
    const [response1, response2] = await Promise.all([
      apiGetWeatherByCity(searchValue),
      apiGetWeatherForecastByCity(searchValue, limit),
    ]);

    if (response1.status === 200 && response2.status === 200) {
      const { data: weatherCurrent } = response1;
      const { data: weatherForecast } = response2;

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

      return {
        weatherCurrentData: {
          cityName: weatherCurrent?.location?.name,
          localTime: weatherCurrent?.location?.localtime?.split(" ")[0],
          temp: weatherCurrent?.current?.temp_c,
          wind: weatherCurrent?.current?.wind_mph,
          humidity: weatherCurrent?.current?.humidity,
          heat: weatherCurrent?.current?.heatindex_c,
          text: weatherCurrent?.current?.condition?.text,
          icon: weatherCurrent?.current?.condition?.icon,
        },
        weatherForecastData: newForecastData,
      };
    }
   console.log("Failed to fetch weather data");
  }
);
const initialState = {
  weatherCurrentData: {},
  weatherForecastData: [],
  status: "",
  error: null,
};
const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.weatherCurrentData = action.payload.weatherCurrentData;
        state.weatherForecastData = action.payload.weatherForecastData;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
