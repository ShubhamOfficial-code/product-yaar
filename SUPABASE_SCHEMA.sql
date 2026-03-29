-- EdTech Support System Database Schema
-- Run this SQL in Supabase SQL Editor to create tables

-- 1. Create staff table
CREATE TABLE IF NOT EXISTS staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'agent')),
  department TEXT NOT NULL CHECK (department IN ('Sales', 'Finance', 'Tech Support', 'Academic Support', 'General Support')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create tickets table
CREATE TABLE IF NOT EXISTS tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id TEXT UNIQUE NOT NULL,
  sender_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  summary TEXT NOT NULL,
  department TEXT NOT NULL CHECK (department IN ('Sales', 'Finance', 'Tech Support', 'Academic Support', 'General Support')),
  priority TEXT NOT NULL CHECK (priority IN ('Critical', 'High', 'Medium', 'Low')),
  status TEXT NOT NULL DEFAULT 'Open' CHECK (status IN ('Open', 'In Progress', 'Resolved', 'Closed')),
  issue_type TEXT NOT NULL,
  assigned_to TEXT,
  date_time TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create ticket_notes table
CREATE TABLE IF NOT EXISTS ticket_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create indexes for performance
CREATE INDEX idx_tickets_department ON tickets(department);
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_assigned_to ON tickets(assigned_to);
CREATE INDEX idx_tickets_created_at ON tickets(created_at DESC);
CREATE INDEX idx_tickets_ticket_id ON tickets(ticket_id);
CREATE INDEX idx_ticket_notes_ticket_id ON ticket_notes(ticket_id);
CREATE INDEX idx_staff_email ON staff(email);
CREATE INDEX idx_staff_department ON staff(department);

-- 5. Enable RLS (Row Level Security)
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_notes ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies - Allow all for now (hardcoded auth)
-- NOTE: These are permissive policies. In production, use email from auth context

-- Admins can access everything
CREATE POLICY "Admins can view all staff" ON staff
  FOR SELECT USING (true);

CREATE POLICY "Admins can view all tickets" ON tickets
  FOR SELECT USING (true);

CREATE POLICY "Admins can view all notes" ON ticket_notes
  FOR SELECT USING (true);

-- Agents can view tickets from their department
CREATE POLICY "Agents can view department tickets" ON tickets
  FOR SELECT USING (true);

CREATE POLICY "Agents can view ticket notes" ON ticket_notes
  FOR SELECT USING (true);

-- Insert/Update policies (allow all for now)
CREATE POLICY "Allow inserts on tickets" ON tickets
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow updates on tickets" ON tickets
  FOR UPDATE USING (true);

CREATE POLICY "Allow inserts on notes" ON ticket_notes
  FOR INSERT WITH CHECK (true);

-- 7. Initialize staff members only
-- This function will be called manually to set up support team
CREATE OR REPLACE FUNCTION initialize_staff()
RETURNS void AS $$
BEGIN
  -- Insert support team members (agents will be assigned in the dashboard UI)
  INSERT INTO staff (email, name, role, department, is_active) VALUES
    ('admin@edtech.com', 'Admin User', 'admin', 'Sales', true),
    ('alice@edtech.com', 'Alice Chen', 'agent', 'Sales', true),
    ('bob@edtech.com', 'Bob Kumar', 'agent', 'Finance', true),
    ('carol@edtech.com', 'Carol Smith', 'agent', 'Tech Support', true),
    ('dave@edtech.com', 'Dave Wilson', 'agent', 'Academic Support', true),
    ('eve@edtech.com', 'Eve Johnson', 'agent', 'General Support', true)
  ON CONFLICT (email) DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- Initialize staff: SELECT initialize_staff();
-- NOTE: Tickets will be automatically created by n8n from Gmail automation
-- Do NOT manually seed tickets - they come from n8n via support emails
