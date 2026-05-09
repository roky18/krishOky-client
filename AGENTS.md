# KrishOky - Project Instructions & Guidelines

You are working on **KrishOky**, a professional agriculture-based full-stack platform. Follow these rules strictly:

## 🏗️ Technical Stack
- **Framework:** Next.js (App Router) - Latest Version.
- **Language:** TypeScript (Strict typing required).
- **Styling:** Tailwind CSS & DaisyUI.
- **Data Fetching:** TanStack Query (React Query) & Axios.
- **Animations:** Framer Motion.
- **Icons:** Lucide React.

## 🎨 Global UI & Design Rules (Golden Rules)
- **Primary Color Palette (Max 3):**
  1. Emerald Green (#10b981) - Primary/Agriculture vibe.
  2. Deep Navy (#020617) - Secondary/Dark mode background.
  3. Amber/Yellow (#facc15) - Accent for highlights.
- **Visibility:** Must support both **Light Mode** and **Dark Mode** with high contrast and accessibility.
- **Consistency:**
  - All **Cards** must have the same height, width, and border-radius.
  - Consistent spacing (padding/margin) across all pages.
- **Responsiveness:** Fully optimized for Mobile, Tablet, and Desktop.

## 🧱 Component Rules
- **Navbar:** - Sticky/Fixed position.
  - Logged Out: 4 routes (Home, Shop, About, Login).
  - Logged In: 6 routes (Home, Shop, Orders, Profile, Dashboard, Search).
- **Forms:** Must include validation, error messages, success messages, and loading indicators.
- **Dummy Content:** NEVER use "lorem ipsum" or dummy text. Use realistic agricultural data.

## 📂 Project Structure
- Use `@/*` import aliases.
- Keep components in `src/components`.
- Keep business logic/API calls in `src/hooks` or `src/services`.
- Providers should stay in `src/providers`.

## 🤖 AI Features
- Integration with **Google Gemini API** for features like:
  - AI Chatbot for farmers.
  - AI Content Generator for product descriptions.
  - AI Review Summarizer.

Remember: Keep the UI clean, professional, and consistent. 🌿