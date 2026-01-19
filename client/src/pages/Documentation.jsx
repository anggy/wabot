import React from 'react';
import { BookOpen, Code, Terminal, MessageSquare, Shield, Clock } from 'lucide-react';

const Documentation = () => {
    return (
        <div className="p-6 max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-3 mb-6">
                <BookOpen className="text-sisia-primary" size={32} />
                <h1 className="text-3xl font-bold text-gray-800">Documentation</h1>
            </div>

            {/* Introduction */}
            <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Terminal size={20} className="text-gray-500" />
                    Introduction
                </h2>
                <p className="text-gray-600 leading-relaxed">
                    Welcome to the <strong>SISIA Wabot</strong> documentation. This platform allows you to manage multiple WhatsApp sessions,
                    automate replies, schedule messages, and manage contacts efficiently. Below you will find guides on how to use
                    the various features of the application.
                </p>
            </section>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Dashboard */}
                <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <Terminal size={18} className="text-sisia-primary" />
                        Dashboard
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Get a quick overview of your system status, including total sessions, active rules, scheduled messages, and recent activity logs.
                    </p>
                </section>

                {/* Devices (Sessions) */}
                <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <Terminal size={18} className="text-emerald-500" />
                        Devices (Sessions)
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Manage your WhatsApp connections.
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                        <li><strong>Add Session:</strong> Create a new session ID.</li>
                        <li><strong>Scan QR:</strong> Connect your WhatsApp account by scanning the QR code.</li>
                        <li><strong>Delete:</strong> Remove a session and disconnect.</li>
                    </ul>
                </section>

                {/* Contacts */}
                <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <Shield size={18} className="text-blue-500" />
                        Contacts
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Store and manage your customer contacts.
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                        <li><strong>Add Contact:</strong> Save logs containing names and phone numbers.</li>
                        <li><strong>Tags:</strong> Group contacts (e.g., 'VIP', 'New') for targeted broadcasts.</li>
                    </ul>
                </section>

                {/* Message History */}
                <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <MessageSquare size={18} className="text-amber-500" />
                        Message History
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        View logs of all incoming and outgoing messages handled by the bot. Useful for debugging and auditing conversations.
                    </p>
                </section>

                {/* Groups */}
                <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <Shield size={18} className="text-purple-500" />
                        Groups
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        View and manage WhatsApp groups your sessions are part of. You can retrieve group lists and participants.
                    </p>
                </section>

                {/* Gallery */}
                <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <BookOpen size={18} className="text-pink-500" />
                        Gallery
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Upload and manage media files (images) that can be used in your Auto Replies and Broadcasts.
                    </p>
                </section>

                {/* Broadcast */}
                <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <Terminal size={18} className="text-red-500" />
                        Broadcast
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Send bulk messages to contacts based on their <strong>Tags</strong>.
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                        <li>Select a Session and a Tag.</li>
                        <li>Compose your message (Text or Image).</li>
                        <li>Messages are sent with a random delay to avoid spam detection.</li>
                    </ul>
                </section>

                {/* Send Test */}
                <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <Code size={18} className="text-indigo-500" />
                        Send Test
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Manually send a single message to a specific number. Useful for testing rules or sending quick notifications.
                    </p>
                </section>


                {/* Scheduler */}
                <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <Clock size={18} className="text-blue-500" />
                        Message Scheduler
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Schedule one-time or recurring messages using Cron expressions.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <code className="text-xs text-gray-700 font-mono">
                            * * * * *  (Run every minute)<br />
                            30 8 * * * (Run daily at 8:30 AM)
                        </code>
                    </div>
                </section>

                {/* API Integration */}
                <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <Code size={18} className="text-amber-500" />
                        Developer API
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Integrate Wabot with your own applications using our REST API.
                    </p>
                    <a
                        href={`${(import.meta.env.VITE_API_URL || 'https://wabot.homesislab.my.id').replace(/\/$/, '')}/api/docs`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sisia-primary hover:underline text-sm font-medium"
                    >
                        View Full API Reference &rarr;
                    </a>
                </section>

                {/* Account & Billing */}
                <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <Shield size={18} className="text-purple-500" />
                        Account & Plans
                    </h3>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                        <li><strong>Pay As You Go:</strong> Purchase credits to send messages.</li>
                        <li><strong>Time Based:</strong> Unlimited messaging for a specific duration.</li>
                    </ul>
                    <p className="text-xs text-gray-500 mt-4">
                        Contact Admin via WhatsApp for plan upgrades or credit top-ups.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Documentation;
