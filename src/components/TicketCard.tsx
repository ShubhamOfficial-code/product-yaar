import React from 'react';
import { Ticket, PRIORITY_HEX, DEPARTMENT_HEX, timeAgo } from '@/lib/constants';

interface TicketCardProps {
  ticket: Ticket;
  onClick: (ticket: Ticket) => void;
}

const statusColors: Record<string, string> = {
  'Open': 'bg-primary/20 text-primary',
  'In Progress': 'bg-dept-payments/20 text-dept-payments',
  'Resolved': 'bg-primary/20 text-primary',
  'Closed': 'bg-muted text-muted-foreground',
};

export default function TicketCard({ ticket, onClick }: TicketCardProps) {
  const borderColor = PRIORITY_HEX[ticket.priority];

  return (
    <button
      onClick={() => onClick(ticket)}
      className="group w-full rounded-md bg-ticket p-3 text-left shadow-sm transition hover:brightness-110"
      style={{ borderLeft: `3px solid ${borderColor}` }}
    >
      <div className="mb-2 flex items-center justify-between">
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
          style={{
            backgroundColor: `${PRIORITY_HEX[ticket.priority]}20`,
            color: PRIORITY_HEX[ticket.priority],
          }}
        >
          {ticket.priority}
        </span>
        <span className="text-[10px] text-muted-foreground">{ticket.ticket_id}</span>
      </div>
      <p className="mb-1 text-sm font-semibold text-foreground leading-snug line-clamp-2">
        {ticket.issue_type}
      </p>
      <p className="mb-2 text-xs text-muted-foreground truncate">{ticket.sender_email}</p>
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground">{timeAgo(ticket.date_time)}</span>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColors[ticket.status] || 'bg-muted text-muted-foreground'}`}>
          {ticket.status}
        </span>
      </div>
    </button>
  );
}
