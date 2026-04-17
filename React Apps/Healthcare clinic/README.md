# Healthcare Clinic Website

A modern, responsive healthcare clinic website built with React, TypeScript, Vite, and React Router.

## 🚀 Features

- **Modern UI with Responsive Design** - Mobile-first approach with fluid layouts
- **Smooth Animations & Transitions** - Professional UI/UX with CSS animations
- **React Router Navigation** - Client-side routing with 6 pages
- **News Management System** - SEO-friendly news slugs and filtering by category
- **Contact Form** - Interactive form with validation
- **Multiple Clinic Locations** - Display of different clinic branches
- **Team Display** - Medical professional showcase
- **Professional Typography & Icons** - Clean, modern design system

## 📄 Pages

1. **Home** (`/`) - Welcome page with features, services preview, and CTA
2. **Services** (`/services`) - Detailed list of medical services offered
3. **News** (`/news`) - Blog-style news articles with category filtering
4. **News Item** (`/news/:slug`) - Individual news article view
5. **About** (`/about`) - Company mission, values, team, timeline, and statistics
6. **Contacts** (`/contacts`) - Contact forms and clinic locations

## 🛠 Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite 3.9** - Build tool for fast development
- **React Router 7** - Client-side routing
- **CSS3** - Modern styling with variables and animations

## 📁 Project Structure

```
src/
├── components/
│   ├── Navigation.tsx      # Navigation bar with mobile menu
│   └── Navigation.css
├── pages/
│   ├── Home.tsx            # Home page
│   ├── Services.tsx        # Services listing
│   ├── News.tsx            # News list with filters
│   ├── NewsItem.tsx        # Individual news article
│   ├── About.tsx           # About page
│   ├── Contacts.tsx        # Contact page
│   └── [Page].css          # Page-specific styles
├── data/
│   └── newsData.ts         # News articles data with SEO slugs
├── App.tsx                 # Main app with routes
├── App.css                 # App-level styles
├── index.css               # Global styles
└── main.tsx                # React entry point
```

## 🎨 Design Features

- **Color Scheme**: Professional blues, teals, and accents
- **Responsive Breakpoints**: Desktop, tablet, mobile
- **Smooth Animations**: Slide-in, fade-in, scale effects
- **Hover Effects**: Interactive elements with visual feedback
- **Cards & Sections**: Well-organized content blocks

## 📰 News System

The news system includes:
- **SEO-Friendly Slugs**: Semantic URL segments (e.g., `/news/new-cardiology-department-opens`)
- **Category Filtering**: Filter news by category on the main News page
- **Related Articles**: Show related news on individual article pages
- **Metadata**: Date, category, excerpt for each article

### Adding News

Edit `src/data/newsData.ts` to add more news articles:

```typescript
{
  id: 7,
  title: 'Your News Title',
  slug: 'your-news-slug', // Generated automatically or custom
  excerpt: 'Short preview...',
  content: 'Full article content...',
  date: '2024-04-17',
  image: 'https://...',
  category: 'Category Name'
}
```

## 🚀 Getting Started

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will open at `http://localhost:3000`

### Build for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Responsive Design

- **Mobile**: 480px and below
- **Tablet**: 481px - 768px
- **Desktop**: 769px and above

All pages are fully responsive with:
- Mobile hamburger menu
- Flexible grid layouts
- Touch-friendly buttons
- Optimized typography

## 🎯 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 📧 Contact Form

The contact form on the `/contacts` page includes:
- Name, Email, Phone fields
- Subject dropdown
- Message textarea
- Form validation
- Success message display

## 🔍 SEO Considerations

- Meta tags in `index.html`
- Semantic HTML structure
- Meaningful slug URLs
- Page titles and descriptions
- Responsive image loading hints

## 📚 Future Enhancements

- [ ] Backend API integration
- [ ] Database for news articles
- [ ] User authentication
- [ ] Appointment booking system
- [ ] Patient testimonials
- [ ] Doctor profiles with schedules
- [ ] Real-time chat support
- [ ] Multi-language support

## 🛠 Development Tips

### Color Variables

Modify colors in `src/index.css`:

```css
:root {
  --primary-color: #007bb2;
  --secondary-color: #00d4ff;
  --primary-dark: #005a8d;
  /* ... more variables */
}
```

### Adding New Pages

1. Create a new file in `src/pages/PageName.tsx`
2. Create corresponding `PageName.css`
3. Add route in `src/App.tsx`
4. Add navigation link in `src/components/Navigation.tsx`

### Navigation

The navigation component includes:
- Responsive hamburger menu for mobile
- Active link styling
- Smooth transitions
- Logo with icon

## 📝 License

ISC

## 🙋 Support

For questions or issues, please contact the development team.

---

**Created**: April 2024  
**Last Updated**: April 2024
