# Quick Start Guide 🚀

## ⚠️ First Step: Clean Up Old Files

This project is now **TypeScript**. Delete these old JavaScript files first:
- `src/App.js`
- `src/index.js`
- `src/components/LinktreeApp.jsx`
- `src/components/LinktreeProfileAvatar.jsx`
- `src/components/LinktreeButton.jsx`

Then follow the setup below.

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

This will install:
- React & React DOM
- React Icons (for social media icons)
- TypeScript & type definitions
- React Scripts (build tools)

### 2. Start Development Server
```bash
npm start
```

The app will automatically open at `http://localhost:3000`

## First Run

When you first load the app, it comes with demo data:
- Sample profile (John Doe)
- 3 sample links (Instagram, YouTube, Twitter)

All data is stored in your browser's localStorage.

## Main Features

### 📝 Edit Your Profile
- Click the pencil icon on your profile card
- Update name, bio, and profile picture
- Click Save to apply changes

### 🔗 Manage Links
- **Add Link**: Click "+ Add Link" button
- **Edit Link**: Click the pencil icon on any link
- **Delete Link**: Click delete button in edit mode

### 📱 Icons Available
- Instagram, Facebook, YouTube, TikTok
- Twitter/X, LinkedIn, GitHub, Discord
- Spotify, Twitch, Pinterest, Reddit, Snapchat
- Generic Link icon

### 💾 Auto-Save
All changes are automatically saved to your browser!

## Build for Production
```bash
npm run build
```

Creates an optimized production build in the `build/` folder.

## Troubleshooting

**Links not saving?**
- Check if localStorage is enabled in your browser
- Try clearing browser cache and reloading

**Icons not showing?**
- Ensure react-icons is installed: `npm install react-icons`
- Try restarting development server

**Styling issues?**
- Clear browser cache (Ctrl+Shift+Delete)
- Restart the development server

## Tips 💡

1. Use high-quality profile pictures (JPG/PNG recommended)
2. Keep bio text short and engaging (~150 characters)
3. Use descriptive link titles and labels
4. Test links before sharing by clicking them
5. Share your profile URL to promote your links

## Next Steps

- Customize colors in `src/components/LinktreeApp.css`
- Add your own default data in `src/components/LinktreeApp.tsx`
- Deploy to Vercel, Netlify, or GitHub Pages
- Share your link tree on social media!

## TypeScript Info

This project uses **TypeScript** for type safety. See [TYPESCRIPT.md](./TYPESCRIPT.md) for:
- Component type definitions
- How to add new typed components
- Migration details

---

Enjoy building your link tree! 🌳
