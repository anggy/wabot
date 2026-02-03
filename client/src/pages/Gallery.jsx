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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Media Gallery</h2>
                    <p className="text-gray-500 mt-1">Manage images for broadcasts and auto-replies</p>
                </div>
                <div className="relative">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <button className="bg-sisia-primary text-white px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-sm shadow-sisia-primary/20 font-medium">
                        {uploading ? <Loader size={20} className="animate-spin" /> : <Upload size={20} />}
                        Upload Image
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin w-10 h-10 border-4 border-sisia-primary border-t-transparent rounded-full"></div>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {images.map((img, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-lg hover:border-sisia-primary/30 transition-all relative">
                            <div className="aspect-square relative overflow-hidden bg-gray-50">
                                <img
                                    src={img.url}
                                    alt={img.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                                    <a href={img.url} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white rounded-full hover:bg-sisia-primary hover:text-white text-gray-700 transition-colors shadow-lg transform hover:scale-110" title="View Fullsize">
                                        <ExternalLink size={18} />
                                    </a>
                                    <button
                                        onClick={() => handleDelete(img.name)}
                                        className="p-2.5 bg-white rounded-full hover:bg-red-500 hover:text-white text-red-500 transition-colors shadow-lg transform hover:scale-110"
                                        title="Delete Image"
                                    >
                                        <Trash size={18} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-3 bg-white">
                                <p className="text-xs font-medium text-gray-700 truncate" title={img.name}>{img.name}</p>
                                <p className="text-[10px] text-gray-400 mt-0.5">{(img.size / 1024).toFixed(1)} KB</p>
                            </div>
                        </div>
                    ))}
                    {images.length === 0 && (
                        <div className="col-span-full py-20 text-center text-gray-400 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Upload size={32} className="text-gray-300" />
                            </div>
                            <h3 className="font-bold text-gray-600">Gallery is Empty</h3>
                            <p className="max-w-xs mx-auto mt-2 text-sm">Upload images to use them in your broadcasts and auto-replies.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Gallery;
