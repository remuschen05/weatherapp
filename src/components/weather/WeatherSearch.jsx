import { useState, useContext } from 'react'; 
import OpenWeatherMapContext from '../../context/openweathermap/OpenWeatherMapContext';
import WeatherResults from './WeatherResults'

function WeatherSearch() {
    const [text, setText] = useState(); 
    const { weather } = useContext(OpenWeatherMapContext); 

    const handleChange = (e) => setText(e.target.value); 
    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (text === '') { 
            alert('Please enter a location'); 
        } else { 
            //@todo, search users 
            setText(''); 
        }
    }

  return (
    <div className='grid grid-cols-2 mb-8 gap-8'>
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Enter a Location</h2>
                <input type="text" placeholder='search' />
            </form>
            <button>test</button>
        </div>
        <div>
            <button className='btn btn-ghost btn-large'></button>
        </div>
    </div>
  )
}

export default WeatherSearch