import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { getCurrentWeather } from "./services/WeatherAPI";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getCurrentWeather(
          process.env.REACT_APP_DEFAULT_CITY
        );
        setWeatherData(data);
      } catch (err) {
        setError("Failed to fetch weather data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <div className="loading">Loading weather data...</div>;
  if (error) return <div className="error">{error}</div>;

  // Add this function to App.js
  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCurrentWeather(city);
      setWeatherData(data);
    } catch (err) {
      setError("City not found. Please try another location.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Simple Weather Reporter</h1>
      <WeatherCard weatherData={weatherData} />
      <SearchBar onSearch={handleSearch} />;
    </div>
  );
}

export default App;
