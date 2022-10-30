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
  const fetchLatAndLong = async (city, state) => {
    const params = new URLSearchParams({ 
      q: `${city},${state},US`,
      limit: 10,
      appID: API_TOKEN 
    })
    const response = await fetch(
      `${API_URL}/geo/1.0/direct?${params}`
    );
    const data = await response.json();
    return data;
  };
  /* Main GET Request that obtains weather data for a specific location. */
  const fetchWeather = async (city, state) => {
    setLoading(); 
    const getLongAndLat = await fetchLatAndLong(city, state);
    const longitude = getLongAndLat[0].lon;
    const latitude = getLongAndLat[0].lat;
    console.log(longitude, latitude);
    const params = new URLSearchParams({ 
      lat: latitude, 
      lon: longitude, 
      units: 'imperial',
      appid: API_TOKEN,
    })
    const response = await fetch(
      `${API_URL}/data/2.5/forecast?${params}`
    );
    console.log(response); 
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