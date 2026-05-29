# Quick Start Guide

Get up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure Environment

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Step 3: Start Backend

Make sure your Express backend is running on port 5000.

## Step 4: Start Frontend

```bash
npm run dev
```

## Step 5: Test

1. Open http://localhost:3000
2. You'll be redirected to `/login`
3. Register a new account
4. Login with your credentials
5. Access protected routes: `/dashboard`, `/profile`, `/users`

## Common Issues

### CORS Error

Add this to your Express backend:

```typescript
import cors from 'cors';
app.use(cors({ origin: 'http://localhost:3000' }));
```

### Token Not Attaching

Check that your backend returns the token in this format:

```json
{
  "success": true,
  "data": {
    "token": "your-jwt-token",
    "user": { ... }
  }
}
```

### 401 Unauthorized

Ensure your backend accepts the token in the `Authorization` header:

```
Authorization: Bearer <token>
```

## Next Steps

- Customize components in `src/components/`
- Add new pages in `src/app/`
- Create new services in `src/services/`
- Add custom hooks in `src/hooks/`

## Tips for Exams

1. **Know the structure** - Familiarize yourself with the folder layout
2. **Reuse components** - Don't rebuild Button, Input, etc.
3. **Copy patterns** - Use LoginForm as a template for other forms
4. **Use hooks** - TanStack Query handles loading/error states
5. **Check types** - TypeScript will catch most bugs

## Useful Commands

```bash
npm run dev        # Development
npm run build      # Production build
npm run lint       # Check code
npm run format     # Format code
```

Happy coding! 🚀
