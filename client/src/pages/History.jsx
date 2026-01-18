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
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Message History</h2>
                <div className="flex gap-4 items-center">
                    <select
                        className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-wa-green text-sm"
                        value={selectedSession}
                        onChange={(e) => { setSelectedSession(e.target.value); setPage(1); }}
                    >
                        {sessions.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                    <button onClick={() => fetchLogs(page)} className="text-wa-green hover:underline">Refresh</button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 text-left">Time</th>
                            <th className="p-4 text-left">Recipient</th>
                            <th className="p-4 text-left">Message</th>
                            <th className="p-4 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log) => (
                            <tr key={log.id} className="border-b hover:bg-gray-50">
                                <td className="p-4 text-sm text-gray-500">
                                    {new Date(log.createdAt).toLocaleString()}
                                </td>
                                <td className="p-4">{log.recipient}</td>
                                <td className="p-4 truncate max-w-xs" title={log.message}>{log.message}</td>
                                <td className="p-4">
                                    {log.status === 'SENT' ? (
                                        <span className="flex items-center text-wa-green text-sm font-medium">
                                            <CheckCircle size={16} className="mr-1" /> Sent
                                        </span>
                                    ) : (
                                        <span className="flex items-center text-wa-green text-sm font-medium">
                                            <ArrowUpRight size={16} className="mr-1" /> Outgoing
                                        </span>
                                    )}
                                </td>
                                <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                                    {log.direction === 'IN' ? log.from.split('@')[0] : log.to.split('@')[0]}
                                </td>
                                <td className="p-4 text-sm text-gray-800 max-w-md truncate">
                                    {log.content}
                                </td>
                            </tr>
                        ))}
                        {logs.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-gray-400">
                                    No messages found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
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
