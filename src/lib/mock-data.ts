import { Ticket, StaffMember } from './constants';

const now = new Date();
const hoursAgo = (h: number) => new Date(now.getTime() - h * 3600000).toISOString();

export const MOCK_STAFF: StaffMember[] = [
  { id: '1', email: 'admin@edtech.com', name: 'Admin User', role: 'admin', department: 'Sales', is_active: true },
  { id: '2', email: 'alice@edtech.com', name: 'Alice Chen', role: 'agent', department: 'Sales', is_active: true },
  { id: '3', email: 'bob@edtech.com', name: 'Bob Kumar', role: 'agent', department: 'Payments', is_active: true },
  { id: '4', email: 'carol@edtech.com', name: 'Carol Smith', role: 'agent', department: 'Tech Support', is_active: true },
  { id: '5', email: 'dave@edtech.com', name: 'Dave Wilson', role: 'agent', department: 'Academic Support', is_active: true },
  { id: '6', email: 'eve@edtech.com', name: 'Eve Johnson', role: 'agent', department: 'General Support', is_active: true },
];

export const MOCK_TICKETS: Ticket[] = [
  // Sales
  { id: '1', ticket_id: 'TKT-001', sender_email: 'student1@gmail.com', subject: 'Payment blocked for enrollment', summary: 'Student ready to pay but payment page shows error. Admission deadline is tomorrow.', department: 'Sales', priority: 'High', status: 'Open', issue_type: 'Payment Block', date_time: hoursAgo(1), assigned_to: 'alice@edtech.com', notes: [], created_at: hoursAgo(1) },
  { id: '2', ticket_id: 'TKT-002', sender_email: 'student2@gmail.com', subject: 'Pricing inquiry for MBA program', summary: 'Wants to know pricing details for the MBA program and available scholarships.', department: 'Sales', priority: 'Medium', status: 'Open', issue_type: 'Pricing Inquiry', date_time: hoursAgo(3), assigned_to: 'alice@edtech.com', notes: [], created_at: hoursAgo(3) },
  { id: '3', ticket_id: 'TKT-003', sender_email: 'curious@gmail.com', subject: 'General question about courses', summary: 'Just browsing, wants to know what courses are available.', department: 'Sales', priority: 'Low', status: 'Open', issue_type: 'General Inquiry', date_time: hoursAgo(12), assigned_to: 'alice@edtech.com', notes: [], created_at: hoursAgo(12) },
  // Payments
  { id: '4', ticket_id: 'TKT-004', sender_email: 'urgent@gmail.com', subject: 'Payment gateway is down', summary: 'Multiple students reporting payment gateway returning 500 errors. Affecting all courses.', department: 'Payments', priority: 'Critical', status: 'Open', issue_type: 'Gateway Down', date_time: hoursAgo(0.5), assigned_to: 'bob@edtech.com', notes: [{ author: 'Bob Kumar', text: 'Investigating gateway logs now', created_at: hoursAgo(0.3) }], created_at: hoursAgo(0.5) },
  { id: '5', ticket_id: 'TKT-005', sender_email: 'refund@gmail.com', subject: 'Payment deducted but no access', summary: 'Rs 15,000 deducted from account but course still shows as locked.', department: 'Payments', priority: 'High', status: 'In Progress', issue_type: 'Payment No Access', date_time: hoursAgo(4), assigned_to: 'bob@edtech.com', notes: [], created_at: hoursAgo(4) },
  { id: '6', ticket_id: 'TKT-006', sender_email: 'invoice@gmail.com', subject: 'Need invoice for tax filing', summary: 'Requesting invoice for previous semester payment for tax purposes.', department: 'Payments', priority: 'Medium', status: 'Open', issue_type: 'Invoice Request', date_time: hoursAgo(8), assigned_to: 'bob@edtech.com', notes: [], created_at: hoursAgo(8) },
  { id: '7', ticket_id: 'TKT-007', sender_email: 'billing@gmail.com', subject: 'Billing cycle question', summary: 'When does the next billing cycle start?', department: 'Payments', priority: 'Low', status: 'Open', issue_type: 'Billing Question', date_time: hoursAgo(24), assigned_to: 'bob@edtech.com', notes: [], created_at: hoursAgo(24) },
  // Tech Support
  { id: '8', ticket_id: 'TKT-008', sender_email: 'outage@gmail.com', subject: 'Dashboard completely down', summary: 'Student dashboard returning 503 error for all users. Complete outage.', department: 'Tech Support', priority: 'Critical', status: 'Open', issue_type: 'Platform Outage', date_time: hoursAgo(0.2), assigned_to: 'carol@edtech.com', notes: [], created_at: hoursAgo(0.2) },
  { id: '9', ticket_id: 'TKT-009', sender_email: 'login@gmail.com', subject: 'Cannot login at all', summary: 'Password reset not working, locked out of account completely.', department: 'Tech Support', priority: 'High', status: 'Open', issue_type: 'Login Blocked', date_time: hoursAgo(2), assigned_to: 'carol@edtech.com', notes: [], created_at: hoursAgo(2) },
  { id: '10', ticket_id: 'TKT-010', sender_email: 'video@gmail.com', subject: 'Video lectures buffering', summary: 'All video lectures are buffering constantly, impossible to watch.', department: 'Tech Support', priority: 'Medium', status: 'In Progress', issue_type: 'Video Loading', date_time: hoursAgo(6), assigned_to: 'carol@edtech.com', notes: [], created_at: hoursAgo(6) },
  { id: '11', ticket_id: 'TKT-011', sender_email: 'ui@gmail.com', subject: 'Button alignment off on mobile', summary: 'Submit button is partially hidden on mobile view.', department: 'Tech Support', priority: 'Low', status: 'Open', issue_type: 'UI Issue', date_time: hoursAgo(48), assigned_to: 'carol@edtech.com', notes: [], created_at: hoursAgo(48) },
  // Academic Support
  { id: '12', ticket_id: 'TKT-012', sender_email: 'access@gmail.com', subject: 'Course locked after payment', summary: 'Enrolled and paid for Advanced Python but course shows as locked.', department: 'Academic Support', priority: 'High', status: 'Open', issue_type: 'Access Denied', date_time: hoursAgo(1.5), assigned_to: 'dave@edtech.com', notes: [], created_at: hoursAgo(1.5) },
  { id: '13', ticket_id: 'TKT-013', sender_email: 'assignment@gmail.com', subject: 'Assignment submission error', summary: 'Getting error when trying to submit Module 3 assignment.', department: 'Academic Support', priority: 'Medium', status: 'Open', issue_type: 'Assignment Query', date_time: hoursAgo(5), assigned_to: 'dave@edtech.com', notes: [], created_at: hoursAgo(5) },
  { id: '14', ticket_id: 'TKT-014', sender_email: 'cert@gmail.com', subject: 'When will I get my certificate?', summary: 'Completed the course 2 weeks ago, certificate still not generated.', department: 'Academic Support', priority: 'Low', status: 'Open', issue_type: 'Certificate Query', date_time: hoursAgo(72), assigned_to: 'dave@edtech.com', notes: [], created_at: hoursAgo(72) },
  // General Support
  { id: '15', ticket_id: 'TKT-015', sender_email: 'mixed@gmail.com', subject: 'Multiple issues with platform', summary: 'Having trouble with payment and course access. Not sure which department to contact.', department: 'General Support', priority: 'Medium', status: 'Open', issue_type: 'Mixed Complaint', date_time: hoursAgo(3), assigned_to: 'eve@edtech.com', notes: [], created_at: hoursAgo(3) },
  { id: '16', ticket_id: 'TKT-016', sender_email: 'feedback@gmail.com', subject: 'Love the platform!', summary: 'Just wanted to say the new UI is great. Keep up the good work!', department: 'General Support', priority: 'Low', status: 'Open', issue_type: 'Feedback', date_time: hoursAgo(24), assigned_to: 'eve@edtech.com', notes: [], created_at: hoursAgo(24) },
];
