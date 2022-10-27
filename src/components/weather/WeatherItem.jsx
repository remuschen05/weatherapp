import Card from '../shared/Card';
import PropTypes from 'prop-types';

function WeatherItem({ weather }) {
  return (
    <div>
      {`Temperature: ${Math.floor(weather.main.temp)}`}
      <br />
      {`Humidity: ${weather.main.humidity}`}
      <br />
      {`${weather.weather[0].main}`}
      <br />
      {`${weather.weather[0].description}`}
    </div>
  );
}

WeatherItem.propTypes = {
  weather: PropTypes.object.isRequired,
};

export default WeatherItem;
