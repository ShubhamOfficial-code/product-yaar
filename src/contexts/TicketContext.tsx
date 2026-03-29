import React, { createContext, useContext, useState, useCallback } from 'react';
import { Ticket, TicketStatus, TicketNote, Department } from '@/lib/constants';
import { MOCK_TICKETS } from '@/lib/mock-data';

interface TicketContextType {
  tickets: Ticket[];
  updateTicketStatus: (id: string, status: TicketStatus) => void;
  updateTicketAssignment: (id: string, assignedTo: string) => void;
  updateTicketDepartment: (id: string, department: Department) => void;
  addNote: (id: string, note: TicketNote) => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export function TicketProvider({ children }: { children: React.ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);

  const updateTicketStatus = useCallback((id: string, status: TicketStatus) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  }, []);

  const updateTicketAssignment = useCallback((id: string, assignedTo: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, assigned_to: assignedTo } : t));
  }, []);

  const updateTicketDepartment = useCallback((id: string, department: Department) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, department } : t));
  }, []);

  const addNote = useCallback((id: string, note: TicketNote) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, notes: [...t.notes, note] } : t));
  }, []);

  return (
    <TicketContext.Provider value={{ tickets, updateTicketStatus, updateTicketAssignment, updateTicketDepartment, addNote }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  const ctx = useContext(TicketContext);
  if (!ctx) throw new Error('useTickets must be within TicketProvider');
  return ctx;
}
