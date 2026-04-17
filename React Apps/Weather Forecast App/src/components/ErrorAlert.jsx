import { FiAlertCircle } from 'react-icons/fi'
import './ErrorAlert.css'

function ErrorAlert({ message }) {
  return (
    <div className="error-alert">
      <FiAlertCircle className="error-icon" />
      <div>
        <h4>Error</h4>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default ErrorAlert
