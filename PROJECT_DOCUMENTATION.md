# EdTech Support System - Project Documentation

**Last Updated:** March 29, 2026

## 1. Project Overview

The EdTech Support System is a comprehensive ticket management and support platform designed for educational technology platforms. It enables efficient handling of customer support tickets across multiple departments with role-based access control and real-time ticket tracking.

**Project Name:** vite_react_shadcn_ts
**Type:** Web Application (SPA)
**Status:** Active Development

---

## 2. Technology Stack

### Frontend
- **Framework:** React 18.3.1
- **Build Tool:** Vite 5.4.19
- **Language:** TypeScript 5.8.3
- **Styling:** Tailwind CSS 3.4.17 + Radix UI components
- **Routing:** React Router DOM 6.30.1
- **State Management:** React Context API + TanStack React Query 5.83.0
- **Form Handling:** React Hook Form 7.61.1 + Zod 3.25.76
- **UI Component Library:** shadcn/ui (Radix UI based)
- **Icons:** Lucide React 0.462.0
- **Toast Notifications:** Sonner 1.7.4
- **Charts:** Recharts 2.15.4
- **Drag & Drop:** Hello Pangea DND 16.6.0

### Backend Integration
- **Database:** Supabase (PostgreSQL)
- **Client SDK:** @supabase/supabase-js 2.100.1

### Development & Testing
- **Testing Framework:** Vitest 3.2.4
- **Testing Library:** @testing-library/react 16.0.0
- **E2E Testing:** Playwright 1.57.0
- **Linting:** ESLint 9.32.0
- **Code Formatting:** Autoprefixer, PostCSS

---

## 3. Project Structure

```
src/
├── components/
│   ├── ui/                      # shadcn/ui component library (55+ components)
│   ├── DepartmentColumn.tsx     # Department kanban column component
│   ├── NavLink.tsx              # Navigation link wrapper
│   ├── Navbar.tsx               # Top navigation bar
│   ├── TicketCard.tsx           # Individual ticket card component
│   └── TicketDetailPanel.tsx    # Right-side ticket details panel
├── contexts/
│   ├── AuthContext.tsx          # Authentication context (local storage based)
│   └── TicketContext.tsx        # Ticket state management
├── hooks/
│   ├── use-mobile.tsx           # Mobile device detection
│   └── use-toast.ts             # Toast notification hook
├── integrations/
│   └── supabase/
│       ├── client.ts            # Supabase client configuration
│       └── types.ts             # Database TypeScript types (auto-generated)
├── lib/
│   ├── constants.ts             # Type definitions and constants
│   ├── mock-data.ts             # Mock tickets and staff data
│   └── utils.ts                 # Utility functions
├── pages/
│   ├── Dashboard.tsx            # Main kanban/ticket view
│   ├── DepartmentDetail.tsx     # Department-specific detail view
│   ├── Analytics.tsx            # Analytics and reporting (admin only)
│   ├── Settings.tsx             # Settings page (admin only)
│   ├── Login.tsx                # Login/authentication page
│   ├── Index.tsx                # Landing/home page
│   └── NotFound.tsx             # 404 page
├── test/
│   ├── example.test.ts          # Example test file
│   └── setup.ts                 # Test setup configuration
├── App.tsx                      # Main app component with routing
├── main.tsx                     # React app entry point
└── vite-env.d.ts               # Vite environment types
```

---

## 4. Core Features

### 4.1 Ticket Management
- **Multi-Department Support:** Sales, Finance, Tech Support, Academic Support, General Support
- **Ticket Properties:**
  - Unique ticket ID (e.g., TKT-001)
  - Sender email and subject
  - Summary and detailed description
  - Priority levels: Critical, High, Medium, Low
  - Status tracking: Open, In Progress, Resolved, Closed
  - Issue categorization
  - Assignment to staff members
  - Timestamped notes/comments

### 4.2 Authentication & Authorization
- **Role-Based Access Control:**
  - **Admin:** Full access to all departments and analytics
  - **Agent:** Access to assigned department only
