# AGENTS.md - DevTools Academy

This file contains essential information for agentic coding assistants working on the DevTools Academy codebase. It includes build commands, testing instructions, code style guidelines, and development conventions.

## Tech Stack

- **Framework**: Next.js 16 with App Router (React 19, TypeScript 5.9)
- **Language**: TypeScript (strict mode enabled, ES2017 target)
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM v7
- **Deployment**: Vercel
- **Analytics**: Umami, Vercel Analytics, Vercel Speed Insights
- **Authentication**: Clerk
- **State Management**: React hooks (useState, useEffect)
- **Icons**: Lucide React
- **Additional Libraries**: Motion (animations), Mermaid (diagrams), Algolia (search), MDX (content)

## Build, Lint, and Test Commands

### Development

```bash
npm run dev          # Start development server on http://localhost:3000
npm run build        # Build for production
npm run start        # Start production server
```

### Code Quality

```bash
npm run lint         # Run ESLint across the codebase
npm run lint:fix     # Run ESLint with auto-fix
npm run format       # Format code with Prettier
npm run format:check # Check if code is formatted correctly
npm run type-check   # Run TypeScript type checking
```

### Database

```bash
npm run migrate      # Run Prisma database migrations
npm run db-create    # Create and push database schema
```

### Testing

**Note**: This project currently does not have automated tests configured. When adding tests:

1. Install a testing framework like Jest or Vitest
2. Add test scripts to `package.json`
3. Create tests in `__tests__/` directories or alongside components with `.test.tsx` extension
4. Use `npm run test` or `npm run test:watch` for running tests

For running a single test file (once testing is set up):

```bash
npm run test -- path/to/test/file.test.tsx
# or
npx jest path/to/test/file.test.tsx
# or (for Vitest)
npx vitest run path/to/test/file.test.tsx
```

### Running Tests and Linting Before Commits

ALWAYS run these commands before committing changes:

```bash
npm run type-check  # Ensure TypeScript compilation passes
npm run lint        # Check for linting errors
npm run format:check # Verify code formatting
# Run tests if available: npm run test
```

## Code Style Guidelines

### TypeScript Configuration

- **Strict mode**: Enabled - all type checking is enforced
- **Target**: ES2017
- **Path aliases**:
  - `@/*` → `./src/*`
  - `@/components/*` → `./src/components/*`
  - `@/lib/*` → `./src/lib/*`
  - `@prisma` → `prisma`
- **Type definitions**: Define interfaces for component props and data structures
- **Optional properties**: Use `?` for optional properties in interfaces
- **Union types**: Use union types for enums and variant props (e.g., `"FULL_TIME" | "PART_TIME" | "CONTRACT" | "FREELANCE" | "INTERNSHIP"`)

### Import Organization

Group imports in this order:

1. React imports
2. Third-party libraries (alphabetically)
3. Local imports (using `@/` aliases)
4. Type imports (using `import type`)

```typescript
import React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { JobCardInterface } from "@/lib/types"
```

### Component Patterns

#### Function Components

```typescript
interface ComponentNameProps {
  // Define props interface
}

const ComponentName: React.FC<ComponentNameProps> = ({ prop1, prop2 }) => {
  return (
    // JSX
  )
}

export default ComponentName
```

#### Components with Refs

```typescript
export interface ComponentNameProps extends React.HTMLAttributes<HTMLElement> {
  // Additional props
}

const ComponentName = React.forwardRef<HTMLElement, ComponentNameProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("base-classes", className)} {...props}>
        {/* Content */}
      </div>
    )
  }
)
ComponentName.displayName = "ComponentName"
```

### Styling Conventions

#### Tailwind CSS

- Use Tailwind CSS v4 utility classes for styling
- Use `cn()` function from `@/lib/utils` for conditional classes
- Follow Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`)
- Use CSS custom properties for theme colors (defined in `tailwind.config.ts`)
- Safelist includes `mermaid` for diagram support

#### Class Variance Authority (CVA)

For component variants, use `cva` from `class-variance-authority`:

```typescript
import { cva, type VariantProps } from "class-variance-authority"

