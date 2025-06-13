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
  const { loading, error } = useWeather();

  return (
    <ErrorBoundary>
      <div className="app-container">
        <header className="header flex justify-between items-center px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <h1 className="app-title">WeatherSphere</h1>
          <ThemeToggle />
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-4 overflow-y-auto">
          <SearchBar />
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="error-display">{error}</div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center space-y-6">
              <CurrentWeather />
              <Forecast />
            </div>
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
