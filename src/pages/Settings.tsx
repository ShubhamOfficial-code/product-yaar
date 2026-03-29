import React, { useState } from 'react';
import { MOCK_STAFF } from '@/lib/mock-data';
import { StaffMember, DEPARTMENTS, Department, UserRole } from '@/lib/constants';
import { UserPlus, Edit2, Power, Users } from 'lucide-react';

export default function SettingsPage() {
  const [staff, setStaff] = useState<StaffMember[]>(MOCK_STAFF);
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formRole, setFormRole] = useState<UserRole>('agent');
  const [formDept, setFormDept] = useState<Department>('Sales');

  const resetForm = () => {
    setFormName(''); setFormEmail(''); setFormRole('agent'); setFormDept('Sales');
    setShowAdd(false); setEditId(null);
  };

  const handleAdd = () => {
    if (!formName.trim() || !formEmail.trim()) return;
    setStaff(prev => [...prev, {
      id: Date.now().toString(),
      name: formName.trim(),
      email: formEmail.trim(),
      role: formRole,
      department: formDept,
      is_active: true,
    }]);
    resetForm();
  };

  const handleEdit = (s: StaffMember) => {
    setEditId(s.id); setFormName(s.name); setFormEmail(s.email);
    setFormRole(s.role); setFormDept(s.department); setShowAdd(true);
  };

  const handleSaveEdit = () => {
    setStaff(prev => prev.map(s => s.id === editId ? { ...s, name: formName, role: formRole, department: formDept } : s));
    resetForm();
  };

  const toggleActive = (id: string) => {
    setStaff(prev => prev.map(s => s.id === id ? { ...s, is_active: !s.is_active } : s));
  };

  return (
    <div className="min-h-[calc(100vh-56px)] bg-board p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Staff Management</h1>
          </div>
          <button
            onClick={() => { resetForm(); setShowAdd(true); }}
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            <UserPlus className="h-4 w-4" /> Add Agent
          </button>
        </div>

        {/* Add/Edit form */}
        {showAdd && (
          <div className="mb-6 rounded-lg border border-border bg-card p-4">
            <h3 className="mb-3 text-sm font-semibold text-foreground">{editId ? 'Edit Agent' : 'Add New Agent'}</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input value={formName} onChange={e => setFormName(e.target.value)} placeholder="Name" className="rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              <input value={formEmail} onChange={e => setFormEmail(e.target.value)} placeholder="Email" disabled={!!editId} className="rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-ring" />
              <select value={formRole} onChange={e => setFormRole(e.target.value as UserRole)} className="rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="agent">Agent</option>
                <option value="admin">Admin</option>
              </select>
              <select value={formDept} onChange={e => setFormDept(e.target.value as Department)} className="rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={editId ? handleSaveEdit : handleAdd} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
                {editId ? 'Save Changes' : 'Add Agent'}
              </button>
              <button onClick={resetForm} className="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Staff table */}
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Department</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map(s => (
                <tr key={s.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground">{s.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.email}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${s.role === 'admin' ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                      {s.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-foreground">{s.department}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${s.is_active ? 'bg-dept-payments/20 text-dept-payments' : 'bg-destructive/20 text-destructive'}`}>
                      {s.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleEdit(s)} className="rounded p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground">
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => toggleActive(s.id)} className="rounded p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground">
                        <Power className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
