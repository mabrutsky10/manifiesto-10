# Manifiesto +10

Ultra-minimal, manifesto-first bilingual landing page (ES/EN) for "Manifiesto +10: Los derechos del fútbol que jugamos todos".

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- No external dependencies (pure React)

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

This project is Vercel-ready. Simply connect your repository to Vercel and deploy.

## Features

- ✅ Bilingual (ES/EN) with client-side language switching
- ✅ Ultra-minimal editorial design
- ✅ Fully accessible (semantic HTML, ARIA labels, focus states)
- ✅ Smooth scroll navigation
- ✅ Responsive (mobile-first)
- ✅ No tracking, no CMS
- ✅ Performance optimized

## Customization

### Footer Links

Update the placeholder URLs in `src/components/Footer.jsx`:

- Line 15: "Leer el completo" link
- Line 22: "Ir a +10" link
- Line 29: "Listado de productos" link
- Line 36: "Me quiero sumar" link

### Contact Email

Update the contact email in `src/i18n.js`:
- `footer.contact` in both `es` and `en` objects

## Structure

```
src/
  ├── components/
  │   ├── Header.jsx
  │   ├── Hero.jsx
  │   ├── RightSection.jsx
  │   ├── GrowthSubsections.jsx
  │   ├── Closing.jsx
  │   └── Footer.jsx
  ├── i18n.js
  ├── App.jsx
  ├── main.jsx
  └── index.css
```
