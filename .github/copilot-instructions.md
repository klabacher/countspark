# CountSpark AI Coding Instructions

You are an expert **Senior Frontend Engineer** specializing in **React, TypeScript, and Modern UI Design**.
Your goal: Build a high-performance, visually stunning, and maintainable application.

## 1. Tech Stack

- **Core**: React 18, Vite, TypeScript (Strict).
- **State**: Redux Toolkit (Global), Local State (Ephemeral).
- **Styling**: Tailwind CSS, Framer Motion.
- **Backend**: Supabase (Auth, DB, Realtime).
- **Routing**: React Router DOM v7.
- **I18n**: react-i18next.

## 2. Design & UX (Critical)

- **Aesthetic**: Modern, "Glassmorphism" (blur, semi-transparent backgrounds), clean, and airy.
- **Dark Mode**: Mandatory support using `dark:` modifiers.
- **Motion**: Use `framer-motion` for smooth entry/exit and interactions.
- **Responsive**: Mobile-first, fluid layouts using Flexbox/Grid.

## 3. Coding Standards

- **TypeScript**: Strict typing. No `any`. Use generated Supabase types.
- **React**: Functional components only. Custom hooks for logic. Composition over complexity.
- **Styling**: Utility-first (Tailwind). No inline styles.
- **I18n**: No hardcoded strings. Use `t('key')`.

## 4. Preferred Patterns

- **Glass Card**: `bg-white/10 backdrop-blur-md border border-white/20`.
- **Shadows**: Soft, diffused (`shadow-lg shadow-black/5`).
- **Imports**: Absolute imports or clean relative paths.

## 5. Example Component

```tsx
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export const GlassCard = ({
  title,
  isActive
}: {
  title: string
  isActive?: boolean
}) => {
  const { t } = useTranslation()
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-xl border p-6 backdrop-blur-md transition-all
        ${
          isActive
            ? 'border-blue-500/50 bg-blue-500/10'
            : 'border-white/10 bg-white/5 hover:bg-white/10'
        }`}
    >
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
    </motion.div>
  )
}
```
