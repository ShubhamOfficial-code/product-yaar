import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { Ticket, STATUSES, PRIORITY_HEX, DEPARTMENT_HEX, TicketStatus, timeAgo, Department, DEPARTMENTS } from '@/lib/constants';
import { useTickets } from '@/contexts/TicketContext';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_STAFF } from '@/lib/mock-data';

interface Props {
  ticket: Ticket | null;
  onClose: () => void;
}

export default function TicketDetailPanel({ ticket, onClose }: Props) {
  const { updateTicketStatus, updateTicketAssignment, addNote } = useTickets();
  const { user } = useAuth();
  const [noteText, setNoteText] = useState('');

  if (!ticket) return null;

  const agents = MOCK_STAFF.filter(s => s.department === ticket.department && s.is_active);

  const handleAddNote = () => {
    if (!noteText.trim() || !user) return;
    addNote(ticket.id, {
      author: user.name,
      text: noteText.trim(),
      created_at: new Date().toISOString(),
    });
    setNoteText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 flex h-full w-full max-w-lg flex-col bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-3">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: PRIORITY_HEX[ticket.priority] }}
            />
            <h2 className="text-lg font-bold text-foreground">{ticket.ticket_id}</h2>
          </div>
          <button onClick={onClose} className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-5">
          {/* Subject & summary */}
          <div>
            <h3 className="text-base font-semibold text-foreground">{ticket.subject}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{ticket.summary}</p>
          </div>

          {/* Metadata grid */}
          <div className="grid grid-cols-2 gap-3">
            <MetaField label="Department">
              <span className="font-medium" style={{ color: DEPARTMENT_HEX[ticket.department] }}>{ticket.department}</span>
            </MetaField>
            <MetaField label="Priority">
              <span className="font-medium" style={{ color: PRIORITY_HEX[ticket.priority] }}>{ticket.priority}</span>
            </MetaField>
            <MetaField label="Issue Type"><span className="font-medium text-foreground">{ticket.issue_type}</span></MetaField>
            <MetaField label="Sender"><span className="font-medium text-foreground text-xs">{ticket.sender_email}</span></MetaField>
            <MetaField label="Received"><span className="font-medium text-foreground text-xs">{new Date(ticket.date_time).toLocaleString()}</span></MetaField>
            <MetaField label="Created"><span className="font-medium text-foreground text-xs">{timeAgo(ticket.created_at)}</span></MetaField>
          </div>

          {/* Status dropdown */}
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Status</label>
            <select
              value={ticket.status}
              onChange={e => updateTicketStatus(ticket.id, e.target.value as TicketStatus)}
              className="w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Assigned to */}
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Assigned To</label>
            <select
              value={ticket.assigned_to}
              onChange={e => updateTicketAssignment(ticket.id, e.target.value)}
              className="w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {agents.map(a => <option key={a.id} value={a.email}>{a.name} ({a.email})</option>)}
            </select>
          </div>

          {/* Notes */}
          <div>
            <h4 className="mb-2 text-sm font-semibold text-foreground">Internal Notes</h4>
            <div className="space-y-2">
              {ticket.notes.length === 0 && (
                <p className="text-xs text-muted-foreground italic">No notes yet.</p>
              )}
              {ticket.notes.map((note, i) => (
                <div key={i} className="rounded-md bg-secondary p-3">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground">{note.author}</span>
                    <span className="text-[10px] text-muted-foreground">{timeAgo(note.created_at)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{note.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add note */}
        <div className="border-t border-border p-4">
          <div className="flex gap-2">
            <input
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddNote()}
              placeholder="Add an internal note..."
              className="flex-1 rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={handleAddNote}
              disabled={!noteText.trim()}
              className="rounded-md bg-primary px-3 py-2 text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-md bg-secondary p-2.5">
      <p className="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      {children}
    </div>
  );
}
