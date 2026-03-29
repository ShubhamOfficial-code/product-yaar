# Supabase Connection Verification Checklist

Use this checklist to verify that your Supabase database is properly configured and connected.

## ✅ Pre-Deployment Checklist

### 1. Supabase Project Created
- [ ] Go to https://app.supabase.com
- [ ] Project exists with ID: `jxoikdkjgkvujskjetxo`
- [ ] Note: Credentials are in `.env.local`

### 2. Environment Variables Set
- [ ] `.env.local` exists in project root
- [ ] Contains `VITE_SUPABASE_URL`
- [ ] Contains `VITE_SUPABASE_ANON_KEY`
- [ ] No tracking in Git (in `.gitignore`)

## ✅ Database Schema Deployment

### 3. SQL Schema Deployed
- [ ] Opened Supabase SQL Editor
- [ ] Copied entire `SUPABASE_SCHEMA.sql` file
- [ ] Pasted into SQL Editor
- [ ] Clicked "Execute" successfully
- [ ] No errors in console

### 4. Tables Created
Verify in Supabase dashboard under "Table Editor":
- [ ] `staff` table exists (6 records from seed)
- [ ] `tickets` table exists
- [ ] `ticket_notes` table exists

### 5. Seed Data Inserted
- [ ] Ran: `SELECT seed_initial_data();`
- [ ] Got success message
- [ ] Wait 2-3 seconds for data to persist

### 6. Verify Data in Dashboard
In Supabase Table Editor, verify:
- [ ] `staff` table: 6 rows (admin + 5 agents)
- [ ] `tickets` table: 16 rows (sample tickets)
- [ ] `ticket_notes` table: At least 1 row

## ✅ Application Connection

### 7. Start Development Server
```bash
npm run dev
```
- [ ] Server started on localhost:5173
- [ ] No error messages in terminal

### 8. Open Application
- [ ] Navigate to http://localhost:5173
- [ ] Page loads without errors
- [ ] No 404 errors in DevTools Console

### 9. Check Console for Errors
Open DevTools (F12) and check Console tab:
- [ ] No "Failed to load resource" errors
- [ ] No "Missing Supabase environment variables" errors
- [ ] No permission/RLS errors

### 10. Verify Data Loading
- [ ] App shows 16 tickets loading
- [ ] Each department dashboard shows relevant tickets
- [ ] No visible error messages on page

## ✅ Real-Time Features

### 11. Real-Time Subscriptions
- [ ] No WebSocket errors in Console
- [ ] Data updates when you edit in another tab
- [ ] Create a new ticket in one tab
- [ ] Appears immediately in other tab

### 12. CRUD Operations
- [ ] Can update a ticket status
- [ ] Can re-assign ticket to different agent
- [ ] Can move ticket to different department
- [ ] Can add a note to a ticket

## 🔍 Troubleshooting Commands

### Check Connection Status
```javascript
// Paste in DevTools Console:
import { supabase } from '/src/integrations/supabase/client.ts'
const { data, error } = await supabase.from('staff').select('*').limit(1)
console.log(data, error)
```

Expected: Should return 1 staff member record with no errors.

### Verify RLS Policies
```javascript
// Check if you can read tickets:
const { data, error } = await supabase.from('tickets').select('*').limit(1)
console.log('Tickets:', data, error)

// Check if you can read notes:
const { data: notes, error: notesError } = await supabase.from('ticket_notes').select('*').limit(1)
console.log('Notes:', notes, notesError)
```

### Test Insert Permission
```javascript
// Try to create a test note (should work with RLS):
const { data, error } = await supabase
  .from('ticket_notes')
  .insert({
    ticket_id: '<copy-any-ticket-id>',
    author: 'Test Author',
    text: 'Test note'
  })
console.log(data, error)
```

## ❌ Common Issues & Solutions

### Issue: "Failed to load resource: the server responded with a status of 404"

**Cause:** Tables don't exist in Supabase
**Solution:**
1. Go to Supabase dashboard
2. Open SQL Editor
3. Run the SUPABASE_SCHEMA.sql file
4. Run `SELECT seed_initial_data();`
5. Refresh the app

### Issue: "Missing Supabase environment variables"

**Cause:** .env.local is missing or invalid
**Solutions:**
1. Create `.env.local` in project root
2. Paste correct credentials:
   ```
   VITE_SUPABASE_URL=https://jxoikdkjgkvujskjetxo.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGci...
   ```
3. Restart dev server: `npm run dev`

### Issue: "relation 'public.staff' does not exist"

**Cause:** Schema wasn't deployed yet
**Solution:**
1. Go to Supabase SQL Editor
2. Copy and run SUPABASE_SCHEMA.sql
3. Wait for completion
4. Refresh app

### Issue: No data appears in app

**Cause:** Either tables are empty or seed didn't run
**Solutions:**
1. Go to Supabase Table Editor
2. Check if `tickets` table has 16 rows
3. If empty, run `SELECT seed_initial_data();`
4. Wait 2-3 seconds
5. Refresh browser

### Issue: Real-time updates not working

**Cause:** WebSocket connection issue
**Solutions:**
1. Check Supabase project is active
2. Open DevTools → Console
3. Look for WebSocket errors
4. Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
5. Check browser firewalls/VPN aren't blocking WebSocket

### Issue: Permission denied errors

**Cause:** RLS policies not allowing access
**Solution:**
1. Check RLS policies are deployed (run schema again)
2. Policies should all have `USING (true)` for now
3. If still failing, disable RLS temporarily:
   ```sql
   ALTER TABLE staff DISABLE ROW LEVEL SECURITY;
   ALTER TABLE tickets DISABLE ROW LEVEL SECURITY;
   ALTER TABLE ticket_notes DISABLE ROW LEVEL SECURITY;
   ```

## 📋 Files to Check

If troubleshooting, review these files:

1. **`.env.local`** - Should have Supabase credentials
2. **`src/integrations/supabase/client.ts`** - Client configuration
3. **`src/contexts/TicketContext.tsx`** - Data fetching logic
4. **`SUPABASE_SCHEMA.sql`** - Check schema syntax

## ✅ Final Verification

Once all checks pass:
- [ ] All 16 sample tickets visible
- [ ] Can see tickets by department
- [ ] Can create new tickets
- [ ] Can update ticket status
- [ ] Real-time updates work
- [ ] No errors in Console

## 📊 Expected Data After Setup

### Staff (6 members)
```
- admin@edtech.com (Admin - Sales)
- alice@edtech.com (Agent - Sales)
- bob@edtech.com (Agent - Finance)
- carol@edtech.com (Agent - Tech Support)
- dave@edtech.com (Agent - Academic Support)
- eve@edtech.com (Agent - General Support)
```

### Tickets (16 total)
```
Sales: TKT-001, TKT-002, TKT-003
Finance: TKT-004, TKT-005, TKT-006, TKT-007
Tech Support: TKT-008, TKT-009, TKT-010, TKT-011
Academic Support: TKT-012, TKT-013, TKT-014
General Support: TKT-015, TKT-016
```

## 🎉 Success Criteria

If all of the following are true, your setup is complete:

1. ✅ App runs on localhost:5173
2. ✅ No console errors
3. ✅ 16 tickets visible
4. ✅ Tickets organized by department
5. ✅ Can interact with tickets (create, update, delete)
6. ✅ Real-time updates work (cross-tab)
7. ✅ Notes/comments work

**Status: Ready for Production** 🚀

---

For detailed setup instructions, see [PROJECT_SETUP.md](./PROJECT_SETUP.md)
