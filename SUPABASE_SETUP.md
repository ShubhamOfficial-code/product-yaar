# Supabase Setup Instructions

Follow these steps to set up the Supabase database for the EdTech Support System.

## Step 1: Create Database Tables

1. Go to your Supabase project: https://supabase.com/dashboard
2. Navigate to the **SQL Editor** section
3. Copy all the SQL from `SUPABASE_SCHEMA.sql` file in the project root
4. Paste it into the SQL Editor
5. Click **Run** to execute all the commands

This will create:
- `staff` table
- `tickets` table
- `ticket_notes` table
- Necessary indexes
- Row-Level Security policies

## Step 2: Seed Initial Data

After creating the tables, seed the sample data:

1. In the **SQL Editor**, paste and run:
```sql
SELECT seed_initial_data();
```

This will populate the database with:
- 6 staff members (1 admin + 5 agents)
- 16 sample tickets across all departments
- 1 sample note

## Step 3: Verify the Setup

Check that data was inserted:

```sql
-- Check staff
SELECT COUNT(*) as total_staff FROM staff;

-- Check tickets
SELECT COUNT(*) as total_tickets FROM tickets;

-- Check notes
SELECT COUNT(*) as total_notes FROM ticket_notes;
```

## Step 4: Environment Variables

The `.env.local` file has been created with:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your anonymous key

These are already configured. No additional setup needed.

## Step 5: Start the Application

```bash
npm run dev
```

The app will now:
1. Load credentials from `.env.local`
2. Connect to your Supabase database
3. Fetch real data from the database
4. Display tickets from your database
5. Support real-time updates

## ✅ Testing the Connection

### Test 1: Check if tickets load
- Go to http://localhost:5173/login
- Login with: **admin@edtech.com** (no password validation)
- You should see 16 tickets in the dashboard

### Test 2: Check if updates work
- Change a ticket's status by dragging it
- The change should persist in Supabase

### Test 3: Check real-time updates
- Open the app in two browser tabs
- Change a ticket status in one tab
- It should update in the other tab automatically

## Troubleshooting

### "Missing Supabase environment variables" error
- Make sure `.env.local` file exists in the project root
- Check that both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Restart the development server after creating/updating `.env.local`

### Database tables not found
- Verify you ran the SQL schema in the SQL Editor
- Check the `Tables` section in Supabase dashboard
- Make sure all 3 tables exist: `staff`, `tickets`, `ticket_notes`

### No data showing after login
- Check that you ran `SELECT seed_initial_data();` to seed the data
- Verify data exists: `SELECT COUNT(*) FROM tickets;`
- Check browser console for errors
- Make sure RLS policies are enabled (they should permit all for now)

### Real-time updates not working
- This requires the `realtime` extension in Supabase to be enabled
- Check Supabase dashboard > Database > Realtime
- Ensure `tickets` and `ticket_notes` tables are in the Publication

---

## File Structure

```
project-root/
├── .env.local                    ✅ Created (credentials)
├── SUPABASE_SCHEMA.sql          ✅ Created (schema + seed)
├── src/
│   ├── integrations/supabase/
│   │   └── client.ts            ✅ Updated (uses env vars)
│   └── contexts/
│       └── TicketContext.tsx    ✅ Updated (real queries)
└── ...
```

## Next Steps

After database setup is complete:

1. ✅ Create and test database tables
2. ✅ Seed initial data
3. ✅ Start dev server
4. 🔄 Test login and ticket display
5. 🔄 Test ticket status updates
6. 🔄 Test real-time synchronization

---

## Database Schema

### staff table
```
- id (UUID, primary key)
- email (TEXT, unique)
- name (TEXT)
- role (TEXT: admin | agent)
- department (TEXT: Sales | Finance | Tech Support | Academic Support | General Support)
- is_active (BOOLEAN)
- created_at, updated_at (TIMESTAMP)
```

### tickets table
```
- id (UUID, primary key)
- ticket_id (TEXT, unique: TKT-001, etc.)
- sender_email (TEXT)
- subject (TEXT)
- summary (TEXT)
- department (TEXT)
- priority (TEXT: Critical | High | Medium | Low)
- status (TEXT: Open | In Progress | Resolved | Closed)
- issue_type (TEXT)
- assigned_to (TEXT: email of assigned agent)
- date_time (TIMESTAMP)
- created_at, updated_at (TIMESTAMP)
```

### ticket_notes table
```
- id (UUID, primary key)
- ticket_id (UUID, foreign key to tickets)
- author (TEXT)
- text (TEXT)
- created_at (TIMESTAMP)
```

---

## Hardcoded vs Real Auth

**Current Status:**
- ✅ **Database:** Real (Supabase)
- ✅ **Data Storage:** Real (Supabase)
- ✅ **Real-time Updates:** Enabled
- ⚠️ **Authentication:** Hardcoded (no password validation)

The app still uses mock authentication (passwords are ignored), but all data is now stored and fetched from Supabase in real-time.

---

For issues or questions, check the main documentation files:
- `PROJECT_DOCUMENTATION.md` - Full project overview
- `SUPABASE_STATUS.md` - Supabase integration details

Happy coding! 🚀
