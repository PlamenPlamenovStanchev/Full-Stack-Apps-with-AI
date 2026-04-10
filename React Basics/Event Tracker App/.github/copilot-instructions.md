# Event Tracker App - Development Guide

A modern React + TypeScript + Vite application for managing events, attendees, venues, and tickets with a full-page layout and tabs navigation.

## Project Setup ✅

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: CSS3 with animations
- **UI Components**: Lucide React (icons), Sonner (notifications)
- **Status**: Ready for development

## Application Architecture

### Layout Structure
```
┌─────────────────────────────────────────┐
│           AppHeader                     │
│  Logo | Title | Stats | Tab Navigation  │
├─────────────────────────────────────────┤
│                                         │
│         Main Content Area               │
│    (Full-width, max 1200px)            │
│                                         │
│  - EventsEditor                         │
│  - AttendeesEditor                      │
│  - VenuesEditor                         │
│  - TicketsEditor                        │
│  - Tracker                              │
│                                         │
├─────────────────────────────────────────┤
│           AppFooter                     │
│  Links | Info | Copyright               │
└─────────────────────────────────────────┘
```

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
│   ├── AttendeesEditor.tsx  # Attendees placeholder screen
│   ├── VenuesEditor.tsx     # Venues placeholder screen
│   ├── TicketsEditor.tsx    # Tickets placeholder screen
│   ├── Tracker.tsx          # Analytics placeholder screen
│   └── Screen.css           # Shared screen styles
├── App.tsx                  # Main layout component
├── App.css
├── types.ts                 # TypeScript interfaces
├── index.css                # Global styles & animations
└── main.tsx                 # React entry point
```

## Key Features

### 🎯 Tab Navigation
- Five main tabs: Events, Attendees, Venues, Tickets, Tracker
- Sticky header with icons and labels
- Responsive design (icons only on mobile)
- Active tab indicator

### ✨ Modern UI & UX
- Gradient backgrounds and smooth animations
- Fully responsive design (mobile, tablet, desktop)
- Beautiful icons with Lucide React
- Toast notifications with Sonner

### 🔧 Core Functionality
- **Events Tab**: Full CRUD operations for events
  - Create events with all details
  - Edit event titles and descriptions
  - Mark events as completed
  - Delete events
  - Filter by status (All, Pending, Completed)
  - Priority and category indicators

- **Other Tabs**: Placeholder screens ready for implementation
  - Attendees: Manage event attendees
  - Venues: Manage event venues
  - Tickets: Manage event tickets
  - Tracker: Event analytics and metrics

### 🏗️ Component Architecture
- **AppHeader**: App branding, stats, and tab navigation
- **AppFooter**: Information, links, and footer
- **EventForm**: Form for creating new events
- **EventList**: Displays list of events or empty state
- **EventCard**: Individual event with edit/delete actions
- **Screens**: Modular screen components for each tab

## Development

### Start Development Server
```bash
npm run dev
```
Opens at http://localhost:5173 with hot module reloading.

### Build for Production
```bash
npm run build
```
Creates optimized bundle in `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

## Navigation & Tab Management

### Adding a New Tab
1. Create new screen component in `src/screens/NewScreen.tsx`
2. Import shared `Screen.css` for consistent styling
3. Add tab config to `tabs` array in `AppHeader.tsx`
4. Add case handler in `App.tsx` `renderContent()` function
5. Export screen component and import in `App.tsx`

### Tab Structure
Each tab screen uses an optional header section:
```tsx
<div className="screen-container">
  <div className="screen-header">
    <h2 className="screen-title">Tab Title</h2>
    <p className="screen-subtitle">Description</p>
  </div>
  {/* Tab content */}
</div>
```

## Animations & Effects

| Animation | CSS Class | Usage |
|-----------|-----------|-------|
| Fade In | `.animate-fade-in` | Screens, cards appearing |
| Slide In | `.animate-slide-in-right` | Event cards entering |
| Bounce | `.animate-bounce` | Header logo, empty icons |
| Pulse | `.animate-pulse` | Loading states |
| Spin | `.animate-spin` | Loading spinners |

## Event Data Structure

```typescript
interface Event {
  id: string
  title: string
  description: string
  date: string        // YYYY-MM-DD
  time: string        // HH:mm
  category: string    // work, personal, meeting, deadline, other
  completed: boolean
  priority: 'low' | 'medium' | 'high'
}
```

## Color Scheme

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | #3b82f6 | Active tabs, buttons, links |
| `--secondary` | #8b5cf6 | Header gradient |
| `--success` | #10b981 | Completed state, save |
| `--danger` | #ef4444 | Delete, high priority |
| `--warning` | #f59e0b | Medium priority |

## Common Development Tasks

### Add New Screen Tab
1. Create component in `src/screens/`
2. Use `.screen-container` and `.screen-header` classes
3. Add to `tabs` array in `AppHeader.tsx`
4. Handle in `App.tsx` renderContent()

### Style a Screen
Use `Screen.css` for shared styles:
- `.screen-container`: Main wrapper
- `.screen-header`: Title section
- `.empty-screen`: Empty state placeholder

### Add New Action to Event Card
1. Edit `EventCard.tsx` component
2. Add button or icon in JSX
3. Create handler function
4. Pass event data as needed

### Update Color Scheme
1. Edit `:root` variables in `src/index.css`
2. Colors cascade to all components
3. No per-component changes needed

## Form Validation

### EventForm Validation
- **Title**: Required, non-empty
- **Date**: Required
- **Time**: Required
- **Description**: Optional
- **Category & Priority**: Have default values

## Responsive Design

### Breakpoints
- **Mobile (< 480px)**: Single column, icon-only tabs
- **Tablet (480px - 1024px)**: Optimized spacing
- **Desktop (> 1024px)**: Full layout with max-width container

### Mobile Optimization
- Touch-friendly button sizes (44px minimum)
- Icon-only tabs on small screens
- Single-column layouts
- Adjusted font sizes

## Toast Notifications

```typescript
import { toast } from 'sonner'

// Success
toast.success('Event added successfully! 🎉')

// Error
toast.error('Please fill in all required fields')

// Custom
toast('Event updated! ✏️')
```

## Future Enhancement Ideas

- [ ] Implement attendee management
- [ ] Implement venue management
- [ ] Implement ticket management
- [ ] Implement event analytics/tracker
- [ ] Local storage persistence
- [ ] Event reminders
- [ ] Recurring events
- [ ] Search functionality
- [ ] Calendar view
- [ ] Dark mode
- [ ] Export to iCal
- [ ] Multi-user support

## Useful Resources

- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Vite Guide](https://vitejs.dev/guide)
- [Lucide React Icons](https://lucide.dev)
- [Sonner Documentation](https://sonner.emilkowal.ski)

## Debugging Tips

- Use React DevTools to inspect component state and props
- Check browser console for TypeScript errors
- Use Vite error overlay for HMR issues
- Use `console.log()` to debug component logic

## Performance Considerations

- Animations use CSS transforms for GPU acceleration
- React components memoized for performance
- Vite code splitting for optimal bundle
- Lazy loading for Lucide React icons
- Efficient CSS with shared classes

## Known Limitations

- No data persistence (resets on refresh)
- Placeholder screens not yet functional
- No real-time synchronization
- No user authentication
- Desktop-first, mobile second

---

**Last Updated**: April 2026

