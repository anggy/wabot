import React, { useEffect, useState } from 'react';
import api from '../api';

const Groups = () => {
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState('');
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get('/sessions').then(res => {
            setSessions(res.data);
            if (res.data.length > 0) setSelectedSession(res.data[0].id);
        });
    }, []);

    useEffect(() => {
        if (selectedSession) {
            fetchGroups(selectedSession);
        }
    }, [selectedSession]);

    const fetchGroups = async (id) => {
        setLoading(true);
        try {
            const res = await api.get(`/sessions/${id}/groups`);
            setGroups(res.data);
        } catch (error) {
            console.error(error);
            setGroups([]);
        }
        setLoading(false);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Groups</h2>

            <div className="mb-6">
                <label className="mr-4">Select Session:</label>
                <select
                    className="border p-2 rounded"
                    value={selectedSession}
                    onChange={e => setSelectedSession(e.target.value)}
                >
                    {sessions.map(s => <option key={s.id} value={s.id}>{s.name} ({s.status})</option>)}
                </select>
            </div>

            {loading ? <p>Loading groups...</p> : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {groups.map(g => (
                        <div key={g.id} className="bg-white p-4 rounded shadow">
                            <h4 className="font-bold">{g.subject}</h4>
                            <p className="text-sm text-gray-500">ID: {g.id}</p>
                            <p className="text-sm">Participants: {g.size || g.participants?.length}</p>
                        </div>
                    ))}
                    {groups.length === 0 && <p>No groups found or not connected.</p>}
                </div>
            )}
        </div>
    );
};

export default Groups;
