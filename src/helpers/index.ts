import axios from "axios";
import { ForecastData, TemperatureUnit, WeatherData } from "../types";
import { BASE_URL } from "../constants";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getWeatherData = (cityName: string, unit: TemperatureUnit) => {
  return axios.get<WeatherData>(
    `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=${unit}`
  );
};
export const getForecastData = (cityName: string, unit: TemperatureUnit) => {
  return axios.get<ForecastData>(
    `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=${unit}`
  );
};

export const getWeatherByCoordinates = (
  lat: number,
  lon: number,
  unit: TemperatureUnit
) => {
  return axios.get<WeatherData>(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
  );
};
