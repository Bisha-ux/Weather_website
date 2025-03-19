import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function WeatherPage() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [bgColor, setBgColor] = useState("bg-gray-100");

  useEffect(() => {
    if (weather) {
      const condition = weather.weather[0].main.toLowerCase();
      if (condition.includes("clear")) setBgColor("bg-yellow-300");
      else if (condition.includes("cloud")) setBgColor("bg-gray-400");
      else if (condition.includes("rain")) setBgColor("bg-blue-400");
      else setBgColor("bg-gray-100");
    }
  }, [weather]);

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(weatherRes.data);
      setForecast(forecastRes.data.list.slice(0, 5)); // Get next 5 time slots
    } catch (error) {
      alert("City not found!");
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${bgColor}`}>
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Weather Tracker</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 border rounded-md"
      />
      <button onClick={fetchWeather} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
        Get Weather
      </button>
      
      {weather && (
        <div className="mt-4 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">{weather.name}, {weather.sys.country}</h2>
          <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
          <p><strong>Feels Like:</strong> {weather.main.feels_like}°C</p>
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
          <p><strong>Condition:</strong> {weather.weather[0].description}</p>
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt="Weather Icon" 
          />
        </div>
      )}

      {forecast.length > 0 && (
        <div className="mt-4 bg-white p-6 rounded-lg shadow-lg w-2/3">
          <h3 className="text-lg font-bold">Next 5 Updates</h3>
          {forecast.map((f, index) => (
            <div key={index} className="flex justify-between border-b py-2">
              <p>{new Date(f.dt * 1000).toLocaleTimeString()}</p>
              <p>{f.main.temp}°C</p>
              <img 
                src={`https://openweathermap.org/img/wn/${f.weather[0].icon}.png`} 
                alt="Weather Icon" 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WeatherPage;
