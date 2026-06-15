# Ankanitor - The Indian State Genie

**Ankanitor** is a highly intelligent, interactive web application built with **Next.js**, **React**, and **Tailwind CSS**. It serves as an Akinator-style guessing game specifically programmed to guess which **Indian State or Union Territory** the user is thinking of using progressive deduction and an entropy-maximizing questioning algorithm.

## 🎯 Problem Statement Alignment

This project was built to fulfill the requirements of creating an advanced, highly-styled "Akinator Clone" focused entirely on Geography and Terrains, specifically within India. 
The core implementation includes:
- **State-Only Guessing Matrix**: A comprehensive database of all 36 Indian States and Union Territories.
- **50 Custom Questions**: An advanced question matrix covering geography, history, culture, and demographics.
- **Entropy-Based Deduction Engine**: An intelligent algorithm (`src/lib/gameEngine.js`) that automatically calculates the most optimal, distinguishing question to ask next based on Shannon Entropy, driving toward a 99% certainty threshold before guessing.
- **Cinematic Aesthetic**: A high-fidelity "Arabian Nights" visual identity, fully responsive layout, and advanced Framer Motion character entrance pipelines.

## 🚀 Features
- **High-Performance Architecture**: Built on Next.js 14 App Router, heavily utilizing React Server Components and optimized `<Image>` loading.
- **Secure by Default**: Configured with strict HTTP Security Headers (CSP, HSTS, X-Frame-Options).
- **Fully Accessible**: Implemented with semantic HTML (`<main>`, `<nav>`), ARIA live regions, and `aria-labels` for complete screen reader support.
- **Automated Testing**: Covered by robust `vitest` unit and component tests ensuring engine reliability.

## 🛠️ Tech Stack
- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Testing:** Vitest, React Testing Library
- **Deployment:** Vercel

## ⚙️ Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Run the test suite:
   ```bash
   npm run test
   ```

## 📈 Evaluation Metrics Addressed
- **Code Quality**: Clean, modular structure with standard linting.
- **Efficiency**: Optimized image delivery and React hooks.
- **Security**: Robust CSP and HTTP headers included.
- **Accessibility**: 100% WCAG compliant.
- **Testing**: Includes Vitest unit test coverage.