- **Authentication Method:** Local storage-based (currently mock-based)
- **Session Persistence:** User data persists across browser sessions
- **Protected Routes:** Admin and agent views require authentication

### 4.3 Dashboard
- **Kanban View:** Tickets organized by status columns
- **Real-time Filtering:**
  - Status filter (All, Open, In Progress, Resolved, Closed)
  - Search functionality (email, ticket ID, subject)
- **Department-aware Views:** Agents see only their department
- **Ticket Details Panel:** Right-side panel for viewing/editing ticket details

### 4.4 Analytics & Reporting (Admin Only)
- Performance metrics and statistics
- Department-level insights
- Ticket distribution analysis

### 4.5 Settings (Admin Only)
- Application configuration
- User and department management

---

## 5. Data Models

### Ticket
```typescript
interface Ticket {
  id: string;
  ticket_id: string;
  sender_email: string;
  subject: string;
  summary: string;
  department: Department;
  priority: Priority;
  status: TicketStatus;
  issue_type: string;
  date_time: string;
  assigned_to: string;
  notes: TicketNote[];
  created_at: string;
}
```

### StaffMember
```typescript
interface StaffMember {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department: Department;
  is_active: boolean;
}
```

### TicketNote
```typescript
interface TicketNote {
  author: string;
  text: string;
  created_at: string;
}
```

---

## 6. Supabase Integration

### Configuration
- **URL:** https://jgocuimgofnzkqxjalyj.supabase.co
- **Anon Key:** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (embedded in client.ts)
- **Client Location:** `/src/integrations/supabase/client.ts`

### Supabase Features Used
- Auth storage in localStorage
- Session persistence with autoRefreshToken
- Database type generation from PostgreSQL schema

### Current Status
⚠️ **CONFIGURATION ISSUE:** The Supabase client is configured but:
- Currently using **mock data** (MOCK_STAFF, MOCK_TICKETS)
- Authentication uses local storage instead of Supabase Auth
- Database operations are not integrated
- The app falls back to mock data entirely

---

## 7. Authentication Context

### How It Works
```typescript
// Current implementation uses mock data
const login = async (email: string, password: string): Promise<boolean> => {
  const staff = MOCK_STAFF.find(s => s.email === email && s.is_active);
  // ...
};
```

### Test Credentials
- **Admin:** admin@edtech.com
- **Sales Agent:** alice@edtech.com
- **Finance Agent:** bob@edtech.com
- **Tech Support:** carol@edtech.com
- **Academic Support:** dave@edtech.com
- **General Support:** eve@edtech.com

---

## 8. Mock Data

### Staff Members (6 total)
- 1 Admin user
- 5 Department agents (one per department)

### Tickets (16 total)
- **Sales (3):** Payment and pricing inquiries
- **Finance (4):** Critical payment gateway issue, billing queries
- **Tech Support (4):** Platform outages and technical issues
- **Academic Support (3):** Course access and assignment issues
- **General Support (2):** Mixed issues and feedback

**Note:** Mock data uses relative timestamps (hoursAgo helper) to simulate realistic ticket ages.

---

## 9. Routing Structure

| Route | Component | Auth Required | Admin Only | Purpose |
|-------|-----------|---------------|-----------|---------|
| `/` | Navigate to dashboard | - | - | Root redirect |
| `/login` | LoginPage | ✗ | - | User login |
| `/dashboard` | Dashboard | ✓ | ✗ | Main ticket view |
| `/department/:name` | DepartmentDetail | ✓ | ✗ | Department-specific view |
| `/analytics` | Analytics | ✓ | ✓ | Analytics dashboard |
| `/settings` | Settings | ✓ | ✓ | App settings |
| `*` | NotFound | - | - | 404 page |

---

## 10. Available Scripts

```bash
npm run dev           # Start development server (Vite)
npm run build        # Production build
npm run build:dev    # Development build
npm run lint         # Run ESLint
npm run preview      # Preview production build
npm run test         # Run unit tests with Vitest
npm run test:watch   # Run tests in watch mode
```

---

## 11. Component Overview

### Key Components

