import { useEffect, useState, useCallback } from "react";
import { ForecastData, TemperatureUnit, WeatherData } from "../types";
import {
  getWeatherData,
  getForecastData,
  getWeatherByCoordinates,
} from "../helpers";
import { LOCAL_STORAGE_CITY_KEY } from "../constants";

export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null
  );
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<TemperatureUnit>("metric");
  const [, setCity] = useState<string>("");

  const saveCityToLocalStorage = useCallback((cityName: string) => {
    localStorage.setItem(LOCAL_STORAGE_CITY_KEY, cityName);
  }, []);

  const loadLastCityFromLocalStorage = useCallback(() => {
    return localStorage.getItem(LOCAL_STORAGE_CITY_KEY);
  }, []);
  const fetchWeather = useCallback(
    async (cityName: string) => {
      setLoading(true);
      setError(null);

      try {
        const [currentRes, forecastRes] = await Promise.all([
          getWeatherData(cityName, unit),
          getForecastData(cityName, unit),
        ]);
        setCurrentWeather(currentRes.data);
        setForecast(forecastRes.data);
        saveCityToLocalStorage(cityName);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch weather data. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [unit, saveCityToLocalStorage]
  );

  const getLocationWeather = useCallback(
    async (lat: number, lon: number) => {
      setLoading(true);
      setError(null);

      try {
        const weatherRes = await getWeatherByCoordinates(lat, lon, unit);
        setCurrentWeather(weatherRes.data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch weather data for your location.");
      } finally {
        setLoading(false);
      }
    },
    [unit]
  );

  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getLocationWeather(latitude, longitude);
        },
        (error) => {
          setError("Failed to retrieve your location.");
          console.error("Geolocation error:", error);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, [getLocationWeather]);

  useEffect(() => {
    const lastCity = loadLastCityFromLocalStorage();
    if (lastCity) {
      setCity(lastCity);
      fetchWeather(lastCity);
    } else {
      getCurrentLocation();
    }
  }, [unit, loadLastCityFromLocalStorage, fetchWeather, getCurrentLocation]);

  return {
    currentWeather,
    forecast,
    loading,
    error,
    setUnit,
    setCity,
    unit,
    fetchWeather,
    getLocationWeather,
  };
};
