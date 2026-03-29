export type Department = 'Sales' | 'Finance' | 'Tech Support' | 'Academic Support' | 'General Support';
export type Priority = 'Critical' | 'High' | 'Medium' | 'Low';
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
export type UserRole = 'admin' | 'agent';

export interface TicketNote {
  author: string;
  text: string;
  created_at: string;
}

export interface Ticket {
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

export interface StaffMember {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department: Department;
  is_active: boolean;
}

export const DEPARTMENTS: Department[] = [
  'Sales',
  'Finance',
  'Tech Support',
  'Academic Support',
  'General Support',
];

export const DEPARTMENT_SLUGS: Record<Department, string> = {
  'Sales': 'sales',
  'Finance': 'finance',
  'Tech Support': 'tech-support',
  'Academic Support': 'academic-support',
  'General Support': 'general-support',
};

export const SLUG_TO_DEPARTMENT: Record<string, Department> = Object.fromEntries(
  Object.entries(DEPARTMENT_SLUGS).map(([k, v]) => [v, k as Department])
) as Record<string, Department>;

export const DEPARTMENT_PRIORITIES: Record<Department, Priority[]> = {
  'Sales': ['High', 'Medium', 'Low'],
  'Finance': ['Critical', 'High', 'Medium', 'Low'],
  'Tech Support': ['Critical', 'High', 'Medium', 'Low'],
  'Academic Support': ['High', 'Medium', 'Low'],
  'General Support': ['Medium', 'Low'],
};

export const PRIORITY_ORDER: Record<Priority, number> = {
  'Critical': 0,
  'High': 1,
  'Medium': 2,
  'Low': 3,
};

export const DEPARTMENT_COLORS: Record<Department, string> = {
  'Sales': 'dept-sales',
  'Finance': 'dept-finance',
  'Tech Support': 'dept-tech',
  'Academic Support': 'dept-academic',
  'General Support': 'dept-general',
};

export const DEPARTMENT_HEX: Record<Department, string> = {
  'Sales': '#2563eb',
  'Finance': '#16a34a',
  'Tech Support': '#ea580c',
  'Academic Support': '#7c3aed',
  'General Support': '#475569',
};

export const PRIORITY_COLORS: Record<Priority, string> = {
  'Critical': 'priority-critical',
  'High': 'priority-high',
  'Medium': 'priority-medium',
  'Low': 'priority-low',
};

export const PRIORITY_HEX: Record<Priority, string> = {
  'Critical': '#dc2626',
  'High': '#ea580c',
  'Medium': '#2563eb',
  'Low': '#64748b',
};

export const STATUSES: TicketStatus[] = ['Open', 'In Progress', 'Resolved', 'Closed'];

export function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
