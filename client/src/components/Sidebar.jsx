import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Smartphone, Users, MessageSquare, Calendar, Zap, Send, Database, Shield, LogOut, BookOpen, ChevronLeft, ChevronRight, Coins } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();
    const { user, logout } = useAuth();
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    const links = [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/sessions', label: 'Devices', icon: Smartphone },
        { path: '/contacts', label: 'Contacts', icon: Users },
        { path: '/history', label: 'Messages', icon: MessageSquare },
        { path: '/rules', label: 'Auto Reply', icon: Zap },
        { path: '/scheduler', label: 'Broadcast', icon: Calendar },
        { path: '/groups', label: 'Groups', icon: Database },
        { path: '/send', label: 'Send Test', icon: Send },
    ];

    if (user?.role === 'ADMIN') {
        links.push({ path: '/users', label: 'Users', icon: Shield });
    }

    return (
        <div className={`
            fixed md:static inset-y-0 left-0 z-50
            h-screen bg-white border-r border-gray-200 text-gray-700 p-4 flex flex-col transition-all duration-300
            ${isCollapsed ? 'w-20' : 'w-64'}
            ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            shadow-xl md:shadow-none
        `}>
            <div className="flex justify-center mb-8 px-2 relative">
                <img src="/logo.svg" alt="Wabot" className={`h-12 w-auto object-contain transition-all duration-300 ${isCollapsed ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`} />
                {isCollapsed && <div className="absolute inset-0 flex items-center justify-center font-bold text-wa-green text-xl">WB</div>}

                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-6 bg-white border border-gray-200 p-1.5 rounded-full shadow-md hover:bg-gray-50 text-gray-500 hidden md:flex z-50 items-center justify-center transition-all"
                >
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>
            </div>

            <nav className="space-y-1 flex-1">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path;
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={onClose} // Close sidebar on mobile when link clicked
                            title={isCollapsed ? link.label : ''}
                            className={`flex items-center p-3 rounded-lg transition-all duration-200 font-medium ${isActive
                                ? 'bg-emerald-50 text-wa-green border-r-4 border-wa-green'
                                : 'hover:bg-gray-50 text-gray-600 hover:text-wa-green'
                                } ${isCollapsed ? 'justify-center' : 'space-x-3'}`}
                        >
                            <Icon size={20} className={isActive ? 'text-wa-green' : 'text-gray-400'} />
                            {!isCollapsed && <span>{link.label}</span>}
                        </Link>
                    );
                })}

                <a
                    href={`${(import.meta.env.VITE_API_URL || 'https://wabot.homesislab.my.id').replace(/\/$/, '')}/api/docs`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={isCollapsed ? "API Docs" : ""}
                    className={`flex items-center p-3 rounded-lg transition-all duration-200 font-medium hover:bg-gray-50 text-gray-600 hover:text-wa-green ${isCollapsed ? 'justify-center' : 'space-x-3'}`}
                >
                    <BookOpen size={20} className="text-gray-400" />
                    {!isCollapsed && <span>API Docs</span>}
                </a>
            </nav>

            <div className="pt-4 border-t bg-white mt-auto">
                <div className={`flex items-center gap-3 mb-3 px-2 ${isCollapsed ? 'justify-center' : ''}`}>
                    <div className="w-8 h-8 min-w-[2rem] rounded-full bg-wa-green/10 flex items-center justify-center text-wa-green font-bold">
                        {user?.username?.charAt(0).toUpperCase()}
                    </div>
                    {!isCollapsed && (
                        <div className="overflow-hidden">
                            <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Logged in as</div>
                            <div className="text-sm font-semibold text-gray-800 truncate">{user?.username}</div>
                            <div className="flex items-center gap-1 text-xs text-amber-600 font-medium mt-0.5">
                                <Coins size={12} />
                                <span>{user?.credits || 0} Credits</span>
                            </div>
                        </div>
                    )}
                </div>
                <button
                    onClick={logout}
                    title={isCollapsed ? "Logout" : ""}
                    className={`w-full flex items-center justify-center p-2 rounded-lg bg-white border border-gray-200 text-red-500 hover:bg-red-50 hover:border-red-100 transition-all text-sm font-medium shadow-sm ${isCollapsed ? '' : 'space-x-2'}`}
                >
                    <LogOut size={16} />
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
