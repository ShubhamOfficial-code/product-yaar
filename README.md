# EdTech Support Center - Ticket Management System

A modern, full-featured ticket management platform built for EdTech support teams. Manage support tickets across 5 departments with real-time updates, advanced filtering, and team collaboration features.

## 🚀 Features

### Department Management
- **Sales** - Handle customer inquiries, enrollment, and sales issues
- **Finance** - Manage payments, invoices, billing, and refunds
- **Tech Support** - Track platform issues, outages, and technical problems
- **Academic Support** - Handle course access, assignments, and certificates
- **General Support** - Unclassified or multi-department issues

### Ticket Features
- ✅ **Automatic ticket creation** from support emails via n8n
- ✅ **AI-powered classification** (department, priority, issue type)
- ✅ Create, read, update, and delete tickets
- ✅ Real-time updates across browser tabs
- ✅ Assign tickets to agents by department
- ✅ Priority-based sorting (Critical → Low)
- ✅ Status tracking (Open → In Progress → Resolved → Closed)
- ✅ Add notes and comments on tickets
- ✅ Filter by department, priority, status, and date
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode support

### Dashboard Features
- Department-specific views
- Real-time statistics and metrics
- Color-coded indicators
- Quick access to open/critical tickets
- Agent assignment management

### Automation
- ✅ n8n monitors Gmail for support emails
- ✅ Google Gemini AI analyzes and classifies emails
- ✅ Tickets auto-populated from support emails
- ✅ No manual data entry needed

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **UI:** shadcn/ui + Tailwind CSS
- **State Management:** React Context API + React Query
- **Database:** Supabase (PostgreSQL)
- **Real-time:** Supabase WebSocket subscriptions
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React
- **Testing:** Vitest + Playwright

## 📋 Quick Start

### 1. Prerequisites
- Node.js 18+ installed
- Supabase account (free tier works)
- Git

### 2. Clone & Install
```bash
git clone <repo-url>
cd ai-for-product-shravani
npm install
```

### 3. Setup Environment Variables
Create `.env.local` in project root:
```
VITE_SUPABASE_URL=https://jxoikdkjgkvujskjetxo.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Deploy Database Schema
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Open SQL Editor
3. Copy entire `SUPABASE_SCHEMA.sql` file
4. Paste and run in SQL Editor
5. Run: `SELECT initialize_staff();`

### 5. Activate n8n Automation
1. Go to n8n dashboard
2. Open "Product Yaar : Support Automation" workflow
3. Click **Activate** (top right)
4. Workflow monitors Gmail every 1 minute

### 6. Start Development Server
```bash
npm run dev
```

App will open at `http://localhost:5173`

Tickets appear automatically when support emails are received!

## 📚 Documentation

**Complete guides for every aspect of the project:**

