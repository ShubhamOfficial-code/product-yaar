# Authentication Configuration Guide

## Current Setup

Your system uses **hardcoded demo credentials** for testing and development.

### Demo Credentials

```
Email:    demo@edtech.com
Password: Demo@123
```

**These credentials are displayed on the login page** with copy buttons and auto-fill functionality.

See **[DEMO_LOGIN_GUIDE.md](./DEMO_LOGIN_GUIDE.md)** for how to use them.

---

## 🔐 How to Change Credentials

### Step 1: Locate the Credentials

Open `src/contexts/AuthContext.tsx`:

```typescript
// Lines 7-8 in AuthContext.tsx
const ADMIN_EMAIL = 'demo@edtech.com';
const ADMIN_PASSWORD = 'Demo@123';
```

### Step 2: Change Email (Optional)

Replace the email:

```typescript
const ADMIN_EMAIL = 'your-email@yourdomain.com'; // Change this
const ADMIN_PASSWORD = 'Demo@123';
```

### Step 3: Change Password (Optional)

Replace the password:

```typescript
const ADMIN_EMAIL = 'demo@edtech.com';
const ADMIN_PASSWORD = 'YourNewPassword123!'; // Change this
```

### Step 4: Sync Changes to Login Page

Also update the login page display in `src/pages/Login.tsx`:

```typescript
// Lines 19-20 in Login.tsx
const demoEmail = 'your-email@yourdomain.com'; // Update this
const demoPassword = 'YourNewPassword123!'; // Update this
```

### Step 5: Save & Test

1. Save both files
2. Dev server auto-reloads
3. Go to http://localhost:5173/login
4. New credentials should be displayed
5. Try logging in ✅

---

## 🔑 Password Requirements

- **Minimum 8 characters**
- **Mix of uppercase, lowercase, numbers, and symbols** (recommended)
- **Avoid using in other places** (keep unique)

### Good Passwords
```
✅ DemoPass123!
✅ EdTech@Support2024
✅ SecurePass789#
```

### Bad Passwords
```
❌ password
❌ 123456
❌ demo
```

---

## 📝 How Credentials Appear

The login page displays credentials in a blue box with:

✅ **Email field**
- Shows: `demo@edtech.com`
- Copy button to clipboard
- Auto-fill button

✅ **Password field**
- Shows: `Demo@123`
- Copy button to clipboard
- Auto-fill button

✅ **Auto-fill Button**
- Populates both fields instantly
- One-click demo access

---

## 🔄 Who Can Log In?

**Only ONE combination works:**
```
Email:    demo@edtech.com (or your custom email)
Password: Demo@123 (or your custom password)
```

**Everyone else gets** → "Invalid email or password"

---

## 📋 Login Flow

```
User enters email & password (or uses auto-fill)
       ↓
Checks against hardcoded ADMIN_EMAIL & ADMIN_PASSWORD
       ↓
If BOTH match:
  ✅ Find user in database
  ✅ Log them in as admin
  ✅ Redirect to dashboard
       ↓
If NOT match:
  ❌ Show "Invalid email or password" error
  ❌ Stay on login page
```

---

## ⚠️ Important Notes

### For Development
- Hardcoded credentials are FINE for local development
- Login page displays them prominently
- Easy to change on the fly
- No database setup needed

### For Production
- ⚠️ **DO NOT hardcoded credentials**
- Use real authentication:
  - Supabase Auth (recommended)
  - Auth0
  - Firebase Auth
  - JWT tokens

### Migration Steps (When Ready)
1. Set up Supabase Auth or similar
2. Replace hardcoded login with real authentication
3. Use `.env` variables for secrets
4. Add password hashing (bcrypt)
5. Add session management
6. Remove demo credentials from login page

---

## Testing Login

### Test #1: Correct Credentials
```
Email:    demo@edtech.com
Password: Demo@123
Expected: ✅ Login succeeds, redirects to dashboard
```

### Test #2: Wrong Email
```
Email:    wrong@email.com
Password: Demo@123
Expected: ❌ "Invalid email or password" error
```

### Test #3: Wrong Password
```
Email:    demo@edtech.com
Password: wrongpassword
Expected: ❌ "Invalid email or password" error
```

### Test #4: Using Auto-fill
```
1. Click "Auto-fill" button
2. Fields populate with demo@edtech.com and Demo@123
3. Click "Sign In"
Expected: ✅ Login succeeds
```

---

## Files Modified

| File | Changes |
|------|---------|
| **src/contexts/AuthContext.tsx** | Lines 7-8: Demo email & password |
| **src/pages/Login.tsx** | Lines 19-20: Display email & password on page |

---

## Next Steps

### For Development
1. Use demo credentials to test the system
2. Change them anytime in AuthContext.tsx
3. Update Login.tsx display when you change them

### Before Deployment
1. Decide if you want to change demo credentials
2. Update both AuthContext.tsx and Login.tsx
3. Test login works with new credentials

### Before Production
1. Switch to real authentication (Supabase Auth)
2. Remove hardcoded credentials
3. Use environment variables for secrets
4. Set up proper session management

---

## Related Documentation

- **[DEMO_LOGIN_GUIDE.md](./DEMO_LOGIN_GUIDE.md)** - How to use demo login on page
- **[PROJECT_SETUP.md](./PROJECT_SETUP.md)** - Local development setup
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Production deployment

---

## Troubleshooting

### "Invalid email or password" error

**Check:**
1. Email matches exactly: `demo@edtech.com`
2. Password matches exactly: `Demo@123`
3. No extra spaces before/after
4. Caps Lock is off

### Can't see credentials on login page

**Check:**
1. You're at http://localhost:5173/login
2. Blue "Demo Credentials" box is visible below login form
3. Copy and auto-fill buttons are clickable

### Want to change credentials

**Do this:**
1. Open `src/contexts/AuthContext.tsx`
2. Change lines 7-8
3. Open `src/pages/Login.tsx`
4. Change lines 19-20
5. Save and refresh browser

---

**Status: ✅ Ready for Demo & Development**

