import React from 'react';
import {
  Department, Ticket, DEPARTMENT_PRIORITIES, PRIORITY_ORDER,
  DEPARTMENT_HEX, PRIORITY_HEX
} from '@/lib/constants';
import TicketCard from './TicketCard';
import { Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DEPARTMENT_SLUGS } from '@/lib/constants';

interface Props {
  department: Department;
  tickets: Ticket[];
  onCardClick: (ticket: Ticket) => void;
}

export default function DepartmentColumn({ department, tickets, onCardClick }: Props) {
  const navigate = useNavigate();
  const validPriorities = DEPARTMENT_PRIORITIES[department];
  const accentColor = DEPARTMENT_HEX[department];
  const openCount = tickets.filter(t => t.status === 'Open').length;
  const hasCriticalOrHigh = tickets.some(
    t => (t.priority === 'Critical' || t.priority === 'High') && t.status === 'Open'
  );

  // Group by priority
  const grouped = validPriorities.map(p => ({
    priority: p,
    tickets: tickets
      .filter(t => t.priority === p)
      .sort((a, b) => new Date(b.date_time).getTime() - new Date(a.date_time).getTime()),
  }));

  return (
    <div className="flex h-full w-[280px] shrink-0 flex-col rounded-lg bg-column">
      {/* Header */}
      <div className="flex items-center justify-between p-3 pb-2">
        <div className="flex items-center gap-2">
          {hasCriticalOrHigh && (
            <span
              className="h-2.5 w-2.5 rounded-full animate-pulse-dot"
              style={{ backgroundColor: '#dc2626' }}
            />
          )}
          <h3 className="text-sm font-bold" style={{ color: accentColor }}>{department}</h3>
          <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-secondary px-1.5 text-[10px] font-bold text-muted-foreground">
            {tickets.length}
          </span>
        </div>
        <button
          onClick={() => navigate(`/department/${DEPARTMENT_SLUGS[department]}`)}
          className="rounded p-1 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Cards */}
      <div className="flex-1 space-y-1 overflow-y-auto scrollbar-thin px-2 pb-2">
        {grouped.map(group => {
          if (group.tickets.length === 0) return null;
          return (
            <div key={group.priority}>
              <div className="flex items-center gap-2 px-1 py-1.5">
                <div className="h-px flex-1" style={{ backgroundColor: `${PRIORITY_HEX[group.priority]}30` }} />
                <span
                  className="text-[9px] font-bold uppercase tracking-widest"
                  style={{ color: PRIORITY_HEX[group.priority] }}
                >
                  {group.priority}
                </span>
                <div className="h-px flex-1" style={{ backgroundColor: `${PRIORITY_HEX[group.priority]}30` }} />
              </div>
              <div className="space-y-1.5">
                {group.tickets.map(ticket => (
                  <TicketCard key={ticket.id} ticket={ticket} onClick={onCardClick} />
                ))}
              </div>
            </div>
          );
        })}
        {tickets.length === 0 && (
          <p className="py-8 text-center text-xs text-muted-foreground">No tickets</p>
        )}
      </div>
    </div>
  );
}
