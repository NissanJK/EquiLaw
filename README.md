
# Equilaw

Equilaw is a single-page application built with modern web technologies like React and Vite, designed for high performance and scalability.

## Features

- **React**: Dynamic, component-based user interface.
- **Vite**: Lightning-fast development and build tool.
- **Tailwind CSS**: Streamlined, utility-first styling.
- **Toastify**: Customizable and responsive notifications.

## Live Demo

🌐 [Live Site](https://equilaw-v2.netlify.app/)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps to Set Up the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/NissanJK/EquiLaw.git
   cd equilaw
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build the project for production:
   ```bash
   npm run build
   ```

5. Serve the production build (optional):
   ```bash
   npm run preview
   ```

## Project Structure

```
Equilaw/
├── dist/                    # Production build files
├── node_modules/            # Installed dependencies
├── public/                  # Static assets (e.g., images, icons)
├── src/                     # Main source code
│   ├── assets/              # Images, fonts, and other assets
│   ├── components/          # Reusable React components
│   ├── layout/              # Layout components (e.g., header, footer)
│   ├── pages/               # Page-level components for routing
│   ├── utils/               # Utility functions and helpers
│   ├── App.css              # Global app-specific styles
│   ├── App.jsx              # Main application component
│   ├── index.css            # Global CSS and Tailwind imports
│   ├── main.jsx             # Entry point for the React app
├── .gitignore               # Git ignore file
├── eslint.config.js         # ESLint configuration
├── index.html               # Entry HTML file for the app
├── package-lock.json        # Dependency lock file
├── package.json             # Project dependencies and scripts
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.js           # Vite configuration
└── README.md                # Project documentation
```

## Deployment

After building the project (`npm run build`), the `dist/` folder contains:
- **index.html**: The main entry file.
- **JavaScript and CSS bundles**: Optimized and minified for production.

You can deploy the `dist/` folder to any static hosting service like:
- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- [GitHub Pages](https://pages.github.com/)


