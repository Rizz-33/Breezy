import { AnimatePresence, motion } from "framer-motion";
import { FiDroplet, FiEye, FiSun } from "react-icons/fi";
import {
  WiBarometer,
  WiCloudy,
  WiDayCloudy,
  WiDaySunny,
  WiFog,
  WiHumidity,
  WiNightClear,
  WiRain,
  WiSnow,
  WiStrongWind,
  WiThunderstorm,
} from "react-icons/wi";
import { useWeather } from "../contexts/WeatherContext";
import "../styles/CurrentWeather.css";
import WeatherDetail from "./WeatherDetail";

// Animation components
const RainAnimation = () => (
  <div className="rain-container absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        className="raindrop absolute bg-blue-300 rounded-full"
        initial={{ y: -10, opacity: 0 }}
        animate={{
          y: [0, 100],
          opacity: [0.8, 0],
          x: Math.sin(i * 0.5) * 5,
        }}
        transition={{
          duration: Math.random() * 0.5 + 0.5,
          repeat: Infinity,
          delay: Math.random() * 2,
          ease: "linear",
        }}
        style={{
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 10 + 5}px`,
        }}
      />
    ))}
  </div>
);

const SnowAnimation = () => (
  <div className="snow-container absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="snowflake absolute bg-white rounded-full"
        initial={{ y: -10, opacity: 0 }}
        animate={{
          y: [0, 100],
          opacity: [0.8, 0],
          x: Math.sin(i * 0.5) * 10,
          rotate: 360,
        }}
        transition={{
          duration: Math.random() * 5 + 5,
          repeat: Infinity,
          delay: Math.random() * 5,
          ease: "linear",
        }}
        style={{
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 5 + 2}px`,
          height: `${Math.random() * 5 + 2}px`,
        }}
      />
    ))}
  </div>
);

const FogAnimation = () => (
  <div className="fog-container absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="fog-layer absolute bg-gray-200 opacity-20 h-full"
        initial={{ x: -100, opacity: 0 }}
        animate={{
          x: [0, 100],
          opacity: [0.2, 0],
        }}
        transition={{
          duration: Math.random() * 30 + 30,
          repeat: Infinity,
          delay: Math.random() * 20,
          ease: "linear",
        }}
        style={{
          width: `${Math.random() * 100 + 50}%`,
          filter: "blur(10px)",
        }}
      />
    ))}
  </div>
);

const CurrentWeather = () => {
  const { weatherData, unit } = useWeather();

  if (!weatherData) return null;

  const { current, location } = weatherData;

  const getWeatherIcon = () => {
    const code = current.condition.code;
    const isDay = current.is_day === 1;

    if (code === 1000)
      return isDay ? (
        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
          }}
        >
          <WiDaySunny size={80} />
        </motion.div>
      ) : (
        <WiNightClear size={80} />
      );
    if (code === 1003 || code === 1006 || code === 1009)
      return (
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
        >
          <WiDayCloudy size={80} />
        </motion.div>
      );
    if (code === 1030 || code === 1135 || code === 1147)
      return <WiFog size={80} />;
    if (code >= 1063 && code <= 1201) return <WiRain size={80} />;
    if (code >= 1204 && code <= 1237) return <WiSnow size={80} />;
    if (code >= 1240 && code <= 1264) return <WiRain size={80} />;
    if (code >= 1273 && code <= 1282) return <WiThunderstorm size={80} />;
    return <WiCloudy size={80} />;
  };

  const getWeatherAnimation = () => {
    const code = current.condition.code;

    if (code >= 1063 && code <= 1264) return <RainAnimation />;
    if (code >= 1204 && code <= 1237) return <SnowAnimation />;
    if (code === 1030 || code === 1135 || code === 1147)
      return <FogAnimation />;
    return null;
  };

  const temp = unit === "celsius" ? current.temp_c : current.temp_f;
  const feelsLike =
    unit === "celsius" ? current.feelslike_c : current.feelslike_f;

  return (
    <motion.div
      className="current-weather relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Weather condition animations */}
      <AnimatePresence>{getWeatherAnimation()}</AnimatePresence>

      <div className="location relative z-10">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {location.name}, {location.country}
        </motion.h2>
        <motion.p
          className="last-updated"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Updated: {new Date(current.last_updated).toLocaleTimeString()}
        </motion.p>
      </div>

      <div className="weather-main relative z-10">
        <motion.div
          className="weather-icon"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {getWeatherIcon()}
          <motion.p
            className="condition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {current.condition.text}
          </motion.p>
        </motion.div>

        <motion.div
          className="temperature"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="temp-value">{Math.round(temp)}</span>
          <span className="temp-unit">°{unit === "celsius" ? "C" : "F"}</span>
          <motion.p
            className="feels-like"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Feels like: {Math.round(feelsLike)}°{unit === "celsius" ? "C" : "F"}
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="weather-details-grid relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <WeatherDetail
          icon={<WiHumidity size={24} />}
          title="Humidity"
          value={`${current.humidity}%`}
        />
        <WeatherDetail
          icon={<WiStrongWind size={24} />}
          title="Wind"
          value={`${current.wind_kph} km/h`}
          extra={`${current.wind_dir}`}
        />
        <WeatherDetail
          icon={<FiSun size={24} />}
          title="UV Index"
          value={current.uv}
          extra={getUVIndexLevel(current.uv)}
        />
        <WeatherDetail
          icon={<WiBarometer size={24} />}
          title="Pressure"
          value={`${current.pressure_mb} mb`}
        />
        <WeatherDetail
          icon={<FiDroplet size={24} />}
          title="Precipitation"
          value={`${current.precip_mm} mm`}
        />
        <WeatherDetail
          icon={<FiEye size={24} />}
          title="Visibility"
          value={`${current.vis_km} km`}
        />
      </motion.div>
    </motion.div>
  );
};

const getUVIndexLevel = (uv) => {
  if (uv <= 2) return "Low";
  if (uv <= 5) return "Moderate";
  if (uv <= 7) return "High";
  if (uv <= 10) return "Very High";
  return "Extreme";
};

export default CurrentWeather;
