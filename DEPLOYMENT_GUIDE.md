# Deployment Guide - EdTech Support System

**Complete step-by-step guide to deploy the entire system to production.**

---

## 📋 Pre-Deployment Checklist

### Requirements
- [ ] Node.js 18+ installed
- [ ] Supabase project created and active
- [ ] n8n instance running (cloud or self-hosted)
- [ ] Gmail account with API access configured
- [ ] Google Gemini API key obtained
- [ ] Domain/hosting provider ready (optional, for custom domain)

### Access Credentials Ready
- [ ] Supabase URL and API keys
- [ ] n8n access token/credentials
- [ ] Gmail OAuth2 credentials
- [ ] Google Gemini API key
- [ ] Hosting provider credentials (if applicable)

---

## Phase 1: Supabase Database Setup

### Step 1.1: Create Supabase Project

1. Go to [Supabase](https://app.supabase.com)
2. Click **"New Project"**
3. Fill in:
   - **Name:** EdTech Support System
   - **Database Password:** Generate strong password
   - **Region:** Choose closest to your users
   - **Plan:** Free tier works, upgrade if needed

4. Wait for project to be created (2-3 minutes)

### Step 1.2: Deploy Database Schema

1. **In Supabase dashboard**, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. **Copy entire content** from `SUPABASE_SCHEMA.sql` (in your project root)
4. **Paste** into the SQL editor
5. Click **"Execute"** (Run button)
6. Wait for green success message

**What gets created:**
- `staff` table (support team members)
- `tickets` table (support tickets)
- `ticket_notes` table (comments/notes)
- Indexes for performance
- RLS policies for security

### Step 1.3: Initialize Support Team

1. **Still in SQL Editor**, paste:
```sql
SELECT initialize_staff();
```

2. Click **Execute**
3. Your 6 support team members are now in the database:
   - admin@edtech.com
   - alice@edtech.com (Sales)
   - bob@edtech.com (Finance)
   - carol@edtech.com (Tech Support)
   - dave@edtech.com (Academic Support)
   - eve@edtech.com (General Support)

### Step 1.4: Get Supabase API Keys

1. Go to **Settings** → **API** (left sidebar)
2. Copy and **save securely**:
   - **Project URL** (VITE_SUPABASE_URL)
   - **anon public** key (VITE_SUPABASE_ANON_KEY)
3. Store in password manager or secure location

### Step 1.5: Verify Database Connection

1. **In SQL Editor**, run:
```sql
SELECT COUNT(*) as staff_count FROM staff;
```

2. Should return: `staff_count = 6`
3. If successful ✅, database is ready

---

## Phase 2: n8n Automation Setup

### Step 2.1: Prepare n8n Workflow

1. **Export your n8n workflow** as JSON:
   - You already have: `Product Yaar _ Support Automation (1).json`

2. **Import into n8n**:
   - Open n8n dashboard
   - Click **Workflows** → **Import**
   - Upload `Product Yaar _ Support Automation (1).json`

### Step 2.2: Configure Gmail Connection

1. In n8n workflow, open **Gmail Trigger** node
2. Click **Connect** on **gmailOAuth2** credentials
3. **Authorize Gmail**:
   - Choose your support email address
   - Grant access to read emails
   - Copy authorization code if prompted
4. **Select Gmail label** to monitor (usually "Inbox")
5. **Set poll interval** to "every 1 minute"

### Step 2.3: Configure Google Gemini AI

1. In workflow, open **Google Gemini Chat Model** node
2. Click **Connect** on **googlePalmApi** credentials
3. **Add your Google Gemini API key**:
   - Get from [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Paste into n8n
4. **Model:** Keep as `models/gemini-2.5-flash-lite`

### Step 2.4: Configure Supabase Connection

1. In workflow, open **Create a row** node
2. Click **Connect** on **supabaseApi** credentials
3. **Enter Supabase details**:
   - **URL:** (Copied in Step 1.4)
   - **API Key:** (Copied in Step 1.4)
4. **Table:** Select `tickets`
5. **Test connection** - should show ✅

### Step 2.5: Activate n8n Workflow

1. Click **Activate** button (top right of workflow)
2. Status should change to **"Active"**
3. Workflow now polls Gmail **every 1 minute**

### Step 2.6: Test n8n Automation

1. **Send test email** to your support Gmail:
   ```
   Subject: Video not loading in course
   Body: I can't play any videos, always get loading error
   ```

2. **Wait up to 1 minute**

3. **Check Supabase** to verify ticket was created:
   - Go to Supabase → **Table Editor**
   - Open `tickets` table
   - Look for your test email
   - Should see:
     - sender_email: (your test email)
     - department: "Tech Support"
     - priority: "Medium"
     - issue_type: "Performance Issue"
     - status: "Open"

4. **If ticket appears** ✅ n8n is working!

---

## Phase 3: Frontend Deployment

### Option A: Deploy to Vercel (Recommended)

#### Step 3A.1: Prepare Repository

1. **Ensure `.env.local` is in `.gitignore`**:
   ```
   # .gitignore
   .env.local
   node_modules/
   dist/
   ```

2. **Create `.env.example`** (without actual values):
   ```
   VITE_SUPABASE_URL=https://xxx.supabase.co
   VITE_SUPABASE_ANON_KEY=your_key_here
   ```

3. **Commit to Git**:
   ```bash
   git add .
   git commit -m "Prepare for production deployment"
   git push origin main
   ```

#### Step 3A.2: Connect to Vercel

1. Go to [Vercel](https://vercel.com/)
2. **Sign in** with GitHub account
3. Click **"Add New..."** → **"Project"**
4. **Select your repository** (ai-for-product-shravani)
5. Vercel auto-detects Vite ✅

#### Step 3A.3: Set Environment Variables

1. **In Vercel project settings**:
   - Go to **Settings** → **Environment Variables**

2. **Add variables**:
   ```
   VITE_SUPABASE_URL = https://jxoikdkjgkvujskjetxo.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIs...
   ```

3. Click **Save**

#### Step 3A.4: Deploy

1. Click **"Deploy"** button
2. Vercel builds and deploys automatically
3. You get a **live URL** (e.g., `edtech-support.vercel.app`)

#### Step 3A.5: Verify Deployment

1. Open your Vercel URL
2. Check DevTools Console for errors
3. Try logging in with `admin@edtech.com`
4. Create a test ticket
5. Check if it syncs to Supabase ✅

---

### Option B: Deploy to Netlify

#### Step 3B.1: Build Project Locally

```bash
npm run build
```

Creates optimized `dist/` folder.

#### Step 3B.2: Connect to Netlify

1. Go to [Netlify](https://netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. **Select your Git repository**
4. Netlify auto-detects Vite ✅

#### Step 3B.3: Configure Build Settings

1. **Build command:** `npm run build`
2. **Publish directory:** `dist`
3. **Environment variables:**
   ```
   VITE_SUPABASE_URL = https://jxoikdkjgkvujskjetxo.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGc...
   ```

#### Step 3B.4: Deploy

1. Click **Deploy site**
2. Netlify builds and deploys
3. You get a **live URL**

---

### Option C: Deploy to Self-Hosted Server

#### Step 3C.1: Build Project

```bash
npm run build
```

#### Step 3C.2: Upload to Server

Use **SFTP/Git/CLI** to upload `dist/` folder to your server:

```bash
# Example using SSH
scp -r dist/ user@your-server.com:/var/www/edtech-support/
```

#### Step 3C.3: Configure Web Server

**Nginx example** (`/etc/nginx/sites-available/edtech-support`):

```nginx
server {
  listen 80;
  server_name edtech-support.yourdomain.com;

  root /var/www/edtech-support;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

#### Step 3C.4: Enable HTTPS

```bash
sudo certbot certonly --webroot -w /var/www/edtech-support -d edtech-support.yourdomain.com
```

---

## Phase 4: Post-Deployment Verification

### Step 4.1: Frontend Testing

- [ ] App loads without 404 errors
- [ ] Can see 5 department dashboards
- [ ] Can log in as different users
- [ ] Dashboard shows tickets
- [ ] Create a new ticket (manual entry)
- [ ] Update ticket status
- [ ] Add note to ticket
- [ ] Real-time updates work (open in 2 tabs)

### Step 4.2: Database Testing

**In Supabase SQL Editor:**

```sql
-- Check staff
SELECT COUNT(*) FROM staff;
-- Expected: 6

-- Check tickets exist
SELECT COUNT(*) FROM tickets;
-- Expected: >0 (from n8n emails)

-- Check latest ticket
SELECT ticket_id, department, priority, status
FROM tickets
ORDER BY created_at DESC
LIMIT 1;
```

### Step 4.3: n8n Testing

1. **Send test email** to support inbox
2. **Monitor n8n**: Watch workflow execute
3. **Check Supabase**: Verify ticket appears within 1 minute
4. **Check Dashboard**: Refresh app, see ticket in real-time

### Step 4.4: API Testing

**Test Supabase API connection:**

```javascript
// In browser DevTools Console:
const { supabase } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
const client = supabase.createClient('YOUR_URL', 'YOUR_KEY');
const { data } = await client.from('staff').select('*');
console.log(data); // Should show 6 staff members
```

---

## Phase 5: Security Hardening

### Step 5.1: Supabase Security

```sql
-- Verify RLS is enabled
SELECT tablename
FROM pg_tables
WHERE tablename IN ('staff', 'tickets', 'ticket_notes');

-- Check RLS policies are active
SELECT * FROM pg_policies;
```

### Step 5.2: API Key Security

- [ ] `.env.local` is in `.gitignore`
- [ ] Never commit secrets to Git
- [ ] Rotate API keys monthly
- [ ] Use environment variables for all credentials
- [ ] Restrict Supabase API key to specific IPs (if available)

### Step 5.3: Frontend Security

- [ ] HTTPS enabled (no HTTP)
- [ ] Security headers configured:
  ```
  Content-Security-Policy
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  ```

### Step 5.4: n8n Security

- [ ] n8n protected with strong password
- [ ] Gmail credentials stored securely
- [ ] API keys never logged in console
- [ ] Workflow execution logs reviewed

---

## Phase 6: Monitoring & Maintenance

### Step 6.1: Set Up Monitoring

**Monitor in Supabase Dashboard:**
- Database performance
- API usage
- Error logs
- Realtime connections

**Monitor in n8n:**
- Workflow execution history
- Failed email processes
- Error rates
- API quota usage

### Step 6.2: Logging & Alerts

#### Supabase Monitoring

```sql
-- Monitor ticket creation rate
SELECT
  DATE_TRUNC('hour', created_at) as hour,
  COUNT(*) as tickets_created
FROM tickets
GROUP BY DATE_TRUNC('hour', created_at)
ORDER BY hour DESC
LIMIT 24;
```

#### n8n Monitoring

1. Check **executions** tab
2. Look for red (failed) executions
3. Review error messages
4. Check if quota is exceeded

### Step 6.3: Maintenance Tasks

| Task | Frequency | Action |
|------|-----------|--------|
| Backup Supabase | Daily | Enable auto-backup in Supabase |
| Review n8n logs | Weekly | Check for failed executions |
| Update dependencies | Monthly | `npm update` |
| Rotate API keys | Quarterly | Generate new keys in Supabase |
| Review security | Monthly | Audit access & permissions |
| Database cleanup | Monthly | Archive old closed tickets |

---

## Phase 7: Scaling & Optimization

### Step 7.1: Database Optimization

```sql
-- Analyze query performance
EXPLAIN ANALYZE
SELECT * FROM tickets
WHERE department = 'Sales'
AND status = 'Open'
ORDER BY priority DESC;

-- Add missing indexes if needed
CREATE INDEX idx_tickets_dept_status
ON tickets(department, status);
```

### Step 7.2: API Rate Limiting

Configure in **Supabase Project Settings** → **API**:
- Set rate limits per IP
- Monitor usage dashboard
- Adjust as needed

### Step 7.3: Caching Strategy

- Enable **CDN** on hosting provider (Vercel/Netlify automatic)
- Cache static assets aggressively
- Set appropriate TTLs

### Step 7.4: Load Testing

Before peak usage, test with load:

```bash
# Using Apache Bench
ab -n 1000 -c 10 https://your-app.com/

# Check results
# Should handle 10-50 concurrent users minimum
```

---

## Phase 8: Disaster Recovery

### Step 8.1: Backup Strategy

**Supabase Backups:**
1. Go to **Settings** → **Backups**
2. Enable **automated daily backups**
3. Store backup in secure location

**Database Backup Command:**
```bash
pg_dump postgresql://user:password@host/database > backup.sql
```

### Step 8.2: Rollback Procedure

**If deployment fails:**

```bash
# Rollback to previous deployment
git revert HEAD
npm run build
# Redeploy to your hosting

# Or restore from Supabase backup
# Contact Supabase support
```

**If n8n workflow breaks:**
1. Disable the workflow (click Activate to toggle)
2. Fix the issue (test in n8n)
3. Re-enable workflow

### Step 8.3: Data Recovery

```sql
-- If tickets are accidentally deleted
TRUNCATE tickets;
-- Restore from backup

-- Check for orphaned notes
SELECT * FROM ticket_notes
WHERE ticket_id NOT IN (SELECT id FROM tickets);
```

---

## Phase 9: Custom Domain Setup

### Step 9.1: Configure Domain DNS

For **Vercel/Netlify**, update DNS records:

**Option 1: CNAME record** (recommended)
```
Name: @
Type: CNAME
Value: cname.vercel.com (or Netlify equivalent)
```

**Option 2: A record**
```
Name: @
Type: A
Value: 76.76.19.165 (Vercel IP, varies)
```

### Step 9.2: Update Supabase CORS

In **Supabase Project Settings** → **API**:

```
Add allowed origin:
https://your-domain.com
https://www.your-domain.com
```

### Step 9.3: SSL Certificate

- **Vercel/Netlify:** Automatic ✅
- **Self-hosted:** Use Let's Encrypt (Certbot)

---

## Deployment Checklist

### Pre-Deployment
- [ ] All code committed to Git
- [ ] Environment variables prepared
- [ ] Supabase project created
- [ ] n8n workflow configured
- [ ] Gmail OAuth setup complete
- [ ] Google Gemini API key obtained

### Deployment
- [ ] Supabase schema deployed
- [ ] Staff initialized
- [ ] n8n workflow activated
- [ ] Frontend deployed to hosting
- [ ] Environment variables set in hosting

### Post-Deployment
- [ ] Frontend accessible without errors
- [ ] Database connection working
- [ ] n8n automation processing emails
- [ ] Real-time updates functioning
- [ ] Security headers configured
- [ ] Monitoring tools set up
- [ ] Backups enabled

### Go-Live
- [ ] Send test email to support inbox
- [ ] Verify ticket created automatically
- [ ] Team can access dashboard
- [ ] All 5 departments visible
- [ ] Agents can assign tickets

---

## Troubleshooting Deployment

### Frontend Won't Load
```
❌ GET requests fail with 404
✅ Solution: Check Build settings, ensure dist/ has index.html
```

### Can't Connect to Supabase
```
❌ Error: "Invalid API key"
✅ Solution: Verify key in .env.local matches Supabase dashboard
```

### n8n Not Creating Tickets
```
❌ Workflow shows "Inactive"
✅ Solution: Click Activate button
```

### Real-time Updates Not Working
```
❌ Tickets don't appear instantly
✅ Solution: Check WebSocket in DevTools Network tab
```

---

## Post-Deployment Support

| Issue | Contact |
|-------|---------|
| Supabase problems | Supabase Support |
| n8n issues | n8n Community/Support |
| Domain/SSL | Hosting provider support |
| App bugs | Your development team |

---

## Success Criteria

✅ **Deployment is successful when:**

1. **Frontend**: App accessible at your domain
2. **Database**: Schema deployed, 6 staff members visible
3. **Automation**: Email sent to support → ticket appears in<1 min
4. **Real-time**: Open dashboard in 2 browsers, changes sync instantly
5. **Security**: HTTPS enabled, no console errors
6. **Monitoring**: Can see logs in Supabase & n8n dashboards

---

## Final Verification Steps

```bash
# 1. Test frontend
curl https://your-domain.com
# Should return HTML

# 2. Test API
curl https://your-supabase-url/rest/v1/staff \
  -H "Authorization: Bearer YOUR_KEY"
# Should return 6 staff members

# 3. Test n8n
# Send email → check dashboard within 1 minute
# Should see new ticket

# 4. Test real-time
# Open app in 2 browsers
# Change status in one → should update in other instantly
```

---

**Deployment Status: READY FOR PRODUCTION** 🚀