#### **DepartmentColumn.tsx**
- Renders a kanban column for each status
- Displays tickets in drag-and-drop interface
- Filtered by department

#### **TicketCard.tsx**
- Individual ticket display card
- Shows priority color coding
- Clickable to view details
- Displays sender email and subject

#### **TicketDetailPanel.tsx**
- Right-side panel showing full ticket details
- Displays notes and history
- Shows assigned agent
- Priority and status information

#### **Navbar.tsx**
- Top navigation bar
- Department navigation links
- User profile/logout
- Admin-only settings/analytics links

#### **Dashboard.tsx**
- Main application page
- Kanban board layout
- Status and search filtering
- Department-aware ticket display

---

## 12. Configuration Files

### **vite.config.ts**
- Vite development server configuration
- React SWC plugin for fast compilation
- Path aliases (@/ for src)

### **tsconfig.json**
- TypeScript strict mode enabled
- ES2020 target
- Module resolution for path aliases
- DOM library included

### **tailwind.config.ts**
- TailwindCSS configuration
- Custom color scheme
- Plugin integration (typography, animations)

---

## 13. Current Git Status

**Active Branch:** master
**Main Branch:** main

**Recent Commits:**
- 3d73c73: Fix auth provider wrap
- 89b775a: Fix auth provider scope
- 1eae61e: Fix mock-data department label
- 6186e6f: Rectified mock data departments
- 431df23: Renamed Payments to Finance

**Uncommitted Changes:**
- Modified: package-lock.json

---

## 14. Environment Variables

Currently, no `.env.local` file is configured. Supabase credentials are hardcoded in:
- `/src/integrations/supabase/client.ts`

**Recommendation:** Move credentials to environment variables for security.

---

## 15. Testing Infrastructure

### Test Framework
- **Vitest:** Fast unit testing with Vite integration
- **React Testing Library:** Component testing
- **Playwright:** E2E testing capability

### Test Files
- `/src/test/example.test.ts` - Example test setup
- `/src/test/setup.ts` - Test environment configuration

**Current Status:** No active tests configured

---

## 16. Key Issues & Notes

### ⚠️ Critical Issues

1. **Supabase Not Integrated**
   - Credentials configured but not used
   - Application relies entirely on mock data
   - No real database integration

2. **No Real Authentication**
   - Uses local storage mock instead of Supabase Auth
   - Password is not validated
   - Session based on localStorage only

3. **No Environment Variables**
   - Credentials hardcoded in source code
   - Security risk for production deployment

### 📝 Recommendations

1. **Implement Real Database Integration**
   - Connect Supabase tables for tickets and staff
   - Implement real queries instead of mock data

2. **Implement Real Authentication**
   - Use Supabase Auth instead of local storage
   - Add password validation and security

3. **Move Secrets to Environment**
   - Create `.env.local` for development
   - Use environment variables for all credentials

4. **Add Test Coverage**
   - Write tests for context providers
   - Add component integration tests
   - E2E tests for critical workflows

5. **Error Handling**
   - Add error boundaries
   - Implement proper error logging

---

## 17. Browser Compatibility

The application uses modern JavaScript (ES2020) and is optimized for:
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 18. Performance Considerations

- **Tree Shaking:** Enabled in production build
- **Code Splitting:** Handled by Vite
- **Bundle Size:** Optimized with TailwindCSS purging
- **React Query:** Efficient data fetching and caching
- **Lazy Loading:** Ready for React.lazy implementation

---

## 19. Accessibility

- Radix UI components provide semantic HTML
- ARIA labels and roles included
- Keyboard navigation support
- Color contrast compliance

---

## 20. Future Enhancements

1. Real-time updates with Supabase subscriptions
2. Advanced filtering and sorting
3. Bulk ticket operations
4. Email notifications
5. Mobile app version
6. Integration with third-party services
7. Customizable workflows per department
8. Advanced analytics and reporting

---

## 21. Support & Maintenance

**Project Owner:** Shravani
**Last Review:** March 29, 2026
**Maintenance Status:** Active

For issues or questions, refer to the GitHub repository or contact the project owner.

---

*Generated by Claude Code Analysis*
