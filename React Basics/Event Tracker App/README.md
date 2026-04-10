# Event Tracker App

A modern, responsive React + TypeScript + Vite application for managing events, attendees, venues, and tickets.

## Features

✨ **Modern & Responsive UI**
- Clean, intuitive design with smooth animations
- Fully responsive layout for mobile, tablet, and desktop
- Beautiful gradient backgrounds and modern components

🔄 **Tab-Based Navigation**
- Easy navigation between different screens
- Five main sections: Events, Attendees, Venues, Tickets, Tracker
- Sticky header with tab indicators
- Full-width content area for all screens

🎨 **Rich User Experience**
- Smooth fade-in and slide animations
- Interactive toast notifications for user feedback
- Icon-based visual indicators with Lucide React
- Priority indicators and category badges
- Professional footer with links and information

🔧 **Full Event Management**
- Create new events with detailed information
- Edit event titles and descriptions inline
- Mark events as completed
- Delete events with confirmation
- Filter events by status (All, Pending, Completed)
- Visual priority indicators (Low, Medium, High)

📱 **Modular Architecture**
- Reusable React components separated by concerns
- Type-safe with TypeScript
- Organized component and screen structure
- CSS modules for style isolation

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Lucide React** - Beautiful icons
- **Sonner** - Toast notifications
- **CSS3** - Modern styling with animations

## Project Structure

```
src/
├── components/
│   ├── AppHeader.tsx        # Main header with tabs navigation
│   ├── AppHeader.css
│   ├── AppFooter.tsx        # Footer component
│   ├── AppFooter.css
│   ├── EventForm.tsx        # Form to create new events
│   ├── EventForm.css
│   ├── EventList.tsx        # Container for event cards
│   ├── EventList.css
│   ├── EventCard.tsx        # Individual event card
│   └── EventCard.css
├── screens/
│   ├── EventsEditor.tsx     # Events management screen
│   ├── EventsEditor.css
│   ├── AttendeesEditor.tsx  # Attendees screen (placeholder)
│   ├── VenuesEditor.tsx     # Venues screen (placeholder)
│   ├── TicketsEditor.tsx    # Tickets screen (placeholder)
│   ├── Tracker.tsx          # Analytics screen (placeholder)
│   └── Screen.css           # Shared screen styles
├── App.tsx                  # Main app component with layout
├── App.css
├── types.ts                 # TypeScript types
├── index.css                # Global styles & animations
└── main.tsx                 # Entry point
```

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Build

To build for production:
```bash
npm run build
```

## Application Layout

### Header
- **Logo & Title**: App branding with animated icon
- **Stats**: Displays total events count
- **Tab Navigation**: Five tabs for different screens
- **Responsive Design**: Icons only on mobile, with labels on larger screens

### Content Area
- **Full-Width Layout**: Utilizes the entire window width
- **Max-Width Container**: 1200px for optimal readability
- **Screen Transitions**: Smooth animations when switching tabs
- **Consistent Spacing**: Uniform padding and margins

### Footer
- **Information**: Quick description of the app
- **Quick Links**: Navigation links to different sections
- **Support**: Help and documentation links
- **Copyright**: Year and copyright information

## Screen Navigation

### Events Tab
Create and manage your events with full CRUD operations.
- Add new events with title, description, date, time, category, and priority
- Edit event details inline
- Mark events as completed or pending
- Delete events
- Filter by status

### Attendees Tab (Placeholder)
Manage event attendees and registrations.
- Future features coming soon

### Venues Tab (Placeholder)
Manage event venues and locations.
- Future features coming soon

### Tickets Tab (Placeholder)
Manage event tickets and pricing.
- Future features coming soon

### Tracker Tab (Placeholder)
Monitor event metrics and analytics.
- Future features coming soon

## Usage

1. **Navigate Screens**: Click any tab in the header to switch screens
2. **Create Event**: Click "Add New Event" button on the Events tab
3. **Fill Details**: Enter all event information in the form
4. **Submit**: Click "Add Event" to create the event
5. **Manage Events**: 
   - Check the checkbox to mark as completed
   - Click edit button to modify event details
   - Click delete button to remove events
6. **Filter Events**: Use the filter buttons to view All, Pending, or Completed events

## Event Data Structure

```typescript
interface Event {
  id: string
  title: string
  description: string
  date: string        // YYYY-MM-DD format
  time: string        // HH:mm format
  category: string    // work, personal, meeting, deadline, other
  completed: boolean
  priority: 'low' | 'medium' | 'high'
}
```

## Animations & Effects

| Animation | Usage |
|-----------|-------|
| `fadeIn` | Screens and cards appearing |
| `slideInRight` | Event cards entering from the right |
| `bounce` | Header logo, empty state icons |
| `pulse` | Loading states |
| `spin` | Loading spinners |

## Toast Notifications

The app uses Sonner for user feedback:
- ✅ Success messages when events are added/updated/deleted
- ❌ Error messages for validation failures
- 🎉 Celebratory emojis for important actions

## Color Scheme

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | #3b82f6 | Buttons, links, active states |
| `--secondary` | #8b5cf6 | Header gradient |
| `--success` | #10b981 | Completed state, success actions |
| `--danger` | #ef4444 | Delete actions, high priority |
| `--warning` | #f59e0b | Medium priority |

## Responsive Breakpoints

- **Mobile (< 480px)**: Single column, icon-only tabs
- **Small Tablet (480px - 640px)**: Optimized touch targets
- **Tablet (640px - 1024px)**: Two-column layouts where appropriate
- **Desktop (> 1024px)**: Full-featured layout with spacious padding

## Development Tips

### Add New Tab Screen
1. Create new component in `src/screens/NewScreen.tsx`
2. Import `Screen.css` for consistent styling
3. Add tab configuration in `AppHeader.tsx`
4. Add case in `App.tsx` renderContent function

### Customize Colors
- Edit CSS variables in `src/index.css` `:root` section
- Colors cascade throughout the app

### Add Component
1. Create component in `src/components/` directory
2. Create corresponding `.css` file
3. Export and import where needed

## Future Enhancements

- [ ] Implement attendee management screen
- [ ] Implement venue management screen
- [ ] Implement ticket management screen
- [ ] Implement event analytics and tracker
- [ ] Local storage persistence
- [ ] Event reminders and notifications
- [ ] Recurring events
- [ ] Event search and filtering
- [ ] Calendar view
- [ ] Dark mode support
- [ ] Export events to iCal format
- [ ] Multi-user support with authentication

## Performance Considerations

- Animations use CSS transforms for GPU acceleration
- React components optimized for re-renders
- Vite's code splitting for optimal bundle size
- Lazy loading for icons from Lucide React
- Efficient CSS organization with modules

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## License

MIT

---

**Last Updated**: April 2026
