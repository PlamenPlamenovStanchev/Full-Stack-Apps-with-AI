# Weather Forecast App

A modern, responsive weather forecast application built with React and Vite. Get real-time weather data and 7-day forecasts for any city worldwide.

## Features

- 🔍 **City Search**: Enter any city name to get weather data
- 🌡️ **Current Weather**: Display current temperature, humidity, and wind speed
- 📅 **7-Day Forecast**: View weather predictions for the next week
- 🎨 **Beautiful UI**: Modern, animated interface with gradient backgrounds
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Weather Icons**: Visual weather condition representation with icons
- 🌐 **Free API**: Uses the free Open-Meteo API (no API key needed)

## Tech Stack

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **React Icons**: SVG icon library
- **Open-Meteo API**: Free weather data provider
- **CSS3**: Modern styling with gradients and animations

## Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd Weather Forecast App
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Development
Start the development server:
```bash
npm run dev
```

The app will automatically open in your browser at `http://localhost:5173`

### Production Build
Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## How It Works

1. **Search**: Enter a city name in the search bar and click the Search button
2. **Geocoding**: The app converts the city name to coordinates using the Open-Meteo Geocoding API
3. **Weather Data**: Fetches current weather and 7-day forecast using the Open-Meteo Weather API
4. **Display**: Shows the current weather with temperature, humidity, and wind speed
5. **Forecast**: Displays a beautiful 7-day forecast with weather icons and temperature ranges

## API Details

- **Geocoding API**: https://geocoding-api.open-meteo.com
  - Converts city names to geographic coordinates
  
- **Weather API**: https://api.open-meteo.com
  - Provides current weather and forecast data
  - Includes temperature, precipitation, weather codes, and more
  - No authentication required

## Weather Codes

The app uses WMO Weather Codes to determine weather conditions:
- **0**: Clear sky
- **1-2**: Mainly clear/Partly cloudy
- **3**: Overcast
- **45**: Foggy
- **51-55**: Drizzle
- **61-65**: Rain
- **71-75**: Snow
- **80-82**: Showers
- **95-99**: Thunderstorm

## Features Breakdown

### SearchBar Component
- Text input for city name
- Search button with icon
- Disabled state during data fetching

### WeatherDisplay Component
- Current temperature in Celsius
- Weather condition description
- Wind speed (km/h)
- Humidity percentage
- Location and timezone information

### ForecastDisplay Component
- 7-day forecast cards
- Daily weather icons
- High/Low temperature ranges
- Precipitation amounts
- Responsive grid layout

### Loading & Error Handling
- Smooth loading spinner while fetching data
- Clear error messages for invalid cities or network issues
- User-friendly error alerts

## File Structure

```
Weather Forecast App/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── SearchBar.css
│   │   ├── WeatherDisplay.jsx
│   │   ├── WeatherDisplay.css
│   │   ├── ForecastDisplay.jsx
│   │   ├── ForecastDisplay.css
│   │   ├── LoadingSpinner.jsx
│   │   ├── LoadingSpinner.css
│   │   ├── ErrorAlert.jsx
│   │   └── ErrorAlert.css
│   ├── utils/
│   │   └── weatherUtils.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Customization

### Change Temperature Unit
Modify the API call in `App.jsx` to use Fahrenheit:
```javascript
&temperature_unit=fahrenheit
```

### Adjust Forecast Length
Change the `forecast_days` parameter in the API call and update the slice in ForecastDisplay:
```javascript
forecast_days=10  // for 10-day forecast
```

### Customize Colors
Edit the CSS variables in `index.css`:
```css
--primary-color: #4a90e2;
--secondary-color: #f5a623;
```

## Performance

- **Lightweight**: Minimal dependencies, ~91 packages total
- **Fast**: Vite provides instant HMR (Hot Module Replacement)
- **Optimized**: CSS animations use hardware acceleration
- **Responsive**: Mobile-first design approach

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### City Not Found
- Make sure the city name is spelled correctly
- Try using the English name of the city
- Some smaller cities might not be available

### No Data Displayed
- Check your internet connection
- Ensure the API is responding (try accessing the API URL directly)
- Check browser console for error messages

### Styling Issues
- Clear your browser cache
- Do a hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Ensure all CSS files are loaded

## License

This project is open source and available for personal and educational use.

## Credits

- **Weather Data**: [Open-Meteo](https://open-meteo.com/) - Free weather API
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) - Beautiful icon library
- **Frontend Framework**: [React](https://react.dev/) - UI library
- **Build Tool**: [Vite](https://vitejs.dev/) - Next generation frontend tooling

## Future Enhancements

- [ ] Geolocation support to auto-detect user location
- [ ] Multiple city comparison
- [ ] Weather alerts and notifications
- [ ] Historical weather data
- [ ] Weather charts and graphs
- [ ] Local storage to save favorite cities
- [ ] Dark/Light theme toggle
- [ ] Air quality index (AQI) display
- [ ] UV index information
- [ ] Pollen forecast data

## Support

For issues, questions, or suggestions, please create an issue or contact the maintainers.

---

**Enjoy exploring weather forecasts around the world! 🌍🌤️**
