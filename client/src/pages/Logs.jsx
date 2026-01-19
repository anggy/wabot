import React, { useEffect, useState, useRef } from 'react';
import api from '../api';
import { RefreshCw, Terminal, Download, Clock, Info, AlertTriangle, XCircle } from 'lucide-react';

const Logs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [autoRefresh, setAutoRefresh] = useState(true);
    const bottomRef = useRef(null);

    const fetchLogs = async () => {
        try {
            const res = await api.get('/logs');
            setLogs(res.data);
        } catch (error) {
            console.error("Failed to fetch logs", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
        const interval = setInterval(() => {
            if (autoRefresh) fetchLogs();
        }, 5000); // Poll every 5 seconds

        return () => clearInterval(interval);
    }, [autoRefresh]);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [logs]);

    const getLevelBadge = (level) => {
        if (level >= 50) return <span className="bg-red-900/50 text-red-200 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold border border-red-700/50">ERROR</span>;
        if (level >= 40) return <span className="bg-orange-900/50 text-orange-200 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold border border-orange-700/50">WARN</span>;
        if (level >= 30) return <span className="bg-blue-900/50 text-blue-200 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold border border-blue-700/50">INFO</span>;
        return <span className="bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold border border-gray-600">DEBUG</span>;
    };

    const formatTime = (timestamp) => {
        if (!timestamp) return '-';
        return new Date(timestamp).toLocaleTimeString('id-ID', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Terminal className="text-gray-700" /> System Logs
                </h2>
                <div className="flex gap-3">
                    <button
                        onClick={() => setAutoRefresh(!autoRefresh)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border ${autoRefresh ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                    >
                        <RefreshCw size={14} className={autoRefresh ? 'animate-spin' : ''} />
                        {autoRefresh ? 'Live' : 'Paused'}
                    </button>
                    <button
                        onClick={fetchLogs}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                        <RefreshCw size={14} /> Refresh
                    </button>
                </div>
            </div>

            <div className="bg-[#1e1e1e] rounded-xl shadow-lg border border-gray-800 overflow-hidden font-mono text-sm h-[calc(100vh-140px)] flex flex-col">
                <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-gray-700">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="text-gray-400 text-xs flex items-center gap-2">
                        <span>logs/app.log</span>
                        {/* <span className="bg-gray-700 px-1.5 rounded text-[10px]">{logs.length} lines</span> */}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    {loading && logs.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-gray-500 gap-2">
                            <RefreshCw className="animate-spin" /> Loading logs...
                        </div>
                    ) : logs.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-gray-500">No logs found.</div>
                    ) : (
                        logs.map((log, idx) => (
                            <div key={idx} className="flex gap-3 hover:bg-white/5 p-0.5 rounded group transition-colors">
                                <span className="text-gray-500 w-24 shrink-0 select-none">{formatTime(log.time)}</span>
                                <div className="shrink-0 w-16 flex justify-center">{getLevelBadge(log.level)}</div>
                                <span className="text-gray-300 break-all whitespace-pre-wrap flex-1">{log.msg || JSON.stringify(log)}</span>
                            </div>
                        ))
                    )}
                    <div ref={bottomRef} />
                </div>
            </div>
        </div>
    );
};

export default Logs;
