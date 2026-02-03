import React, { useEffect, useState } from 'react';
import api from '../api';
import { Plus, Trash, Edit2, Wrench, Globe, Code, Key } from 'lucide-react';

const AiTools = () => {
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTool, setEditingTool] = useState(null);

    const initialFormState = {
        name: '',
        description: '',
        method: 'GET',
        baseUrl: '',
        endpoint: '',
        headers: '{}',
        body: '{}',
        parameters: '{\n  "type": "object",\n  "properties": {\n    "param1": {\n      "type": "string",\n      "description": "Description of param1"\n    }\n  },\n  "required": ["param1"]\n}',
        authType: 'NONE',
        authKey: '',
        authToken: '',
        authLocation: 'HEADER'
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchTools();
    }, []);

    const fetchTools = async () => {
        setLoading(true);
        try {
            const res = await api.get('/ai/tools');
            setTools(res.data);
        } catch (error) {
            console.error("Failed to fetch tools", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (tool = null) => {
        if (tool) {
            setEditingTool(tool);
            setFormData({
                name: tool.name,
                description: tool.description,
                method: tool.method,
                baseUrl: tool.baseUrl,
                endpoint: tool.endpoint,
                headers: tool.headers || '{}',
                body: tool.body || '{}',
                parameters: tool.parameters || '{}',
                authType: tool.authType || 'NONE',
                authKey: tool.authKey || '',
                authToken: tool.authToken || '',
                authLocation: tool.authLocation || 'HEADER'
            });
        } else {
            setEditingTool(null);
            setFormData(initialFormState);
        }
        setIsModalOpen(true);
    };

    const validateJson = (str) => {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateJson(formData.headers) || !validateJson(formData.body) || !validateJson(formData.parameters)) {
            alert("Please ensure Headers, Body, and Parameters are valid JSON.");
            return;
        }

        const payload = {
            ...formData,
            headers: JSON.parse(formData.headers),
            body: JSON.parse(formData.body),
            parameters: JSON.parse(formData.parameters)
        };

        try {
            if (editingTool) {
                await api.put(`/ai/tools/${editingTool.id}`, payload);
                alert("Tool updated successfully");
            } else {
                await api.post('/ai/tools', payload);
                alert("Tool created successfully");
            }
            setIsModalOpen(false);
            fetchTools();
        } catch (error) {
            console.error(error);
            alert("Failed to save tool");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this tool?")) return;
        try {
            await api.delete(`/ai/tools/${id}`);
            fetchTools();
        } catch (error) {
            alert("Failed to delete tool");
        }
    };

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Wrench className="text-sisia-primary" /> AI Tools
                    </h1>
                    <p className="text-gray-500 mt-1">Manage external API tools that your AI agent can use.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-sisia-primary text-white px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition shadow-sm font-medium flex items-center gap-2"
                >
                    <Plus size={20} /> Add New Tool
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin w-10 h-10 border-4 border-sisia-primary border-t-transparent rounded-full"></div>
                </div>
            ) : tools.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                    <Wrench className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No Tools Configured</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mt-2">Create your first tool to let AI interact with external APIs like Warga App, CRMs, or databases.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map(tool => (
                        <div key={tool.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col h-full hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${tool.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                                    tool.method === 'POST' ? 'bg-green-100 text-green-700' :
                                        tool.method === 'DELETE' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                                    }`}>
                                    {tool.method}
                                </span>
                                <div className="flex gap-2">
                                    <button onClick={() => handleOpenModal(tool)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(tool.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash size={16} />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-1">{tool.name}</h3>
                            <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[2.5rem]">{tool.description}</p>

                            <div className="space-y-2 mt-auto pt-4 border-t border-gray-100 text-xs text-gray-600 font-mono">
                                <div className="flex items-center gap-2 truncate" title={tool.baseUrl}>
                                    <Globe size={12} className="shrink-0" />
                                    <span className="truncate">{tool.baseUrl}</span>
                                </div>
                                <div className="flex items-center gap-2 truncate" title={tool.endpoint}>
                                    <Code size={12} className="shrink-0" />
                                    <span className="truncate">{tool.endpoint}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-xl animate-in fade-in zoom-in duration-200 my-8">
                        <h3 className="text-xl font-bold mb-6">{editingTool ? 'Edit AI Tool' : 'Create New AI Tool'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tool Name (Unique)</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full border p-2 rounded-lg font-mono text-sm"
                                        placeholder="e.g. get_resident_info"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Snake_case recommended. Used by AI to call this tool.</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Method</label>
                                    <select
                                        className="w-full border p-2 rounded-lg"
                                        value={formData.method}
                                        onChange={e => setFormData({ ...formData, method: e.target.value })}
                                    >
                                        <option value="GET">GET</option>
                                        <option value="POST">POST</option>
                                        <option value="PUT">PUT</option>
                                        <option value="DELETE">DELETE</option>
                                        <option value="PATCH">PATCH</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    required
                                    className="w-full border p-2 rounded-lg text-sm"
                                    placeholder="Describe what this tool does and when to use it..."
                                    rows="2"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Base URL</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full border p-2 rounded-lg font-mono text-sm"
                                        placeholder="https://api.example.com"
                                        value={formData.baseUrl}
                                        onChange={e => setFormData({ ...formData, baseUrl: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Endpoint Path</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full border p-2 rounded-lg font-mono text-sm"
                                        placeholder="/v1/residents/{id}"
                                        value={formData.endpoint}
                                        onChange={e => setFormData({ ...formData, endpoint: e.target.value })}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Use {'{param}'} for path variables.</p>
                                </div>
                            </div>

                            {/* Authentication Section */}
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <Key size={16} /> Authentication
                                </h4>

                                <div className="grid grid-cols-2 gap-4 mb-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Auth Type</label>
                                        <select
                                            className="w-full border p-2 rounded-lg text-sm"
                                            value={formData.authType}
                                            onChange={e => setFormData({ ...formData, authType: e.target.value })}
                                        >
                                            <option value="NONE">None</option>
                                            <option value="API_KEY">API Key</option>
                                            <option value="BEARER">Bearer Token (JWT)</option>
                                        </select>
                                    </div>
                                    {formData.authType === 'API_KEY' && (
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Add To</label>
                                            <select
                                                className="w-full border p-2 rounded-lg text-sm"
                                                value={formData.authLocation}
                                                onChange={e => setFormData({ ...formData, authLocation: e.target.value })}
                                            >
                                                <option value="HEADER">Header</option>
                                                <option value="QUERY">Query Parameter</option>
                                            </select>
                                        </div>
                                    )}
                                </div>

                                {formData.authType === 'API_KEY' && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Key Name</label>
                                            <input
                                                type="text"
                                                className="w-full border p-2 rounded-lg text-sm font-mono"
                                                placeholder="e.g. X-API-KEY"
                                                value={formData.authKey}
                                                onChange={e => setFormData({ ...formData, authKey: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Value</label>
                                            <input
                                                type="text"
                                                className="w-full border p-2 rounded-lg text-sm font-mono"
                                                placeholder="Required key value"
                                                value={formData.authToken}
                                                onChange={e => setFormData({ ...formData, authToken: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                )}

                                {formData.authType === 'BEARER' && (
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Token</label>
                                        <input
                                            type="text"
                                            className="w-full border p-2 rounded-lg text-sm font-mono"
                                            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                                            value={formData.authToken}
                                            onChange={e => setFormData({ ...formData, authToken: e.target.value })}
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Parameters Schema (JSON)</label>
                                <textarea
                                    className="w-full border p-2 rounded-lg font-mono text-xs bg-gray-50"
                                    rows="6"
                                    value={formData.parameters}
                                    onChange={e => setFormData({ ...formData, parameters: e.target.value })}
                                />
                                <p className="text-xs text-gray-500 mt-1">OpenAI function calling schema structure.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Headers (JSON)</label>
                                    <textarea
                                        className="w-full border p-2 rounded-lg font-mono text-xs bg-gray-50"
                                        rows="4"
                                        value={formData.headers}
                                        onChange={e => setFormData({ ...formData, headers: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Fixed Body (JSON)</label>
                                    <textarea
                                        className="w-full border p-2 rounded-lg font-mono text-xs bg-gray-50"
                                        rows="4"
                                        value={formData.body}
                                        onChange={e => setFormData({ ...formData, body: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-sisia-primary text-white rounded-lg hover:bg-emerald-700"
                                >
                                    {editingTool ? 'Save Changes' : 'Create Tool'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AiTools;
