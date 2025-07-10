"use client";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const CommodityTables = () => {
    const [rates, setRates] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRates() {
            try {
                const response = await fetch('/api/goldRate/admin');
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

    const formatINR = (amount: number | string) =>
        `₹${parseFloat(String(amount)).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;

    const headerClass = "py-3 px-6 font-semibold text-left border border-gray-600";
    const cellClass = "py-3 px-6 font-medium text-gray-800 border-r";
    const dataClass = "py-3 px-6 text-gray-700 font-semibold";

    if (loading) return <div><Loader /></div>;
    if (!rates) return <div>No data available</div>;

    return (
        <div className="p-6 flex flex-col gap-8">
            <div className="relative overflow-hidden rounded-lg shadow-lg border border-gray-300">
                <table className="min-w-full bg-white rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-700 text-white">
                            <th className={headerClass}>Commodity</th>
                            <th className={headerClass}>Buy</th>
                            <th className={headerClass}>Sell</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-100 border border-gray-200 hover:bg-gray-200">
                            <td className={cellClass}>Gold 24K 1g</td>
                            <td className={dataClass}>{formatINR(rates.gold24K_1g_buy)}</td>
                            <td className={dataClass}>{formatINR(rates.gold24K_1g_sell)}</td>
                        </tr>
                        <tr className="bg-gray-100 border border-gray-200 hover:bg-gray-200">
                            <td className={cellClass}>Gold 24K 10g</td>
                            <td className={dataClass}>{formatINR(rates.gold24K_10g_buy)}</td>
                            <td className={dataClass}>{formatINR(rates.gold24K_10g_sell)}</td>
                        </tr>
                        <tr className="bg-gray-100 border border-gray-200 hover:bg-gray-200">
                            <td className={cellClass}>Gold 22K 1g</td>
                            <td className={dataClass}>{formatINR(rates.gold22K_1g_buy)}</td>
                            <td className={dataClass}>{formatINR(rates.gold22K_1g_sell)}</td>
                        </tr>
                        <tr className="bg-gray-100 border border-gray-200 hover:bg-gray-200">
                            <td className={cellClass}>Gold 22K 10g</td>
                            <td className={dataClass}>{formatINR(rates.gold22K_10g_buy)}</td>
                            <td className={dataClass}>{formatINR(rates.gold22K_10g_sell)}</td>
                        </tr>
                        <tr className="bg-gray-100 border border-gray-200 hover:bg-gray-200">
                            <td className={cellClass}>Silver 1g</td>
                            <td className={dataClass}>{formatINR(rates.silver_1g_buy)}</td>
                            <td className={dataClass}>{formatINR(rates.silver_1g_sell)}</td>
                        </tr>
                        <tr className="bg-gray-100 border border-gray-200 hover:bg-gray-200">
                            <td className={cellClass}>Silver 1kg</td>
                            <td className={dataClass}>{formatINR(rates.silver_1kg_buy)}</td>
                            <td className={dataClass}>{formatINR(rates.silver_1kg_sell)}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-xs text-gray-500 p-2">
                    Last updated: {rates.updatedAt && new Date(rates.updatedAt).toLocaleString()}
                </div>
            </div>
        </div>
    );
};

export default CommodityTables;