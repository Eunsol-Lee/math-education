# Agent Guidelines for math-education

## Commands
- **Build**: `npm run build` (Next.js with Turbopack)
- **Dev**: `npm run dev` (Next.js dev server with Turbopack)
- **Lint**: `npm run lint` (ESLint with Next.js rules)
- **No tests configured** - add Jest/Cypress if needed

## Code Style
- **Framework**: Next.js 15 App Router, React 19, TypeScript strict mode
- **Styling**: Tailwind CSS v4 with CSS custom properties for theming
- **Imports**: Use `@/*` path mapping for src/, type imports for TypeScript types
- **Components**: PascalCase naming, proper React.ReactNode typing
- **Formatting**: Follow ESLint Next.js core-web-vitals rules
- **Error Handling**: Use try/catch for async operations, proper TypeScript error types
- **Naming**: camelCase for variables/functions, PascalCase for components/types