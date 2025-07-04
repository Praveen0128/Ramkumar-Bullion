'use client';
import React, { useState } from 'react';

const ADMIN_EMAIL = 'your@email.com';
const ADMIN_PASSWORD = 'yourpassword';

export default function AdminPage() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [backend, setBackend] = useState<any>(null);
    const [manualBuy, setManualBuy] = useState<number>(0);
    const [manualSell, setManualSell] = useState<number>(0);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    async function fetchBackend() {
        setLoading(true);
        try {
            const res = await fetch('/api/goldrate/admin');
            if (res.ok) {
                const data = await res.json();
                setBackend(data);
                setManualBuy(Number.isFinite(data.manualBuy) ? data.manualBuy : 0);
                setManualSell(Number.isFinite(data.manualSell) ? data.manualSell : 0);
            }
        } catch { }
        setLoading(false);
    }

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            setLoggedIn(true);
            setMessage('');
            await fetchBackend();
        } else {
            setMessage('Invalid credentials');
        }
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const res = await fetch('/api/goldrate/admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ manualBuy, manualSell }),
            });
            if (res.ok) {
                setMessage('Saved!');
                await fetchBackend();
            } else {
                setMessage('Failed to save');
            }
        } catch {
            setMessage('Error saving');
        }
        setLoading(false);
    }

    const formatINR = (amount: number | string) =>
        `₹${parseFloat(String(amount)).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;

    // Calculate previews live as you type, based on backend spot/afterTax
    const afterTax = backend ? backend.spotPrice + backend.fixedTax : 0;
    const previewBuy = afterTax + (manualBuy ?? 0);
    const previewSell = afterTax + (manualSell ?? 0);

    if (!loggedIn) {
        return (
            <div className="max-w-sm mx-auto mt-24 p-6 border rounded-lg shadow bg-white">
                <h2 className="text-xl font-semibold mb-4 text-center">Admin Login</h2>
                <form onSubmit={handleLogin} className="space-y-3">
                    <input
                        type="email"
                        placeholder="Admin email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <button type="submit" className="w-full rounded bg-blue-600 text-white py-2 hover:bg-blue-700" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                {message && <div className="text-red-600 mt-2 text-center">{message}</div>}
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-8 border rounded-lg shadow bg-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Gold Price Admin</h2>
            <form onSubmit={handleSave} className="space-y-4">
                <div>
                    <label className="block font-medium">Spot Price (1g)</label>
                    <input
                        type="text"
                        value={backend ? formatINR(backend.spotPrice) : ''}
                        readOnly
                        className="w-full border p-2 rounded bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block font-medium">After Tax Price (1g)</label>
                    <input
                        type="text"
                        value={backend ? formatINR(backend.afterTax) : ''}
                        readOnly
                        className="w-full border p-2 rounded bg-gray-100"
                    />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block font-medium">Manual Buy Margin (₹)</label>
                        <input
                            type="number"
                            value={manualBuy}
                            onChange={e => setManualBuy(Number(e.target.value))}
                            className="w-full border p-2 rounded"
                            step="0.01"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Manual Sell Margin (₹)</label>
                        <input
                            type="number"
                            value={manualSell}
                            onChange={e => setManualSell(Number(e.target.value))}
                            className="w-full border p-2 rounded"
                            step="0.01"
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-center">Preview (Live)</label>
                        <table className="w-full text-sm border rounded">
                            <tbody>
                                <tr>
                                    <td className="py-1 px-2">Buy</td>
                                    <td className="py-1 px-2">{formatINR(previewBuy)}</td>
                                </tr>
                                <tr>
                                    <td className="py-1 px-2">Sell</td>
                                    <td className="py-1 px-2">{formatINR(previewSell)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700" disabled={loading}>
                    {loading ? 'Saving...' : 'Save/Update Margin'}
                </button>
                {message && <div className="text-center mt-2 text-green-700">{message}</div>}
            </form>
            <div className="mt-8">
                <h3 className="font-semibold mb-2">Final Gold Price Calculation (Saved)</h3>
                {backend && (
                    <ul className="text-gray-800 text-sm">
                        <li>Spot Price (1g): <strong>{formatINR(backend.spotPrice)}</strong></li>
                        <li>Fixed Tax: <strong>{formatINR(backend.fixedTax)}</strong></li>
                        <li>Manual Buy Margin: <strong>{formatINR(backend.manualBuy)}</strong></li>
                        <li>Manual Sell Margin: <strong>{formatINR(backend.manualSell)}</strong></li>
                        <li>Final <span className="text-green-600">Buy</span> Price (1g): <strong>{formatINR(backend.buy)}</strong></li>
                        <li>Final <span className="text-red-600">Sell</span> Price (1g): <strong>{formatINR(backend.sell)}</strong></li>
                        <li className="text-gray-500 mt-2">Last updated: {backend.updatedAt && new Date(backend.updatedAt).toLocaleString()}</li>
                    </ul>
                )}
            </div>
            <button onClick={() => setLoggedIn(false)} className="mt-6 w-full rounded bg-gray-200 py-2 text-gray-600 hover:bg-gray-300">
                Logout
            </button>
        </div>
    );
}