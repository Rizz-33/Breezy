import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import { useWeather } from "../contexts/WeatherContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useWeather();

  return (
    <motion.button
      className={`theme-toggle ${theme}`}
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <FiMoon size={18} /> : <FiSun size={18} />}
    </motion.button>
  );
};

export default ThemeToggle;
