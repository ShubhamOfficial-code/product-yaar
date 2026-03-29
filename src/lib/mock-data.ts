import { Ticket, StaffMember } from './constants';

export const MOCK_STAFF: StaffMember[] = [
  // Admin
  { id: '1', email: 'admin@edtech.com', name: 'Rajesh Kumar', role: 'admin', department: 'Sales', is_active: true },

  // Sales Team
  { id: '2', email: 'priya@edtech.com', name: 'Priya Sharma', role: 'agent', department: 'Sales', is_active: true },
  { id: '3', email: 'aman@edtech.com', name: 'Aman Patel', role: 'agent', department: 'Sales', is_active: true },

  // Finance Team
  { id: '4', email: 'vikram@edtech.com', name: 'Vikram Joshi', role: 'agent', department: 'Finance', is_active: true },
  { id: '5', email: 'neha@edtech.com', name: 'Neha Verma', role: 'agent', department: 'Finance', is_active: true },

  // Tech Support Team
  { id: '6', email: 'arjun@edtech.com', name: 'Arjun Singh', role: 'agent', department: 'Tech Support', is_active: true },
  { id: '7', email: 'anjali@edtech.com', name: 'Anjali Desai', role: 'agent', department: 'Tech Support', is_active: true },

  // Academic Support Team
  { id: '8', email: 'rohan@edtech.com', name: 'Rohan Nair', role: 'agent', department: 'Academic Support', is_active: true },

  // General Support Team
  { id: '9', email: 'sneha@edtech.com', name: 'Sneha Gupta', role: 'agent', department: 'General Support', is_active: true },
];

// Tickets are loaded from Supabase (n8n automation)
// No mock tickets - start with clean dashboard
