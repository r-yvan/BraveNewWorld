# Next.js Frontend Template

A production-ready, reusable Next.js frontend template designed for simplicity, clean architecture, and rapid development. Perfect for exams, hackathons, and school projects.

## 🚀 Features

- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Axios** with interceptors for API calls
- **TanStack Query** for server state management
- **React Hook Form** + **Zod** for form validation
- **JWT Authentication** with secure token storage
- **Sonner** for toast notifications
- **Lucide React** for icons
- **Route Protection** via middleware
- **Reusable Components** (Button, Input, Table, Modal, etc.)

## 📁 Project Structure

```
src/
├── app/                    # Next.js pages
│   ├── login/             # Login page
│   ├── register/          # Register page
│   ├── dashboard/         # Dashboard page
│   ├── profile/           # Profile page
│   └── users/             # Users page
├── components/
│   ├── ui/                # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Loader.tsx
│   │   ├── Modal.tsx
│   │   └── Table.tsx
│   └── shared/            # Shared components
│       ├── FormField.tsx
│       ├── Navbar.tsx
│       └── EmptyState.tsx
├── features/              # Feature-specific components
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   └── users/
├── hooks/                 # Custom React hooks
│   └── useUsers.ts
├── lib/                   # Utilities
│   ├── axios.ts          # Axios instance
│   ├── auth.ts           # Auth utilities
│   ├── cn.ts             # Class name merger
│   └── constants.ts      # App constants
├── providers/             # Context providers
│   ├── AuthProvider.tsx
│   └── QueryProvider.tsx
├── services/              # API services
│   ├── api.ts
│   ├── auth.service.ts
│   └── user.service.ts
├── types/                 # TypeScript types
│   └── index.ts
└── middleware.ts          # Route protection
```

## 🛠️ Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication Flow

1. **Login/Register** - User submits credentials
2. **Token Storage** - JWT token stored in localStorage
3. **Auto Attach** - Axios interceptor attaches token to requests
4. **Route Protection** - Middleware checks token for protected routes
5. **Auto Redirect** - Redirects to login if unauthorized (401)

## 📡 API Integration

### Backend Requirements

This template expects a REST API with these endpoints:

```
POST   /api/auth/login       - Login
POST   /api/auth/register    - Register
GET    /api/auth/me          - Get current user
GET    /api/users            - Get all users
GET    /api/users/:id        - Get user by ID
PUT    /api/users/:id        - Update user
DELETE /api/users/:id        - Delete user
```

### Response Format

All API responses should follow this structure:

```json
{
  "success": true,
  "data": { ... },
  "message": "Success message"
}
```

### Error Format

```json
{
  "success": false,
  "message": "Error message",
  "errors": { ... }
}
```

## 🎨 Components

### Button

```tsx
<Button variant="primary" size="md" isLoading={false}>
  Click Me
</Button>
```

### Input

```tsx
<Input label="Email" type="email" error="Invalid email" />
```

### Table

```tsx
<Table
  data={users}
  columns={[
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
  ]}
/>
```

### Modal

```tsx
<Modal isOpen={true} onClose={() => {}} title="Modal Title">
  Content here
</Modal>
```

## 🪝 Custom Hooks

### useUsers

```tsx
const { data, isLoading, error } = useUsers();
```

### useAuth

```tsx
const { user, login, logout, isLoading } = useAuth();
```

## 🔒 Route Protection

Protected routes are defined in `middleware.ts`:

```typescript
const protectedRoutes = ['/dashboard', '/profile', '/users'];
```

## 📝 Forms with Validation

```tsx
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
});
```

## 🎯 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint errors
```

## 🧪 Testing with Backend

1. Start your Express backend on port 5000
2. Ensure backend has CORS enabled
3. Start frontend: `npm run dev`
4. Navigate to `http://localhost:3000`

## 🚦 Quick Start Checklist

- [ ] Install dependencies
- [ ] Set up `.env.local`
- [ ] Start backend server
- [ ] Run `npm run dev`
- [ ] Test login/register
- [ ] Verify protected routes work

## 📚 Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **TanStack Query** - Data fetching
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Sonner** - Toast notifications
- **Lucide React** - Icons

## 🎓 Perfect For

- School projects
- Hackathons
- Practical exams
- Quick prototypes
- Learning projects

## 🤝 Backend Integration

This template is designed to work seamlessly with the Express + TypeScript + Prisma backend template. Both templates follow the same conventions and response formats.

## 📄 License

MIT

## 🙏 Contributing

Feel free to customize this template for your needs!
