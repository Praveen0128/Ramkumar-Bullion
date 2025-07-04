'use client';
import React, { useState, useEffect } from 'react';

const ADMIN_EMAIL = 'q@123';
const ADMIN_PASSWORD = 'q123';

const defaultMargins = {
    gold24KBuy: 0,
    gold24KSell: 0,
    gold22KBuy: 0,
    gold22KSell: 0,
    silverBuy: 0,
    silverSell: 0,
};

type BackendType = null | {
    gold24K_1g_buy: number,
    gold24K_1g_sell: number,
    gold24K_10g_buy: number,
    gold24K_10g_sell: number,
    gold22K_1g_buy: number,
    gold22K_1g_sell: number,
    gold22K_10g_buy: number,
    gold22K_10g_sell: number,
    silver_1g_buy: number,
    silver_1g_sell: number,
    silver_1kg_buy: number,
    silver_1kg_sell: number,
    updatedAt?: string,
    adminMargins: typeof defaultMargins,
    error?: string
};

type SpotTaxType = {
    gold24K: number,
    gold24K10g: number,
    gold22K: number,
    gold22K10g: number,
    silver: number,
    silver1kg: number,
};

export default function AdminPage() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [backend, setBackend] = useState<BackendType>(null);
    const [margins, setMargins] = useState<typeof defaultMargins>(defaultMargins);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPreview, setShowPreview] = useState(true);

    // Store spot+tax for preview
    const [spotTax, setSpotTax] = useState<SpotTaxType>({
        gold24K: 0,
        gold24K10g: 0,
        gold22K: 0,
        gold22K10g: 0,
        silver: 0,
        silver1kg: 0,
    });

    useEffect(() => {
        if (loggedIn) fetchBackend();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn]);

    async function fetchBackend() {
        setLoading(true);
        try {
            const res = await fetch('/api/goldRate/admin');
            if (res.ok) {
                const data = await res.json();
                setBackend(data);
                setMargins({ ...defaultMargins, ...data.adminMargins });
                setSpotTax({
                    gold24K: Number(data.gold24K_1g_buy) - Number(data.adminMargins.gold24KBuy),
                    gold24K10g: Number(data.gold24K_10g_buy) - Number(data.adminMargins.gold24KBuy) * 10,
                    gold22K: Number(data.gold22K_1g_buy) - Number(data.adminMargins.gold22KBuy),
                    gold22K10g: Number(data.gold22K_10g_buy) - Number(data.adminMargins.gold22KBuy) * 10,
                    silver: Number(data.silver_1g_buy) - Number(data.adminMargins.silverBuy),
                    silver1kg: Number(data.silver_1kg_buy) - Number(data.adminMargins.silverBuy) * 1000,
                });
            } else {
                setMessage('Failed to fetch data');
            }
        } catch {
            setMessage('Error fetching data');
        }
        setLoading(false);
    }

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            setLoggedIn(true);
            setMessage('');
        } else {
            setMessage('Invalid credentials');
        }
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const res = await fetch('/api/goldRate/admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(margins),
            });
            if (res.ok) {
                setMessage('Saved!');
                setShowPreview(false); // Hide preview, show final
                await fetchBackend();
            } else {
                setMessage('Failed to save');
            }
        } catch {
            setMessage('Error saving');
        }
        setLoading(false);
    }

    const calcPreview = () => {
        if (!backend) return {};
        // spot+tax from backend, margin from state
        return {
            gold24K_1g_buy: (spotTax.gold24K + margins.gold24KBuy).toFixed(2),
            gold24K_1g_sell: (spotTax.gold24K + margins.gold24KSell).toFixed(2),
            gold24K_10g_buy: (spotTax.gold24K10g + margins.gold24KBuy * 10).toFixed(2),
            gold24K_10g_sell: (spotTax.gold24K10g + margins.gold24KSell * 10).toFixed(2),
            gold22K_1g_buy: (spotTax.gold22K + margins.gold22KBuy).toFixed(2),
            gold22K_1g_sell: (spotTax.gold22K + margins.gold22KSell).toFixed(2),
            gold22K_10g_buy: (spotTax.gold22K10g + margins.gold22KBuy * 10).toFixed(2),
            gold22K_10g_sell: (spotTax.gold22K10g + margins.gold22KSell * 10).toFixed(2),
            silver_1g_buy: (spotTax.silver + margins.silverBuy).toFixed(2),
            silver_1g_sell: (spotTax.silver + margins.silverSell).toFixed(2),
            silver_1kg_buy: (spotTax.silver1kg + margins.silverBuy * 1000).toFixed(2),
            silver_1kg_sell: (spotTax.silver1kg + margins.silverSell * 1000).toFixed(2),
        };
    };

    const formatINR = (amount: number | string) =>
        `₹${Number(amount || 0).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;

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

    if (!backend) return <div className="text-center mt-16">Loading...</div>;
    if (backend && backend.error) return <div className="text-center mt-16 text-red-600">Error: {backend.error}</div>;

    // Responsive side-by-side layout
    return (
        <div className="max-w-4xl mx-auto mt-10 p-8 border rounded-lg shadow bg-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Commodity Price Admin</h2>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Margin Form */}
                <form onSubmit={handleSave} className="flex-1 space-y-8">
                    {/* Gold 24K */}
                    <div>
                        <h3 className="font-semibold mb-2">Gold 24K</h3>
                        <div className="grid grid-cols-2 gap-3 items-end">
                            <div>
                                <label className="block text-sm">Buy Margin (₹/g)</label>
                                <input
                                    type="number"
                                    value={Number.isFinite(margins.gold24KBuy) ? margins.gold24KBuy : 0}
                                    onChange={e => { setMargins({ ...margins, gold24KBuy: Number(e.target.value) }); setShowPreview(true); }}
                                    className="w-full border p-2 rounded"
                                    step="0.01"
                                />
                            </div>
                            <div>
                                <label className="block text-sm">Sell Margin (₹/g)</label>
                                <input
                                    type="number"
                                    value={Number.isFinite(margins.gold24KSell) ? margins.gold24KSell : 0}
                                    onChange={e => { setMargins({ ...margins, gold24KSell: Number(e.target.value) }); setShowPreview(true); }}
                                    className="w-full border p-2 rounded"
                                    step="0.01"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Gold 22K */}
                    <div>
                        <h3 className="font-semibold mb-2">Gold 22K</h3>
                        <div className="grid grid-cols-2 gap-3 items-end">
                            <div>
                                <label className="block text-sm">Buy Margin (₹/g)</label>
                                <input
                                    type="number"
                                    value={Number.isFinite(margins.gold22KBuy) ? margins.gold22KBuy : 0}
                                    onChange={e => { setMargins({ ...margins, gold22KBuy: Number(e.target.value) }); setShowPreview(true); }}
                                    className="w-full border p-2 rounded"
                                    step="0.01"
                                />
                            </div>
                            <div>
                                <label className="block text-sm">Sell Margin (₹/g)</label>
                                <input
                                    type="number"
                                    value={Number.isFinite(margins.gold22KSell) ? margins.gold22KSell : 0}
                                    onChange={e => { setMargins({ ...margins, gold22KSell: Number(e.target.value) }); setShowPreview(true); }}
                                    className="w-full border p-2 rounded"
                                    step="0.01"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Silver */}
                    <div>
                        <h3 className="font-semibold mb-2">Silver</h3>
                        <div className="grid grid-cols-2 gap-3 items-end">
                            <div>
                                <label className="block text-sm">Buy Margin (₹/g)</label>
                                <input
                                    type="number"
                                    value={Number.isFinite(margins.silverBuy) ? margins.silverBuy : 0}
                                    onChange={e => { setMargins({ ...margins, silverBuy: Number(e.target.value) }); setShowPreview(true); }}
                                    className="w-full border p-2 rounded"
                                    step="0.01"
                                />
                            </div>
                            <div>
                                <label className="block text-sm">Sell Margin (₹/g)</label>
                                <input
                                    type="number"
                                    value={Number.isFinite(margins.silverSell) ? margins.silverSell : 0}
                                    onChange={e => { setMargins({ ...margins, silverSell: Number(e.target.value) }); setShowPreview(true); }}
                                    className="w-full border p-2 rounded"
                                    step="0.01"
                                />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="w-full mt-6 bg-green-600 text-white py-2 rounded hover:bg-green-700" disabled={loading}>
                        {loading ? 'Saving...' : 'Save/Update Margin'}
                    </button>
                    {message && <div className="text-center mt-2 text-green-700">{message}</div>}
                </form>
                {/* Preview/Final Price Section */}
                <div className="flex-1 border rounded-lg p-6 bg-gray-50">
                    <h3 className="font-semibold mb-4">
                        {showPreview ? "Preview (with new margins)" : "Final Price (Saved)"}
                    </h3>
                    <div className="mb-2 text-xs text-gray-500">
                        Spot price + tax:<br />
                        Gold 24K 1g: {formatINR(spotTax.gold24K)} | Gold 22K 1g: {formatINR(spotTax.gold22K)} | Silver 1g: {formatINR(spotTax.silver)}
                    </div>
                    <table className="w-full text-sm border rounded">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2">Commodity</th>
                                <th className="p-2">Buy</th>
                                <th className="p-2">Sell</th>
                            </tr>
                        </thead>
                        <tbody>
                            {["gold24K_1g", "gold24K_10g", "gold22K_1g", "gold22K_10g", "silver_1g", "silver_1kg"].map((key) => (
                                <tr key={key}>
                                    <td className="p-2">
                                        {key === "gold24K_1g" && "Gold 24K 1g"}
                                        {key === "gold24K_10g" && "Gold 24K 10g"}
                                        {key === "gold22K_1g" && "Gold 22K 1g"}
                                        {key === "gold22K_10g" && "Gold 22K 10g"}
                                        {key === "silver_1g" && "Silver 1g"}
                                        {key === "silver_1kg" && "Silver 1kg"}
                                    </td>
                                    <td className="p-2">
                                        {showPreview
                                            ? formatINR((calcPreview() as any)[`${key}_buy`])
                                            : formatINR((backend as any)[`${key}_buy`])
                                        }
                                    </td>
                                    <td className="p-2">
                                        {showPreview
                                            ? formatINR((calcPreview() as any)[`${key}_sell`])
                                            : formatINR((backend as any)[`${key}_sell`])
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="text-xs text-gray-500 mt-2">
                        Last updated: {backend.updatedAt && new Date(backend.updatedAt).toLocaleString()}
                    </div>
                </div>
            </div>
            <button onClick={() => setLoggedIn(false)} className="mt-6 w-full rounded bg-gray-200 py-2 text-gray-600 hover:bg-gray-300">
                Logout
            </button>
        </div>
    );
}