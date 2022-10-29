import { createContext } from 'react';
import { useState, useReducer } from 'react'; 
import OpenWeatherMapReducer from './OpenWeatherMapReducer';

const OpenWeatherMapContext = createContext();

const API_URL = process.env.REACT_APP_OPENWEATHER_URL;
const API_TOKEN = process.env.REACT_APP_OPENWEATHER_TOKEN;

export const OpenWeatherMapProvider = ({ children }) => {
  const initialState = { 
    weather: [], 
    loading: true, 
  }
  const [state, dispatch] = useReducer(OpenWeatherMapReducer, initialState)

  /* Fetch the longitude and Latitude from the GeoCoding API on Open Weather Map to get Longitude and Latitude coordinate parameters
  for One Call API */
  const fetchLatAndLong = async () => {
    const response = await fetch(
      `${API_URL}/geo/1.0/direct?q=Randolph,MA,US&limit=10&appid=${API_TOKEN}`
    );
    const data = await response.json();
    return data;
  };
  /* Main GET Request that obtains weather data for a specific location. */
  const fetchWeather = async () => {
    setLoading(); 
    const getLongAndLat = await fetchLatAndLong();
    const lon = getLongAndLat[0].lon;
    const lat = getLongAndLat[0].lat;
    const response = await fetch(
      `${API_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&cnt=7&appid=${API_TOKEN}`
    );
    const data = await response.json();
    dispatch({
      type: 'GET_WEATHER', 
      payload: data, 
    })
  };

  const setLoading = () => dispatch({type: 'SET_LOADING'});

  return (
    <OpenWeatherMapContext.Provider value={{
      weather: state.weather, 
      loading: state.loading,
      fetchWeather, 
      fetchLatAndLong,
      setLoading, 
    }}>
      {children}
    </OpenWeatherMapContext.Provider>
  );
};

export default OpenWeatherMapContext