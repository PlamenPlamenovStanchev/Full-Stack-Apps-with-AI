import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './SearchBar.css'

function SearchBar({ onSearch, disabled }) {
  const [city, setCity] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (city.trim()) {
      onSearch(city.trim())
      setCity('')
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          disabled={disabled}
          className="search-input"
        />
        <button type="submit" disabled={disabled} className="search-button">
          <FiSearch size={20} />
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchBar
