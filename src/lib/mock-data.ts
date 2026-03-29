import { Ticket, StaffMember } from './constants';

export const MOCK_STAFF: StaffMember[] = [
  { id: '1', email: 'admin@edtech.com', name: 'Admin User', role: 'admin', department: 'Sales', is_active: true },
  { id: '2', email: 'alice@edtech.com', name: 'Alice Chen', role: 'agent', department: 'Sales', is_active: true },
  { id: '3', email: 'bob@edtech.com', name: 'Bob Kumar', role: 'agent', department: 'Finance', is_active: true },
  { id: '4', email: 'carol@edtech.com', name: 'Carol Smith', role: 'agent', department: 'Tech Support', is_active: true },
  { id: '5', email: 'dave@edtech.com', name: 'Dave Wilson', role: 'agent', department: 'Academic Support', is_active: true },
  { id: '6', email: 'eve@edtech.com', name: 'Eve Johnson', role: 'agent', department: 'General Support', is_active: true },
];

// Tickets are loaded from Supabase (n8n automation)
// No mock tickets - start with clean dashboard
