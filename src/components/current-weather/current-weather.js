import "./current-weather.css"

const CurrentWeather = ({ data }) => {
  const getWeatherIcon = (iconCode) => {
    return process.env.PUBLIC_URL + `/icons/${iconCode}.png`
  }

  const getWeatherBackground = (iconCode) => {
    const backgroundMap = {
      "01d": "weather-sunny",
      "01n": "weather-clear-night",
      "02d": "weather-partly-cloudy",
      "02n": "weather-partly-cloudy-night",
      "03d": "weather-cloudy",
      "03n": "weather-cloudy",
      "04d": "weather-overcast",
      "04n": "weather-overcast",
      "09d": "weather-rainy",
      "09n": "weather-rainy",
      "10d": "weather-rainy",
      "10n": "weather-rainy",
      "11d": "weather-stormy",
      "11n": "weather-stormy",
      "13d": "weather-snowy",
      "13n": "weather-snowy",
      "50d": "weather-misty",
      "50n": "weather-misty",
    }
    return backgroundMap[iconCode] || "weather-default"
  }

  return (
    <div className={`weather ${getWeatherBackground(data.weather[0].icon)}`}>
      <div className="top">
        <div className="location-info">
          <p className="city">{data.city}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <div className="weather-main">
          <img 
            src={getWeatherIcon(data.weather[0].icon)}
            alt={data.weather[0].description}
            className="weather-icon"
          />
          <p className="temperature">{`${Math.round(data.main.temp)}`}°C</p>
        </div>
      </div>

      <div className="bottom">
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">{`${Math.round(data.main.feels_like)}`}°C</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather
