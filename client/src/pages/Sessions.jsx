import React, { useEffect, useState } from 'react';
import api from '../api';
import io from 'socket.io-client';
import { Plus, Trash, RefreshCw, Edit, Save, X } from 'lucide-react';

const Sessions = () => {
    const [sessions, setSessions] = useState([]);
    const [newSessionId, setNewSessionId] = useState('');
    const [qrCodes, setQrCodes] = useState({});
    const [editingSessionId, setEditingSessionId] = useState(null);
    const [editingName, setEditingName] = useState('');

    useEffect(() => {
        fetchSessions();
        const socket = io(import.meta.env.VITE_API_URL || undefined);

        socket.on('session-qr', ({ sessionId, qr }) => {
            setQrCodes(prev => ({ ...prev, [sessionId]: qr }));
        });

        socket.on('session-status', ({ sessionId, status }) => {
            fetchSessions();
            if (status === 'CONNECTED') {
                setQrCodes(prev => {
                    const newQrs = { ...prev };
                    delete newQrs[sessionId];
                    return newQrs;
                });
            }
        });

        return () => socket.disconnect();
    }, []);

    const fetchSessions = async () => {
        const res = await api.get('/sessions');
        setSessions(res.data);

        // Initialize QRs from API response
        const newQrs = {};
        res.data.forEach(s => {
            if (s.qr) newQrs[s.id] = s.qr;
        });
        setQrCodes(prev => ({ ...prev, ...newQrs }));
    };

    const handleCreate = async () => {
        if (!newSessionId) return;
        await api.post('/sessions', { id: newSessionId, name: newSessionId });
        setNewSessionId('');
        fetchSessions();
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this session?")) return;
        await api.delete(`/sessions/${id}`);
        fetchSessions();
    };

    const handleUpdateName = async (id) => {
        try {
            await api.put(`/sessions/${id}`, { name: editingName });
            setEditingSessionId(null);
            fetchSessions();
        } catch (error) {
            alert("Failed to update session name");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Sessions</h2>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="New Session ID"
                        className="border p-2 rounded w-64 focus:ring-sisia-primary focus:border-sisia-primary outline-none"
                        value={newSessionId}
                        onChange={(e) => setNewSessionId(e.target.value)}
                    />
                    <button
                        onClick={handleCreate}
                        className="bg-sisia-primary text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-emerald-700 transition"
                    >
                        <Plus size={20} /> Create
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessions.map(session => (
                    <div key={session.id} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-start mb-4">
                            {editingSessionId === session.id ? (
                                <div className="flex items-center gap-2 w-full">
                                    <input
                                        className="border p-1 rounded flex-1"
                                        value={editingName}
                                        onChange={e => setEditingName(e.target.value)}
                                    />
                                    <button onClick={() => handleUpdateName(session.id)} className="text-green-500"><Save size={18} /></button>
                                    <button onClick={() => setEditingSessionId(null)} className="text-red-500"><X size={18} /></button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <h3 className="text-xl font-bold">{session.name}</h3>
                                    <button onClick={() => { setEditingSessionId(session.id); setEditingName(session.name); }} className="text-gray-400 hover:text-sisia-primary transition-colors">
                                        <Edit size={16} />
                                    </button>
                                </div>
                            )}
                            <button onClick={() => handleDelete(session.id)} className="text-red-500 hover:text-red-700">
                                <Trash size={18} />
                            </button>
                        </div>
                        <div className="mb-4">
                            <span className={`px-2 py-1 rounded text-sm ${session.status === 'CONNECTED' ? 'bg-green-100 text-green-800' :
                                session.status === 'CONNECTING' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}>
                                {session.status}
                            </span>
                        </div>

                        {qrCodes[session.id] && session.status !== 'CONNECTED' && (
                            <div className="mt-4 flex justify-center">
                                <img src={qrCodes[session.id]} alt="QR Code" className="w-48 h-48" />
                            </div>
                        )}

                        {/* If status is DISCONNECTED, maybe show reconnect button? */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sessions;
