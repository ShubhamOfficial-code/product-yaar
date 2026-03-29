# EdTech Support System - Setup Guide

## Quick Summary
This is a **ticket management platform** for an EdTech company with support across 5 departments:
- **Sales** - handling inquiries and payment issues
- **Finance** - managing payments, invoices, and billing
- **Tech Support** - platform technical issues
- **Academic Support** - course access and learning issues
- **General Support** - mixed/unclassified issues

---

## Project Status

### ✅ Completed
- [x] Fresh Vite + React + TypeScript setup
- [x] shadcn/ui components integrated
- [x] Tailwind CSS styling complete
- [x] All 5 department dashboards built
- [x] Ticket management UI (create, update, delete)
- [x] Real-time features infrastructure ready
- [x] Authentication context created (hardcoded - as requested)
- [x] Supabase client configured with environment variables
- [x] Database schema designed (3 tables: staff, tickets, ticket_notes)
- [x] Seed data prepared (16 realistic tickets + 6 staff members)

### ⏳ Pending: Supabase Database Setup
The app is ready but **needs you to deploy the database** in Supabase.

---

## Step 1: Get Supabase Credentials

Your credentials are already in `.env.local`:
```
VITE_SUPABASE_URL=https://jxoikdkjgkvujskjetxo.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

---

## Step 2: Deploy Database Schema

1. **Go to** [Supabase Dashboard](https://app.supabase.com)
2. **Select your project**: `jxoikdkjgkvujskjetxo`
3. **Open SQL Editor** (left sidebar → SQL Editor)
4. **Copy the entire SQL schema** from `SUPABASE_SCHEMA.sql` in this project
5. **Paste it** into the SQL Editor
6. **Click "Execute"** (Run button)

Wait for the green success message - this creates:
- `staff` table (support team members)
- `tickets` table (will be auto-populated by n8n)
- `ticket_notes` table (for comments on tickets)
- Database indexes for performance
- RLS (Row Level Security) policies

---

## Step 3: Initialize Support Team

After schema is deployed, initialize your support staff:

1. **In Supabase SQL Editor**, paste and run:
```sql
SELECT initialize_staff();
```

This inserts your 6 support team members:
- **admin@edtech.com** - Admin (sees all tickets)
- **alice@edtech.com** - Sales agent
- **bob@edtech.com** - Finance agent
- **carol@edtech.com** - Tech Support agent
- **dave@edtech.com** - Academic Support agent
- **eve@edtech.com** - General Support agent

---

## Step 4: Activate n8n Automation

**Important:** Tickets come from n8n automation, not manual entry.

1. **Go to n8n dashboard**
2. **Open** "Product Yaar : Support Automation" workflow
3. **Click Activate** (top right button)
4. Workflow now polls Gmail **every 1 minute** for new support emails

How it works:
- Receives emails from support inbox
- AI analyzes and classifies them (department, priority, issue type)
- Automatically creates tickets in Supabase
- Dashboard shows them in real-time

See `N8N_AUTOMATION_GUIDE.md` for detailed automation documentation.

---

## Step 5: Start the App

```bash
npm run dev
```

The app will:
1. Connect to Supabase
2. Show tickets created by n8n (initially empty until emails arrive)
3. Subscribe to real-time updates
4. Auto-populate as new emails create tickets

---

## Step 6: Test with Sample Email

To verify everything works:

1. **Send a test email** to your support Gmail address:
   - **Subject:** "Video not loading in my course"
   - **Body:** "I can't watch the videos, they won't load at all"

2. **Watch n8n process it** (within 1 minute):
   - n8n reads the email
   - Gemini AI classifies as "Performance Issue" → Tech Support, Medium priority
   - Ticket is created in Supabase

3. **Check the dashboard** (http://localhost:5173):
   - Refresh page
   - New ticket appears in Tech Support dashboard
   - Status: "Open", assigned_to: NULL (agent can assign)

---

## What You Need

- ✅ Supabase account (free tier)
- ✅ n8n account with workflow configured
- ✅ Gmail account connected to n8n
- ✅ Google Gemini API key (in n8n)
- ✅ Node.js 18+ installed

---

## Database Schema Overview

### `staff` Table
| Field | Type | Purpose |
|-------|------|---------|
| id | UUID | Primary key |
| email | TEXT | Unique identifier |
| name | TEXT | Display name |
| role | TEXT | 'admin' or 'agent' |
| department | TEXT | Which department they work in |
| is_active | BOOLEAN | Active status |
| created_at | TIMESTAMP | Record creation time |

**Sample Data:**
- admin@edtech.com - Admin
- alice@edtech.com - Sales Agent
- bob@edtech.com - Finance Agent
- carol@edtech.com - Tech Support Agent
- dave@edtech.com - Academic Support Agent
- eve@edtech.com - General Support Agent

### `tickets` Table
| Field | Type | Purpose |
|-------|------|---------|
| id | UUID | Primary key |
| ticket_id | TEXT | Human-readable ID (TKT-001) |
| sender_email | TEXT | Customer email (real domains) |
| subject | TEXT | Ticket title |
| summary | TEXT | Detailed description |
| department | TEXT | Which department owns it |
| priority | TEXT | Critical/High/Medium/Low |
| status | TEXT | Open/In Progress/Resolved/Closed |
| issue_type | TEXT | Specific issue category |
| assigned_to | TEXT | Agent email |
| date_time | TIMESTAMP | When ticket was created |
| created_at | TIMESTAMP | Record creation time |

**Sample Issue Types by Department:**
- **Sales**: "Enterprise Payment Issue", "Corporate Bulk Inquiry", "Trial Inquiry"
- **Finance**: "Payment Gateway Failure", "Payment Processing Error", "Invoice & Tax Request", "Subscription Inquiry"
- **Tech Support**: "System Outage", "Authentication Failure", "Performance Issue", "Mobile App Bug"
- **Academic Support**: "Course Access Issue", "Assignment Submission Error", "Certificate Delay"
- **General Support**: "Multi-Department Issue", "Feedback"

### `ticket_notes` Table
| Field | Type | Purpose |
|-------|------|---------|
| id | UUID | Primary key |
| ticket_id | UUID | Foreign key to tickets |
| author | TEXT | Who wrote the note |
| text | TEXT | Note content |
| created_at | TIMESTAMP | When note was added |

---

## Features Included

### Authentication (Currently Hardcoded)
- No Supabase Auth yet (as requested)
- Hardcoded users in `AuthContext.tsx`
- Admin can see all tickets
- Agents see their department's tickets
- No password validation

### Ticket Management
- ✅ View all tickets (filtered by department for agents)
- ✅ Create new tickets
- ✅ Update ticket status
- ✅ Reassign tickets to different agents
- ✅ Move tickets between departments
- ✅ Add notes/comments on tickets
- ✅ Filter by priority, status, and date
- ✅ Real-time updates (when Supabase events trigger)

### Dashboard Features
- Department-specific dashboards
- Statistics (open, in-progress, resolved, closed counts)
- Priority-based sorting
- Time-based filtering
- Visual indicators (colors by department/priority)

---

## Environment Variables

Already set in `.env.local`:
```
VITE_SUPABASE_URL=https://jxoikdkjgkvujskjetxo.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

