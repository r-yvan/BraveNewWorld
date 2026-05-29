# Template Usage Checklist

## 🚀 Initial Setup

### First Time Setup

- [ ] Clone/copy the template
- [ ] Run `npm install`
- [ ] Create `.env.local` file
- [ ] Set `NEXT_PUBLIC_API_URL` in `.env.local`
- [ ] Start backend server
- [ ] Run `npm run dev`
- [ ] Test login/register at http://localhost:3000
- [ ] Verify protected routes work

### Verify Installation

- [ ] No errors in terminal
- [ ] No errors in browser console
- [ ] Can register new account
- [ ] Can login with credentials
- [ ] Redirected to dashboard after login
- [ ] Can access /profile
- [ ] Can access /users
- [ ] Logout works correctly

---

## 📖 Before You Start Coding

### Read Documentation

- [ ] Read QUICKSTART.md (5 minutes)
- [ ] Skim README.md (10 minutes)
- [ ] Bookmark EXAMPLES.md (for reference)
- [ ] Bookmark TROUBLESHOOTING.md (for issues)

### Understand Structure

- [ ] Know where pages go (`src/app/`)
- [ ] Know where components go (`src/components/`)
- [ ] Know where services go (`src/services/`)
- [ ] Know where hooks go (`src/hooks/`)
- [ ] Understand the import alias (`@/`)

### Test Existing Features

- [ ] Try all existing pages
- [ ] Test form validation
- [ ] Check error handling
- [ ] Verify loading states
- [ ] Test responsive design

---

## 🛠️ Adding a New Feature

### Planning Phase

- [ ] Define what you're building
- [ ] Check EXAMPLES.md for similar patterns
- [ ] Identify required API endpoints
- [ ] List needed components
- [ ] Plan the data flow

### Implementation Phase

#### 1. Types

- [ ] Add types to `src/types/index.ts`
- [ ] Define request/response interfaces
- [ ] Export all types

#### 2. Service

- [ ] Create service in `src/services/`
- [ ] Add CRUD methods
- [ ] Use proper types
- [ ] Test with console.log

#### 3. Hook (Optional)

- [ ] Create hook in `src/hooks/`
- [ ] Use TanStack Query
- [ ] Handle loading/error states
- [ ] Add success/error toasts

#### 4. Components

- [ ] Create feature components in `src/features/`
- [ ] Use existing UI components
- [ ] Add form validation if needed
- [ ] Handle loading/error states

#### 5. Page

- [ ] Create page in `src/app/`
- [ ] Add layout if needed
- [ ] Implement route protection
- [ ] Test thoroughly

### Testing Phase

- [ ] Test happy path
- [ ] Test error cases
- [ ] Test loading states
- [ ] Test validation
- [ ] Test on mobile
- [ ] Check browser console for errors
- [ ] Check network tab for API calls

---

## 🔍 Code Quality Checklist

### Before Committing

- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] No console.logs left
- [ ] All imports resolve
- [ ] Code is formatted (run `npm run format`)
- [ ] No unused variables
- [ ] No commented-out code

### Component Checklist

- [ ] Has proper TypeScript types
- [ ] Handles loading state
- [ ] Handles error state
- [ ] Handles empty state
- [ ] Is responsive
- [ ] Uses existing components when possible
- [ ] Is not too large (< 200 lines)

### Form Checklist

- [ ] Has Zod validation schema
- [ ] Uses React Hook Form
- [ ] Shows validation errors
- [ ] Has loading state on submit
- [ ] Shows success/error toast
- [ ] Clears form after success
- [ ] Disables submit while loading

### API Integration Checklist

- [ ] Service method exists
- [ ] Proper types defined
- [ ] Error handling implemented
- [ ] Loading state shown
- [ ] Success feedback given
- [ ] Queries invalidated after mutations

---

## 🎓 Exam Day Checklist

### Before Exam

- [ ] Template is set up and working
- [ ] Backend is ready
- [ ] You know the folder structure
- [ ] You've practiced adding a feature
- [ ] You have EXAMPLES.md open
- [ ] You have TROUBLESHOOTING.md open

### During Exam

- [ ] Read requirements carefully
- [ ] Plan before coding
- [ ] Use existing patterns
- [ ] Copy from EXAMPLES.md
- [ ] Test as you go
- [ ] Don't over-engineer
- [ ] Keep it simple

