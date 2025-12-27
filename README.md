# Anežka Veselá - Dance Portfolio

A modern, bilingual (Czech/English) portfolio website for contemporary dancer and dance teacher Anežka Veselá.

## 🚀 Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **i18next** for internationalization (CZ/EN)
- **React Markdown** for content rendering

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header/         # Navigation header with language toggle
│   ├── Footer/         # Footer with social media links
│   └── Layout/         # Main layout wrapper
├── pages/              # Page components
│   ├── Home/           # Homepage with hero carousel
│   ├── About/          # About page (renders about.md)
│   ├── Schedule/       # Schedule page (renders events.md)
│   └── Contact/        # Contact page (renders contact.md)
├── hooks/              # Custom React hooks
│   └── useMarkdownContent.tsx  # Hook for fetching and rendering markdown
├── i18n/               # Internationalization
│   ├── index.ts        # i18n configuration
│   └── locales/        # Translation files (cs.json, en.json)
└── App.tsx             # Main app component with routing

public/
└── content/            # Markdown content files
    ├── cs/             # Czech content
    │   ├── about.md
    │   ├── events.md
    │   └── contact.md
    └── en/             # English content
        ├── about.md
        ├── events.md
        └── contact.md
```

## ✏️ Editing Content

Content is stored in markdown files in the `public/content/` directory. Simply edit the `.md` files to update the website content:

- **About page**: `public/content/{cs|en}/about.md`
- **Schedule/Events**: `public/content/{cs|en}/events.md`
- **Contact info**: `public/content/{cs|en}/contact.md`

The website automatically renders the markdown content with proper styling.

## 🖼️ Changing Hero Images

Edit the `backgroundImages` array in `src/pages/Home/Home.tsx` to use your own photos. Replace the Unsplash URLs with your image URLs or local paths.

## 🌐 Social Media Links

Edit the `socialLinks` array in `src/components/Footer/Footer.tsx` to update social media URLs.

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages.

1. Push to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Access at: `https://janvlasaty.github.io/anezkavesela/`

### Manual Deployment

```bash
npm run build
# Upload the 'dist' folder contents to your hosting
```

## 🎨 Design

- **Colors**: Black & White, modern & bold aesthetic
- **Typography**: Inter font family
- **Images**: Grayscale filter applied to hero photos
- **Responsive**: Fully responsive design for all screen sizes

## 📝 Adding New Languages

1. Create a new translation file in `src/i18n/locales/` (e.g., `de.json`)
2. Create content folder in `public/content/` (e.g., `de/`)
3. Add the language to `src/i18n/index.ts`
4. Update the language toggle in `src/components/Header/Header.tsx`

## 📄 License

All rights reserved © Anežka Veselá
