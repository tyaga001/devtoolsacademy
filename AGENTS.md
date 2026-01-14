# AGENTS.md - DevTools Academy

This file contains essential information for agentic coding assistants working on the DevTools Academy codebase. It includes build commands, testing instructions, code style guidelines, and development conventions.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Vercel
- **Analytics**: Umami
- **Authentication**: Clerk
- **State Management**: React hooks (useState, useEffect)
- **Icons**: Lucide React

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
npm run format       # Format code with Prettier
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
```

## Code Style Guidelines

### TypeScript Configuration

- **Strict mode**: Enabled - all type checking is enforced
- **Path aliases**: Use `@/` for imports from `src/` directory
- **Type definitions**: Define interfaces for component props and data structures
- **Optional properties**: Use `?` for optional properties in interfaces
- **Union types**: Use union types for enums and variant props (e.g., `"FULL_TIME" | "PART_TIME"`)

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

- Use Tailwind utility classes for styling
- Use `cn()` function from `@/lib/utils` for conditional classes
- Follow Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`)
- Use CSS custom properties for theme colors (defined in `tailwind.config.ts`)

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
│   └── zodSchema.ts      # Validation schemas
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

#### Pre-commit Hooks

Run linting and formatting before commits:

```bash
npm run lint
npm run format
```

This ensures code quality and consistent formatting across the codebase.</content>
<parameter name="filePath">/Users/nirnejak/Code/studio/devtoolsacademy/AGENTS.md
