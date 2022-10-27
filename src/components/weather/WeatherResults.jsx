import React from 'react';
import WeatherItem from './WeatherItem';
import { useEffect, useState } from 'react';

function WeatherResults() {
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeather();
  }, []);

  /* Fetch the longitude and Latitude from the GeoCoding API on Open Weather Map to get parameters for One Call API */
  const fetchLatAndLong = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_OPENWEATHER_URL}/geo/1.0/direct?q=Randolph,MA,US&limit=10&appid=${process.env.REACT_APP_OPENWEATHER_TOKEN}`
    );
    const data = await response.json();
    return data;
  };
  const fetchWeather = async () => {
    const getLongAndLat = await fetchLatAndLong();
    const lon = getLongAndLat[0].lon;
    const lat = getLongAndLat[0].lat;
    const response = await fetch(
      `${process.env.REACT_APP_OPENWEATHER_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&cnt=7&appid=${process.env.REACT_APP_OPENWEATHER_TOKEN}`
    );
    const data = await response.json();
    console.log(data);
    setWeather(data);
    setLoading(false);
  };
  if (!loading) {
    return (
      <div>
        {weather.list.map((listItem) => (
          <WeatherItem key={listItem.dt} weather={listItem} />
        ))}
      </div>
    );
  } else {
    return <h1>loading...</h1>;
  }
}

export default WeatherResults;
