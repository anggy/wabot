import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const Layout = () => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (
        <div className="flex bg-gray-50 h-screen overflow-hidden">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 flex items-center px-4">
                <button
                    onClick={() => setIsMobileSidebarOpen(true)}
                    className="p-2 -ml-2 rounded-lg hover:bg-gray-100 text-gray-600"
                >
                    <Menu size={24} />
                </button>
                <div className="flex-shrink-0 flex items-center gap-2">
                    <span className="font-bold text-2xl tracking-tight text-sisia-primary">SISIA</span>
                </div>
            </div>

            {/* Sidebar with Mobile Drawer logic */}
            <Sidebar
                isOpen={isMobileSidebarOpen}
                onClose={() => setIsMobileSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-8 overflow-y-auto mt-16 md:mt-0">
                <Outlet />
            </div>

            {/* Mobile Overlay */}
            {isMobileSidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsMobileSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default Layout;
