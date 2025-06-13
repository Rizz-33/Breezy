// src/components/Forecast.js
import { motion } from "framer-motion";
import {
  WiCloudy,
  WiDayCloudy,
  WiDaySunny,
  WiFog,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";
import { useWeather } from "../contexts/WeatherContext";

const Forecast = () => {
  const { forecastData, unit } = useWeather();

  if (!forecastData) return null;

  const { forecast } = forecastData;

  const getDayIcon = (code) => {
    if (code === 1000)
      return <WiDaySunny className="text-yellow-500" size={32} />;
    if (code === 1003 || code === 1006 || code === 1009)
      return <WiDayCloudy className="text-gray-500" size={32} />;
    if (code === 1030 || code === 1135 || code === 1147)
      return <WiFog className="text-gray-400" size={32} />;
    if (code >= 1063 && code <= 1201)
      return <WiRain className="text-blue-500" size={32} />;
    if (code >= 1204 && code <= 1237)
      return <WiSnow className="text-blue-200" size={32} />;
    if (code >= 1240 && code <= 1264)
      return <WiRain className="text-blue-500" size={32} />;
    if (code >= 1273 && code <= 1282)
      return <WiThunderstorm className="text-purple-600" size={32} />;
    return <WiCloudy className="text-gray-500" size={32} />;
  };

  const formatDay = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  return (
    <motion.div
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-lg p-4 sm:p-6 w-full max-w-3xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
    >
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
        5-Day Forecast
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {forecast.forecastday.map((day, index) => (
          <motion.div
            key={day.date}
            className="bg-white/95 dark:bg-gray-700/95 rounded-lg p-3 shadow-sm flex flex-col items-center hover:shadow-md transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <p className="font-semibold text-gray-700 dark:text-gray-200 text-sm">
              {index === 0 ? "Today" : formatDay(day.date)}
            </p>
            <div className="my-3">{getDayIcon(day.day.condition.code)}</div>
            <div className="flex items-center justify-center gap-2 w-full">
              <span className="font-bold text-gray-800 dark:text-white">
                {Math.round(
                  unit === "celsius" ? day.day.maxtemp_c : day.day.maxtemp_f
                )}
                °
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                {Math.round(
                  unit === "celsius" ? day.day.mintemp_c : day.day.mintemp_f
                )}
                °
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center capitalize">
              {day.day.condition.text}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Forecast;
