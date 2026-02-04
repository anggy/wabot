import React, { useEffect, useState } from 'react';
import api from '../api';
import { Plus, Trash, Edit2, Key, Link, Shield, Zap } from 'lucide-react';

const Credentials = () => {
    const [credentials, setCredentials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const initialFormState = {
        name: '',
        type: 'API_KEY',
        key: '',
        value: '',
        location: 'HEADER',
        refreshUrl: '',
        refreshPayload: '{}',
        tokenPath: 'access_token'
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchCredentials();
    }, []);

    const fetchCredentials = async () => {
        setLoading(true);
        try {
            const res = await api.get('/credentials');
            setCredentials(res.data);
        } catch (error) {
            console.error("Failed to fetch credentials", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (cred = null) => {
        if (cred) {
            setEditingId(cred.id);
            setFormData({
                name: cred.name,
                type: cred.type,
                key: cred.key || '',
                value: cred.value,
                location: cred.location,
                refreshUrl: cred.refreshUrl || '',
                refreshPayload: cred.refreshPayload || '{}',
                tokenPath: cred.tokenPath || ''
            });
        } else {
            setEditingId(null);
            setFormData(initialFormState);
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let payload = { ...formData };
        if (payload.refreshPayload) {
            try {
                payload.refreshPayload = JSON.parse(payload.refreshPayload);
            } catch {
                alert("Refresh Payload must be valid JSON");
                return;
            }
        }

        try {
            if (editingId) {
                await api.put(`/credentials/${editingId}`, payload);
                alert("Credential updated");
            } else {
                await api.post('/credentials', payload);
                alert("Credential created");
            }
            setIsModalOpen(false);
            fetchCredentials();
        } catch (error) {
            console.error(error);
            alert("Failed to save credential");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure? This might break tools using this credential.")) return;
        try {
            await api.delete(`/credentials/${id}`);
            fetchCredentials();
        } catch {
            alert("Failed to delete credential");
        }
    };

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Key className="text-sisia-primary" /> Credentials
                    </h1>
                    <p className="text-gray-500 mt-1">Manage API Keys and OAuth tokens for your AI Tools.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-sisia-primary text-white px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition shadow-sm font-medium flex items-center gap-2"
                >
                    <Plus size={20} /> Add Credential
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin w-10 h-10 border-4 border-sisia-primary border-t-transparent rounded-full"></div>
                </div>
            ) : credentials.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                    <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No Credentials</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mt-2">Create credentials to securely authenticate your AI Tools.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {credentials.map(cred => (
                        <div key={cred.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-2 rounded-lg ${cred.type === 'BEARER' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                                    {cred.type === 'BEARER' ? <Zap size={20} /> : <Key size={20} />}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleOpenModal(cred)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(cred.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash size={16} />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-1">{cred.name}</h3>
                            <p className="text-xs text-gray-400 font-mono mb-4">{cred.type} • {cred.location}</p>

                            <div className="mt-auto pt-4 border-t border-gray-100">
                                <div className="text-xs text-gray-500 flex items-center gap-2">
                                    <span className="bg-gray-100 px-2 py-1 rounded text-gray-600 font-mono truncate max-w-full">
                                        {cred.value.substring(0, 8)}...
                                    </span>
                                    {cred.refreshUrl && <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-bold">AUTO-REFRESH</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-xl animate-in fade-in zoom-in duration-200 my-8">
                        <h3 className="text-xl font-bold mb-6">{editingId ? 'Edit Credential' : 'New Credential'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text" required
                                    className="w-full border p-2 rounded-lg"
                                    placeholder="e.g. Google Maps API"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                    <select
                                        className="w-full border p-2 rounded-lg"
                                        value={formData.type}
                                        onChange={e => setFormData({ ...formData, type: e.target.value })}
                                    >
                                        <option value="API_KEY">API Key</option>
                                        <option value="BEARER">Bearer Token (JWT)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                    <select
                                        className="w-full border p-2 rounded-lg"
                                        value={formData.location}
                                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                                        disabled={formData.type === 'BEARER'}
                                    >
                                        <option value="HEADER">Header</option>
                                        <option value="QUERY">Query Params</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {formData.type === 'API_KEY' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Key Name</label>
                                        <input
                                            type="text"
                                            className="w-full border p-2 rounded-lg font-mono text-sm"
                                            placeholder="e.g. X-API-KEY"
                                            value={formData.key}
                                            onChange={e => setFormData({ ...formData, key: e.target.value })}
                                        />
                                    </div>
                                )}
                                <div className={formData.type === 'BEARER' ? 'col-span-2' : ''}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Value (Token)</label>
                                    <input
                                        type="text" required
                                        className="w-full border p-2 rounded-lg font-mono text-sm"
                                        placeholder="The actual secret key or token"
                                        value={formData.value}
                                        onChange={e => setFormData({ ...formData, value: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Auto Refresh Config */}
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-4">
                                <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <Zap size={16} /> Auto-Refresh (Optional)
                                </h4>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Refresh URL</label>
                                        <input
                                            type="text"
                                            className="w-full border p-2 rounded-lg font-mono text-sm"
                                            placeholder="https://api.example.com/refresh"
                                            value={formData.refreshUrl}
                                            onChange={e => setFormData({ ...formData, refreshUrl: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Payload (JSON)</label>
                                            <textarea
                                                className="w-full border p-2 rounded-lg font-mono text-xs"
                                                rows="3"
                                                value={formData.refreshPayload}
                                                onChange={e => setFormData({ ...formData, refreshPayload: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Token Path</label>
                                            <input
                                                type="text"
                                                className="w-full border p-2 rounded-lg font-mono text-sm"
                                                placeholder="data.access_token"
                                                value={formData.tokenPath}
                                                onChange={e => setFormData({ ...formData, tokenPath: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-sisia-primary text-white rounded-lg hover:bg-emerald-700">Save Credential</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Credentials;
