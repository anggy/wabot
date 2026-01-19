import React, { useEffect, useState } from 'react';
import api from '../api';
import { Upload, Trash, Loader, X, ExternalLink } from 'lucide-react';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await api.get('/upload');
            setImages(res.data);
        } catch (error) {
            console.error("Failed to load images", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            await api.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            fetchImages();
        } catch (error) {
            console.error("Upload failed", error);
            alert("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (filename) => {
        if (!window.confirm("Are you sure you want to delete this image?")) return;

        try {
            await api.delete(`/upload/${filename}`);
            setImages(images.filter(img => img.name !== filename));
        } catch (error) {
            console.error("Delete failed", error);
            alert("Failed to delete image");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Media Gallery</h2>
                <div className="relative">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <button className="bg-wa-green text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition flex items-center gap-2 shadow-sm">
                        {uploading ? <Loader size={20} className="animate-spin" /> : <Upload size={20} />}
                        Upload New
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <Loader size={40} className="animate-spin text-gray-400" />
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {images.map((img, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all relative">
                            <div className="aspect-square relative overflow-hidden bg-gray-50">
                                <img
                                    src={img.url}
                                    alt={img.name}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <a href={img.url} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/90 rounded-full hover:bg-white text-gray-700" title="View">
                                        <ExternalLink size={18} />
                                    </a>
                                    <button
                                        onClick={() => handleDelete(img.name)}
                                        className="p-2 bg-white/90 rounded-full hover:bg-red-50 text-red-500 hover:text-red-600"
                                        title="Delete"
                                    >
                                        <Trash size={18} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-3">
                                <p className="text-xs text-gray-500 truncate" title={img.name}>{img.name}</p>
                            </div>
                        </div>
                    ))}
                    {images.length === 0 && (
                        <div className="col-span-full py-20 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <Upload size={48} className="mx-auto mb-4 opacity-50" />
                            <p>No images found. Upload your first one!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Gallery;
