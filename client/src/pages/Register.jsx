import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { UserPlus, ArrowLeft, Loader } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        planType: 'PAY_AS_YOU_GO'
    });
    const [countryCode, setCountryCode] = useState('+62');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }

        setLoading(true);

        try {
            await api.post('/auth/register', {
                username: formData.username,
                password: formData.password,
                email: formData.email,
                phone: countryCode + formData.phone,
                planType: formData.planType
            });
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.error || "Registration failed. Username may be taken.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-sisia-light/30 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-10">
                        <Link to="/" className="inline-flex items-center gap-2 text-sisia-primary font-bold text-2xl">
                            <span>SISIA</span>
                        </Link>
                        <h2 className="mt-4 text-3xl font-bold text-gray-900">Create Account</h2>
                        <p className="text-gray-500 mt-2">Join us to manage your WhatsApp automation</p>
                    </div>

                    {success ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <UserPlus size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
                            <p className="text-gray-600 mb-6">
                                Your account has been created and is pending approval.
                                <br />
                                To activate your account and make a payment, please contact the administrator.
                            </p>

                            <div className="flex flex-col gap-3">
                                <a
                                    href={`https://wa.me/${import.meta.env.VITE_ADMIN_PHONE}?text=Hello, I just registered as ${formData.username}. I would like to activate my account.`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-block w-full bg-[#25D366] text-white py-3 px-4 rounded-xl font-semibold hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2"
                                >
                                    Chat with Admin
                                </a>
                                <Link to="/login" className="inline-block w-full bg-sisia-primary text-white py-3 px-4 rounded-xl font-semibold hover:bg-sisia-dark transition-colors">
                                    Back to Login
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-sisia-primary/20 focus:border-sisia-primary transition-all"
                                    placeholder="Choose a username"
                                    value={formData.username}
                                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-sisia-primary/20 focus:border-sisia-primary transition-all"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone (WhatsApp)</label>
                                <div className="flex">
                                    <select
                                        className="inline-flex items-center px-2 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-gray-600 font-medium outline-none cursor-pointer"
                                        value={countryCode}
                                        onChange={(e) => setCountryCode(e.target.value)}
                                    >
                                        <option value="+62">+62 (ID)</option>
                                        <option value="+1">+1 (US)</option>
                                        <option value="+65">+65 (SG)</option>
                                        <option value="+60">+60 (MY)</option>
                                    </select>
                                    <input
                                        type="text"
                                        className="flex-1 w-full px-4 py-3 rounded-r-xl border border-gray-200 outline-none focus:ring-2 focus:ring-sisia-primary/20 focus:border-sisia-primary transition-all"
                                        placeholder="8123456789"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Select Plan</label>
                                <select
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-sisia-primary/20 focus:border-sisia-primary transition-all bg-white"
                                    value={formData.planType}
                                    onChange={e => setFormData({ ...formData, planType: e.target.value })}
                                >
                                    <option value="PAY_AS_YOU_GO">Pay As You Go (Credits)</option>
                                    <option value="TIME_BASED">Time Based (Subscription)</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-sisia-primary/20 focus:border-sisia-primary transition-all"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Info</label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-sisia-primary/20 focus:border-sisia-primary transition-all"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-sisia-primary text-white py-3.5 px-4 rounded-xl hover:bg-sisia-dark transition-all font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader className="animate-spin" size={20} /> : <UserPlus size={20} />}
                                Create Account
                            </button>

                            <div className="text-center mt-6">
                                <p className="text-gray-600 text-sm">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-sisia-primary font-bold hover:underline">
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Register;
