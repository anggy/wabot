import React, { useEffect, useState } from 'react';
import api from '../api';
import { LayoutDashboard, MessageSquare, Users, Zap, Smartphone, ArrowUpRight, ArrowDownLeft, Calendar, Coins, Plus, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const StatCard = ({ icon: Icon, label, value, subValue, color, delay }) => (
    <div
        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
        style={{ animationDelay: `${delay}ms` }}
    >
        <div className="flex items-start justify-between">
            <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
                <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</h3>
                {subValue && <p className="text-xs text-gray-400 mt-1">{subValue}</p>}
            </div>
            <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600`}>
                <Icon size={24} strokeWidth={2} />
            </div>
        </div>
    </div>
);

const QuickAction = ({ to, icon: Icon, label, color }) => (
    <Link
        to={to}
        className={`flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white hover:bg-${color}-50 hover:border-${color}-200 transition-all duration-200 group`}
    >
        <div className={`p-3 rounded-full bg-${color}-50 text-${color}-600 mb-2 group-hover:scale-110 transition-transform`}>
            <Icon size={20} />
        </div>
        <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">{label}</span>
    </Link>
);

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalSessions: 0,
        activeSessions: 0,
        totalMessages: 0,
        messagesSentToday: 0,
        messagesReceivedToday: 0,
        totalContacts: 0,
        activeRules: 0,
        activeSchedules: 0,
        credits: 0
    });

    useEffect(() => {
        fetchStats();
        // Refresh stats every minute
        const interval = setInterval(fetchStats, 60000);
        return () => clearInterval(interval);
    }, []);

    const fetchStats = async () => {
        try {
            const res = await api.get('/dashboard/stats');
            setStats(res.data);
        } catch (error) {
            console.error("Failed to fetch stats", error);
        }
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{getGreeting()}, {user?.username}! 👋</h1>
                    <p className="text-gray-500 mt-1">Here's what's happening with your WhatsApp bot today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 shadow-sm">
                        Plan: <span className="text-sisia-primary font-bold">{user?.planType === 'TIME_BASED' ? 'Time Based' : 'Pay As You Go'}</span>
                    </span>
                    <button
                        onClick={fetchStats}
                        className="p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-sisia-primary hover:border-sisia-primary transition-all shadow-sm"
                        title="Refresh Stats"
                    >
                        <LayoutDashboard size={18} />
                    </button>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={Smartphone}
                    label="Active Devices"
                    value={stats.activeSessions || 0}
                    subValue={`${stats.totalSessions || 0} total sessions registered`}
                    color="emerald"
                    delay={0}
                />
                <StatCard
                    icon={MessageSquare}
                    label="Total Messages"
                    value={stats.totalMessages ? stats.totalMessages.toLocaleString() : 0}
                    subValue="All time history"
                    color="blue"
                    delay={100}
                />
                <StatCard
                    icon={Users}
                    label="Contacts"
                    value={stats.totalContacts ? stats.totalContacts.toLocaleString() : 0}
                    subValue="Saved in database"
                    color="indigo"
                    delay={200}
                />
                <StatCard
                    icon={Calendar}
                    label="Schedules"
                    value={stats.activeSchedules || 0}
                    subValue="Pending tasks"
                    color="purple"
                    delay={300}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Traffic Chart / Stats */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-800 text-lg">Today's Activity</h3>
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                            Live Updates
                        </span>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 border border-blue-100 group hover:shadow-md transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-blue-500 rounded-lg text-white shadow-lg shadow-blue-200">
                                    <ArrowUpRight size={24} />
                                </div>
                                <span className="text-xs font-bold text-blue-600 bg-white px-2 py-1 rounded-full shadow-sm">OUTGOING</span>
                            </div>
                            <h4 className="text-4xl font-extrabold text-blue-900">{stats.messagesSentToday || 0}</h4>
                            <p className="text-blue-600/80 text-sm font-medium mt-1">Messages sent today</p>
                        </div>

                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-6 border border-emerald-100 group hover:shadow-md transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-emerald-500 rounded-lg text-white shadow-lg shadow-emerald-200">
                                    <ArrowDownLeft size={24} />
                                </div>
                                <span className="text-xs font-bold text-emerald-600 bg-white px-2 py-1 rounded-full shadow-sm">INCOMING</span>
                            </div>
                            <h4 className="text-4xl font-extrabold text-emerald-900">{stats.messagesReceivedToday || 0}</h4>
                            <p className="text-emerald-600/80 text-sm font-medium mt-1">Messages received today</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions & Secondary Stats */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 text-lg mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <QuickAction to="/app/send" icon={Send} label="Send Message" color="blue" />
                            <QuickAction to="/app/sessions" icon={Smartphone} label="Add Device" color="emerald" />
                            <QuickAction to="/app/rules" icon={Zap} label="New Rule" color="amber" />
                            <QuickAction to="/app/broadcast" icon={Users} label="Broadcast" color="purple" />
                        </div>
                    </div>

                    {user?.planType === 'TIME_BASED' ? (
                        <div className="bg-gradient-to-br from-indigo-900 to-slate-800 p-6 rounded-2xl shadow-md text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2 text-white/80">
                                    <Calendar size={18} />
                                    <span className="text-sm font-medium">Subscription Status</span>
                                </div>
                                <h3 className="text-2xl font-extrabold mb-1">
                                    {user?.planExpiresAt ? new Date(user.planExpiresAt).toLocaleDateString() : 'Inactive'}
                                </h3>
                                <p className="text-xs text-white/60 mb-4">
                                    {user?.planExpiresAt ? 'Plan expiration date' : 'Contact admin to activate'}
                                </p>

                                <a
                                    href={`https://wa.me/${import.meta.env.VITE_ADMIN_PHONE}?text=I want to renew my subscription`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-xs font-bold bg-white/20 hover:bg-white/30 transition-colors px-3 py-2 rounded-lg backdrop-blur-sm"
                                >
                                    <Zap size={14} />
                                    Renew Plan
                                </a>
                            </div>
                            <div className="absolute -right-6 -bottom-6 text-white/5 transform rotate-12">
                                <Calendar size={140} />
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-md text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2 text-white/80">
                                    <Coins size={18} />
                                    <span className="text-sm font-medium">Credits Balance</span>
                                </div>
                                <h3 className="text-3xl font-extrabold mb-4">{user?.credits || 0}</h3>

                                <a
                                    href={`https://wa.me/${import.meta.env.VITE_ADMIN_PHONE}?text=I want to top up credits`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-xs font-bold bg-white/20 hover:bg-white/30 transition-colors px-3 py-2 rounded-lg backdrop-blur-sm"
                                >
                                    <Plus size={14} />
                                    Top Up Now
                                </a>
                            </div>
                            <div className="absolute -right-6 -bottom-6 text-white/5 transform rotate-12">
                                <Coins size={140} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
