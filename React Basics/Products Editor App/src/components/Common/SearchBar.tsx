import './SearchBar.css'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onClear?: () => void
  placeholder?: string
}

export default function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Search products...',
}: SearchBarProps) {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <i className="bi bi-search"></i>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="search-input"
        />
        {value && onClear && (
          <button className="clear-btn" onClick={onClear}>
            <i className="bi bi-x-circle-fill"></i>
          </button>
        )}
      </div>
    </div>
  )
}
