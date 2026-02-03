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

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="text-center text-gray-500">
                        <div className="animate-spin w-8 h-8 border-4 border-sisia-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                        <p>Loading groups...</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groups.map(g => (
                        <div key={g.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all group">
                            <h4 className="font-bold text-gray-900 mb-1 truncate" title={g.subject}>{g.subject}</h4>
                            <div className="text-xs font-mono text-gray-400 mb-4 truncate">{g.id}</div>

                            <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-2.5 py-1 rounded-lg">
                                    <span className="font-bold text-sisia-primary">{g.size || g.participants?.length || 0}</span> Members
                                </div>
                                <span className="text-xs text-blue-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                    View Details &rarr;
                                </span>
                            </div>
                        </div>
                    ))}
                    {groups.length === 0 && (
                        <div className="col-span-full py-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <p className="text-gray-500 text-sm">No groups found for this session.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Groups;
