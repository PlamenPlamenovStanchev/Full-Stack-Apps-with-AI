# Link Tree App 🌳

A modern, mobile-first **TypeScript + React** application for sharing all your links in one place. Perfect for social media profiles, personal branding, and link aggregation.

**📝 Note:** This project is fully typed with TypeScript for type safety and better development experience. See [TYPESCRIPT.md](TYPESCRIPT.md) for migration details.

## Features ✨

- **Profile Avatar Component**: Display your profile picture, name, and bio
- **Editable Links**: Add, edit, and delete links with ease
- **Social Media Icons**: Support for popular platforms:
  - Instagram, Facebook, YouTube, TikTok
  - Twitter/X, LinkedIn, GitHub, Discord
  - Spotify, Twitch, Pinterest, Reddit, Snapchat
  - Generic Link option
- **Beautiful UI**: Modern gradient background with glassmorphic design
- **Mobile-First Design**: Optimized for all screen sizes
- **Local Storage**: Automatically save all changes to browser
- **Easy Customization**: Edit profile info, link URLs, titles, and icons

## Getting Started 🚀

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd "Link Tree App"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure 📁

```
Link Tree App/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── LinktreeApp.tsx
│   │   ├── LinktreeApp.css
│   │   ├── LinktreeProfileAvatar.tsx
│   │   ├── LinktreeProfileAvatar.css
│   │   ├── LinktreeButton.tsx
│   │   └── LinktreeButton.css
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   ├── index.css
│   └── react-app-env.d.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Component Documentation 📖

### LinktreeApp
Main component that manages state and localStorage persistence.
- Displays profile avatar and list of links
- Handles adding/deleting links
- Auto-saves to browser storage

### LinktreeProfileAvatar
Shows user profile information with edit mode.
- Displays: profile picture, name, bio
- Editable fields: picture, name, bio
- Features: image upload, form validation

### LinktreeButton
Individual link button component.
- Shows icon, title, and label
- Clickable link to external URL
- Editable properties:
  - URL
  - Title
  - Label
  - Icon selection

## Data Storage 💾

All data is automatically saved to browser's localStorage:
- `linktree_profile`: User profile (name, bio, picture)
- `linktree_links`: Array of links with metadata

No server or database required!

## How to Use 🎯

### Edit Profile
1. Click the edit icon (pencil) on the profile section
2. Change your picture, name, or bio
3. Click "Save" to update

### Add a Link
1. Click the "+ Add Link" button
2. Fill in the link details (URL, title, label, icon)
3. Click "Save"

### Edit a Link
1. Click the edit icon on any link button
2. Modify the link information
3. Click "Save" or "Delete"

### Reset Data
- Click "Reset to Defaults" to restore original demo data
- Changes are saved automatically

## Customization 🎨

### Change Colors/Gradient
Edit `src/components/LinktreeApp.css` and modify the `.gradient-bg` gradient colors.

### Add More Icons
Update the `ICON_MAP` and `ICON_OPTIONS` in `src/components/LinktreeButton.jsx`.

### Modify Default Data
Update `DEFAULT_PROFILE` and `DEFAULT_LINKS` in `src/components/LinktreeApp.jsx`.

## Available Scripts 📝

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Runs tests
- `npm eject`: Ejects from Create React App (one-way operation)

## Technologies Used 🛠️

- **React 18.2+** with TypeScript
- **TypeScript 5.0+** for type safety
- React Icons (fa, ai)
- CSS3 with animations
- HTML5 localStorage
- Mobile-first responsive design

## Browser Support 🌐

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements 🚀

- [ ] Export profile as QR code
- [ ] Dark/Light theme toggle
- [ ] Analytics tracking
- [ ] Cloud sync option
- [ ] Custom domain support
- [ ] Enhanced mobile apps
- [ ] Social sharing
- [ ] More icon options

## License 📄

This project is open source and available under the MIT License.

## Contributing 🤝

Contributions are welcome! Feel free to submit issues and pull requests.

---

Made with ❤️ for easy link sharing
