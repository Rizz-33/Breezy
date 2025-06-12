// WeatherDetail.js
import { motion } from "framer-motion";
import { memo } from "react";

const WeatherDetail = ({ icon, title, value, extra }) => {
  return (
    <motion.div className="weather-detail" whileHover={{ scale: 1.05 }}>
      <div className="detail-icon">{icon}</div>
      <div className="detail-content">
        <h4>{title}</h4>
        <p className="detail-value">{value}</p>
        {extra && <p className="detail-extra">{extra}</p>}
      </div>
    </motion.div>
  );
};

export default memo(WeatherDetail);
