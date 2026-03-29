# n8n Support Automation Setup

## Overview

Your support system is **fully automated via n8n**. Support emails are:
1. **Received in Gmail** (support inbox)
2. **Analyzed by AI** (Google Gemini) for classification
3. **Automatically inserted** into Supabase tickets table
4. **Displayed in real-time** in the web dashboard

**No manual data entry needed!** Tickets are created automatically from emails.

---

## n8n Workflow Architecture

```
┌─────────────┐     ┌──────────────────┐     ┌──────────────────┐     ┌──────────────┐
│ Gmail       │    │ Google Gemini AI  │    │ Extract Fields   │    │ Supabase     │
│ (every min) │──→ │ (classify email)  │──→ │ (structure data) │──→ │ (insert row) │
└─────────────┘     └──────────────────┘     └──────────────────┘     └──────────────┘

  Polling         AI Classification       Data Parsing           Database
```

---

## Workflow Steps

### 1️⃣ **Gmail Trigger** (Every 1 minute)
Polls Gmail for new support emails:
- **Subject:** Support inquiry
- **Body:** Problem description
- **Sender:** Customer email address

### 2️⃣ **Google Gemini AI** (Intelligent Classification)
Analyzes email content and extracts:
- **Department:** Sales, Finance, Tech Support, Academic Support, General Support
- **Priority:** Critical, High, Medium, Low (based on urgency & department rules)
- **Issue Type:** Specific category (e.g., "Payment Failure", "Course Access Issue")
- **Summary:** One-sentence AI-generated description
- **Ticket ID:** Unique identifier for tracking

**AI Classification Logic:**
```
Sales        → Pricing, inquiries, enrollment issues, demo requests
Finance      → Payments, refunds, invoices, billing questions
Tech Support → Login problems, crashes, performance, outages
Academic     → Course access, assignments, certificates
General      → Mixed or unclear issues
```

### 3️⃣ **Data Extraction** (Structured Output Parser)
Converts AI response into structured JSON matching Supabase schema:
```json
{
  "ticket_id": "TKT-20250329001",
  "sender_email": "customer@example.com",
  "subject": "Login not working",
  "summary": "Student cannot login with credentials",
  "department": "Tech Support",
  "priority": "High",
  "issue_type": "Login Issue",
  "date_time": "2026-03-29T10:30:00Z",
  "status": "Open"
}
```

### 4️⃣ **Supabase Insert** (Create Ticket Row)
Automatically inserts into `tickets` table:
- ✅ All fields populated by n8n
- ✅ Status defaults to "Open"
- ✅ assigned_to is NULL (agents assign later)
- ✅ Linked to sender_email (customer)

---

## Field Mapping: n8n → Supabase

| n8n Output | Supabase Field | Type | Example |
|-----------|----------------|------|---------|
| ticket_id | ticket_id | TEXT | TKT-20250329001 |
| sender_email | sender_email | TEXT | student@email.com |
| subject (from Gmail) | subject | TEXT | "Payment failed for course" |
| summary | summary | TEXT | "Student payment blocked at checkout" |
| department | department | TEXT | Finance |
| priority | priority | TEXT | High |
| issue_type | issue_type | TEXT | Payment Failure |
| date_time (current) | date_time | TIMESTAMP | 2026-03-29T10:30:00Z |
| (auto) | status | TEXT | Open |
| (auto) | assigned_to | TEXT | NULL |

---

## Real-world Example

### ❌ Before (Manual Process)
```
Customer sends email → Support person reads → Types into database → Assigns→ Dashboard updates
                      (5 minutes) + manual errors
```

### ✅ After (n8n Automation)
```
Customer sends email → n8n reads & analyzes → Auto-inserts into DB → Dashboard shows instantly
                      (1 minute automatically, no errors)
```

---

## How to Monitor

### 1. Check n8n Workflow
- Log into n8n dashboard
- Open "Product Yaar : Support Automation" workflow
- View execution history
- See what emails were processed and how they were classified

### 2. Check Supabase for New Tickets
- Go to Supabase dashboard
- Open "tickets" table
- Filter by TODAY's date
- Verify tickets match emails sent

### 3. Check Web Dashboard
- Open http://localhost:5173
- Tickets appear in real-time
- Department dashboards auto-populate
- No refresh needed (real-time subscriptions)

---

## Priority Rules (As Per n8n AI)

### Sales Department
- **Critical:** N/A (sales rarely critical)
- **High:** Student ready to pay but blocked; urgent deadline
- **Medium:** Pricing question, demo request, course inquiry
- **Low:** General browsing, casual interest

### Finance Department
- **Critical:** Payment gateway down (multiple users affected)
- **High:** Charge deducted but access denied; old refund dispute (7+ days)
- **Medium:** Refund request, invoice query, payment verification
- **Low:** Billing question, no transaction involved

### Tech Support Department
- **Critical:** Website/dashboard completely down; system outage
- **High:** Cannot login at all; paid course inaccessible due to bug
- **Medium:** Video buffering, minor errors, slow performance
- **Low:** Cosmetic UI issues, feature suggestions