### Common Exam Tasks

#### Add a new page

- [ ] Create page in `src/app/[name]/page.tsx`
- [ ] Add to navbar if needed
- [ ] Add route protection if needed
- [ ] Test navigation

#### Add a form

- [ ] Copy form pattern from EXAMPLES.md
- [ ] Update Zod schema
- [ ] Update field names
- [ ] Test validation
- [ ] Test submission

#### Add API integration

- [ ] Add types
- [ ] Create service method
- [ ] Create hook (optional)
- [ ] Use in component
- [ ] Test with backend

#### Add a table

- [ ] Use Table component
- [ ] Define columns
- [ ] Fetch data with hook
- [ ] Handle loading/error
- [ ] Test display

---

## 🐛 Debugging Checklist

### When Something Breaks

- [ ] Read the error message
- [ ] Check browser console
- [ ] Check network tab
- [ ] Check TROUBLESHOOTING.md
- [ ] Try the quick fixes
- [ ] Restart dev server
- [ ] Clear cache (`rm -rf .next`)

### Common Issues

#### Can't connect to backend

- [ ] Backend is running
- [ ] CORS is enabled
- [ ] API URL is correct in `.env.local`
- [ ] Restarted dev server after env change

#### Token not working

- [ ] Token is stored in localStorage
- [ ] Axios interceptor is attaching it
- [ ] Backend expects `Bearer <token>`
- [ ] Token hasn't expired

#### Data not updating

- [ ] Query is invalidated after mutation
- [ ] Using correct query key
- [ ] No caching issues

#### TypeScript errors

- [ ] All imports are correct
- [ ] Types are defined
- [ ] No `any` types
- [ ] Run `npm run build` to see all errors

---

## 🚢 Deployment Checklist

### Pre-Deployment

- [ ] Run `npm run build` successfully
- [ ] Test production build locally (`npm run start`)
- [ ] All features work in production mode
- [ ] Environment variables documented
- [ ] No console.logs in production code
- [ ] No hardcoded URLs

### Deployment

- [ ] Set environment variables on hosting platform
- [ ] Deploy backend first
- [ ] Update `NEXT_PUBLIC_API_URL` to production backend
- [ ] Deploy frontend
- [ ] Test all features in production
- [ ] Check for CORS issues
- [ ] Verify authentication works

### Post-Deployment

- [ ] Test login/register
- [ ] Test all protected routes
- [ ] Test on mobile
- [ ] Check browser console for errors
- [ ] Monitor for issues

---

## 📊 Performance Checklist

### Optimization

- [ ] Images are optimized
- [ ] No unnecessary re-renders
- [ ] Queries are cached properly
- [ ] No memory leaks
- [ ] Bundle size is reasonable

### Monitoring

- [ ] Check Lighthouse score
- [ ] Check Core Web Vitals
- [ ] Monitor error rates
- [ ] Check load times

---

## 🎯 Project Completion Checklist

### Features

- [ ] All required features implemented
- [ ] All features tested
- [ ] Error handling everywhere
- [ ] Loading states everywhere
- [ ] Responsive on all devices

### Code Quality

- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Code is formatted
- [ ] No unused code
- [ ] Comments where needed

### Documentation

- [ ] README updated if needed
- [ ] Environment variables documented
- [ ] Setup instructions clear
- [ ] Known issues documented

### Testing

- [ ] Manual testing complete
- [ ] All user flows tested
- [ ] Edge cases tested
- [ ] Error cases tested

---

## 🎉 Success Indicators

You're done when:

- [ ] All features work as expected
- [ ] No errors in console
- [ ] No TypeScript errors
- [ ] Build succeeds
- [ ] Tests pass (if you added tests)
- [ ] Code is clean and readable
- [ ] Documentation is updated
- [ ] You're proud of the code

---

## 📝 Notes

### Tips

- Start simple, add complexity only if needed
- Test frequently, not just at the end
- Use existing patterns, don't reinvent
- Read error messages carefully
- Ask for help when stuck

### Remember

- Simplicity > Complexity
- Working > Perfect
- Done > Perfect
- Tested > Untested
- Documented > Undocumented

---

**Good luck! You've got this! 🚀**
