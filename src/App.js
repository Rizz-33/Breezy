import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import LoadingSpinner from "./components/LoadingSpinner";
import SearchBar from "./components/SearchBar";
import ThemeToggle from "./components/ThemeToggle";
import { useWeather, WeatherProvider } from "./contexts/WeatherContext";
import "./styles/animations.css";
import "./styles/globals.css";
import "./styles/theme.css";

const WeatherApp = () => {
  const { loading, error } = useWeather();

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="app-title">WeatherSphere</h1>
        <ThemeToggle />
      </header>

      <SearchBar />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="error-display">{error}</div>
      ) : (
        <>
          <CurrentWeather />
          <Forecast />
        </>
      )}
    </div>
  );
};

const App = () => (
  <WeatherProvider>
    <WeatherApp />
  </WeatherProvider>
);

export default App;