If you need to change these:
1. Edit `.env.local`
2. Restart dev server (`npm run dev`)

---

## Troubleshooting

### Error: "Failed to load resource: 404"
**Problem:** Tables don't exist in Supabase
**Solution:**
1. Go to Supabase dashboard
2. Run the SQL schema (Step 2 above)
3. Refresh the app

### Error: "Missing Supabase environment variables"
**Problem:** .env.local is missing
**Solution:**
1. Create `.env.local` in project root
2. Paste the credentials:
```
VITE_SUPABASE_URL=https://jxoikdkjgkvujskjetxo.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### No data showing up
**Problem:** Seed data not inserted
**Solution:**
1. Run `SELECT seed_initial_data();` in Supabase SQL Editor
2. Wait 2-3 seconds
3. Refresh the app in browser

### Real-time updates not working
**Problem:** WebSocket connection issue
**Solution:**
1. Check if Supabase project is active
2. Open DevTools → Console to see any errors
3. Try hard-refreshing browser (Ctrl+Shift+R)

---

## File Locations

| File | Purpose |
|------|---------|
| `.env.local` | Supabase credentials (don't commit) |
| `SUPABASE_SCHEMA.sql` | SQL schema to deploy |
| `src/integrations/supabase/client.ts` | Supabase client configuration |
| `src/contexts/TicketContext.tsx` | Data fetching and real-time logic |
| `src/contexts/AuthContext.tsx` | Authentication (hardcoded) |
| `src/lib/constants.ts` | Type definitions and constants |

---

## Next Steps (Future)

1. **Real Supabase Auth** - Replace hardcoded auth with actual Supabase Auth
2. **Backend API** - Add Node.js/Supabase Functions for complex operations
3. **Email Notifications** - Send alerts when tickets are assigned
4. **Advanced Filtering** - More search and filter options
5. **Mobile App** - React Native version

---

## Support

For issues or questions, check:
1. Console errors (DevTools → Console)
2. Supabase dashboard (should show data in tables)
3. Network tab (check if requests are succeeding)

