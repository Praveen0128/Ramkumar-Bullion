"use client";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const categories = [
    {
        label: "Gold 24k",
        rows: [
            { label: "1g", ask: "gold24_1g_buy", bid: "gold24_1g_sell" },
            { label: "10g", ask: "gold24_10g_buy", bid: "gold24_10g_sell" },
        ],
    },
    {
        label: "Gold 22K",
        rows: [
            { label: "1g", ask: "gold22_1g_buy", bid: "gold22_1g_sell" },
            { label: "10g", ask: "gold22_10g_buy", bid: "gold22_10g_sell" },
        ],
    },
    {
        label: "Silver",
        rows: [
            { label: "1g", ask: "silver_1g_buy", bid: "silver_1g_sell" },
            { label: "1kg", ask: "silver_1kg_buy", bid: "silver_1kg_sell" },
        ],
    },
];

const formatINR = (amount: number | string) =>
    `₹${parseFloat(String(amount || 0)).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;

const CommodityTables = () => {
    const [rates, setRates] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRates() {
            try {
                const response = await fetch("/api/goldRate/admin");
                if (!response.ok) throw new Error("Network response was not ok");
                const data = await response.json();
                setRates(data);
            } catch (error) {
                setRates(null);
            } finally {
                setLoading(false);
            }
        }
        fetchRates();
    }, []);

    if (loading)
        return (
            <div className="flex justify-center items-center h-40">
                <Loader />
            </div>
        );
    if (!rates)
        return (
            <div className="flex justify-center items-center h-40 text-red-700">
                No data available
            </div>
        );

    return (
        <div className="py-6 px-2 sm:px-6 flex flex-col gap-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-2">Today's Metal Prices</h2>
            <p className="text-center text-gray-600 mb-6">
                Live ask &amp; bid rates for gold and silver. For purchase or queries, <span className="font-semibold">contact us!</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map((cat) => (
                    <div
                        key={cat.label}
                        className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-200"
                    >
                        <div className="bg-gray-700 text-white py-3 px-5 text-xl font-semibold text-center">
                            {cat.label}
                        </div>
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2 px-3 border-b text-gray-500 font-medium text-sm text-left">Unit</th>
                                    <th className="py-2 px-3 border-b text-green-700 font-semibold text-sm text-right">Ask</th>
                                    <th className="py-2 px-3 border-b text-blue-700 font-semibold text-sm text-right">Bid</th>
                                    <th className="py-2 px-3 border-b text-yellow-700 font-semibold text-sm text-right">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cat.rows.map((row) => {
                                    const ask = rates[row.ask] || 0;
                                    const bid = rates[row.bid] || 0;
                                    // For "Price", show midpoint, else just ask (buy)
                                    const price = ((parseFloat(ask) + parseFloat(bid)) / 2).toFixed(2);
                                    return (
                                        <tr key={row.label} className="hover:bg-gray-50">
                                            <td className="py-2 px-3 text-gray-900">{row.label}</td>
                                            <td className="py-2 px-3 text-right text-green-700 font-semibold">
                                                {formatINR(ask)}
                                            </td>
                                            <td className="py-2 px-3 text-right text-blue-700 font-semibold">
                                                {formatINR(bid)}
                                            </td>
                                            <td className="py-2 px-3 text-right text-yellow-700 font-bold">
                                                {formatINR(price)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className="p-3 border-t bg-gray-50 text-xs text-gray-500 text-center">
                            Last updated:{" "}
                            {rates.updatedAt &&
                                new Date(rates.updatedAt).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <a
                    href="mailto:sales@yoursite.com"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg text-lg shadow transition"
                >
                    Contact Us for Orders &amp; Inquiries
                </a>
            </div>
        </div>
    );
};

export default CommodityTables;