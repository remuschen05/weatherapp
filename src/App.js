import './App.css';
import Home from './pages/Home';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { OpenWeatherMapProvider } from './context/openweathermap/OpenWeatherMapContext';
import WeatherResults from './components/weather/WeatherResults';
import WeatherSearch from './components/weather/WeatherSearch';

function App() {
  return (
    <OpenWeatherMapProvider>
      <Router>
        <div className="flex flex-col h-screen">
          <Navbar />
          <main className="container mx-auto py-12 px-2">
            <WeatherSearch/>
            <WeatherResults />
          </main>
        </div>
      </Router>
    </OpenWeatherMapProvider>
  );
}

export default App;
