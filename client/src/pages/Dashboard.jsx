import React, { useEffect, useState } from 'react';
import api from '../api';
import { LayoutDashboard, MessageSquare, Users, Zap, Smartphone, ArrowUpRight, ArrowDownLeft, Calendar, DollarSign } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className={`bg-white p-6 rounded-lg shadow-sm border-l-4 border-wa-green flex items-center justify-between`}>
        <div>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full bg-${color}-50 text-${color}-600`}>
            <Icon size={24} />
        </div>
    </div>
);

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalSessions: 0,
        activeSessions: 0,
        totalMessages: 0,
        messagesSentToday: 0,
        messagesReceivedToday: 0,
        totalContacts: 0,
        activeRules: 0
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

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                    <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
                </div>
                <button
                    onClick={fetchStats}
                    className="p-2 text-gray-600 hover:text-emerald-600 transition-colors" // Changed blue to emerald
                >
                    <LayoutDashboard size={20} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    icon={Smartphone}
                    label="Connected Devices"
                    value={stats.activeSessions || 0}
                    total={stats.totalSessions || 0}
                    color="green"
                />
                <StatCard
                    icon={DollarSign}
                    label="Credits"
                    value={stats.credits || 0}
                    color="amber"
                />
                <StatCard
                    icon={MessageSquare}
                    label="Messages Sent"
                    value={stats.totalMessages || 0}
                    color="blue"
                />
                <StatCard
                    icon={Calendar}
                    label="Active Schedules"
                    value={0} // Placeholder until stats are real
                    color="purple"
                />
                <StatCard
                    icon={Zap}
                    label="Active Rules"
                    value={0} // Placeholder
                    color="amber"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-gray-800 mb-4">Today's Traffic</h3>
                    <div className="flex items-center justify-around">
                        <div className="text-center">
                            <div className="bg-blue-50 p-4 rounded-full inline-block mb-3">
                                <ArrowUpRight className="text-blue-500" size={32} />
                            </div>
                            <p className="text-gray-500 text-sm">Sent</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.messagesSentToday}</p>
                        </div>
                        <div className="h-16 w-px bg-gray-200"></div>
                        <div className="text-center">
                            <div className="bg-green-50 p-4 rounded-full inline-block mb-3">
                                <ArrowDownLeft className="text-green-500" size={32} />
                            </div>
                            <p className="text-gray-500 text-sm">Received</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.messagesReceivedToday}</p>
                        </div>
                    </div>
                </div>


            </div>
        </div >
    );
};

export default Dashboard;
