import React, { useState, useEffect } from 'react';
import api from '../api';
import { Send } from 'lucide-react';

const SendMessage = () => {
    const [sessions, setSessions] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [groups, setGroups] = useState([]);
    const [inputMode, setInputMode] = useState('manual'); // manual, contact, group

    const [formData, setFormData] = useState({
        sessionId: '',
        to: '',
        type: 'TEXT',
        content: '',
        mediaUrl: ''
    });
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchInitial = async () => {
            try {
                const sessionRes = await api.get('/sessions');
                setSessions(sessionRes.data);
                if (sessionRes.data.length > 0) {
                    setFormData(prev => ({ ...prev, sessionId: sessionRes.data[0].id }));
                }

                const contactRes = await api.get('/contacts');
                setContacts(contactRes.data);
            } catch (error) {
                console.error("Failed to load initial data", error);
            }
        };
        fetchInitial();
    }, []);

    // Fetch groups when session changes
    useEffect(() => {
        if (formData.sessionId && inputMode === 'group') {
            fetchGroups(formData.sessionId);
        }
    }, [formData.sessionId, inputMode]);

    const fetchGroups = async (sessionId) => {
        try {
            const res = await api.get(`/sessions/${sessionId}/groups`);
            setGroups(res.data);
        } catch (error) {
            console.error("Failed to fetch groups", error);
            setGroups([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');
        try {
            await api.post('/messages/send', formData);
            setStatus('Sent successfully!');
            setFormData({ ...formData, content: '', mediaUrl: '' });
        } catch (error) {
            setStatus('Failed to send.');
            console.error(error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Send Message</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Session</label>
                        <select className="w-full border p-2 rounded" value={formData.sessionId} onChange={e => setFormData({ ...formData, sessionId: e.target.value })}>
                            {sessions.map(s => <option key={s.id} value={s.id}>{s.name} ({s.status})</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
                        <div className="flex gap-2 mb-2">
                            <button type="button" onClick={() => setInputMode('manual')} className={`px-3 py-1 text-sm rounded ${inputMode === 'manual' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}>Manual</button>
                            <button type="button" onClick={() => setInputMode('contact')} className={`px-3 py-1 text-sm rounded ${inputMode === 'contact' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}>Contact</button>
                            <button type="button" onClick={() => setInputMode('group')} className={`px-3 py-1 text-sm rounded ${inputMode === 'group' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}>Group</button>
                        </div>

                        {inputMode === 'manual' && (
                            <input className="w-full border p-2 rounded" placeholder="To (Phone e.g 628xxx or Group ID)" value={formData.to} onChange={e => setFormData({ ...formData, to: e.target.value })} required />
                        )}

                        {inputMode === 'contact' && (
                            <select className="w-full border p-2 rounded" value={formData.to} onChange={e => setFormData({ ...formData, to: e.target.value })} required>
                                <option value="">Select Contact</option>
                                {contacts.map(c => <option key={c.id} value={c.phone}>{c.name} ({c.phone})</option>)}
                            </select>
                        )}

                        {inputMode === 'group' && (
                            <select className="w-full border p-2 rounded" value={formData.to} onChange={e => setFormData({ ...formData, to: e.target.value })} required>
                                <option value="">Select Group</option>
                                {groups.map(g => <option key={g.id} value={g.id}>{g.subject} ({g.id})</option>)}
                            </select>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select className="w-full border p-2 rounded" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                            <option value="TEXT">Text</option>
                            <option value="IMAGE">Image</option>
                        </select>
                    </div>

                    <textarea className="w-full border p-2 rounded h-32" placeholder="Content / Caption" value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} required />

                    {formData.type === 'IMAGE' && (
                        <input className="w-full border p-2 rounded" placeholder="Image URL" value={formData.mediaUrl} onChange={e => setFormData({ ...formData, mediaUrl: e.target.value })} />
                    )}
                </div>
                <button type="submit" className="mt-6 bg-green-600 text-white px-6 py-2 rounded flex items-center gap-2">
                    <Send size={18} /> Send
                </button>
                {status && <p className="mt-4 text-center font-semibold">{status}</p>}
            </form>
        </div>
    );
};

export default SendMessage;
