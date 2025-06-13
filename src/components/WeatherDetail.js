// src/components/WeatherDetail.js
import { motion } from "framer-motion";
import { memo } from "react";

const WeatherDetail = ({ icon, title, value, extra }) => {
  return (
    <motion.div
      className="weather-detail"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="detail-icon">{icon}</div>
      <div className="detail-content">
        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-300">
          {title}
        </h4>
        <p className="font-semibold text-gray-700 dark:text-gray-100">
          {value}
        </p>
        {extra && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{extra}</p>
        )}
      </div>
    </motion.div>
  );
};

export default memo(WeatherDetail);
