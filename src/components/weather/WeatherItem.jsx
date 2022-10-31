import Card from '../shared/Card';
import PropTypes from 'prop-types';

function WeatherItem({ weather }) {
  const months = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };
  const unixTimeConverter = (unixTime) => {
    const myDate = new Date(unixTime * 1000);
    const year = myDate.getFullYear();
    const month = months[myDate.getMonth()];
    const day = myDate.getDate();
    const hour = myDate.getHours();
    const min = myDate.getMinutes();
    const formattedTime = {
      formattedDate: `${month} ${day}, ${year}`,
      formattedTime: `${hour}:${min}0`,
    };
    return formattedTime;
  };
  console.log(weather);

  return (
    <Card>
      <div className="py-4 px-2">
        <div className="flex justify-between content-center">
          <div>
            <p className="text-lg font-semibold leading-none tracking-wide m-0 whitespace-nowrap md:text-base">
              {`${unixTimeConverter(weather.dt).formattedDate}`}
            </p>
            <p className="font-light text-sm">Randolph, MA</p>
            <p className="font-light text-sm">{`${
              unixTimeConverter(weather.dt).formattedTime
            }`}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="">
            <p className="font-bold underline">Temperature</p>
            <p className="text-2xl font-bold">{`${Math.floor(
              weather.main.temp
            )}°F`}</p>
          </div>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt=""
            className="pt-1"
          />
        </div>
      </div>
    </Card>
  );
}
/* 
<div>
          <br />
          {`Temperature: ${Math.floor(weather.main.temp)}`}
          <br />
          {`Humidity: ${weather.main.humidity}`}
          <br />
          {`${weather.weather[0].main}`}
          <br />
          {`${weather.weather[0].description}`}
        </div>
*/

WeatherItem.propTypes = {
  weather: PropTypes.object.isRequired,
};

export default WeatherItem;
