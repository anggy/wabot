import React, { useEffect, useState } from 'react';
import api from '../api';
import { Plus, Trash, Zap, MessageSquare, Globe, Upload, Loader, Edit, X, Bot } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Rules = () => {
    const { user } = useAuth();
    const [rules, setRules] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [editingRuleId, setEditingRuleId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        triggerType: 'KEYWORD',
        triggerValue: '',
        actionType: 'RESPONSE',
        apiUrl: '',
        apiMethod: 'POST',
        apiPayload: '{}',
        responseContent: '',
        responseMediaType: 'TEXT',
        responseMediaUrl: ''
    });

    useEffect(() => {
        fetchRules();
    }, []);

    const fetchRules = async () => {
        const res = await api.get('/rules');
        setRules(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingRuleId) {
                await api.put(`/rules/${editingRuleId}`, formData);
            } else {
                await api.post('/rules', formData);
            }

            handleCancelEdit(); // Resets form and editing state
            fetchRules();
        } catch (error) {
            console.error(error);
            alert("Failed to save rule");
        }
    };

    const handleEdit = (rule) => {
        setEditingRuleId(rule.id);
        setFormData({
            name: rule.name,
            triggerType: rule.triggerType,
            triggerValue: rule.triggerValue,
            actionType: rule.actionType,
            apiUrl: rule.apiUrl || '',
            apiMethod: rule.apiMethod || 'POST',
            apiPayload: rule.apiPayload || '{}',
            responseContent: rule.responseContent || '',
            responseMediaType: rule.responseMediaType || 'TEXT',
            responseMediaUrl: rule.responseMediaUrl || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingRuleId(null);
        setFormData({
            name: '',
            triggerType: 'KEYWORD',
            triggerValue: '',
            actionType: 'RESPONSE',
            apiUrl: '',
            apiMethod: 'POST',
            apiPayload: '{}',
            responseContent: '',
            responseMediaType: 'TEXT',
            responseMediaUrl: ''
        });
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
            setFormData({ ...formData, responseMediaUrl: res.data.url });
        } catch (error) {
            console.error("Upload failed", error);
            alert("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this rule?")) return;
        await api.delete(`/rules/${id}`);
        fetchRules();
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Auto-Reply Rules</h2>

            <form onSubmit={handleSubmit} className={`bg-white p-6 rounded-xl shadow-sm border ${editingRuleId ? 'border-wa-green' : 'border-gray-100'} mb-8 transition-colors`}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-700">{editingRuleId ? 'Edit Rule' : 'Create New Rule'}</h3>
                    {editingRuleId && (
                        <button type="button" onClick={handleCancelEdit} className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1">
                            <X size={16} /> Cancel Edit
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rule Name</label>
                        <input className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-wa-green" placeholder="e.g. Welcome Message" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Trigger Type</label>
                        <select className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-wa-green" value={formData.triggerType} onChange={e => setFormData({ ...formData, triggerType: e.target.value })}>
                            <option value="KEYWORD">Keyword Includes</option>
                            <option value="ALL">All Messages (Default)</option>
                            <option value="REGEX">Regex Match</option>
                            <option value="MENTION">On Mention (Tag Bot)</option>
                        </select>
                    </div>

                    {(formData.triggerType !== 'ALL' && formData.triggerType !== 'MENTION') && (
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Trigger Value</label>
                            <input className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-wa-green" placeholder={formData.triggerType === 'REGEX' ? '^Hello.*' : 'hello'} value={formData.triggerValue} onChange={e => setFormData({ ...formData, triggerValue: e.target.value })} required />
                        </div>
                    )}

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Action Type</label>
                        <div className="flex gap-4">
                            <label className={`flex-1 p-3 border rounded-lg cursor-pointer flex items-center gap-2 ${formData.actionType === 'RESPONSE' ? 'bg-emerald-50 border-wa-green text-wa-green' : 'hover:bg-gray-50'}`}>
                                <input type="radio" name="actionType" value="RESPONSE" checked={formData.actionType === 'RESPONSE'} onChange={() => setFormData({ ...formData, actionType: 'RESPONSE' })} className="hidden" />
                                <MessageSquare size={18} />
                                <span className="font-medium">Reply with Message</span>
                            </label>
                            <label className={`flex-1 p-3 border rounded-lg cursor-pointer flex items-center gap-2 ${formData.actionType === 'API_CALL' ? 'bg-emerald-50 border-wa-green text-wa-green' : 'hover:bg-gray-50'}`}>
                                <input type="radio" name="actionType" value="API_CALL" checked={formData.actionType === 'API_CALL'} onChange={() => setFormData({ ...formData, actionType: 'API_CALL' })} className="hidden" />
                                <Globe size={18} />
                                <span className="font-medium">Call Webhook API</span>
                            </label>
                            {user?.isAiEnabled && (
                                <label className={`flex-1 p-3 border rounded-lg cursor-pointer flex items-center gap-2 ${formData.actionType === 'AI_REPLY' ? 'bg-purple-50 border-purple-500 text-purple-600' : 'hover:bg-gray-50'}`}>
                                    <input type="radio" name="actionType" value="AI_REPLY" checked={formData.actionType === 'AI_REPLY'} onChange={() => setFormData({ ...formData, actionType: 'AI_REPLY' })} className="hidden" />
                                    <Bot size={18} />
                                    <div className="flex flex-col text-left">
                                        <span className="font-medium">Reply with AI</span>
                                        <span className="text-[10px] text-gray-500">Powered by OpenAI</span>
                                    </div>
                                </label>
                            )}
                        </div>
                    </div>

                    {formData.actionType === 'RESPONSE' && (
                        <div className="md:col-span-2 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="responseMediaType" value="TEXT" checked={formData.responseMediaType === 'TEXT'} onChange={() => setFormData({ ...formData, responseMediaType: 'TEXT' })} className="text-wa-green" />
                                        <span className="text-gray-700">Text Only</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="responseMediaType" value="IMAGE" checked={formData.responseMediaType === 'IMAGE'} onChange={() => setFormData({ ...formData, responseMediaType: 'IMAGE' })} className="text-wa-green" />
                                        <span className="text-gray-700">Image & Caption</span>
                                    </label>
                                </div>
                            </div>

                            {formData.responseMediaType === 'IMAGE' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                    <div className="flex gap-2">
                                        <input className="flex-1 border p-2 rounded-lg outline-none focus:ring-2 focus:ring-wa-green" placeholder="https://example.com/image.jpg" value={formData.responseMediaUrl} onChange={e => setFormData({ ...formData, responseMediaUrl: e.target.value })} required />
                                        <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-lg border flex items-center justify-center w-12 transition-colors">
                                            {uploading ? <Loader size={20} className="animate-spin" /> : <Upload size={20} />}
                                            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                                        </label>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Paste URL or upload an image (max 5MB)</p>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{formData.responseMediaType === 'IMAGE' ? 'Caption' : 'Response Message'}</label>
                                <textarea rows={3} className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-wa-green" placeholder={formData.responseMediaType === 'IMAGE' ? 'Image caption...' : 'Type the auto-reply message here...'} value={formData.responseContent} onChange={e => setFormData({ ...formData, responseContent: e.target.value })} required />
                            </div>
                        </div>
                    )}

                    {formData.actionType === 'API_CALL' && (
                        <>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Webhook URL</label>
                                <input className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-wa-green" placeholder="https://api.myapp.com/webhook" value={formData.apiUrl} onChange={e => setFormData({ ...formData, apiUrl: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Method</label>
                                <select className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-wa-green" value={formData.apiMethod} onChange={e => setFormData({ ...formData, apiMethod: e.target.value })}>
                                    <option value="POST">POST</option>
                                    <option value="GET">GET</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Payload (JSON)</label>
                                <textarea className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-wa-green font-mono text-sm" placeholder="{}" value={formData.apiPayload} onChange={e => setFormData({ ...formData, apiPayload: e.target.value })} />
                            </div>
                        </>
                    )}

                    {formData.actionType === 'AI_REPLY' && (
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">System Prompt / Briefing</label>
                            <textarea
                                rows={4}
                                className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 border-purple-200"
                                placeholder="You are a helpful customer support agent. Answer politely and concisely."
                                value={formData.responseContent}
                                onChange={e => setFormData({ ...formData, responseContent: e.target.value })}
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">Define how the AI should behave for this rule. It uses your global OpenAI API Key.</p>
                        </div>
                    )}
                </div>
                <div className="mt-6 flex justify-end">
                    <button type="submit" className="bg-wa-green text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2">
                        {editingRuleId ? <Edit size={18} /> : <Plus size={18} />}
                        {editingRuleId ? 'Update Rule' : 'Create Rule'}
                    </button>
                </div>
            </form>

            <div className="space-y-4">
                {rules.map(rule => (
                    <div key={rule.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center group hover:shadow-md transition-shadow">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-bold text-gray-800">{rule.name}</h4>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${rule.triggerType === 'ALL' ? 'bg-purple-100 text-purple-700' : 'bg-emerald-50 text-wa-green'}`}>
                                    {rule.triggerType}
                                </span>
                            </div>
                            <div className="text-sm text-gray-600 flex items-center gap-2">
                                {rule.triggerType !== 'ALL' && (
                                    <span className="font-mono bg-gray-50 px-1 rounded text-gray-800">"{rule.triggerValue}"</span>
                                )}
                                <span className="text-gray-400">&rarr;</span>
                                {rule.actionType === 'RESPONSE' ? (
                                    <span className="flex items-center gap-1 text-green-700">
                                        <MessageSquare size={14} />
                                        {rule.responseMediaType === 'IMAGE' ? (
                                            <span className="flex items-center gap-1">
                                                <Zap size={14} className="text-orange-500" /> [Image] {rule.responseContent}
                                            </span>
                                        ) : (
                                            `Reply: "${rule.responseContent}"`
                                        )}
                                    </span>
                                ) : rule.actionType === 'AI_REPLY' ? (
                                    <span className="flex items-center gap-1 text-purple-600">
                                        <Bot size={14} /> AI Reply: "{rule.responseContent?.substring(0, 30)}..."
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-orange-700">
                                        <Globe size={14} /> Call: {rule.apiMethod} {rule.apiUrl}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleEdit(rule)} className="p-2 rounded-lg text-gray-400 hover:text-wa-green hover:bg-emerald-50 transition-all" title="Edit Rule">
                                <Edit size={18} />
                            </button>
                            <button onClick={() => handleDelete(rule.id)} className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all" title="Delete Rule">
                                <Trash size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default Rules;
