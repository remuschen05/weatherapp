import { createContext } from 'react';

const OpenWeatherMapContext = createContext();

const API_URL = process.env.REACT_APP_OPENWEATHER_URL;
const API_TOKEN = process.env.REACT_APP_OPENWEATHER_TOKEN;

export const OpenWeatherMapProvider = ({ children }) => {
  return (
    <OpenWeatherMapContext.Provider value={{}}>
      {children}
    </OpenWeatherMapContext.Provider>
  );
};
