import React, { useState, useMemo } from 'react';
import { useTickets } from '@/contexts/TicketContext';
import { useAuth } from '@/contexts/AuthContext';
import { DEPARTMENTS, TicketStatus, STATUSES, Department, Ticket } from '@/lib/constants';
import DepartmentColumn from '@/components/DepartmentColumn';
import TicketDetailPanel from '@/components/TicketDetailPanel';
import { Search, Filter } from 'lucide-react';

const STATUS_FILTERS: (TicketStatus | 'All')[] = ['All', ...STATUSES];

export default function Dashboard() {
  const { tickets } = useTickets();
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'All'>('Open');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const isAdmin = user?.role === 'admin';
  const depts = isAdmin ? DEPARTMENTS : DEPARTMENTS.filter(d => d === user?.department);

  const filteredTickets = useMemo(() => {
    let result = tickets;
    if (statusFilter !== 'All') {
      result = result.filter(t => t.status === statusFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        t => t.sender_email.toLowerCase().includes(q) ||
             t.ticket_id.toLowerCase().includes(q) ||
             t.subject.toLowerCase().includes(q)
      );
    }
    return result;
  }, [tickets, statusFilter, searchQuery]);

  // Keep selected ticket in sync
  const activeTicket = selectedTicket
    ? tickets.find(t => t.id === selectedTicket.id) || null
    : null;

  return (
    <div className="flex h-[calc(100vh-56px)] flex-col bg-board">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-border bg-card px-4 py-3">
        <div className="flex items-center gap-1">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {STATUS_FILTERS.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                statusFilter === s
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search tickets..."
              className="w-64 rounded-md border border-border bg-secondary py-1.5 pl-8 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      </div>

      {/* Board */}
      <div className="flex flex-1 gap-3 overflow-x-auto p-4">
        {depts.map(dept => (
          <DepartmentColumn
            key={dept}
            department={dept}
            tickets={filteredTickets.filter(t => t.department === dept)}
            onCardClick={setSelectedTicket}
          />
        ))}
      </div>

      {/* Detail panel */}
      <TicketDetailPanel ticket={activeTicket} onClose={() => setSelectedTicket(null)} />
    </div>
  );
}
