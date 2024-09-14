import React from "react";
import { motion } from "framer-motion";
import { Sun, Snowflake } from "lucide-react";
import { TemperatureUnit } from "../types";

const UnitToggleButton: React.FC<{
  unit: TemperatureUnit;
  onToggle: () => void;
}> = ({ unit, onToggle }) => {
  const isMetric = unit === "metric";

  return (
    <motion.div
      className="flex justify-center mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    >
      <motion.button
        onClick={onToggle}
        className="relative w-24 h-12 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-full p-1 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center"
          initial={false}
          animate={{ x: isMetric ? 0 : 48 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {isMetric ? (
            <Sun className="w-6 h-6 text-yellow-500" />
          ) : (
            <Snowflake className="w-6 h-6 text-blue-500" />
          )}
        </motion.div>
        <div className="flex justify-between items-center h-full px-2">
          <span
            className={`text-sm font-medium ${
              isMetric ? "text-white" : "text-gray-400"
            }`}
          >
            °C
          </span>
          <span
            className={`text-sm font-medium ${
              !isMetric ? "text-white" : "text-gray-400"
            }`}
          >
            °F
          </span>
        </div>
      </motion.button>
    </motion.div>
  );
};

export default UnitToggleButton;
