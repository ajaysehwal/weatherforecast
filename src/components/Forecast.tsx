import React from "react";
import { motion } from "framer-motion";
import { ForecastData, TemperatureUnit } from "../types";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  Wind,
  Thermometer,
} from "lucide-react";

interface ForecastProps {
  data: ForecastData;
  unit: TemperatureUnit;
}

export const Forecast: React.FC<ForecastProps> = ({ data, unit }) => {
  const dailyForecast = data.list.filter((_, index) => index % 8 === 0);

  const getWeatherIcon = (description: string) => {
    const iconProps = { className: "w-12 h-12 mx-auto" };

    if (description.includes("thunderstorm"))
      return <CloudLightning {...iconProps} color="#F9D71C" />;
    if (description.includes("drizzle"))
      return <CloudDrizzle {...iconProps} color="#AEC5EB" />;
    if (description.includes("rain"))
      return <CloudRain {...iconProps} color="#4B8BDD" />;
    if (description.includes("snow"))
      return <CloudSnow {...iconProps} color="#E3E3E3" />;
    if (description.includes("wind"))
      return <Wind {...iconProps} color="#B7B9BB" />;
    if (description.includes("clear"))
      return <Sun {...iconProps} color="#FFD700" />;
    if (description.includes("cloud"))
      return <Cloud {...iconProps} color="#A4A7AB" />;

    return <Cloud {...iconProps} color="#A4A7AB" />;
  };

  return (
    <motion.div
      className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-6 sm:p-8 shadow-xl"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl sm:text-3xl font-semibold mb-6">
        5-Day Forecast
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
        {dailyForecast.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white bg-opacity-30 p-4 sm:p-6 rounded-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="font-semibold text-base sm:text-lg mb-2">
              {new Date(item.dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            {getWeatherIcon(item.weather[0].description)}
            <p className="text-2xl sm:text-3xl font-bold my-2 sm:my-3">
              {Math.round(item.main.temp)}°{unit === "metric" ? "C" : "F"}
            </p>
            <p className="capitalize text-xs sm:text-sm">
              {item.weather[0].description}
            </p>
            <div className="flex justify-between items-center mt-2 text-xs sm:text-sm">
              <div className="flex items-center">
                <Thermometer className="w-4 h-4 mr-1" />
                <span>{Math.round(item.main.temp_min)}°</span>
              </div>
              <div className="flex items-center">
                <Thermometer className="w-4 h-4 mr-1" />
                <span>{Math.round(item.main.temp_max)}°</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
