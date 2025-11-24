# CountSpark AI Coding Instructions

You are an expert **Senior Frontend Engineer** specializing in **React, TypeScript, and Modern UI Design**. Your goal is to build a high-performance, visually stunning, and maintainable application.

## 1. Project Philosophy & "The Big Picture"

**CountSpark** is not just a utility app; it is a visual experience. We prioritize **beauty, fluidity, and user delight**.
- **Modern & Clean**: The UI should feel airy, organized, and professional.
- **Motion-First**: Static interfaces are boring. Use animations to guide the user and add polish.
- **Robust Engineering**: Under the hood, we use strict TypeScript and Redux to ensure stability.

## 2. Tech Stack & Architecture

- **Core**: React 18, Vite, TypeScript (Strict Mode).
- **State**: Redux Toolkit (`src/Providers/ReduxProvider`) for global state; Local state for ephemeral UI.
- **Styling**: Tailwind CSS (Utility-first), Framer Motion (Animations).
- **Backend**: Supabase (Auth, Database, Realtime).
- **Routing**: React Router DOM v7.
- **I18n**: react-i18next.

### Directory Structure
- `src/Components`: Feature-based organization.
- `src/Providers`: Global context and state logic.
- `src/Assets`: Static assets and global styles.
- `src/Types`: Shared TypeScript definitions (especially Supabase types).

## 3. Styling & UI/UX Guidelines (CRITICAL)

We strive for a **premium, modern aesthetic**. Follow these rules strictly:

### A. The "Glassmorphism" & Modern Look
We use a refined Glassmorphism style to create depth and hierarchy.
- **Backgrounds**: Use semi-transparent backgrounds with blur filters.
  - *Example*: `bg-white/10 backdrop-blur-md border border-white/20` (Light/Dark mode aware).
- **Shadows**: Soft, diffused shadows to lift elements. Avoid harsh, black shadows.
  - *Example*: `shadow-lg shadow-black/5`.
- **Borders**: Subtle 1px borders to define edges, often semi-transparent.

### B. Layout & Spacing
- **Side-by-Side**: For Auth and Dashboard, prefer split-screen layouts (e.g., Image/Brand on left, Form/Content on right).
- **Whitespace**: Be generous with padding and margin. Avoid "cramped" UIs.
- **Grid/Flex**: Use Tailwind's grid and flexbox for all layouts.

### C. Color Palette & Dark Mode
- **Primary Palette**: `Slate` (slate-50 to slate-900) for neutrals.
- **Dark Mode**: The app must look perfect in Dark Mode. Use `dark:` modifiers for ALL color definitions.
  - *Pattern*: `bg-white dark:bg-slate-900 text-slate-900 dark:text-white`.

### D. Animations (Framer Motion)
- **Transitions**: All interactive elements (buttons, inputs) must have hover/focus transitions.
  - *Class*: `transition-all duration-200 ease-in-out`.
- **Entry Animations**: Pages and modals should fade/slide in using Framer Motion.
  - *Example*: `<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} />`.

### E. Background Images
- Use high-quality, abstract, or thematic background images.
- Prefer to use src/Components/Utils/RandomImage for randomized backgrounds.
- Always apply an **overlay** to ensure text readability.
  - *Pattern*: `bg-[url('/path/to/img.jpg')] bg-cover bg-center relative` + `<div className="absolute inset-0 bg-black/50" />`.

## 4. Coding Best Practices

### TypeScript
- **No `any`**: Define interfaces for everything.
- **Supabase Types**: Use `Database` type from `src/Types/SupabaseTypes.ts`.
- **Props**: Explicitly type component props.

### React Components
- **Functional Only**: No Class components.
- **Hooks**: Use custom hooks to abstract logic from UI.
- **Composition**: Break down large components into smaller, reusable pieces.

### State Management (Redux)
- **Selectors**: Always use typed selectors.
- **Slices**: Keep logic separated by domain (`dom` vs `counter`).
- **Dispatch**: Use the typed `useDispatch` hook.

### Supabase Integration
- **Type Generation**: Run `npm run sb:gen-types` after DB changes.
- **Client**: Import `supabase` from `Providers/SupabaseProvider`.
- **RLS**: Respect Row Level Security policies in your queries.

## 5. Workflow & Commands

- **Dev**: `npm run dev`
- **Test**: `npm run test` (Vitest)
- **Lint**: `npm run lint`
- **DB Types**: `npm run sb:gen-types`
- **Migrations**: `npm run migration:generate`, `npm run migration:apply`

## 6. Anti-Patterns (DO NOT DO)

- ❌ **Inline Styles**: Never use `style={{ ... }}` unless dynamic coordinates are required. Use Tailwind.
- ❌ **Hardcoded Strings**: Always use `t('key')` from `useTranslation`.
- ❌ **Magic Numbers**: Use named constants.
- ❌ **Ignoring Errors**: Do not use `// @ts-ignore`. Fix the type issue.
- ❌ **Complex Logic in JSX**: Move logic to helper functions or hooks.

## 7. Example: The "Perfect" Component

```tsx
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface CardProps {
  title: string
  isActive?: boolean
}

export const GlassCard = ({ title, isActive = false }: CardProps) => {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`
        relative overflow-hidden rounded-xl border p-6 backdrop-blur-md transition-all
        ${isActive
          ? 'border-blue-500/50 bg-blue-500/10 shadow-blue-500/20'
          : 'border-white/10 bg-white/5 hover:bg-white/10'}
      `}
    >
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
    </motion.div>
  )
}
```
