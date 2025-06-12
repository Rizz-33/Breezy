import { FiSun } from "react-icons/fi";
import {
  WiCloudy,
  WiDayCloudy,
  WiDaySunny,
  WiHumidity,
  WiRain,
  WiStrongWind,
} from "react-icons/wi";

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  const { current, location } = weatherData;

  const getWeatherIcon = () => {
    const condition = current.condition.text.toLowerCase();
    if (condition.includes("rain")) return <WiRain size={64} />;
    if (condition.includes("cloud")) return <WiCloudy size={64} />;
    if (condition.includes("sunny") || condition.includes("clear"))
      return <WiDaySunny size={64} />;
    return <WiDayCloudy size={64} />;
  };

  return (
    <div className="weather-card">
      <h2>
        Weather in {location.name}, {location.country}
      </h2>
      <div className="weather-main">
        {getWeatherIcon()}
        <div className="weather-temp">{current.temp_c}°C</div>
      </div>
      <div className="weather-details">
        <div className="weather-detail">
          <WiHumidity size={24} />
          <span>Humidity: {current.humidity}%</span>
        </div>
        <div className="weather-detail">
          <WiStrongWind size={24} />
          <span>Wind: {current.wind_kph} km/h</span>
        </div>
        <div className="weather-detail">
          <FiSun size={24} />
          <span>UV Index: {current.uv}</span>
        </div>
      </div>
      <p className="weather-condition">{current.condition.text}</p>
    </div>
  );
};

export default WeatherCard;
