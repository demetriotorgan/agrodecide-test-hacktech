// utils/weatherIcons.js

import RainIcon from '../assets/RainIcon';

export const getWeatherIcon = (weatherCode) => {
  const iconMap = {
    rain: RainIcon,
  };

  return iconMap[weatherCode] || CloudIcon;
};