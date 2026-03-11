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

export default function AdminPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [adminToken, setAdminToken] = useState<string>(() => {
    try {
      return (typeof window !== 'undefined' && localStorage.getItem('adminToken')) || process.env.NEXT_PUBLIC_ADMIN_TOKEN || '';
    } catch (e) {
      return process.env.NEXT_PUBLIC_ADMIN_TOKEN || '';
    }
  });
  const [tokenInput, setTokenInput] = useState('');

  // Fetch appointments from API
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const API = process.env.NEXT_PUBLIC_API_URL || '';
      const endpoint = API ? `${API}/api/appointments` : '/api/appointments';
      const res = await fetch(endpoint, {
        headers: adminToken ? { 'x-admin-token': adminToken } : undefined,
      });
      const json = await res.json();
      if (json.success) setAppointments(json.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

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

  const doDelete = async (id: string) => {
    if (!confirm('Delete appointment?')) return;
    setActionLoading(id);
    try {
      const API = process.env.NEXT_PUBLIC_API_URL || '';
      const endpoint = API ? `${API}/api/appointments/${id}` : `/api/appointments/${id}`;
      await fetch(endpoint, {
        method: 'DELETE',
        headers: { 'x-admin-token': adminToken },
      });
      await fetchAppointments();
    } finally {
      setActionLoading(null);
    }
  };

  const changeStatus = async (id: string, status: string) => {
    setActionLoading(id);
    try {
      const API = process.env.NEXT_PUBLIC_API_URL || '';
      const endpoint = API ? `${API}/api/appointments/${id}` : `/api/appointments/${id}`;
      await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
        body: JSON.stringify({ status }),
      });
      await fetchAppointments();
    } finally {
      setActionLoading(null);
    }
  };

  const saveToken = () => {
    try {
      if (typeof window !== 'undefined') localStorage.setItem('adminToken', tokenInput);
      setAdminToken(tokenInput);
      setTokenInput('');
    } catch (e) {
      console.error('Could not save token', e);
    }
  };

  const clearToken = () => {
    try {
      if (typeof window !== 'undefined') localStorage.removeItem('adminToken');
      setAdminToken('');
    } catch (e) {
      console.error('Could not clear token', e);
    }
  };

  const toggleConfirm = (a: Appointment) => {
    const next = a.status === 'confirmed' ? 'pending' : 'confirmed';
    changeStatus(a._id, next);
  };

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Admin — Appointments</h1>
        <div className="text-sm text-slate-400">Admin token present: {adminToken ? 'yes' : 'no'}</div>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex items-center gap-3">
          <input
            placeholder={adminToken ? 'Admin token set' : 'Enter admin token'}
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            type="password"
            className="border px-3 py-2 rounded w-64 bg-slate-800 text-slate-100"
          />
          <button onClick={saveToken} className="bg-emerald-600 text-white px-3 py-2 rounded text-sm">Save Token</button>
          <button onClick={clearToken} className="bg-rose-600 text-white px-3 py-2 rounded text-sm">Clear</button>
          <div className="text-sm text-slate-400">{adminToken ? 'Token active' : 'No token'}</div>
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, phone, date, time..."
          className="border px-3 py-2 rounded w-80"
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border px-3 py-2 rounded">
          <option value="all">All statuses</option>
          <option value="pending">pending</option>
          <option value="confirmed">confirmed</option>
          <option value="cancelled">cancelled</option>
          <option value="completed">completed</option>
        </select>
        <button onClick={fetchAppointments} className="bg-blue-600 text-white px-4 py-2 rounded">
          Refresh
        </button>
      </div>

      {loading ? (
        <div>Loading appointments…</div>
      ) : (
        <div className="bg-slate-800 rounded-lg shadow overflow-hidden border border-slate-700">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y table-fixed">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">Time</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-slate-900 divide-y divide-slate-700">
                {visible.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                      No appointments
                    </td>
                  </tr>
                )}
                {visible.map((a) => (
                  <tr key={a._id} className="">
                    <td className="px-4 py-3 align-top text-sm text-slate-100">{a.name}</td>
                    <td className="px-4 py-3 align-top text-sm text-slate-200">{a.phone}</td>
                    <td className="px-4 py-3 align-top text-sm text-slate-200">{a.appointmentDate?.slice(0, 10)}</td>
                    <td className="px-4 py-3 align-top text-sm text-slate-200">{a.appointmentTime}</td>
                    <td className="px-4 py-3 align-top">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium inline-block ${
                          a.status === 'confirmed'
                            ? 'bg-emerald-900 text-emerald-300 border border-emerald-700'
                            : a.status === 'cancelled'
                            ? 'bg-rose-900 text-rose-300 border border-rose-700'
                            : 'bg-yellow-900 text-amber-300 border border-amber-700'
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleConfirm(a)}
                          disabled={!adminToken || actionLoading === a._id}
                          className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-sm transition-colors disabled:opacity-60"
                        >
                          {a.status === 'confirmed' ? 'Unconfirm' : 'Confirm'}
                        </button>

                        <select
                          value={a.status}
                          onChange={(e) => changeStatus(a._id, e.target.value)}
                          disabled={!adminToken || actionLoading === a._id}
                          className="border border-slate-700 bg-slate-800 text-slate-100 px-2 py-1 rounded text-sm"
                        >
                          <option value="pending">pending</option>
                          <option value="confirmed">confirmed</option>
                          <option value="cancelled">cancelled</option>
                          <option value="completed">completed</option>
                        </select>

                        <button
                          onClick={() => doDelete(a._id)}
                          disabled={!adminToken || actionLoading === a._id}
                          className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded text-sm transition-colors disabled:opacity-60"
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
        </div>
      )}
    </div>
  );
}
