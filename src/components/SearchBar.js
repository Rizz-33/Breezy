// SearchBar.js
import { motion } from "framer-motion";
import { useState } from "react";
import { FiNavigation, FiSearch } from "react-icons/fi";
import { useWeather } from "../contexts/WeatherContext";
import useGeolocation from "../hooks/useGeolocation";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { fetchWeather } = useWeather();
  const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
    useGeolocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchWeather(query);
      setQuery("");
    }
  };

  const handleGeolocation = () => {
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      fetchWeather(`${coords.latitude},${coords.longitude}`);
    } else {
      getPosition();
      if (coords) {
        fetchWeather(`${coords.latitude},${coords.longitude}`);
      }
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="search-bar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="search-input-container">
        <FiSearch className="search-icon" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="search-input"
          aria-label="Search for a city"
        />
        <button
          type="button"
          className="location-button"
          onClick={handleGeolocation}
          disabled={!isGeolocationAvailable}
          title={
            !isGeolocationAvailable
              ? "Geolocation not available"
              : "Use my location"
          }
          aria-label="Use my location"
        >
          <FiNavigation />
        </button>
      </div>
      <button type="submit" className="search-button">
        Search
      </button>
    </motion.form>
  );
};

export default SearchBar;
