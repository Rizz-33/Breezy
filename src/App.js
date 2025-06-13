// src/App.js
import "./App.css";
import CurrentWeather from "./components/CurrentWeather";
import ErrorBoundary from "./components/ErrorBoundary";
import Forecast from "./components/Forecast";
import LoadingSpinner from "./components/LoadingSpinner";
import SearchBar from "./components/SearchBar";
import ThemeToggle from "./components/ThemeToggle";
import { useWeather, WeatherProvider } from "./contexts/WeatherContext";

const WeatherApp = () => {
  const { loading, error, theme } = useWeather();

  return (
    <ErrorBoundary>
      <div className="app-container">
        <nav className="navbar">
          <div className="navbar-content">
            <img
              src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
              alt="Logo"
              className="h-12 w-auto"
            />
            <div className="navbar-actions">
              <SearchBar />
              <ThemeToggle />
            </div>
          </div>
        </nav>

        <main className="weather-display">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="error-display">{error}</div>
          ) : (
            <>
              <div className="current-weather-container">
                <CurrentWeather />
              </div>
              <div className="forecast-container">
                <Forecast />
              </div>
            </>
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
};

const App = () => (
  <WeatherProvider>
    <WeatherApp />
  </WeatherProvider>
);

export default App;
