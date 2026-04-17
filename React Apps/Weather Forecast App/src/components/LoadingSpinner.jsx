import './LoadingSpinner.css'

function LoadingSpinner() {
  return (
    <div className="loading-spinner-container">
      <div className="spinner"></div>
      <p>Fetching weather data...</p>
    </div>
  )
}

export default LoadingSpinner
