import React, { useEffect, useState } from 'react';
import api from '../api';
import { Send, Upload, Loader, Grid, X, Tag } from 'lucide-react';

const Broadcast = () => {
    const [sessions, setSessions] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [tags, setTags] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [sending, setSending] = useState(false);
    const [result, setResult] = useState(null);
    const [formData, setFormData] = useState({
        sessionId: '',
        tag: '',
        messageType: 'TEXT',
        content: '',
        mediaUrl: ''
    });
    const [showGallery, setShowGallery] = useState(false);
    const [galleryImages, setGalleryImages] = useState([]);

    useEffect(() => {
        fetchSessions();
        fetchContacts();
    }, []);

    const fetchSessions = async () => {
        try {
            const res = await api.get('/sessions');
            setSessions(res.data);
            if (res.data.length > 0) {
                setFormData(prev => ({ ...prev, sessionId: res.data[0].id }));
            }
        } catch (error) {
            console.error("Failed to fetch sessions", error);
        }
    };

    const fetchContacts = async () => {
        try {
            const res = await api.get('/contacts');
            setContacts(res.data);

            // Extract unique tags
            const allTags = new Set();
            res.data.forEach(c => {
                if (c.tags) {
                    c.tags.split(',').forEach(tag => allTags.add(tag.trim()));
                }
            });
            setTags(Array.from(allTags).sort());
        } catch (error) {
            console.error("Failed to fetch contacts", error);
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

    const openGallery = async () => {
        setShowGallery(true);
        try {
            const res = await api.get('/upload');
            setGalleryImages(res.data);
        } catch (error) {
            console.error("Failed to load gallery", error);
        }
    };

    const selectImage = (url) => {
        setFormData(prev => ({ ...prev, mediaUrl: url }));
        setShowGallery(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setResult(null);
        try {
            const res = await api.post('/messages/broadcast', {
                sessionId: formData.sessionId,
                tag: formData.tag,
                type: formData.messageType,
                content: formData.content,
                mediaUrl: formData.mediaUrl
            });
            setResult({ type: 'success', message: res.data.message });
            setFormData(prev => ({ ...prev, content: '', mediaUrl: '' }));
        } catch (error) {
            console.error(error);
            setResult({ type: 'error', message: error.response?.data?.error || "Failed to start broadcast" });
        } finally {
            setSending(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Send className="text-wa-green" /> Broadcast
            </h2>

            <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
                {result && (
                    <div className={`p-4 rounded-lg mb-4 ${result.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {result.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Session</label>
                        <select
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-wa-green focus:border-transparent outline-none"
                            value={formData.sessionId}
                            onChange={e => setFormData({ ...formData, sessionId: e.target.value })}
                            required
                        >
                            <option value="">Select Session</option>
                            {sessions.map(s => <option key={s.id} value={s.id}>{s.name} ({s.status})</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Tag</label>
                        <div className="relative">
                            <Tag className="absolute left-3 top-3 text-gray-400" size={16} />
                            <select
                                className="w-full border p-2 pl-10 rounded focus:ring-2 focus:ring-wa-green focus:border-transparent outline-none"
                                value={formData.tag}
                                onChange={e => setFormData({ ...formData, tag: e.target.value })}
                                required
                            >
                                <option value="">Select Tag</option>
                                {tags.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Message will be sent to all contacts with this tag.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message Type</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="messageType"
                                    value="TEXT"
                                    checked={formData.messageType === 'TEXT'}
                                    onChange={e => setFormData({ ...formData, messageType: e.target.value })}
                                    className="text-wa-green focus:ring-wa-green"
                                />
                                <span>Text</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="messageType"
                                    value="IMAGE"
                                    checked={formData.messageType === 'IMAGE'}
                                    onChange={e => setFormData({ ...formData, messageType: e.target.value })}
                                    className="text-wa-green focus:ring-wa-green"
                                />
                                <span>Image</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message Content</label>
                        <textarea
                            className="w-full border p-2 rounded h-32 focus:ring-2 focus:ring-wa-green focus:border-transparent outline-none resize-none"
                            placeholder="Type your message here..."
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                            required
                        />
                    </div>

                    {formData.messageType === 'IMAGE' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image Source</label>
                            <div className="flex gap-2">
                                <input
                                    className="flex-1 border p-2 rounded focus:ring-2 focus:ring-wa-green focus:border-transparent outline-none"
                                    placeholder="Image URL"
                                    value={formData.mediaUrl}
                                    onChange={e => setFormData({ ...formData, mediaUrl: e.target.value })}
                                />
                                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded border flex items-center justify-center w-12 transition-colors">
                                    {uploading ? <Loader size={20} className="animate-spin" /> : <Upload size={20} />}
                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                                </label>
                                <button
                                    type="button"
                                    onClick={openGallery}
                                    className="bg-purple-600 text-white px-3 py-2 rounded flex items-center justify-center hover:bg-purple-700 transition"
                                    title="Choose from Gallery"
                                >
                                    <Grid size={20} />
                                </button>
                            </div>
                            {formData.mediaUrl && (
                                <div className="mt-2 text-center bg-gray-50 p-2 rounded border border-dashed">
                                    <img src={formData.mediaUrl} alt="Preview" className="h-32 mx-auto object-contain rounded" />
                                </div>
                            )}
                        </div>
                    )}

                    <div className="pt-4 border-t">
                        <button
                            type="submit"
                            disabled={sending || !formData.sessionId || !formData.tag}
                            className={`w-full py-2.5 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all
                                ${sending || !formData.sessionId || !formData.tag
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-wa-green hover:bg-emerald-700 shadow-lg hover:shadow-xl'
                                }`}
                        >
                            {sending ? <Loader size={20} className="animate-spin" /> : <Send size={20} />}
                            {sending ? 'Starting Broadcast...' : 'Start Broadcast'}
                        </button>
                        <p className="text-xs text-center text-gray-500 mt-2">
                            Messages are sent with a random delay (2-5s) to avoid spam detection.
                        </p>
                    </div>
                </form>
            </div>

            {/* Gallery Modal */}
            {showGallery && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-3xl max-h-[80vh] flex flex-col shadow-xl">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="font-bold text-lg">Image Gallery</h3>
                            <button onClick={() => setShowGallery(false)} className="text-gray-500 hover:text-gray-700">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                            {galleryImages.map((img, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => selectImage(img.url)}
                                    className="cursor-pointer border rounded hover:border-blue-500 hover:shadow-lg transition relative group"
                                >
                                    <img src={img.url} alt={img.name} className="w-full h-32 object-cover rounded-t" />
                                    <div className="p-2 text-xs truncate bg-gray-50">{img.name}</div>
                                </div>
                            ))}
                            {galleryImages.length === 0 && <p className="col-span-full text-center text-gray-500">No images found.</p>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Broadcast;
