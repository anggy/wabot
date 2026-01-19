import React, { useEffect, useState } from 'react';
import api from '../api';
import { Trash, Plus, Shield, Key, X, Save, Coins, Power, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ username: '', password: '', role: 'USER' });
    const [editingPasswordId, setEditingPasswordId] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [creditModalOpen, setCreditModalOpen] = useState(false);
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [creditAmount, setCreditAmount] = useState(0);
    const [settingsData, setSettingsData] = useState({
        planType: '',
        messageCost: 1,
        planExpiresAt: '',
        aiApiKey: '',
        aiBriefing: '',
        isAiEnabled: false
    });

    const { user: currentUser } = useAuth();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/users');
            setUsers(res.data);
        } catch (error) {
            console.error("Failed to fetch users", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/users', formData);
            setFormData({ username: '', password: '', role: 'USER' });
            fetchUsers();
            alert("User created");
        } catch (error) {
            alert("Failed to create user");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await api.delete(`/users/${id}`);
            fetchUsers();
        } catch (error) {
            alert("Failed to delete user");
        }
    };

    const handleChangePassword = async (id) => {
        if (!newPassword) return;
        try {
            await api.put(`/users/${id}`, { password: newPassword });
            setEditingPasswordId(null);
            setNewPassword('');
            alert("Password updated");
        } catch (error) {
            alert("Failed to update password");
        }
    };

    const handleToggleStatus = async (user) => {
        if (!window.confirm(`Are you sure you want to ${user.isActive ? 'deactivate' : 'activate'} this user?`)) return;
        try {
            await api.put(`/users/${user.id}`, { isActive: !user.isActive });
            fetchUsers();
        } catch (error) {
            alert("Failed to update status");
        }
    };

    const openCreditModal = (user) => {
        setSelectedUser(user);
        setCreditAmount(0);
        setCreditModalOpen(true);
    };

    const openSettingsModal = (user) => {
        setSelectedUser(user);
        setSettingsData({
            planType: user.planType || 'PAY_AS_YOU_GO',
            messageCost: user.messageCost || 1,
            planExpiresAt: user.planExpiresAt || '',
            aiApiKey: user.aiApiKey || '',
            aiBriefing: user.aiBriefing || '',
            isAiEnabled: user.isAiEnabled || false
        });
        setSettingsModalOpen(true);
    };

    const handleAddCredits = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/users/${selectedUser.id}/credits`, { amount: parseInt(creditAmount) });
            setCreditModalOpen(false);
            fetchUsers();
            alert("Credits updated");
        } catch (error) {
            alert("Failed to update credits");
        }
    };

    const handleUpdateSettings = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/users/${selectedUser.id}`, { ...settingsData });
            setSettingsModalOpen(false);
            fetchUsers();
            alert("Settings updated");
        } catch (error) {
            alert("Failed to update settings");
        }
    };

    if (currentUser?.role !== 'ADMIN') {
        return <div className="p-4">Access Denied</div>;
    }

    return (
        <div>
            <div className="flex items-center gap-2 mb-6">
                <Shield className="text-sisia-primary" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-t-4 border-sisia-primary">
                <h3 className="text-xl font-bold mb-4">Add New User</h3>
                <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            className="mt-1 border p-2 rounded w-48 outline-none focus:ring-sisia-primary focus:border-sisia-primary"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="mt-1 border p-2 rounded w-48 outline-none focus:ring-sisia-primary focus:border-sisia-primary"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            className="mt-1 border p-2 rounded w-32 outline-none focus:ring-sisia-primary focus:border-sisia-primary"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-sisia-primary text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-emerald-700 transition">
                        <Plus size={18} /> Add User
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4 text-left">Username</th>
                            <th className="p-4 text-left">Role</th>
                            <th className="p-4 text-left">Plan / Cost</th>
                            <th className="p-4 text-left">Credits</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left">Created At</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id} className="border-t hover:bg-gray-50">
                                <td className="p-4 font-medium">{u.username}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs ${u.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="text-sm font-medium">{u.planType}</div>
                                    {u.planType !== 'UNLIMITED' && (
                                        <>
                                            <div className="text-xs text-gray-500">Cost: {u.messageCost}</div>
                                            {u.planExpiresAt && (
                                                <div className="text-xs text-gray-500">
                                                    Expires: {new Date(u.planExpiresAt).toLocaleDateString()}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </td>
                                <td className="p-4">{u.credits}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs ${u.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {u.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-500 text-sm">{new Date(u.createdAt).toLocaleDateString()}</td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => openCreditModal(u)}
                                            className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-50 transition-colors"
                                            title="Add Credits"
                                        >
                                            <Coins size={18} />
                                        </button>

                                        <button
                                            onClick={() => openSettingsModal(u)}
                                            className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors"
                                            title="Configure Plan"
                                        >
                                            <Settings size={18} />
                                        </button>

                                        <button
                                            onClick={() => handleToggleStatus(u)}
                                            className={`${u.isActive ? 'text-green-600 hover:text-red-500' : 'text-red-500 hover:text-green-600'} p-1 rounded hover:bg-gray-100 transition-colors`}
                                            title={u.isActive ? "Deactivate" : "Activate"}
                                        >
                                            <Power size={18} />
                                        </button>

                                        {editingPasswordId === u.id ? (
                                            <div className="flex items-center gap-2 bg-white border rounded p-1 shadow-sm">
                                                <input
                                                    type="password"
                                                    placeholder="New Pass"
                                                    className="w-24 text-sm outline-none px-1"
                                                    value={newPassword}
                                                    onChange={e => setNewPassword(e.target.value)}
                                                    autoFocus
                                                />
                                                <button onClick={() => handleChangePassword(u.id)} className="text-green-500 hover:text-green-700">
                                                    <Save size={16} />
                                                </button>
                                                <button onClick={() => { setEditingPasswordId(null); setNewPassword(''); }} className="text-red-500 hover:text-red-700">
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => { setEditingPasswordId(u.id); setNewPassword(''); }}
                                                className="text-amber-500 hover:text-amber-700 p-1 rounded hover:bg-amber-50 transition-colors"
                                                title="Change Password"
                                            >
                                                <Key size={18} />
                                            </button>
                                        )}
                                        <button onClick={() => handleDelete(u.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50" title="Delete User">
                                            <Trash size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {creditModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-sm">
                        <h3 className="text-xl font-bold mb-4">Add Credits for {selectedUser?.username}</h3>
                        <form onSubmit={handleAddCredits}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                                <input
                                    type="number"
                                    className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-sisia-primary"
                                    value={creditAmount}
                                    onChange={e => setCreditAmount(e.target.value)}
                                    autoFocus
                                />
                                <p className="text-xs text-gray-500 mt-1">Use negative value to deduct.</p>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setCreditModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-sisia-primary text-white rounded hover:bg-emerald-700">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {settingsModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-sm">
                        <h3 className="text-xl font-bold mb-4">Plan Settings for {selectedUser?.username}</h3>
                        <form onSubmit={handleUpdateSettings}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Type</label>
                                <input
                                    type="text"
                                    className="hidden" // Keep this hidden if we ever need custom input, or just remove it. For now, replacing with select.
                                />
                                <select
                                    className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-sisia-primary"
                                    value={settingsData.planType}
                                    onChange={e => setSettingsData({ ...settingsData, planType: e.target.value })}
                                >
                                    <option value="PAY_AS_YOU_GO">PAY_AS_YOU_GO</option>
                                    <option value="TIME_BASED">TIME_BASED (By Date & Time)</option>
                                    <option value="UNLIMITED">UNLIMITED (Admin Only)</option>
                                </select>
                            </div>
                            {settingsData.planType === 'TIME_BASED' && (
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Plan Expires At</label>
                                    <input
                                        type="datetime-local"
                                        className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-sisia-primary"
                                        value={settingsData.planExpiresAt && settingsData.planExpiresAt !== ''
                                            ? new Date(new Date(settingsData.planExpiresAt).getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16)
                                            : ''}
                                        onChange={e => setSettingsData({ ...settingsData, planExpiresAt: e.target.value ? new Date(e.target.value).toISOString() : '' })}
                                    />
                                </div>
                            )}
                            {settingsData.planType !== 'TIME_BASED' && settingsData.planType !== 'UNLIMITED' && (
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cost Per Message (Credits)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-sisia-primary"
                                        value={settingsData.messageCost}
                                        onChange={e => setSettingsData({ ...settingsData, messageCost: parseInt(e.target.value) })}
                                    />
                                </div>
                            )}



                            <hr className="my-4" />
                            <h4 className="text-md font-semibold mb-2">AI Auto-Response</h4>

                            <div className="mb-4">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        className="rounded"
                                        checked={settingsData.isAiEnabled}
                                        onChange={e => setSettingsData({ ...settingsData, isAiEnabled: e.target.checked })}
                                    />
                                    <span className="text-sm font-medium text-gray-700">Enable AI Auto-Response</span>
                                </label>
                            </div>

                            {settingsData.isAiEnabled && (
                                <>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">OpenAI API Key</label>
                                        <input
                                            type="password"
                                            className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-sisia-primary"
                                            value={settingsData.aiApiKey}
                                            onChange={e => setSettingsData({ ...settingsData, aiApiKey: e.target.value })}
                                            placeholder="sk-..."
                                        />
                                    </div>
                                </>
                            )}
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setSettingsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-sisia-primary text-white rounded hover:bg-emerald-700">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div >
    );
};

export default Users;
