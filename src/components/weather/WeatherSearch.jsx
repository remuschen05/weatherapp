import { useState, useContext, ReactDOM } from 'react';
import OpenWeatherMapContext from '../../context/openweathermap/OpenWeatherMapContext';
import WeatherResults from './WeatherResults';

function WeatherSearch() {
  const [text, setText] = useState('');
  const { weather, fetchWeather } = useContext(OpenWeatherMapContext);

  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    const regEx = /([A-Za-z]+(?: [A-Za-z]+)*),? ([A-Za-z]{2})/;
    const validation = regEx.exec(text);
    console.log(validation);
    if (!validation || text === '') {
      alert(
        'Please enter a location in the "City, State" Format. EX: Randolph, MA'
      );
    } else {
      //@todo, search users
      weather = fetchWeather(validation[1], validation[2]);
      setText('');
    }
  };

  return (
    <div className="grid grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="relative">
              <input
                type="text"
                value={text}
                onChange={handleChange}
                className="border-8 border-solid w-1/2 pr-40 text-black"
                placeholder="Enter a Location"
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      <div></div>
    </div>
  );
}

export default WeatherSearch;
