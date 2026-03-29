import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { GraduationCap, LogIn, Copy, Check } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<'email' | 'password' | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const demoEmail = 'demo@edtech.com';
  const demoPassword = 'Demo@123';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Please check your credentials.');
    }
  };

  const handleCopy = (text: string, type: 'email' | 'password') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleFillDemo = () => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-secondary/50 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Main Login Card */}
        <div className="rounded-lg border border-border bg-card p-8 shadow-lg">
          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Support Dashboard</h1>
            <p className="text-sm text-muted-foreground">EdTech Support System</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20">
                {error}
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
            >
              <LogIn className="h-4 w-4" />
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Demo Credentials Card */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800 p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">Demo Credentials</p>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-xs px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Auto-fill
              </button>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <p className="text-xs text-blue-800 dark:text-blue-300 font-medium">Email:</p>
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900 rounded border border-blue-200 dark:border-blue-800 p-2">
                <code className="text-sm font-mono text-foreground flex-1 break-all">{demoEmail}</code>
                <button
                  type="button"
                  onClick={() => handleCopy(demoEmail, 'email')}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 transition"
                  title="Copy email"
                >
                  {copied === 'email' ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <p className="text-xs text-blue-800 dark:text-blue-300 font-medium">Password:</p>
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900 rounded border border-blue-200 dark:border-blue-800 p-2">
                <code className="text-sm font-mono text-foreground flex-1">{demoPassword}</code>
                <button
                  type="button"
                  onClick={() => handleCopy(demoPassword, 'password')}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 transition"
                  title="Copy password"
                >
                  {copied === 'password' ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <p className="text-xs text-blue-700 dark:text-blue-300 text-center pt-2">
              Copy credentials above or click "Auto-fill" to get started
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          This is a demo environment for testing purposes
        </p>
      </div>
    </div>
  );
}
