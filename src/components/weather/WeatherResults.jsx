import { useEffect, useState } from 'react';
import WeatherItem from './WeatherItem';

function WeatherResults({ city, state }) {
  const [weather, setWeather] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_TOKEN = process.env.REACT_APP_OPENWEATHER_TOKEN;
  const API_URL = process.env.REACT_APP_OPENWEATHER_URL;

  useEffect(() => {
    fetchWeather(city, state);
  }, []);
  useEffect(() => {
    fetchHistoricalWeather(city, state);
  }, []);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Open Weather Map API Requests
  //Get longitude and Latitude Parameters from Openweathermap Geocoding API
  const fetchLatAndLong = async (city, state) => {
    const params = new URLSearchParams({
      q: `${city},${state},US`,
      limit: 10,
      appID: API_TOKEN,
    });
    const response = await fetch(`${API_URL}/geo/1.0/direct?${params}`);
    const data = await response.json();
    return data;
  };
  /* Main GET Request that obtains weather data for a specific location. */
  const fetchWeather = async (city, state) => {
    setLoading(true);
    const getLongAndLat = await fetchLatAndLong(city, state);
    const longitude = getLongAndLat[0].lon;
    const latitude = getLongAndLat[0].lat;
    const params = new URLSearchParams({
      lat: latitude,
      lon: longitude,
      units: 'imperial',
      cnt: 7,
      appid: API_TOKEN,
    });
    const response = await fetch(`${API_URL}/data/2.5/forecast?${params}`);
    const data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  const fetchHistoricalWeather = async (city, state) => {
    const getLongAndLat = await fetchLatAndLong(city, state);
    const longitude = getLongAndLat[0].lon;
    const latitude = getLongAndLat[0].lat;
    const params = new URLSearchParams({
      lat: latitude,
      lon: longitude,
      units: 'imperial',
      appid: API_TOKEN,
    });
    let data = [];
    let dates = lastSevenUnix();
    for (let i = 0; i < dates.length; i++) {
      let dateParam = dates[i];
      const response = await fetch(
        `${API_URL}/data/3.0/onecall/timemachine?dt=${dateParam}&${params}`
      );
      console.log(
        `${API_URL}data/3.0/onecall/timemachine?dt=${dateParam}${params}`
      );
      const json = await response.json();
      data.push(json);
    }
    console.log(`HISTORICAL DATA ${data}`);
    setHistoricalData(data);
    console.log(historicalData);
    return data;
  };
  //Calculate the last 7 days in Unix Time for the Historical Open Weather Map API;
  const lastSevenUnix = () => {
    let lastSeven = [];
    let d = Math.floor(Date.now() - 284014800);
    for (let i = 0; i < 7; i++) {
      d = d - 864e5;
      lastSeven.push(d);
    }
    console.log(lastSeven);
    return lastSeven;
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (!loading) {
    return (
      <div>
        <h1 className="pb-8 text-4xl bold">
          {city}, {state}
        </h1>
        <div className="grid grid-cols-7 gap-4">
          {weather.list.map((listItem) => (
            <WeatherItem
              key={listItem.dt}
              weather={listItem}
              city={city}
              state={state}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>
          {city},{state}
        </h1>
        <p>Loading...</p>
      </div>
    );
  }
}

export default WeatherResults;
