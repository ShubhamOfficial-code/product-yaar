
-- Create tickets table
CREATE TABLE public.tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id TEXT NOT NULL UNIQUE,
  sender_email TEXT NOT NULL,
  subject TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  department TEXT NOT NULL CHECK (department IN ('Sales', 'Payments', 'Tech Support', 'Academic Support', 'General Support')),
  priority TEXT NOT NULL CHECK (priority IN ('Critical', 'High', 'Medium', 'Low')),
  status TEXT NOT NULL DEFAULT 'Open' CHECK (status IN ('Open', 'In Progress', 'Resolved', 'Closed')),
  issue_type TEXT NOT NULL DEFAULT '',
  date_time TIMESTAMPTZ NOT NULL DEFAULT now(),
  assigned_to TEXT NOT NULL DEFAULT '',
  notes JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all tickets
CREATE POLICY "Authenticated users can read tickets"
  ON public.tickets FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update tickets (status, assignment, notes)
CREATE POLICY "Authenticated users can update tickets"
  ON public.tickets FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow anon and authenticated to insert tickets (for N8N POST endpoint)
CREATE POLICY "Anyone can insert tickets"
  ON public.tickets FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
