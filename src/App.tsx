import React from "react";
import { motion } from "framer-motion";
import {
  SearchBar,
  Forecast,
  ErrorMessage,
  CurrentWeather,
} from "./components";
import { Sun, CloudRain, Wind, Cloud } from "lucide-react";
import UnitToggleButton from "./components/UnitToogle";
import { LoadingIndicator } from "./components/Loading";
import { useWeather } from "./hooks/useWeather";

const WeatherApp: React.FC = () => {
  const {
    error,
    loading,
    forecast,
    fetchWeather,
    setCity,
    setUnit,
    currentWeather,
    unit,
  } = useWeather();
  const handleSearch = (searchCity: string) => {
    if (searchCity.trim()) {
      setCity(searchCity);
      fetchWeather(searchCity);
    }
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
    if (currentWeather) {
      fetchWeather(currentWeather.name);
    }
  };

  const getWeatherIcon = (description: string) => {
    const iconProps = { className: "w-20 h-20 text-white" };
    if (description.includes("rain")) return <CloudRain {...iconProps} />;
    if (description.includes("cloud")) return <Cloud {...iconProps} />;
    if (description.includes("wind")) return <Wind {...iconProps} />;
    return <Sun {...iconProps} />;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-4 sm:p-8 flex items-center justify-center"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <h1 className="text-5xl sm:text-6xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-200">
          Weather Forecast
        </h1>
        <SearchBar onSearch={handleSearch} />
        <UnitToggleButton unit={unit} onToggle={toggleUnit} />
        <LoadingIndicator loading={loading} />
        <ErrorMessage error={error} />
        <CurrentWeather
          weather={currentWeather}
          unit={unit}
          getWeatherIcon={getWeatherIcon}
        />
        {forecast && <Forecast data={forecast} unit={unit} />}
      </motion.div>
    </motion.div>
  );
};

export default WeatherApp;
