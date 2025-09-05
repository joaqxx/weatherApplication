"use client"

import { useState } from "react"
import { SearchIcon, MapPin, Loader2, AlertCircle } from "lucide-react"
import { GEOCODING_API_URL, WEATHER_API_KEY } from "../../api"
import "./search.css"

const Search = ({ onSearchChange }) => {
  const [searchInput, setSearchInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleInputChange = async (e) => {
    const value = e.target.value
    setSearchInput(value)

    if (value.length > 2) {
      try {
        const response = await fetch(`${GEOCODING_API_URL}/direct?q=${value}&limit=5&appid=${WEATHER_API_KEY}`)
        const data = await response.json()
        setSuggestions(data)
        setShowSuggestions(true)
      } catch (error) {
        console.error("Error fetching suggestions:", error)
      }
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!searchInput.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch(`${GEOCODING_API_URL}/direct?q=${searchInput}&limit=1&appid=${WEATHER_API_KEY}`)
      const data = await response.json()

      if (!data.length) {
        setShowModal(true)
        return
      }

      const result = data[0]
      const searchData = {
        value: `${result.lat} ${result.lon}`,
        label: `${result.name}, ${result.country}`,
      }
      onSearchChange(searchData)
      setShowSuggestions(false)
    } catch (error) {
      console.error("Error searching location:", error)
      setShowModal(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    const searchData = {
      value: `${suggestion.lat} ${suggestion.lon}`,
      label: `${suggestion.name}, ${suggestion.country}`,
    }
    setSearchInput(`${suggestion.name}, ${suggestion.country}`)
    onSearchChange(searchData)
    setShowSuggestions(false)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-input-wrapper">
            <SearchIcon className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Enter city name to get weather..."
              value={searchInput}
              onChange={handleInputChange}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="search-input"
              required
            />
            {isLoading && <Loader2 className="loading-icon" size={16} />}
          </div>
          <button type="submit" className="search-button" disabled={isLoading}>
            {isLoading ? <Loader2 size={16} /> : "Search"}
          </button>
        </form>

        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="suggestion-item" onClick={() => handleSuggestionClick(suggestion)}>
                <MapPin size={16} className="suggestion-icon" />
                <div className="suggestion-content">
                  <span className="suggestion-name">{suggestion.name}</span>
                  <span className="suggestion-country">{suggestion.country}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <AlertCircle className="modal-icon" size={48} />
            <h3 className="modal-title">Location Not Found</h3>
            <p className="modal-message">
              We couldn't find the location you searched for. Please check the spelling and try again with a different
              city or country name.
            </p>
            <button className="modal-button" onClick={closeModal}>
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
