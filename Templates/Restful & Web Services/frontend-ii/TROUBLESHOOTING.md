# Troubleshooting Guide

## Common Issues and Solutions

### 1. Cannot Connect to Backend

**Symptoms:**

- Network errors in console
- "Failed to fetch" errors
- CORS errors

**Solutions:**

```typescript
// Backend: Enable CORS
import cors from 'cors';
app.use(cors({ origin: 'http://localhost:3000' }));

// Frontend: Check API URL
// .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Verify:**

```bash
# Check backend is running
curl http://localhost:5000/api/health

# Check frontend env
echo $NEXT_PUBLIC_API_URL
```

---

### 2. Token Not Attaching to Requests

**Symptoms:**

- 401 Unauthorized errors
- Backend says "No token provided"

**Check:**

1. Token is stored:

```typescript
console.log(localStorage.getItem('auth_token'));
```

2. Axios interceptor is working:

```typescript
// lib/axios.ts - verify this exists
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  console.log('Token:', token); // Debug
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

3. Backend expects correct format:

```
Authorization: Bearer <token>
```

---

### 3. Infinite Redirect Loop

**Symptoms:**

- Browser keeps redirecting
- "Too many redirects" error

**Cause:** Middleware or auth logic creating loop

**Solution:**

```typescript
// middleware.ts - ensure proper checks
export function middleware(request: NextRequest) {
  const token = getToken();
  const { pathname } = request.nextUrl;

  // Don't redirect if already on correct page
  if (isProtectedRoute && !token && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isPublicRoute && token && pathname !== '/dashboard') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}
```

---

### 4. Data Not Updating After Mutation

**Symptoms:**

- Create/update works but UI doesn't update
- Need to refresh page to see changes

**Solution:**

```typescript
// Invalidate queries after mutation
const mutation = useMutation({
  mutationFn: userService.create,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] }); // Add this!
    toast.success('User created');
  },
});
```

---

### 5. TypeScript Errors

**Common Errors:**

#### "Cannot find module '@/...'"

```bash
# Check tsconfig.json has paths configured
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### "Type 'X' is not assignable to type 'Y'"

```typescript
// Define proper types
interface User {
  id: string; // Not number if backend sends string
  email: string;
  name: string;
}

// Use correct type in service
return api.get<User[]>('/users'); // Not <any>
```

---

### 6. Form Validation Not Working

**Symptoms:**

- Form submits with invalid data
- No error messages shown

**Check:**

1. Zod schema is correct:

```typescript
const schema = z.object({
  email: z.string().email(), // Correct validator
  password: z.string().min(6),
});
```

2. Resolver is attached:

```typescript
const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema), // Don't forget this!
});
```

3. Errors are displayed:

```typescript
<Input {...register('email')} error={errors.email?.message} />
```

---

### 7. Environment Variables Not Working

**Symptoms:**

- `process.env.NEXT_PUBLIC_API_URL` is undefined
- API calls go to wrong URL

**Solutions:**

1. Restart dev server after changing `.env.local`
2. Ensure variable starts with `NEXT_PUBLIC_`
3. Check file is named `.env.local` not `.env`

```bash
# Restart server
npm run dev
```

---

### 8. Styles Not Applying

**Symptoms:**

- Tailwind classes not working
- Components look unstyled

**Check:**

1. Tailwind is configured:

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
};
```

2. Globals CSS imports Tailwind:

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. Clear Next.js cache:

```bash
rm -rf .next
npm run dev
```

---

### 9. Hydration Errors

**Symptoms:**

- "Hydration failed" in console
- Content flashes/changes on load

**Common Causes:**

1. Using `localStorage` during SSR:

```typescript
// Bad
const token = localStorage.getItem('token');

// Good
const [token, setToken] = useState(null);
useEffect(() => {
  setToken(localStorage.getItem('token'));
}, []);
```

2. Different server/client HTML:

```typescript
// Bad
<div>{new Date().toString()}</div>

// Good
<div suppressHydrationWarning>{new Date().toString()}</div>
```

---

### 10. Build Fails

**Symptoms:**

- `npm run build` fails
- TypeScript errors during build

**Solutions:**

1. Check all imports are correct
2. Fix TypeScript errors:

```bash
npm run build 2>&1 | grep error
```

3. Clear cache and rebuild:

```bash
rm -rf .next node_modules
npm install
npm run build
```

---

## Debugging Tips

### 1. Check Network Tab

Open DevTools → Network → Filter by XHR

- See all API requests
- Check request headers (token present?)
- Check response status and body

### 2. Console Logging

```typescript
// Service
console.log('Calling API:', url, data);

// Hook
console.log('Query data:', data);
console.log('Query error:', error);

// Component
console.log('Rendering with:', props);
```

### 3. React DevTools

Install React DevTools extension:

- Inspect component props
- Check context values
- See re-render causes

### 4. TanStack Query DevTools

```typescript
// Add to layout
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

<QueryClientProvider client={queryClient}>
  {children}
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>;
```

---

## Quick Fixes

### Clear Everything

```bash
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

### Reset Auth

```typescript
// In browser console
localStorage.clear();
location.reload();
```

### Check Backend

```bash
# Test backend directly
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password"}'
```

---

## Getting Help

### Before Asking

1. Check error message carefully
2. Search error in this guide
3. Check browser console
4. Check network tab
5. Try the quick fixes above

### When Asking

Include:

1. What you're trying to do
2. What you expected
3. What actually happened
4. Error messages (full text)
5. Code snippet (relevant part)
6. What you've tried

### Useful Commands

```bash
# Check versions
node --version
npm --version

# Check running processes
lsof -i :3000  # Frontend
lsof -i :5000  # Backend

# Kill process
kill -9 <PID>

# Check environment
env | grep NEXT_PUBLIC
```

---

## Prevention

### Best Practices

1. **Type everything** - Catch errors early
2. **Test as you go** - Don't wait until the end
3. **Read error messages** - They're usually helpful
4. **Use ESLint** - Fix warnings
5. **Commit often** - Easy to revert
6. **Keep it simple** - Avoid complexity

### Code Review Checklist

- [ ] All imports resolve
- [ ] No TypeScript errors
- [ ] Forms have validation
- [ ] Loading states shown
- [ ] Errors handled
- [ ] Queries invalidated after mutations
- [ ] Environment variables set
- [ ] No console.logs in production

---

## Still Stuck?

1. Check the EXAMPLES.md for working patterns
2. Review ARCHITECTURE.md for understanding
3. Compare with working code in the template
4. Start fresh with a minimal example
5. Ask for help with specific error messages