- **[DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** 👈 **Start here** - Guide to all documentation
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Step-by-step deployment to production
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Quick reference checklist
- **[N8N_AUTOMATION_GUIDE.md](./N8N_AUTOMATION_GUIDE.md)** - How support email automation works
- **[PROJECT_SETUP.md](./PROJECT_SETUP.md)** - Local development setup guide
- **[PROJECT_STATUS_COMPREHENSIVE.md](./PROJECT_STATUS_COMPREHENSIVE.md)** - Detailed project status & architecture
- **[SUPABASE_CONNECTION_CHECKLIST.md](./SUPABASE_CONNECTION_CHECKLIST.md)** - Database connection verification
- **[SUPABASE_SCHEMA.sql](./SUPABASE_SCHEMA.sql)** - Database schema definition

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboard/       # Department dashboards
│   ├── tickets/         # Ticket management
│   ├── common/          # Shared components
│   └── ui/              # shadcn/ui components
├── contexts/
│   ├── AuthContext.tsx  # Authentication
│   └── TicketContext.tsx # Ticket data & realtime
├── integrations/
│   └── supabase/        # Supabase client
├── lib/
│   ├── constants.ts     # Types & enums
│   └── utils.ts         # Helpers
└── pages/               # Page components
```

## 🔐 Demo Login

The system includes hardcoded demo credentials for testing:

```
Email:    demo@edtech.com
Password: Demo@123
```

**On the login page**, credentials are displayed with:
- ✅ Copy buttons for each field
- ✅ Auto-fill button (fastest way to log in)
- ✅ Clear labeling for demo purposes

See [DEMO_LOGIN_GUIDE.md](./DEMO_LOGIN_GUIDE.md) for details.

## 📊 Data Source

**Tickets come automatically from your support emails** via n8n automation:

1. **Support emails** received in Gmail
2. **AI analysis** by Google Gemini (classification & extraction)
3. **Auto-insert** into Supabase database
4. **Real-time display** in dashboard

No manual data entry needed! Each email becomes a ticket instantly.

**Example workflow:**
- Customer sends: "I can't login to my course"
- n8n processes it within 1 minute
- Ticket appears in Dashboard automatically:
  - **Department:** Tech Support
  - **Priority:** High (can't access course)
  - **Issue Type:** Login Issue
  - **Status:** Open (ready for assignment)

See [N8N_AUTOMATION_GUIDE.md](./N8N_AUTOMATION_GUIDE.md) for detailed automation documentation.

## 🚦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run lint         # Check code quality
npm run preview      # Preview production build
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
```

## 🔌 Database Schema

### Tables

**staff** - Support team members
- id, email, name, role (admin/agent), department, is_active, timestamps

**tickets** - Support tickets
- id, ticket_id, sender_email, subject, summary, department, priority, status, issue_type, assigned_to, timestamps

**ticket_notes** - Comments and notes on tickets
- id, ticket_id, author, text, created_at

### Indexes & Performance
- Indexes on department, status, assigned_to, created_at
- Foreign keys with cascade delete
- Row Level Security (RLS) enabled

## 🌙 Dark Mode

Dark mode is supported via `next-themes`. Toggle in UI settings.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## ⚙️ Configuration

### Vite Config
- SWC transpilation (faster builds)
- React Fast Refresh enabled
- TypeScript strict mode

### Tailwind Config
- Custom color palette
- Department colors (Sales, Finance, Tech, Academic, General)
- Priority colors (Critical, High, Medium, Low)

## 🧪 Testing

```bash
npm run test         # Run all tests
npm run test:watch   # Watch mode
npm run lint         # ESLint
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

Outputs optimized build to `dist/` folder.

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Connect repo to Vercel
3. Vercel auto-detects Vite
4. Set environment variables (VITE_SUPABASE_*)
5. Deploy!

### Deploy to Other Platforms
Works with any static hosting:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Google Cloud Storage

## 📖 Troubleshooting

### "Failed to load resource: 404" Error
**Problem:** Database tables don't exist
**Solution:** Run SQL schema in Supabase dashboard (see PROJECT_SETUP.md)

### "Missing Supabase environment variables" Error
**Problem:** .env.local is missing or invalid
**Solution:** Create .env.local with correct credentials

### No data showing in app
**Problem:** Seed data not inserted
**Solution:** Run `SELECT seed_initial_data();` in Supabase SQL Editor

### Real-time updates not working
**Problem:** WebSocket connection issue
**Solution:** Check Supabase project status, try hard refresh

See [PROJECT_SETUP.md](./PROJECT_SETUP.md) for detailed troubleshooting guide.

## 📝 License

Private project for EdTech company.

## 👥 Team

Built for EdTech support centers managing:
- Sales inquiries
- Payment processing
- Technical issues
- Academic support
- General customer support

## 🎯 Next Steps

1. ✅ Deploy database schema to Supabase
2. ✅ Run seed function
3. ✅ Start development server
4. ⏳ Add more tickets and test features
5. ⏳ Deploy to production

See [PROJECT_STATUS_COMPREHENSIVE.md](./PROJECT_STATUS_COMPREHENSIVE.md) for detailed project status and future enhancements.

---

**Status:** 🟢 Production Ready (Frontend) | 🟡 Awaiting Database Deployment