const componentVariants = cva("base-classes", {
  variants: {
    variant: {
      default: "default-styles",
      secondary: "secondary-styles",
    },
    size: {
      sm: "small-styles",
      lg: "large-styles",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  },
})

export interface ComponentProps extends VariantProps<typeof componentVariants> {
  // Other props
}
```

### Formatting Conventions

#### Prettier Configuration

```json
{
  "endOfLine": "lf",
  "semi": false,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### Naming Conventions

#### Files and Directories

- **Components**: PascalCase (`JobCard.tsx`, `UserProfile.tsx`)
- **Utilities**: camelCase (`utils.ts`, `formatDate.ts`)
- **Types**: PascalCase with `Interface` suffix (`JobCardInterface`)
- **Directories**: lowercase with hyphens if needed (`job-categories`, `user-profile`)

#### Variables and Functions

- **camelCase**: Regular variables, functions, and component props
- **PascalCase**: Component names, interfaces, types
- **UPPER_CASE**: Constants and environment variables
- **Prefix with `is`/`has`/`can`**: Boolean variables (`isLoading`, `hasError`)

### Error Handling

#### React Error Boundaries

Wrap components that might throw errors:

```typescript
class ErrorBoundary extends React.Component {
  // Implementation
}
```

#### API Error Handling

```typescript
try {
  const response = await fetch("/api/data")
  if (!response.ok) throw new Error("API request failed")
  const data = await response.json()
} catch (error) {
  console.error("Error fetching data:", error)
  // Handle error state
}
```

#### Component Error States

```typescript
const [error, setError] = useState<string | null>(null)
const [isLoading, setIsLoading] = useState(false)

// Handle errors in async operations
const handleSubmit = async () => {
  setIsLoading(true)
  setError(null)
  try {
    // Operation
  } catch (err) {
    setError(err instanceof Error ? err.message : "An error occurred")
  } finally {
    setIsLoading(false)
  }
}
```

### Form Handling

#### Controlled Components

```typescript
const [formData, setFormData] = useState({ email: "", password: "" })

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
}
```

#### Form Validation

Use Zod schemas for validation:

```typescript
import { z } from "zod"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type FormData = z.infer<typeof formSchema>
```

### Database and API Patterns

#### Prisma Queries

```typescript
// In API routes
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function GET() {
  try {
    const data = await prisma.table.findMany()
    return Response.json(data)
  } catch (error) {
    return Response.json({ error: "Database error" }, { status: 500 })
  }
}
```

#### API Route Structure

- Use `route.ts` files in `app/api/` directory
- Export named functions: `GET`, `POST`, `PUT`, `DELETE`
- Return `Response` objects or `NextResponse`

### Performance Best Practices

#### Image Optimization

Use Next.js `Image` component or custom `OptimizedImage`:

```typescript
import Image from "next/image"
import { OptimizedImage } from "@/components/ui/OptimizedImage"
```

#### Code Splitting

- Use dynamic imports for large components
- Leverage Next.js automatic code splitting

#### Memoization

```typescript
import React from "react"

const MemoizedComponent = React.memo(({ data }) => {
  // Component logic
})
```

### Accessibility

#### ARIA Labels

```typescript
<button aria-label="Close modal">×</button>
<img alt="Descriptive text" />
```

#### Keyboard Navigation

Ensure interactive elements are keyboard accessible:

```typescript
<button onClick={handleClick} onKeyDown={(e) => e.key === 'Enter' && handleClick()}>
  Click me
</button>
```

#### Screen Reader Support

Use semantic HTML and ARIA attributes as needed.

### Security Considerations

#### Environment Variables

- Store sensitive data in environment variables
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Never commit secrets to version control

#### Input Validation

- Validate all user inputs on both client and server
- Use Zod schemas for runtime validation
- Sanitize user-generated content

#### Authentication

- Use Clerk for authentication flows
- Protect sensitive routes with middleware
- Implement proper session management

### Git Workflow

#### Commit Messages

Follow conventional commit format:

```
feat: add user authentication
fix: resolve login form validation bug
docs: update API documentation
style: format code with prettier
refactor: simplify component structure
```

#### Branch Naming

```
feature/user-authentication
bugfix/login-validation
hotfix/security-patch
```

#### Pull Requests

- Create descriptive PR titles and descriptions
- Reference related issues
- Ensure CI checks pass
- Request review from maintainers

### File Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   ├── (routes)/          # Route groups
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── (feature)/        # Feature-specific components
├── lib/                  # Utilities and configurations
│   ├── prisma.ts         # Database client
│   ├── types.ts          # TypeScript interfaces
│   ├── utils.ts          # Utility functions
│   ├── ZodSchema.ts      # Validation schemas
│   ├── toolData.json     # Tool data
│   └── tools.ts          # Tool utilities
└── assets/               # Static assets
```

### Development Tools

#### VS Code Extensions

Recommended extensions:

- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint
- Prisma

#### ESLint Configuration

Uses the new flat config format with these plugins:

- `eslint-config-next` (core web vitals and TypeScript rules)
- `eslint-config-prettier` (disables conflicting ESLint rules)
- `eslint-plugin-prettier` (runs Prettier as an ESLint rule)
- `eslint-plugin-promise` (promise-related rules)
- `eslint-plugin-better-tailwindcss` (Tailwind CSS linting)

#### Pre-commit Hooks

Run linting and formatting before commits:

```bash
npm run lint
npm run format
```

This ensures code quality and consistent formatting across the codebase.

## Additional Development Notes

### Key Libraries and Versions

- **Next.js**: 16.1.4 with App Router
- **React**: 19.2.3
- **TypeScript**: 5.9.3 (strict mode)
- **Tailwind CSS**: v4.1.18
- **Prisma**: 7.2.0
- **Clerk**: 6.36.8 (authentication)
- **Zod**: 4.3.5 (validation)
- **Lucide React**: 0.562.0 (icons)
- **Motion**: 12.27.5 (animations)
- **Algolia**: 5.47.0 (search)

### Environment Variables

- Use `NEXT_PUBLIC_` prefix for client-side accessible variables
- Store all sensitive data (API keys, database URLs, etc.) as environment variables
- Never commit `.env` files to version control
