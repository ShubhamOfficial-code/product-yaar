import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTickets } from '@/contexts/TicketContext';
import {
  GraduationCap, Bell, Search, LogOut, LayoutDashboard,
  BarChart3, Settings, ChevronDown, X
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { tickets } = useTickets();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotif, setShowNotif] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const critHighTickets = tickets.filter(
    t => (t.priority === 'Critical' || t.priority === 'High') && t.status === 'Open'
  );
  const unreadCount = critHighTickets.length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <nav className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-navbar px-4">
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="hidden text-sm font-bold text-navbar-foreground sm:block">SupportDesk</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          <NavItem to="/dashboard" label="Board" icon={<LayoutDashboard className="h-4 w-4" />} active={location.pathname === '/dashboard'} />
          {isAdmin && <NavItem to="/analytics" label="Analytics" icon={<BarChart3 className="h-4 w-4" />} active={location.pathname === '/analytics'} />}
          {isAdmin && <NavItem to="/settings" label="Settings" icon={<Settings className="h-4 w-4" />} active={location.pathname === '/settings'} />}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="relative rounded-md p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          {showNotif && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-lg border border-border bg-card shadow-xl">
              <div className="border-b border-border p-3">
                <h3 className="text-sm font-semibold text-foreground">Urgent Tickets</h3>
              </div>
              <div className="max-h-80 overflow-y-auto scrollbar-thin">
                {critHighTickets.length === 0 ? (
                  <p className="p-4 text-center text-sm text-muted-foreground">No urgent tickets</p>
                ) : (
                  critHighTickets.slice(0, 10).map(t => (
                    <button
                      key={t.id}
                      onClick={() => { setShowNotif(false); navigate('/dashboard'); }}
                      className="flex w-full items-start gap-3 border-b border-border p-3 text-left transition hover:bg-secondary"
                    >
                      <span
                        className="mt-1 h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: t.priority === 'Critical' ? '#dc2626' : '#ea580c' }}
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{t.subject}</p>
                        <p className="text-xs text-muted-foreground">{t.department} · {t.ticket_id}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {user?.name?.charAt(0) || '?'}
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-medium text-navbar-foreground">{user?.name}</p>
            <p className="text-[10px] text-muted-foreground capitalize">{user?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-md p-1.5 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ to, label, icon, active }: { to: string; label: string; icon: React.ReactNode; active: boolean }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition ${
        active ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}
