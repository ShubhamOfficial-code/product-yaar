import React, { useMemo } from 'react';
import { useTickets } from '@/contexts/TicketContext';
import {
  DEPARTMENTS, DEPARTMENT_PRIORITIES, DEPARTMENT_HEX,
  PRIORITY_HEX, Priority
} from '@/lib/constants';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, Calendar, Clock, BarChart3 } from 'lucide-react';

export default function AnalyticsPage() {
  const { tickets } = useTickets();

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart.getTime() - 7 * 86400000);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const ticketsToday = tickets.filter(t => new Date(t.created_at) >= todayStart).length;
  const ticketsWeek = tickets.filter(t => new Date(t.created_at) >= weekStart).length;
  const ticketsMonth = tickets.filter(t => new Date(t.created_at) >= monthStart).length;

  // By department
  const byDept = DEPARTMENTS.map(d => ({
    name: d.replace(' Support', ''),
    count: tickets.filter(t => t.department === d).length,
    fill: DEPARTMENT_HEX[d],
  }));

  // By priority
  const priorities: Priority[] = ['Critical', 'High', 'Medium', 'Low'];
  const byPriority = priorities.map(p => ({
    name: p,
    value: tickets.filter(t => t.priority === p).length,
    color: PRIORITY_HEX[p],
  }));

  // Top issue types
  const issueTypeCounts: Record<string, number> = {};
  tickets.forEach(t => {
    issueTypeCounts[t.issue_type] = (issueTypeCounts[t.issue_type] || 0) + 1;
  });
  const topIssues = Object.entries(issueTypeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Breakdown table
  const breakdownData = DEPARTMENTS.map(d => {
    const deptTickets = tickets.filter(t => t.department === d);
    const row: Record<string, number | string> = { department: d };
    DEPARTMENT_PRIORITIES[d].forEach(p => {
      row[p] = deptTickets.filter(t => t.priority === p).length;
    });
    return row;
  });

  return (
    <div className="min-h-[calc(100vh-56px)] bg-board p-6">
      <h1 className="mb-6 text-2xl font-bold text-foreground">Analytics</h1>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Today" value={ticketsToday} icon={<Calendar className="h-5 w-5" />} />
        <StatCard label="This Week" value={ticketsWeek} icon={<TrendingUp className="h-5 w-5" />} />
        <StatCard label="This Month" value={ticketsMonth} icon={<BarChart3 className="h-5 w-5" />} />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Bar chart */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Tickets by Department</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={byDept}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 25%, 27%)" />
              <XAxis dataKey="name" tick={{ fill: 'hsl(215, 20%, 65%)', fontSize: 11 }} />
              <YAxis tick={{ fill: 'hsl(215, 20%, 65%)', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(217, 33%, 17%)', border: 'none', borderRadius: 8 }}
                labelStyle={{ color: 'hsl(210, 40%, 98%)' }}
                itemStyle={{ color: 'hsl(210, 40%, 98%)' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {byDept.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut chart */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Tickets by Priority</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={byPriority}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {byPriority.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(217, 33%, 17%)', border: 'none', borderRadius: 8 }}
                itemStyle={{ color: 'hsl(210, 40%, 98%)' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex justify-center gap-4">
            {byPriority.map(p => (
              <div key={p.name} className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                <span className="text-xs text-muted-foreground">{p.name} ({p.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Breakdown table */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Priority Breakdown by Department</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 text-left text-xs font-medium text-muted-foreground">Department</th>
                  {priorities.map(p => (
                    <th key={p} className="py-2 text-center text-xs font-medium" style={{ color: PRIORITY_HEX[p] }}>{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {breakdownData.map(row => (
                  <tr key={row.department as string} className="border-b border-border">
                    <td className="py-2 font-medium text-foreground text-xs">{row.department}</td>
                    {priorities.map(p => (
                      <td key={p} className="py-2 text-center text-muted-foreground">
                        {(row[p] as number) || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top issues */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Top 5 Issue Types</h2>
          <div className="space-y-3">
            {topIssues.map(([type, count], i) => (
              <div key={type} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{type}</span>
                    <span className="text-xs text-muted-foreground">{count}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${(count / topIssues[0][1]) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="mt-1 text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div className="text-muted-foreground">{icon}</div>
      </div>
    </div>
  );
}
