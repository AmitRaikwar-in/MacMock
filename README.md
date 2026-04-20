# AR Mac Portfolio

[![codecov](https://codecov.io/github/onemanfighter/ar-mac-portfolio/graph/badge.svg?token=J7DOMHTNPB)](https://codecov.io/github/onemanfighter/ar-mac-portfolio)

## Description

**AR Mac Portfolio** is an interactive, highly dynamic single-page application (SPA) portfolio designed to simulate the experience of Apple's macOS. It offers visitors a unique, immersive way to explore projects, skills, and background information through a familiar desktop interface.

## ✨ Features

- **Mac OS Experience**: Complete with a boot screen, login/lock screen, and a fully functional desktop environment.
- **Interactive Window Management**: Windows can be dragged, resized, maximized, and minimized, mimicking a real operating system.
- **Immersive Full-Screen**: Automatically requests full-screen mode upon the first user interaction for an uninterrupted experience.
- **Theming & Customization**: Features dark mode compatibility and sleek, glassmorphic UI elements.
- **Internationalization (i18n)**: Built-in support for multiple languages.
- **Robust State Management**: Powered by Zustand for lightweight, fast, and scalable global state handling.

## 🛠 Technology Stack

This project is built using modern web development tools and best practices:

- **Core**: React 18, TypeScript
- **State Management**: Zustand, Immer
- **Styling & UI**: Chakra UI, Emotion, Framer Motion
- **Windowing Effects**: `react-draggable`, `react-resizable`, `react-full-screen`
- **Routing**: React Router DOM (v6)
- **Search**: Fuse.js (for internal file/app searching)
- **Testing**: Jest, React Testing Library, Cypress
- **CI/CD**: GitHub Actions (Linting, Coverage, Deployment)
- **Package Manager**: Yarn v4

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js (v18 or higher) and Yarn installed.

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:onemanfighter/ARMacPortfolio.git
   cd ARMacPortfolio
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the development server:

   ```bash
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🧪 Testing

Run unit tests and generate coverage reports:

```bash
yarn test:cov
```

Run Cypress end-to-end tests:

```bash
yarn cy:open
```

## 📜 License

This project is licensed under the MIT License.
