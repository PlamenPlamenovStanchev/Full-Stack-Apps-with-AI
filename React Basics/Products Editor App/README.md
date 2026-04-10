# Products Editor App

A modern, responsive React application for managing product inventory using TypeScript, Vite, and Bootstrap.

## Features

✨ **Core Features**
- ➕ Add, edit, and delete products
- 👁️ View product catalog with beautiful cards
- 🎨 Modern responsive UI with gradient backgrounds
- 💾 Local state management
- 📱 Fully responsive design (mobile, tablet, desktop)

🎯 **UI/UX Components**
- 🔔 Toast notifications for user feedback
- 🎬 Smooth animations and transitions
- 🏷️ Bootstrap Icons integration
- 🎨 Modern color gradients and styling
- ⚡ Loading states and visual feedback

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Bootstrap 5 + Custom CSS
- **Icons**: Bootstrap Icons
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios

## Project Structure

```
src/
├── components/
│   ├── Header.tsx           # App header with navigation
│   ├── Header.css
│   ├── ProductForm.tsx      # Form for adding new products
│   ├── ProductForm.css
│   ├── ProductsList.tsx     # Product list display
│   └── ProductsList.css
├── App.tsx                  # Main app component
├── App.css
├── main.tsx                 # React entry point
└── index.css                # Global styles and animations
```

## Getting Started

### Prerequisites
- Node.js (v20.11.0 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Detail

### Product Management
- Add new products with name, price, quantity, category, and description
- Edit product quantity with inline updates
- Delete products with confirmation
- Real-time inventory value calculation

### UI Elements
- **Header**: Sticky navigation with logo and quick action buttons
- **Product Form**: Sidebar form with validation and visual feedback
- **Product Cards**: Modern cards with gradient backgrounds and hover effects
- **Toast Notifications**: Success messages for all actions
- **Responsive Grid**: Auto-adjusting product grid layout

### Animations
- Fade-in animations on page load
- Slide-in effects for product cards
- Smooth hover transitions
- Loading pulse animation
- Smooth color transitions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] Backend API integration
- [ ] Product search and filtering
- [ ] Inventory alerts
- [ ] Product categories
- [ ] Export to CSV
- [ ] Bulk operations
- [ ] User authentication
- [ ] Dark mode theme

## License

MIT
