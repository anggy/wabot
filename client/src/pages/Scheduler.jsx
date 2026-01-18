import React, { useEffect, useState } from 'react';
import api from '../api';
import { Plus, Trash, Upload, Loader, Edit, X } from 'lucide-react';

const Scheduler = () => {
    const [schedules, setSchedules] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [groups, setGroups] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [frequency, setFrequency] = useState('CUSTOM'); // HOURLY, DAILY, CUSTOM
    const [dailyTime, setDailyTime] = useState('08:00');
    const [formData, setFormData] = useState({
        sessionId: '',
        recipient: '',
        messageType: 'TEXT',
        content: '',
        mediaUrl: '',
        cronExpression: '* * * * *'
    });

    useEffect(() => {
        fetchSchedules();
        fetchSessions();
        fetchContacts();
    }, []);

    useEffect(() => {
        if (formData.sessionId) {
            fetchGroups(formData.sessionId);
        }
    }, [formData.sessionId]);

    const fetchSessions = async () => {
        const res = await api.get('/sessions');
        setSessions(res.data);
        if (res.data.length > 0 && !formData.sessionId) {
            setFormData(prev => ({ ...prev, sessionId: res.data[0].id }));
        }
    };

    const fetchContacts = async () => {
        try {
            const res = await api.get('/contacts');
            setContacts(res.data);
        } catch (error) {
            console.error("Failed to fetch contacts", error);
        }
    };

    const fetchGroups = async (sessionId) => {
        try {
            const res = await api.get(`/sessions/${sessionId}/groups`);
            setGroups(res.data);
        } catch (error) {
            console.error("Failed to fetch groups", error);
            setGroups([]);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const uploadData = new FormData();
        uploadData.append('image', file);

        try {
            const res = await api.post('/upload', uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setFormData({ ...formData, mediaUrl: res.data.url });
        } catch (error) {
            console.error("Upload failed", error);
            alert("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    const fetchSchedules = async () => {
        const res = await api.get('/schedules');
        setSchedules(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/schedules/${editingId}`, formData);
            } else {
                await api.post('/schedules', formData);
            }
            handleCancelEdit();
            fetchSchedules();
        } catch (error) {
            console.error(error);
            alert("Failed to save schedule");
        }
    };

    const handleEdit = (schedule) => {
        setEditingId(schedule.id);
        const [minute, hour] = schedule.cronExpression.split(' ');

        let freq = 'CUSTOM';
        let time = '08:00';

        if (schedule.cronExpression === '0 * * * *') {
            freq = 'HOURLY';
        } else if (schedule.cronExpression.endsWith('* * *') && !schedule.cronExpression.startsWith('0 *')) {
            freq = 'DAILY';
            time = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
        }

        setFrequency(freq);
        setDailyTime(time);

        setFormData({
            sessionId: schedule.sessionId,
            recipient: schedule.recipient,
            messageType: schedule.messageType,
            content: schedule.content,
            mediaUrl: schedule.mediaUrl || '',
            cronExpression: schedule.cronExpression
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFrequency('CUSTOM');
        setFormData({
            sessionId: sessions.length > 0 ? sessions[0].id : '',
            recipient: '',
            messageType: 'TEXT',
            content: '',
            mediaUrl: '',
            cronExpression: '* * * * *'
        });
    };

    const handleDelete = async (id) => {
        await api.delete(`/schedules/${id}`);
        fetchSchedules();
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Scheduler</h2>

            <form onSubmit={handleSubmit} className={`bg-white p-6 rounded-lg shadow-md mb-8 ${editingId ? 'border border-wa-green' : ''}`}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-700">{editingId ? 'Edit Broadcast' : 'Schedule New Broadcast'}</h3>
                    {editingId && (
                        <button type="button" onClick={handleCancelEdit} className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1">
                            <X size={16} /> Cancel Edit
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <select className="border p-2 rounded" value={formData.sessionId} onChange={e => setFormData({ ...formData, sessionId: e.target.value })}>
                        <option value="">Select Session</option>
                        {sessions.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
                        <select className="w-full border p-2 rounded" value={formData.recipient} onChange={e => setFormData({ ...formData, recipient: e.target.value })} required>
                            <option value="">Select Recipient</option>
                            <optgroup label="Contacts">
                                {contacts.map(c => <option key={c.id} value={c.phone}>{c.name} ({c.phone})</option>)}
                            </optgroup>
                            <optgroup label="Groups">
                                {groups.map(g => <option key={g.id} value={g.id}>{g.subject}</option>)}
                            </optgroup>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Or enter manual ID if not listed.</p>
                        {/* Optional: Allow manual input override if needed, but select is safer */}
                    </div>

                    <select className="border p-2 rounded" value={formData.messageType} onChange={e => setFormData({ ...formData, messageType: e.target.value })}>
                        <option value="TEXT">Text</option>
                        <option value="IMAGE">Image</option>
                    </select>
                    <textarea className="border p-2 rounded" placeholder="Message Content" value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} required />
                    {formData.messageType === 'IMAGE' && (
                        <div>
                            <div className="flex gap-2">
                                <input className="flex-1 border p-2 rounded" placeholder="Image URL" value={formData.mediaUrl} onChange={e => setFormData({ ...formData, mediaUrl: e.target.value })} />
                                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded border flex items-center justify-center w-12 transition-colors">
                                    {uploading ? <Loader size={20} className="animate-spin" /> : <Upload size={20} />}
                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                                </label>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Paste URL or upload an image (max 5MB)</p>
                        </div>
                    )}

                    <div className="bg-gray-50 p-4 rounded-lg border">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                        <select className="w-full border p-2 rounded mb-2" value={frequency} onChange={e => {
                            const freq = e.target.value;
                            setFrequency(freq);
                            if (freq === 'HOURLY') setFormData({ ...formData, cronExpression: '0 * * * *' });
                            if (freq === 'DAILY') {
                                const [hour, minute] = dailyTime.split(':');
                                setFormData({ ...formData, cronExpression: `${minute} ${hour} * * *` });
                            }
                        }}>
                            <option value="HOURLY">Every Hour</option>
                            <option value="DAILY">Daily</option>
                            <option value="CUSTOM">Custom Cron</option>
                        </select>

                        {frequency === 'DAILY' && (
                            <div className="flex items-center gap-2">
                                <label className="text-sm text-gray-600">At Time:</label>
                                <input type="time" className="border p-2 rounded" value={dailyTime} onChange={e => {
                                    setDailyTime(e.target.value);
                                    const [hour, minute] = e.target.value.split(':');
                                    setFormData({ ...formData, cronExpression: `${minute} ${hour} * * *` });
                                }} />
                            </div>
                        )}

                        {frequency === 'CUSTOM' && (
                            <input className="w-full border p-2 rounded font-mono text-sm" placeholder="Cron Expression (e.g. * * * * *)" value={formData.cronExpression} onChange={e => setFormData({ ...formData, cronExpression: e.target.value })} required />
                        )}
                        <p className="text-xs text-gray-500 mt-1">Cron: {formData.cronExpression}</p>
                    </div>
                </div>
                <button type="submit" className="mt-4 bg-wa-green text-white px-4 py-2 rounded hover:bg-emerald-700 transition flex items-center gap-2">
                    {editingId ? <Edit size={18} /> : <Plus size={18} />}
                    {editingId ? 'Update Schedule' : 'Schedule Message'}
                </button>
            </form>

            <div className="space-y-4">
                {schedules.map(sch => (
                    <div key={sch.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                        <div>
                            <h4 className="font-bold">To: {sch.recipient} ({sch.cronExpression})</h4>
                            <p className="text-sm text-gray-600">{sch.content}</p>
                            <p className="text-xs text-gray-400">Last run: {sch.lastRun || 'Never'}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleEdit(sch)} className="p-2 rounded-lg text-gray-400 hover:text-wa-green hover:bg-emerald-50 transition-all" title="Edit">
                                <Edit size={18} />
                            </button>
                            <button onClick={() => handleDelete(sch.id)} className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all" title="Delete">
                                <Trash size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Scheduler;
