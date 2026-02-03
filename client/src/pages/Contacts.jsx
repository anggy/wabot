import React, { useEffect, useState } from 'react';
import api from '../api';
import { Plus, Trash, Search, User, Phone, Tag, Edit, X, Download, Upload } from 'lucide-react';

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '', tags: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const res = await api.get('/contacts');
            setContacts(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/contacts/${editingId}`, formData);
            } else {
                await api.post('/contacts', formData);
            }
            fetchContacts();
            handleCloseModal();
        } catch (error) {
            alert('Failed to save contact');
        }
    };

    const handleEdit = (contact) => {
        setEditingId(contact.id);
        setFormData({ name: contact.name, phone: contact.phone, tags: contact.tags || '' });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ name: '', phone: '', tags: '' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.delete(`/contacts/${id}`);
            fetchContacts();
        } catch (error) {
            console.error(error);
        }
    };

    const handleExport = () => {
        const token = localStorage.getItem('token');
        const url = `${(import.meta.env.VITE_API_URL || 'http://localhost:3002').replace(/\/$/, '')}/api/contacts/export`;

        // Use fetch with auth header to get blob, then download
        fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'contacts.csv';
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch(err => console.error("Export failed", err));
    };

    const handleImport = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await api.post('/contacts/import', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert(res.data.message);
            fetchContacts();
        } catch (error) {
            console.error("Import failed", error);
            alert("Failed to import contacts");
        }
        // Reset input
        e.target.value = null;
    };

    const filteredContacts = contacts.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Contacts</h2>
                <div className="flex gap-2">
                    <button
                        onClick={handleExport}
                        className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm"
                        title="Export CSV"
                    >
                        <Download size={18} /> Export
                    </button>
                    <label className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer">
                        <Upload size={18} /> Import
                        <input type="file" className="hidden" accept=".csv" onChange={handleImport} />
                    </label>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-sisia-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                        <Plus size={18} /> Add Contact
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-200/50 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, phone, or tags..."
                            className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sisia-primary/20 focus:border-sisia-primary transition-all shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="text-xs text-gray-500 font-medium bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                        Total Contacts: <span className="text-gray-900 font-bold">{filteredContacts.length}</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Number</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tags</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredContacts.map(contact => (
                                <tr key={contact.id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sisia-primary/20 to-teal-100 text-sisia-primary flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-sm">
                                                {contact.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-semibold text-gray-900">{contact.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        <div className="flex items-center gap-2 font-mono text-xs bg-gray-50 px-2 py-1 rounded w-fit border border-gray-100 text-gray-500">
                                            <Phone size={12} className="text-gray-400" />
                                            {contact.phone}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {contact.tags && contact.tags.split(',').map((tag, i) => (
                                                <span key={i} className="inline-flex items-center gap-1 bg-white border border-gray-200 text-gray-600 text-[10px] font-medium px-2 py-1 rounded-md shadow-sm">
                                                    <Tag size={10} className="text-gray-400" /> {tag.trim()}
                                                </span>
                                            ))}
                                            {!contact.tags && <span className="text-gray-300 text-xs italic">No tags</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleEdit(contact)}
                                                className="p-2 text-gray-400 hover:text-sisia-primary hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 rounded-lg transition-all"
                                                title="Edit Contact"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(contact.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 rounded-lg transition-all"
                                                title="Delete Contact"
                                            >
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredContacts.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="p-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <User size={48} className="mb-3 text-gray-200" />
                                            <p className="font-medium text-gray-500">{searchTerm ? "No contacts match your search" : "No contacts stored yet"}</p>
                                            <button onClick={() => setIsModalOpen(true)} className="mt-4 text-sisia-primary hover:underline text-sm font-medium">Add your first contact</button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">{editingId ? 'Edit Contact' : 'Add Contact'}</h3>
                            <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone (e.g. 62812...)</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="friend, customer, vip"
                                    value={formData.tags}
                                    onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    {editingId ? 'Update Contact' : 'Save Contact'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contacts;
