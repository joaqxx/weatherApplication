import "./forecast.css"
import { Cloud } from "lucide-react" 

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const getWeatherIcon = (iconCode) => {
  return process.env.PUBLIC_URL + `/icons/${iconCode}.png`
}

const Forecast = ({ data }) => {
  // Group forecast by day
  const dailyForecast = [];
  const processedDates = new Set();

  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    
    if (!processedDates.has(date)) {
      processedDates.add(date);
      dailyForecast.push(item);
    }
  });

  // Limit to 5 days
  const fiveDayForecast = dailyForecast.slice(0, 5);

  const dayInAWeek = new Date().getDay()
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek))

  return (
    <div className="forecastweather-wrapper">
      <div className="forecast-container">
        <h2 className="title">Weather Forecast</h2>
        <div className="forecast-grid">
          {fiveDayForecast.map((item, idx) => {
            const iconSrc = getWeatherIcon(item.weather[0].icon)
            return (
              <div key={idx} className="forecast-card">
                <div className="daily-item">
                  <div className="day-info">
                    <img 
                      src={iconSrc} 
                      alt={item.weather[0].description}
                      className="weather-icon"
                    />
                    <div className="day-text">
                      <span className="day">{forecastDays[idx]}</span>
                      <span className="description">{item.weather[0].description}</span>
                    </div>
                  </div>
                  <div className="temperature-range">
                    <span className="temp-max">{Math.round(item.main.temp_max)}°</span>
                    <span className="temp-min">{Math.round(item.main.temp_min)}°</span>
                  </div>
                </div>
                <div className="daily-details-grid">
                  <div className="detail-card">
                    <span className="detail-label">Pressure</span>
                    <span className="detail-value">{item.main.pressure} hPa</span>
                  </div>
                  <div className="detail-card">
                    <span className="detail-label">Humidity</span>
                    <span className="detail-value">{item.main.humidity}%</span>
                  </div>
                  <div className="detail-card">
                    <span className="detail-label">Wind</span>
                    <span className="detail-value">{item.wind.speed} m/s</span>
                  </div>
                  <div className="detail-card">
                    <span className="detail-label">Feels Like</span>
                    <span className="detail-value">{Math.round(item.main.feels_like)}°C</span>
                  </div>
                </div>
              </div>
            )
          })}
          <div className="forecast-card logo-card">
          <div className="logo-content">
            <div className="app-logo">
              <Cloud className="logo-icon" />
              <span className="app-name">WeatherApp</span>
            </div>
            <div className="logo-tagline">Your Weather Companion</div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Forecast
