# Quick Deployment Checklist

**Fast reference for deploying to production. See DEPLOYMENT_GUIDE.md for detailed steps.**

---

## 🟡 Phase 1: Supabase (5 minutes)

```
[ ] Go to Supabase dashboard
[ ] Create new project
[ ] Open SQL Editor
[ ] Paste SUPABASE_SCHEMA.sql
[ ] Click Execute
[ ] Run: SELECT initialize_staff();
[ ] Copy Project URL and API Key
[ ] Verify: SELECT COUNT(*) FROM staff; → should return 6
```

---

## 🟡 Phase 2: n8n (10 minutes)

```
[ ] Upload workflow JSON to n8n
[ ] Configure Gmail Trigger
    [ ] Connect Gmail OAuth
    [ ] Set to poll "every 1 minute"
[ ] Configure Google Gemini
    [ ] Add API key
    [ ] Model: models/gemini-2.5-flash-lite
[ ] Configure Supabase Connection
    [ ] Add URL and API Key
    [ ] Test connection → should pass ✅
[ ] Click "Activate" (top right)
[ ] Status should show "Active"
[ ] Send test email → ticket should appear within 1 min
```

---

## 🟡 Phase 3: Frontend Deployment (Choose One)

### Option A: Vercel (Easiest, 5 minutes)

```
[ ] Push code to GitHub
[ ] Go to Vercel.com
[ ] Click "Add New Project"
[ ] Select your repository
[ ] Add Environment Variables:
    VITE_SUPABASE_URL =
    VITE_SUPABASE_ANON_KEY =
[ ] Click "Deploy"
[ ] Wait for build to complete
[ ] Visit your Vercel URL
[ ] Test login & create ticket
```

### Option B: Netlify (Similar, ~5 minutes)

```
[ ] Push code to GitHub
[ ] Go to Netlify.com
[ ] Click "Import existing project"
[ ] Select your repository
[ ] Add Environment Variables
[ ] Deploy
[ ] Test at your Netlify URL
```

### Option C: Self-Hosted (~15 minutes)

```
[ ] npm run build
[ ] Upload dist/ to server
[ ] Configure Nginx/Apache
[ ] Set up SSL with Certbot
[ ] Test with domain
```

---

## 🟡 Phase 4: Verification (5 minutes)

```
[ ] Frontend loads without errors
[ ] Can see 5 department dashboards
[ ] Can log in as admin@edtech.com (no password)
[ ] Dashboard shows real-time data
[ ] Send test email to support inbox
[ ] Wait 1-2 minutes
[ ] Ticket appears in dashboard automatically
[ ] Real-time updates work (open in 2 tabs)
[ ] Create manual ticket and update status
[ ] Add note to a ticket
```

---

## 🟡 Phase 5: Security (5 minutes)

```
[ ] HTTPS enabled (no HTTP)
[ ] .env.local in .gitignore
[ ] No secrets in Git history
[ ] Supabase RLS enabled
[ ] n8n password protected
[ ] API keys rotated
```

---

## 🟡 Phase 6: Monitoring (5 minutes)

```
[ ] Set up Supabase backups
[ ] Enable n8n execution logs
[ ] Configure alerts for errors
[ ] Test backup restore procedure
[ ] Document rollback steps
```

---

## ⏱️ Total Time: ~35-45 minutes

| Phase | Time | Status |
|-------|------|--------|
| Supabase | 5 min | ✅ |
| n8n | 10 min | ✅ |
| Frontend | 5-15 min | ✅ |
| Verification | 5 min | ✅ |
| Security | 5 min | ✅ |
| Monitoring | 5 min | ✅ |

---

## 🎯 Success Criteria

Your system is **live and working** when:

1. ✅ App accessible at `your-domain.com`
2. ✅ Can log in (no password needed)
3. ✅ Database has 6 staff members
4. ✅ **Send email → Ticket appears in <1 min**
5. ✅ Real-time updates work (changes sync instantly)
6. ✅ HTTPS enabled (padlock 🔒 in browser)
7. ✅ No console errors

---

## 🆘 Common Issues

| Problem | Solution |
|---------|----------|
| **Frontend 404 errors** | Check build settings, ensure dist/ has index.html |
| **Can't connect to DB** | Verify Supabase URL & key in environment variables |
| **n8n not creating tickets** | Click "Activate" button |
| **Tickets not appearing** | Change subject/body, send new email (AI might reject duplicate) |
| **Real-time not working** | Hard refresh: Ctrl+Shift+R |
| **SSL certificate error** | Wait 24h for DNS to propagate |

---

## 📞 Support Resources

- **Supabase:** https://supabase.com/docs
- **n8n:** https://docs.n8n.io/
- **Vercel:** https://vercel.com/docs
- **Netlify:** https://docs.netlify.com/

---

## 📚 Full Documentation

For detailed steps, see:
- **DEPLOYMENT_GUIDE.md** - Complete walkthrough with screenshots
- **N8N_AUTOMATION_GUIDE.md** - How email automation works
- **PROJECT_SETUP.md** - Local development setup

---

**Ready to Deploy? Start with Supabase phase 👆**