### Academic Support Department
- **Critical:** N/A
- **High:** Access denied after valid enrollment; certificate blocked
- **Medium:** Assignment question, lecture inquiry, progress sync issue
- **Low:** General academic curiosity, non-urgent follow-up

### General Support Department
- **Critical & High:** N/A
- **Medium:** Mixed/unclear complaint that could affect access/payments
- **Low:** Vague feedback, suggestions, compliments

---

## Initial Setup

### Step 1: Deploy Database Schema
```bash
# In Supabase SQL Editor, run:
# 1. Paste entire SUPABASE_SCHEMA.sql
# 2. Click Execute
```

This creates tables but NO sample data (we don't want demo tickets).

### Step 2: Initialize Staff Members
```bash
# In Supabase SQL Editor, run:
SELECT initialize_staff();
```

This creates your 6 support team members:
- admin@edtech.com (Admin - See all)
- alice@edtech.com (Sales Agent)
- bob@edtech.com (Finance Agent)
- carol@edtech.com (Tech Support Agent)
- dave@edtech.com (Academic Support Agent)
- eve@edtech.com (General Support Agent)

### Step 3: Activate n8n Workflow
In n8n dashboard:
1. Open "Product Yaar : Support Automation"
2. Click **Activate** (top right)
3. Workflow now runs **every 1 minute**

### Step 4: Start Web App
```bash
npm run dev
```

App connects to Supabase and displays tickets as they're created by n8n.

### Step 5: Send Test Email
Send an email to your support Gmail address:

**Subject:** "I can't login to my account"
**Body:** "I've tried resetting my password but still can't access the course. Help!"

**Within 1 minute:**
- n8n processes the email
- AI classifies it as "Login Issue" → Tech Support, High priority
- Ticket appears in dashboard automatically

---

## Troubleshooting

### No tickets appearing?

**Check 1: Is n8n workflow active?**
- Open n8n dashboard
- Check if "Product Yaar : Support Automation" shows "Active"
- If not, click Activate button

**Check 2: Are emails being sent to the right address?**
- Check Gmail inbox configured in n8n
- Make sure support emails go to THAT address
- Test with a manual email

**Check 3: Check n8n execution history**
- Click workflow → Open execution logs
- Look for errors or skipped runs
- Check if Gmail credentials are valid

**Check 4: Check Supabase connection**
- Open n8n workflow → "Create a row" node
- Verify Supabase credentials are correct
- Test connection button

### Tickets not showing in dashboard?

**Check 1: Are tickets in Supabase?**
```bash
# In Supabase SQL Editor:
SELECT * FROM tickets ORDER BY created_at DESC LIMIT 5;
```
If this returns tickets, the problem is frontend.

**Check 2: Is frontend connecting to Supabase?**
- Open http://localhost:5173
- Open DevTools Console (F12)
- Look for connection errors
- Check network tab for Supabase requests

**Check 3: Refresh page**
- Hard reload: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Wait 2-3 seconds for data to load

### n8n showing errors?

**"Gmail authentication failed"**
- Check Gmail API credentials in n8n
- Re-authenticate Gmail OAuth2

**"Supabase connection failed"**
- Check Supabase credentials in n8n
- Verify project is active (not paused)
- Test in Supabase dashboard first

**"AI classification failed"**
- Check Google Gemini API key
- Verify quota isn't exceeded
- Check format of incoming email

---

## Performance Notes

| Metric | Performance |
|--------|-------------|
| **Email to Ticket** | ~1 minute (polling interval) |
| **AI Classification** | ~3-5 seconds |
| **Database Insert** | <1 second |
| **Dashboard Update** | Real-time (WebSocket) |
| **Cost** | n8n: ~$0.10/email, Gemini: ~$0.001/email |

---

## Next Steps

1. ✅ Deploy database schema (`SUPABASE_SCHEMA.sql`)
2. ✅ Initialize staff (`SELECT initialize_staff();`)
3. ✅ Activate n8n workflow (click Activate button)
4. ✅ Start web app (`npm run dev`)
5. ✅ Send test email to support inbox
6. ✅ Verify ticket appears in dashboard within 1 minute

---

## Important Notes

- **No demo data:** Schema is clean, no sample tickets (all come from n8n)
- **assigned_to is NULL:** Agents assign tickets manually in dashboard
- **Real email addresses:** Only real customer emails create tickets
- **Real-time updates:** Tickets appear instantly when created by n8n
- **Scalable:** n8n can handle 1000+ emails per day on standard plan

---

## Support Files

| File | Purpose |
|------|---------|
| `SUPABASE_SCHEMA.sql` | Database tables (no demo data) |
| `Product Yaar _ Support Automation (1).json` | n8n workflow definition |
| `PROJECT_SETUP.md` | Full setup guide |
| `.env.local` | Supabase credentials |

---

**Status:** 🟢 Ready for Production (no demo data, fully automated)
