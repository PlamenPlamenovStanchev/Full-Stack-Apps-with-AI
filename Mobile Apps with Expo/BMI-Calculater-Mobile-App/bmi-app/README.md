# BMI Calculator App

A modern, full-featured Body Mass Index (BMI) calculator built with **React Native** and **Expo**. The app supports both light and dark themes, provides instant BMI calculations with health category classifications, and offers a smooth, intuitive user experience.

## Features

✅ **Weight & Height Input** - Enter weight in kg and height in cm or meters
✅ **Instant BMI Calculation** - Calculates BMI instantly with one tap
✅ **BMI Category Classification**:
  - 🟦 **Underweight** (BMI < 18.5)
  - 🟩 **Normal Weight** (18.5 – 24.9)
  - 🟧 **Overweight** (25 – 29.9)
  - 🟥 **Obesity** (BMI ≥ 30)

# BMI Calculator App

A modern, full-featured Body Mass Index (BMI) calculator built with **React Native** and **Expo**. The app supports both light and dark themes, provides instant BMI calculations with health category classifications, and offers a smooth, intuitive user experience.

## Features

✅ **Weight & Height Input** - Enter weight in kg and height in cm or meters
✅ **Instant BMI Calculation** - Calculates BMI instantly with one tap
✅ **BMI Category Classification**:
  - 🟦 **Underweight** (BMI < 18.5)
  - 🟩 **Normal Weight** (18.5 – 24.9)
  - 🟧 **Overweight** (25 – 29.9)
  - 🟥 **Obesity** (BMI ≥ 30)

✅ **Color-Coded Results** - Each category has a unique color for quick visual feedback
✅ **Health Guidance** - Provides personalized health recommendations based on BMI category
✅ **Dark Mode Support** - Fully themed for both light and dark modes
✅ **Responsive Design** - Works seamlessly on iOS, Android, and Web
✅ **Clear/Reset Button** - Easily clear inputs and start a new calculation

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Usually comes with Node.js
- **Expo CLI** - Install with: `npm install -g expo-cli`

## Getting Started

### 1. Install Dependencies

```bash
cd bmi-app
npm install
```

### 2. Start the Development Server

```bash
npm start
```

This will start the Expo development server and display a QR code.

### 3. Run on Your Device or Emulator

#### **iOS**
```bash
npm run ios
```
Requires Xcode and iOS simulator installed on macOS.

#### **Android**
```bash
npm run android
```
Requires Android Studio and Android emulator configured.

#### **Web**
```bash
npm run web
```
Opens the app in your default web browser.

#### **Using Expo Go App** (Easiest for Testing)
1. Download **Expo Go** from your device's app store
2. Scan the QR code displayed in your terminal
3. The app will open in Expo Go

## How to Use

1. **Enter Weight**: Input your weight in kilograms (kg)
2. **Enter Height**: Input your height in:
   - Centimeters (cm) - e.g., 170
   - OR Meters (m) - e.g., 1.70
3. **Calculate**: Tap the "Calculate BMI" button
4. **View Results**: See your BMI value, category, and health guidance
5. **Clear**: Tap "Clear" to reset and perform another calculation

## Project Structure

```
bmi-app/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Home screen (BMI Calculator)
│   │   └── ...
│   └── _layout.tsx
├── components/
│   ├── bmi-calculator.tsx     # Main BMI calculator component
│   ├── themed-text.tsx        # Themed text component
│   ├── themed-view.tsx        # Themed view component
│   └── ...
├── constants/
│   └── theme.ts               # Theme colors and fonts
├── hooks/
│   ├── use-color-scheme.ts    # Color scheme hook
│   └── use-theme-color.ts     # Theme color hook
├── package.json               # Dependencies
└── tsconfig.json              # TypeScript configuration
```

## BMI Calculation Formula

```
BMI = Weight (kg) / (Height (m))²
```

**Example:**
- Weight: 70 kg
- Height: 1.75 m
- BMI = 70 / (1.75 × 1.75) = 22.86 → **Normal Weight** ✅

## Technology Stack

- **React Native** - Cross-platform mobile development framework
- **Expo** - React Native development framework with built-in tools
- **TypeScript** - Type-safe JavaScript
- **Expo Router** - File-based routing for React Native
- **React Navigation** - Navigation library
- **React Hooks** - State management and side effects

## Troubleshooting

### App not loading?
1. Clear cache: `expo start --clear`
2. Reinstall dependencies: `npm install`
3. Check Node version: `node --version` (should be v18+)

### Emulator issues?
1. Ensure emulator/simulator is running before starting dev server
2. Try: `npm run android` or `npm run ios`

### Input not working?
- Make sure to clear the app cache: `npm start --clear`
- Restart the development server

## Customization

### Change Colors
Edit `constants/theme.ts` to customize the app's color scheme for light and dark modes.

### Modify Categories
Edit the BMI category ranges in `components/bmi-calculator.tsx` in the `calculateBMI()` function.

### Add More Features
- Add weight/height unit conversion (lbs, feet, inches)
- Save calculation history
- Add BMI chart visualization
- Export results as PDF

## License

This project is part of the Full-Stack Apps with AI training program.

## Learn More

To learn more about developing with Expo and React Native:

- [Expo documentation](https://docs.expo.dev/) - Learn fundamentals and advanced topics
- [React Native documentation](https://reactnative.dev/) - Core React Native concepts
- [Expo Router guide](https://docs.expo.dev/router/introduction/) - File-based routing

---

**Happy calculating! 🎉**
