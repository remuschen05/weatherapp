import React from 'react';
import WeatherItem from './WeatherItem';
import { useEffect, useContext } from 'react';
import OpenWeatherMapContext from '../../context/openweathermap/OpenWeatherMapContext';

function WeatherResults() {
  const {weather, loading, fetchWeather} = useContext(OpenWeatherMapContext); 

  useEffect(() => {
    fetchWeather();
  }, []);

  if (!loading) {
    return (
      <div>
        {weather.list.map((listItem) => (
          <WeatherItem key={listItem.dt} weather={listItem} />
        ))}
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}

export default WeatherResults;
