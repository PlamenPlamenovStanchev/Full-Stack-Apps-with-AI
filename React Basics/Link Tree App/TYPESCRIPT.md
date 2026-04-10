# TypeScript Migration Guide

This Link Tree app has been fully converted to TypeScript. Here's what changed:

## File Changes

### Renamed Files
- `src/App.js` → `src/App.tsx`
- `src/index.js` → `src/index.tsx`
- `src/components/LinktreeApp.jsx` → `src/components/LinktreeApp.tsx`
- `src/components/LinktreeProfileAvatar.jsx` → `src/components/LinktreeProfileAvatar.tsx`
- `src/components/LinktreeButton.jsx` → `src/components/LinktreeButton.tsx`

### New Files Added
- `tsconfig.json` - TypeScript configuration
- `src/react-app-env.d.ts` - Environment types declarations

### Files to Delete (Old JavaScript versions)
You can safely delete these old files:
```
- src/App.js
- src/index.js
- src/components/LinktreeApp.jsx
- src/components/LinktreeProfileAvatar.jsx
- src/components/LinktreeButton.jsx
```

## TypeScript Features

### Type Definitions

#### Profile Type
```typescript
interface Profile {
  name: string;
  bio: string;
  picture: string;
}
```

#### Link Type
```typescript
interface Link {
  url: string;
  title: string;
  label: string;
  icon: IconName;
}

type IconName = 'instagram' | 'facebook' | 'youtube' | ... | 'link';
```

#### Component Props
All components have proper TypeScript interfaces for props:
- `LinktreeProfileAvatarProps`
- `LinktreeButtonProps`

### Type Safety Benefits
- ✅ Full IntelliSense support in your IDE
- ✅ Compile-time error catching
- ✅ Self-documenting code through types
- ✅ Safer refactoring with TypeScript checking
- ✅ Better tooling and autocompletion

## Updated Dependencies

The `package.json` now includes:
```json
"typescript": "^5.0.0",
"@types/react": "^18.2.0",
"@types/react-dom": "^18.2.0",
"@types/node": "^20.0.0"
```

## Setup Instructions

1. Delete old JavaScript files (App.js, index.js, and .jsx component files)
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

TypeScript will now check your code on every change and compilation!

## Development Tips

### Type Checking
- TypeScript runs automatically during development
- Fix any type errors shown in your IDE
- Build will fail if there are TypeScript errors

### Adding New Features
When adding new components or features:
1. Create with `.tsx` extension
2. Define proper interfaces for props
3. Use `React.FC<Props>` for function components

### Example Component Structure
```typescript
interface MyComponentProps {
  title: string;
  onClick: (id: number) => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, onClick }) => {
  return <button onClick={() => onClick(1)}>{title}</button>;
};

export default MyComponent;
```

## Troubleshooting

**"Cannot find module" errors?**
- Make sure all old .js/.jsx files are deleted
- Run `npm install` again
- Restart the development server

**Type errors appearing?**
- These are expected during migration
- They help catch bugs before runtime!
- Check the error message and update types as needed

**Build failures?**
- Check the TypeScript error output
- Fix any type mismatches
- Ensure all imports use correct file extensions

---

Your Link Tree app is now fully typed with TypeScript! 🎉
