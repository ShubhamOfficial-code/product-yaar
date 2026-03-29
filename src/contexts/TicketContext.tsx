import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Ticket, TicketStatus, TicketNote, Department } from '@/lib/constants';
import { supabase } from '@/integrations/supabase/client';

interface TicketContextType {
  tickets: Ticket[];
  isLoading: boolean;
  updateTicketStatus: (id: string, status: TicketStatus) => void;
  updateTicketAssignment: (id: string, assignedTo: string) => void;
  updateTicketDepartment: (id: string, department: Department) => void;
  addNote: (id: string, note: TicketNote) => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

function mapRow(row: any): Ticket {
  return {
    id: row.id,
    ticket_id: row.ticket_id,
    sender_email: row.sender_email,
    subject: row.subject || '',
    summary: row.summary || '',
    department: row.department as Department,
    priority: row.priority,
    status: row.status as TicketStatus,
    issue_type: row.issue_type || '',
    date_time: row.date_time,
    assigned_to: row.assigned_to || '',
    notes: (row.notes as TicketNote[]) || [],
    created_at: row.created_at,
  };
}

export function TicketProvider({ children }: { children: React.ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all tickets
  const fetchTickets = useCallback(async () => {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setTickets(data.map(mapRow));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchTickets();

    // Realtime subscription
    const channel = supabase
      .channel('tickets-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tickets' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setTickets(prev => [mapRow(payload.new), ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setTickets(prev => prev.map(t => t.id === payload.new.id ? mapRow(payload.new) : t));
        } else if (payload.eventType === 'DELETE') {
          setTickets(prev => prev.filter(t => t.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fetchTickets]);

  const updateTicketStatus = useCallback(async (id: string, status: TicketStatus) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    await supabase.from('tickets').update({ status }).eq('id', id);
  }, []);

  const updateTicketAssignment = useCallback(async (id: string, assignedTo: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, assigned_to: assignedTo } : t));
    await supabase.from('tickets').update({ assigned_to: assignedTo }).eq('id', id);
  }, []);

  const updateTicketDepartment = useCallback(async (id: string, department: Department) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, department } : t));
    await supabase.from('tickets').update({ department }).eq('id', id);
  }, []);

  const addNote = useCallback(async (id: string, note: TicketNote) => {
    const ticket = tickets.find(t => t.id === id);
    if (!ticket) return;
    const updatedNotes = [...ticket.notes, note];
    setTickets(prev => prev.map(t => t.id === id ? { ...t, notes: updatedNotes } : t));
    await supabase.from('tickets').update({ notes: updatedNotes }).eq('id', id);
  }, [tickets]);

  return (
    <TicketContext.Provider value={{ tickets, isLoading, updateTicketStatus, updateTicketAssignment, updateTicketDepartment, addNote }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  const ctx = useContext(TicketContext);
  if (!ctx) throw new Error('useTickets must be within TicketProvider');
  return ctx;
}
