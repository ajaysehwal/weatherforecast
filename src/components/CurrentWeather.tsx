import { AnimatePresence, motion } from "framer-motion";
import { TemperatureUnit, WeatherData } from "../types";
import { Droplets, Thermometer, Wind } from "lucide-react";

export const CurrentWeather: React.FC<{
  weather: WeatherData | null;
  unit: TemperatureUnit;
  getWeatherIcon: (description: string) => JSX.Element;
}> = ({ weather, unit, getWeatherIcon }) => (
  <AnimatePresence>
    {weather && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl p-8 sm:p-10 mb-8 shadow-xl"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl font-bold mb-6"
        >
          {weather.name}
        </motion.h2>
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 sm:mb-0"
          >
            <p className="text-6xl sm:text-7xl font-bold">
              {Math.round(weather.main.temp)}°{unit === "metric" ? "C" : "F"}
            </p>
            <p className="text-2xl sm:text-3xl capitalize mt-2">
              {weather.weather[0].description}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            {getWeatherIcon(weather.weather[0].description)}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          <WeatherDetail
            icon={<Droplets className="w-8 h-8 mr-3" />}
            label="Humidity"
            value={`${weather.main.humidity}%`}
          />
          <WeatherDetail
            icon={<Wind className="w-8 h-8 mr-3" />}
            label="Wind"
            value={`${weather.wind.speed} ${unit === "metric" ? "m/s" : "mph"}`}
          />
          <WeatherDetail
            icon={<Thermometer className="w-8 h-8 mr-3" />}
            label="Feels Like"
            value={`${Math.round(weather.main.feels_like)}°${
              unit === "metric" ? "C" : "F"
            }`}
          />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const WeatherDetail: React.FC<{
  icon: JSX.Element;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex items-center bg-white bg-opacity-10 rounded-2xl p-4"
  >
    {icon}
    <div>
      <p className="text-sm font-semibold">{label}</p>
      <p className="text-lg">{value}</p>
    </div>
  </motion.div>
);
