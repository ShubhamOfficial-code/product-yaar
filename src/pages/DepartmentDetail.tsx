import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTickets } from '@/contexts/TicketContext';
import {
  SLUG_TO_DEPARTMENT, DEPARTMENT_HEX, DEPARTMENT_PRIORITIES,
  PRIORITY_HEX, PRIORITY_ORDER, Ticket
} from '@/lib/constants';
import TicketCard from '@/components/TicketCard';
import TicketDetailPanel from '@/components/TicketDetailPanel';
import { ArrowLeft } from 'lucide-react';

export default function DepartmentDetail() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { tickets } = useTickets();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const department = name ? SLUG_TO_DEPARTMENT[name] : undefined;
  if (!department) {
    return (
      <div className="flex h-[calc(100vh-56px)] items-center justify-center bg-board">
        <p className="text-muted-foreground">Department not found</p>
      </div>
    );
  }

  const accentColor = DEPARTMENT_HEX[department];
  const validPriorities = DEPARTMENT_PRIORITIES[department];
  const deptTickets = tickets.filter(t => t.department === department);
  const openTickets = deptTickets.filter(t => t.status === 'Open');

  const priorityStats = validPriorities.map(p => ({
    priority: p,
    count: openTickets.filter(t => t.priority === p).length,
  }));

  const sortedTickets = [...deptTickets].sort((a, b) => {
    const pDiff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    if (pDiff !== 0) return pDiff;
    return new Date(b.date_time).getTime() - new Date(a.date_time).getTime();
  });

  const activeTicket = selectedTicket
    ? tickets.find(t => t.id === selectedTicket.id) || null
    : null;

  return (
    <div className="min-h-[calc(100vh-56px)] bg-board">
      {/* Header banner */}
      <div className="border-b border-border px-6 py-5" style={{ backgroundColor: `${accentColor}15` }}>
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-3 flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Board
        </button>
        <h1 className="text-2xl font-bold" style={{ color: accentColor }}>{department}</h1>
        <p className="text-sm text-muted-foreground">{openTickets.length} open tickets</p>
      </div>

      {/* Priority stat cards */}
      <div className="grid grid-cols-2 gap-3 p-6 sm:grid-cols-4">
        {priorityStats.map(({ priority, count }) => (
          <div
            key={priority}
            className={`rounded-lg border border-border bg-card p-4 ${
              priority === 'Critical' && count > 0 ? 'animate-pulse-red' : ''
            }`}
          >
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{priority}</p>
            <p className="mt-1 text-2xl font-bold" style={{ color: PRIORITY_HEX[priority] }}>{count}</p>
          </div>
        ))}
      </div>

      {/* Ticket list */}
      <div className="grid gap-2 px-6 pb-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedTickets.map(ticket => (
          <TicketCard key={ticket.id} ticket={ticket} onClick={setSelectedTicket} />
        ))}
        {sortedTickets.length === 0 && (
          <p className="col-span-full py-12 text-center text-muted-foreground">No tickets in this department</p>
        )}
      </div>

      <TicketDetailPanel ticket={activeTicket} onClose={() => setSelectedTicket(null)} />
    </div>
  );
}
