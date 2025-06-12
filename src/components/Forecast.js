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
    if (code === 1000) return <WiDaySunny size={30} />;
    if (code === 1003 || code === 1006 || code === 1009)
      return <WiDayCloudy size={30} />;
    if (code === 1030 || code === 1135 || code === 1147)
      return <WiFog size={30} />;
    if (code >= 1063 && code <= 1201) return <WiRain size={30} />;
    if (code >= 1204 && code <= 1237) return <WiSnow size={30} />;
    if (code >= 1240 && code <= 1264) return <WiRain size={30} />;
    if (code >= 1273 && code <= 1282) return <WiThunderstorm size={30} />;
    return <WiCloudy size={30} />;
  };

  const formatDay = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  return (
    <motion.div
      className="forecast"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <h3>5-Day Forecast</h3>
      <div className="forecast-days">
        {forecast.forecastday.map((day, index) => (
          <motion.div
            key={day.date}
            className="forecast-day"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="day">{index === 0 ? "Today" : formatDay(day.date)}</p>
            <div className="day-icon">{getDayIcon(day.day.condition.code)}</div>
            <div className="day-temps">
              <span className="max-temp">
                {Math.round(
                  unit === "celsius" ? day.day.maxtemp_c : day.day.maxtemp_f
                )}
                °
              </span>
              <span className="min-temp">
                {Math.round(
                  unit === "celsius" ? day.day.mintemp_c : day.day.mintemp_f
                )}
                °
              </span>
            </div>
            <p className="day-condition">{day.day.condition.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Forecast;
