import { Search, Cloud, Sun } from "lucide-react"
import "./placeholder.css"

const Placeholder = () => {
  return (
    <div className="center-wrapper">
    <div className="placeholder-container">
      <div className="placeholder-background">
        <Cloud className="floating-cloud cloud-1" size={32} />
        <Cloud className="floating-cloud cloud-2" size={24} />
        <Sun className="floating-sun" size={28} />
      </div>

      <div className="placeholder-content">
        <div className="search-icon-wrapper">
          <Search size={64} className="placeholder-icon" />
          <div className="search-pulse"></div>
        </div>

        <h2 className="placeholder-title">Search Your City</h2>
        <p className="placeholder-text">Discover the weather in your favorite cities around the world</p>
      </div>
    </div>
    </div>
  )
}

export default Placeholder
