# Architecture Guide

## Overview

This template follows a feature-based architecture with clear separation of concerns. It's designed to be simple, scalable, and easy to understand during exams or rapid development.

## Core Principles

1. **Simplicity First** - No over-engineering
2. **Type Safety** - TypeScript everywhere
3. **Reusability** - DRY (Don't Repeat Yourself)
4. **Separation of Concerns** - Each file has one job
5. **Composition** - Build complex UIs from simple components

## Folder Structure Explained

### `/src/app`

Next.js App Router pages. Each folder represents a route.

- **Purpose**: Define routes and page layouts
- **Contains**: Page components, layouts, loading states, error boundaries
- **Rule**: Keep pages thin - delegate logic to features/hooks

### `/src/components`

Reusable UI components split into two categories:

#### `/ui`

Base, generic components with no business logic.

- **Examples**: Button, Input, Modal, Table
- **Rule**: Should work in any context
- **Props**: Generic and flexible

#### `/shared`

Composed components that combine UI components.

- **Examples**: FormField, Navbar, EmptyState
- **Rule**: Can have some app-specific logic
- **Props**: More specific to app needs

### `/src/features`

Feature-specific components organized by domain.

- **Purpose**: Business logic components
- **Structure**: One folder per feature (auth, users, posts)
- **Contains**: Forms, lists, detail views specific to that feature
- **Rule**: Can use services, hooks, and shared components

### `/src/services`

API communication layer.

- **Purpose**: All backend communication
- **Pattern**: One service per resource
- **Rule**: Return promises, don't handle UI concerns

```typescript
// Good
export const userService = {
  getAll: () => api.get<User[]>('/users'),
};

// Bad - don't handle UI in services
export const userService = {
  getAll: () => {
    toast.loading('Loading...');
    return api.get<User[]>('/users');
  },
};
```

### `/src/hooks`

Custom React hooks for reusable logic.

- **Purpose**: Encapsulate stateful logic
- **Pattern**: One hook per resource or concern
- **Rule**: Should be pure and reusable

### `/src/lib`

Utility functions and configurations.

- **Purpose**: Pure functions and setup
- **Contains**: Axios config, auth utils, constants
- **Rule**: No React dependencies

### `/src/providers`

React Context providers.

- **Purpose**: Global state management
- **Rule**: Use sparingly - prefer TanStack Query for server state

### `/src/types`

TypeScript type definitions.

- **Purpose**: Shared types across the app
- **Rule**: Keep in sync with backend types

## Data Flow

### 1. User Interaction

```
User clicks button → Component handler → Hook/Service
```

### 2. API Request

```
Service → Axios → Interceptor (add token) → Backend
```

### 3. Response Handling

```
Backend → Axios → Interceptor (handle errors) → Service → Hook → Component
```

### 4. State Update

```
TanStack Query updates cache → Component re-renders
```

## Authentication Flow

```
1. User submits login form
2. LoginForm calls authService.login()
3. Service returns { token, user }
4. AuthProvider stores token in localStorage
5. AuthProvider updates user state
6. Axios interceptor attaches token to future requests
7. Middleware protects routes
8. If 401 error, interceptor removes token and redirects
```

## Component Patterns

### Smart vs Dumb Components

**Smart (Container) Components**

- Fetch data
- Handle business logic
- Pass data to dumb components

```typescript
// Smart
function UsersPage() {
  const { data, isLoading } = useUsers();
  return <UserList users={data} isLoading={isLoading} />;
}
```

**Dumb (Presentational) Components**

- Receive data via props
- Focus on UI
- No API calls

```typescript
// Dumb
function UserList({ users, isLoading }) {
  if (isLoading) return <Loader />;
  return <Table data={users} columns={columns} />;
}
```

### Form Pattern

All forms follow this pattern:

1. Define Zod schema
2. Use React Hook Form with zodResolver
3. Use TanStack Query mutation
4. Handle success/error with toast

```typescript
const schema = z.object({ ... });
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
});
const mutation = useMutation({ ... });
const onSubmit = (data) => mutation.mutate(data);
```

## State Management Strategy

### Server State (TanStack Query)

Use for data from the backend:

- User lists
- Posts
- Any API data

**Why?** Handles caching, loading, errors automatically.

### Client State (React State)

Use for UI state:

- Modal open/closed
- Form inputs
- Tabs/accordions

**Why?** Simple and local to component.

### Global State (Context)

Use sparingly for:

- Current user
- Theme
- Language

**Why?** Avoid prop drilling for truly global data.

## Error Handling

### Levels

1. **Component Level** - Try/catch in event handlers
2. **Hook Level** - onError in mutations
3. **Service Level** - Axios interceptor
4. **Page Level** - Error boundaries
5. **App Level** - Global error boundary

### Strategy

```typescript
// 1. Service catches network errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle globally
    }
    return Promise.reject(error);
  }
);

// 2. Hook handles business errors
const mutation = useMutation({
  onError: (error) => {
    toast.error(error.message);
  },
});

// 3. Component handles UI errors
try {
  await someAction();
} catch (error) {
  setLocalError(error);
}
```

## Performance Considerations

### What We Do

1. **Code Splitting** - Next.js automatic
2. **Image Optimization** - Next.js Image component
3. **Query Caching** - TanStack Query
4. **Memoization** - Only when needed

### What We Don't Do

1. **Premature Optimization** - Keep it simple first
2. **Over-Memoization** - React is fast enough
3. **Complex State Management** - Avoid Redux unless necessary

## Testing Strategy (Future)

### Priority Order

1. **Integration Tests** - Test user flows
2. **Component Tests** - Test UI components
3. **Unit Tests** - Test utilities

### Tools (when needed)

- Jest
- React Testing Library
- Playwright (E2E)

## Deployment

### Build Process

```bash
npm run build  # Creates optimized production build
npm run start  # Serves production build
```

### Environment Variables

- Development: `.env.local`
- Production: Set in hosting platform

### Hosting Options

- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Docker + any cloud

## Scaling Considerations

### When to Refactor

1. **Component > 200 lines** - Split into smaller components
2. **File > 300 lines** - Extract logic to hooks/utils
3. **Repeated code** - Create reusable component/hook
4. **Complex state** - Consider state machine (XState)

### Adding Features

1. Define types in `/types`
2. Create service in `/services`
3. Create hook in `/hooks`
4. Create feature components in `/features`
5. Create page in `/app`

## Best Practices

### Do's

✅ Use TypeScript strictly
✅ Validate with Zod
✅ Handle loading states
✅ Show error messages
✅ Use semantic HTML
✅ Keep components small
✅ Write descriptive names
✅ Use absolute imports (@/)

### Don'ts

❌ Don't use `any` type
❌ Don't ignore errors
❌ Don't fetch in components (use hooks)
❌ Don't store server data in Context
❌ Don't over-abstract
❌ Don't skip loading states
❌ Don't hardcode values

## Common Pitfalls

### 1. Token Not Persisting

**Problem**: Token lost on refresh

**Solution**: Store in localStorage, not state

### 2. Infinite Re-renders

**Problem**: Component keeps re-rendering

**Solution**: Check useEffect dependencies

### 3. Stale Data

**Problem**: Data not updating after mutation

**Solution**: Invalidate queries after mutation

### 4. CORS Errors

**Problem**: Can't connect to backend

**Solution**: Enable CORS on backend

## Exam Tips

1. **Know the structure** - Where things go
2. **Copy patterns** - Don't reinvent
3. **Use TypeScript** - Catch bugs early
4. **Test as you go** - Don't wait until the end
5. **Read error messages** - They're usually helpful
6. **Use the examples** - EXAMPLES.md has common patterns
7. **Keep it simple** - Don't over-engineer

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [TanStack Query Docs](https://tanstack.com/query)
- [React Hook Form Docs](https://react-hook-form.com)
- [Zod Docs](https://zod.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
