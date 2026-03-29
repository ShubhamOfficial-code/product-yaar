# Demo Login Credentials

**For testing and demonstration purposes only**

---

## Quick Login

| Field | Value |
|-------|-------|
| **Email** | `demo@edtech.com` |
| **Password** | `Demo@123` |

---

## On Login Page

The login page now displays:

✅ **Demo Credentials Card** with:
  - Email and password displayed clearly
  - Copy buttons for each credential
  - "Auto-fill" button to fill fields automatically
  - Visual styling to highlight it's a demo

---

## How to Use

### Option 1: Manual Entry
1. Enter: `demo@edtech.com` in email field
2. Enter: `Demo@123` in password field
3. Click "Sign In"

### Option 2: Copy Paste
1. Click copy icon next to email
2. Paste into email field
3. Click copy icon next to password
4. Paste into password field
5. Click "Sign In"

### Option 3: Auto-fill (Fastest)
1. Click **"Auto-fill"** button
2. Both fields populate automatically
3. Click "Sign In"

---

## What You Get After Login

Once logged in as demo user, you have:
- ✅ Admin access to all departments
- ✅ View all 5 dashboards (Sales, Finance, Tech Support, Academic Support, General Support)
- ✅ Create and manage tickets
- ✅ Add notes to tickets
- ✅ Real-time updates
- ✅ Assign tickets to agents
- ✅ Update ticket status

---

## Key Features

### Login Page Improvements

1. **Demo Credentials Displayed**
   - Visible on login page in blue box
   - Easy to copy or auto-fill
   - Clear labeling

2. **Copy Buttons**
   - Click to copy each credential
   - Success checkmark appears
   - Auto-hides after 2 seconds

3. **Auto-fill Button**
   - Populates both fields instantly
   - Saves typing time
   - One-click demo setup

4. **Better UX**
   - Gradient background
   - Improved styling
   - Clear error messages
   - Loading state indicator

---

## For Different Users

### For Testers
Use auto-fill to quickly access dashboard

### For Demos
Read credentials from the visible box on login page

### For Documentation
Show screenshots with credentials visible

### For Development
Change in `src/contexts/AuthContext.tsx` if needed:
```typescript
const ADMIN_EMAIL = 'demo@edtech.com';
const ADMIN_PASSWORD = 'Demo@123';
```

---

## Testing Scenarios

### Scenario 1: Wrong Email
- Email: `wrong@edtech.com`
- Password: `Demo@123`
- Result: ❌ "Invalid email or password"

### Scenario 2: Wrong Password
- Email: `demo@edtech.com`
- Password: `WrongPassword`
- Result: ❌ "Invalid email or password"

### Scenario 3: Correct Credentials
- Email: `demo@edtech.com`
- Password: `Demo@123`
- Result: ✅ Logs in successfully

---

## Screenshots & Visuals

The login page now includes:
- 📧 **Email box** with copy button
- 🔑 **Password box** with copy button
- 🚀 **Auto-fill button** for quick access
- ✅ **Copy feedback** (checkmark appears)
- 📱 **Responsive design** (works on mobile too)
- 🎨 **Color-coded** (blue box for demo section)

---

## Mobile Friendly

The credentials box works great on mobile:
- ✅ Touchable copy buttons
- ✅ Readable font size
- ✅ Full width responsive
- ✅ Auto-fill works on mobile

---

## For Production Migration

When moving to real authentication:

1. **Remove hardcoded credentials** from `AuthContext.tsx`
2. **Use Supabase Auth** or similar service
3. **Update login form** to use real authentication
4. **Remove demo credentials box** from Login.tsx

---

## Password Policy

Current demo password:
- ✅ **8 characters** (minimum)
- ✅ **Uppercase letter** (D)
- ✅ **Lowercase letters** (emo, ass)
- ✅ **Numbers** (123)
- ✅ **Special character** (@)
- ✅ **Easy to remember** (Demo@123)

---

## FAQ

**Q: Can I change the demo credentials?**
A: Yes, edit `src/contexts/AuthContext.tsx` lines 7-8

**Q: Do I need to remember the password?**
A: No, use auto-fill or copy buttons on login page

**Q: Is this secure for production?**
A: No, this is demo only. Use real auth for production.

**Q: What if someone forgets the password?**
A: It's displayed on the login page, can't forget it!

**Q: Can I use different credentials for different users?**
A: Currently no. Only one demo user. Upgrade to real auth for multiple users.

---

**Status: ✅ Ready for Demo & Testing**

The login page makes it super easy for anyone to test the system with the demo credentials!
