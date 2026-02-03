import React, { useEffect, useState } from 'react';
import api from '../api';
import { ArrowUpRight, ArrowDownLeft, CheckCircle } from 'lucide-react';

const History = () => {
    const [logs, setLogs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState('');

    useEffect(() => {
        fetchLogs(page);
    }, [page]);

    useEffect(() => {
        fetchLogs(page);
    }, [page, selectedSession]);

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        try {
            const res = await api.get('/sessions');
            setSessions(res.data);
            if (res.data.length > 0 && !selectedSession) {
                setSelectedSession(res.data[0].id);
            }
        } catch (error) {
            console.error("Failed to fetch sessions", error);
        }
    };
    const fetchLogs = async (p) => {
        try {
            const res = await api.get(`/dashboard/history?page=${p}&limit=20${selectedSession ? `&sessionId=${selectedSession}` : ''}`);
            setLogs(res.data.data);
            setTotalPages(res.data.pagination.totalPages);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Message History</h2>
                    <p className="text-gray-500 mt-1">View incoming and outgoing message logs</p>
                </div>
                <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                    <select
                        className="bg-transparent border-none outline-none text-sm font-medium text-gray-700 px-3 py-2 min-w-[150px] cursor-pointer"
                        value={selectedSession}
                        onChange={(e) => { setSelectedSession(e.target.value); setPage(1); }}
                    >
                        <option value="">All Sessions</option>
                        {sessions.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                    <div className="h-6 w-px bg-gray-200"></div>
                    <button onClick={() => fetchLogs(page)} className="text-gray-500 hover:text-sisia-primary hover:bg-gray-100 p-2 rounded-lg transition-all" title="Refresh">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-cw"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /></svg>
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50/50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Time</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Recipient</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Message</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Session</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {logs.map((log) => (
                                <tr key={log.id} className="hover:bg-blue-50/30 transition-colors group text-sm">
                                    <td className="px-6 py-4 text-gray-500 font-mono text-xs whitespace-nowrap">
                                        {new Date(log.createdAt).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        {log.recipient}
                                    </td>
                                    <td className="px-6 py-4 max-w-xs">
                                        <div className="truncate text-gray-600" title={log.message}>{log.message}</div>
                                        {log.content && <div className="text-xs text-gray-400 mt-1 truncate">{log.content}</div>}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                        {log.direction === 'IN' ? log.from.split('@')[0] : log.to.split('@')[0]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {log.status === 'SENT' ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                                <CheckCircle size={14} /> Sent
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                                                <ArrowUpRight size={14} /> Outgoing
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {logs.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400 bg-gray-50/30">
                                        <p className="text-sm font-medium">No messages found for this period</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                    className="px-4 py-2 border bg-white rounded hover:bg-gray-100 disabled:opacity-50 text-sm"
                >
                    Previous
                </button>
                <span className="text-gray-500 text-sm">Page {page} of {totalPages || 1}</span>
                <button
                    disabled={page === totalPages || totalPages === 0}
                    onClick={() => setPage(p => p + 1)}
                    className="px-4 py-2 border bg-white rounded hover:bg-gray-100 disabled:opacity-50 text-sm"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default History;
