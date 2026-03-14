"use client";
import React, { useEffect, useState, useMemo } from 'react';

type Appointment = {
  _id: string;
  name: string;
  phone: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  createdAt?: string;
};

// Reviews removed from admin UI

export default function AdminPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [adminToken, setAdminToken] = useState<string>(() => {
    // Only ever use the token stored in this browser, never a public env token.
    try {
      if (typeof window !== 'undefined') {
        return localStorage.getItem('adminToken') || '';
      }
      return '';
    } catch {
      return '';
    }
  });
  const [tokenInput, setTokenInput] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  

  // Fetch appointments from API
  const fetchAppointments = async () => {
    setLoading(true);
    setFeedback(null);
    try {
      const API = process.env.NEXT_PUBLIC_API_URL || '';
      const endpoint = API ? `${API}/api/appointments` : '/api/appointments';
      const res = await fetch(endpoint, {
        headers: adminToken ? { 'x-admin-token': adminToken } : undefined,
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setFeedback({ type: 'error', message: json.message || 'Unable to load appointments. Check admin token.' });
        setAppointments([]);
        return;
      }
      setAppointments(json.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  

  // Review deletion removed from admin dashboard (UI-only)

  // Filtered & searched list
  const visible = useMemo(() => {
    return appointments
      .filter((a) => (filter === 'all' ? true : a.status === filter))
      .filter((a) => {
        if (!query) return true;
        const q = query.toLowerCase();
        return (
          a.name.toLowerCase().includes(q) ||
          a.phone.toLowerCase().includes(q) ||
          a.appointmentDate?.includes(q) ||
          a.appointmentTime.includes(q)
        );
      });
  }, [appointments, filter, query]);

  const stats = useMemo(() => {
    const total = appointments.length;
    const pending = appointments.filter((a) => a.status === 'pending').length;
    const confirmed = appointments.filter((a) => a.status === 'confirmed').length;
    const cancelled = appointments.filter((a) => a.status === 'cancelled').length;
    const completed = appointments.filter((a) => a.status === 'completed').length;
    return { total, pending, confirmed, cancelled, completed };
  }, [appointments]);

  const doDelete = async (id: string) => {
    console.log('Deleting appointment', id);
    if (!confirm('Delete appointment?')) return;
    setActionLoading(id);
    try {
      const API = process.env.NEXT_PUBLIC_API_URL || '';
      const endpoint = API ? `${API}/api/appointments/${id}` : `/api/appointments/${id}`;
      const res = await fetch(endpoint, {
        method: 'DELETE',
        headers: { 'x-admin-token': adminToken },
      });
      if (!res.ok) {
        let msg = 'Could not delete appointment. Check token or try again.';
        try {
          const json = await res.json();
          if (json?.message) msg = json.message;
        } catch (_) {}
        setFeedback({ type: 'error', message: msg });
        return;
      }
      setFeedback({ type: 'success', message: 'Appointment deleted.' });
      await fetchAppointments();
    } finally {
      setActionLoading(null);
    }
  };

  const changeStatus = async (id: string, status: string) => {
    console.log('Changing status', id, status);
    setActionLoading(id);
    try {
      const API = process.env.NEXT_PUBLIC_API_URL || '';
      const endpoint = API ? `${API}/api/appointments/${id}` : `/api/appointments/${id}`;
      const res = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        let msg = 'Could not update status. Check token or try again.';
        try {
          const json = await res.json();
          if (json?.message) msg = json.message;
        } catch (_) {}
        setFeedback({ type: 'error', message: msg });
        return;
      }
      setFeedback({ type: 'success', message: 'Status updated.' });
      await fetchAppointments();
    } finally {
      setActionLoading(null);
    }
  };

  const saveToken = () => {
    try {
      console.log('Saving admin token');
      if (typeof window !== 'undefined') localStorage.setItem('adminToken', tokenInput);
      setAdminToken(tokenInput);
      setTokenInput('');
      setFeedback({ type: 'success', message: 'Admin token saved for this browser.' });
    } catch (e) {
      console.error('Could not save token', e);
    }
  };

  const clearToken = () => {
    try {
      console.log('Clearing admin token');
      if (typeof window !== 'undefined') localStorage.removeItem('adminToken');
      setAdminToken('');
      setFeedback({ type: 'success', message: 'Admin token cleared.' });
    } catch (e) {
      console.error('Could not clear token', e);
    }
  };

  const toggleConfirm = (a: Appointment) => {
    const next = a.status === 'confirmed' ? 'pending' : 'confirmed';
    changeStatus(a._id, next);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Admin dashboard</h1>
            <p className="mt-1 text-sm text-slate-400">
              Manage all booked appointments, confirm times, and keep track of status.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 border border-slate-700 px-3 py-1 text-xs text-slate-300">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            <span>Admin token: {adminToken ? 'active' : 'not set'}</span>
          </div>
        </div>

        {feedback && (
          <div
            className={`rounded-xl border px-4 py-3 text-sm ${
              feedback.type === 'success'
                ? 'border-emerald-700/70 bg-emerald-950/70 text-emerald-200'
                : 'border-rose-700/70 bg-rose-950/70 text-rose-200'
            }`}
          >
            {feedback.message}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <div className="rounded-xl bg-slate-900/70 border border-slate-800 px-4 py-3">
            <div className="text-[11px] uppercase tracking-wide text-slate-400">Total</div>
            <div className="mt-1 text-xl font-semibold">{stats.total}</div>
          </div>
          <div className="rounded-xl bg-amber-950/40 border border-amber-900/60 px-4 py-3">
            <div className="text-[11px] uppercase tracking-wide text-amber-300/80">Pending</div>
            <div className="mt-1 text-xl font-semibold text-amber-200">{stats.pending}</div>
          </div>
          <div className="rounded-xl bg-emerald-950/40 border border-emerald-900/60 px-4 py-3">
            <div className="text-[11px] uppercase tracking-wide text-emerald-300/80">Confirmed</div>
            <div className="mt-1 text-xl font-semibold text-emerald-200">{stats.confirmed}</div>
          </div>
          <div className="rounded-xl bg-rose-950/40 border border-rose-900/60 px-4 py-3">
            <div className="text-[11px] uppercase tracking-wide text-rose-300/80">Cancelled</div>
            <div className="mt-1 text-xl font-semibold text-rose-200">{stats.cancelled}</div>
          </div>
          <div className="rounded-xl bg-slate-900/70 border border-slate-800 px-4 py-3">
            <div className="text-[11px] uppercase tracking-wide text-sky-300/80">Completed</div>
            <div className="mt-1 text-xl font-semibold text-sky-200">{stats.completed}</div>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900/70 border border-slate-800 shadow-lg shadow-slate-900/40">
          <div className="border-b border-slate-800 px-4 sm:px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <input
                  placeholder={adminToken ? 'Admin token set' : 'Enter admin token'}
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  type="password"
                  className="border border-slate-700 bg-slate-900/80 text-slate-100 text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                />
                <button
                  onClick={saveToken}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-md text-xs font-medium transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={clearToken}
                  className="bg-rose-600/90 hover:bg-rose-600 text-white px-3 py-2 rounded-md text-xs font-medium transition-colors"
                >
                  Clear
                </button>
              </div>
              <span className="text-xs text-slate-400">
                {adminToken ? 'Token secured in this browser.' : 'You need a valid admin token to edit.'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, phone, date, time…"
                  className="border border-slate-700 bg-slate-900/80 text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/70 w-56"
                />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-slate-700 bg-slate-900/80 text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                >
                  <option value="all">All statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <button
                onClick={fetchAppointments}
                className="inline-flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-xs font-medium transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-200 animate-pulse" />
                Refresh
              </button>
            </div>
          </div>

          {loading ? (
            <div className="px-6 py-10 flex flex-col items-center justify-center gap-2 text-slate-400">
              <div className="h-10 w-10 border-2 border-slate-700 border-t-indigo-500 rounded-full animate-spin" />
              <p className="text-sm">Loading appointments…</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-900/80 border-b border-slate-800">
                  <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
                    <th className="px-4 sm:px-6 py-3">Name</th>
                    <th className="px-4 sm:px-6 py-3">Phone</th>
                    <th className="px-4 sm:px-6 py-3">Date</th>
                    <th className="px-4 sm:px-6 py-3">Time</th>
                    <th className="px-4 sm:px-6 py-3">Status</th>
                    <th className="px-4 sm:px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-950/40">
                  {visible.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-slate-400">
                        No appointments match your filters.
                      </td>
                    </tr>
                  )}
                  {visible.map((a) => (
                    <tr key={a._id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="px-4 sm:px-6 py-3 align-top">
                        <div className="font-medium text-slate-100">{a.name}</div>
                        {a.createdAt && (
                          <div className="mt-0.5 text-[11px] text-slate-500">
                            Created {new Date(a.createdAt).toLocaleDateString()}
                          </div>
                        )}
                      </td>
                      <td className="px-4 sm:px-6 py-3 align-top text-slate-200">{a.phone}</td>
                      <td className="px-4 sm:px-6 py-3 align-top text-slate-200">
                        {a.appointmentDate?.slice(0, 10) || '—'}
                      </td>
                      <td className="px-4 sm:px-6 py-3 align-top text-slate-200">{a.appointmentTime}</td>
                      <td className="px-4 sm:px-6 py-3 align-top">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${
                            a.status === 'confirmed'
                              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                              : a.status === 'cancelled'
                              ? 'bg-rose-950/60 text-rose-300 border border-rose-800'
                              : a.status === 'completed'
                              ? 'bg-sky-950/60 text-sky-300 border border-sky-800'
                              : 'bg-amber-950/60 text-amber-300 border border-amber-800'
                          }`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                          {a.status}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 align-top">
                        <div className="flex flex-wrap justify-end gap-2">
                          <button
                            onClick={() => toggleConfirm(a)}
                            disabled={actionLoading === a._id}
                            className="px-3 py-1.5 rounded-md text-xs font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-colors disabled:opacity-50"
                          >
                            {a.status === 'confirmed' ? 'Unconfirm' : 'Confirm'}
                          </button>

                          <select
                            value={a.status}
                            onChange={(e) => changeStatus(a._id, e.target.value)}
                            disabled={actionLoading === a._id}
                            className="border border-slate-700 bg-slate-950/80 text-slate-100 px-2 py-1.5 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                          >
                            <option value="pending">pending</option>
                            <option value="confirmed">confirmed</option>
                            <option value="cancelled">cancelled</option>
                            <option value="completed">completed</option>
                          </select>

                          <button
                            onClick={() => doDelete(a._id)}
                            disabled={actionLoading === a._id}
                            className="px-3 py-1.5 rounded-md text-xs font-medium bg-rose-600 hover:bg-rose-700 text-white transition-colors disabled:opacity-50"
                          >
                            {actionLoading === a._id ? '...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Reviews management removed from admin dashboard (UI-only) */}
      </div>
    </div>
  );
}
