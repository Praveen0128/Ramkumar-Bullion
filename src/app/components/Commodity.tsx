"use client";
import React, { useEffect, useState } from "react";

type GoldRates = {
    spotPrice: number;
    fixedTax: number;
    manualBuy: number;
    manualSell: number;
    buy: number;
    sell: number;
    updatedAt: string;
};

const CommodityTables = () => {
    const [rates, setRates] = useState<GoldRates | null>(null);
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

    const formatINR = (amount: number | string) =>
        `₹${parseFloat(String(amount)).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;

    if (loading)
        return (
            <div className="flex justify-center items-center h-32">
                <span>Loading latest gold price...</span>
            </div>
        );
    if (!rates)
        return (
            <div className="flex justify-center items-center h-32">
                <span>No data available</span>
            </div>
        );

    return (
        <div className="p-6 flex flex-col gap-8">
            <div className="relative overflow-hidden rounded-lg shadow-lg border border-gray-300 max-w-lg mx-auto">
                <table className="min-w-full bg-white rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-700 text-white">
                            <th className="py-3 px-6 font-semibold text-left border border-gray-600">
                                Gold (1g)
                            </th>
                            <th className="py-3 px-6 font-semibold text-left border border-gray-600">
                                Buy
                            </th>
                            <th className="py-3 px-6 font-semibold text-left border border-gray-600">
                                Sell
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-100 border border-gray-200 hover:bg-gray-200">
                            <td className="py-3 px-6 font-medium text-gray-800 border-r">
                                Final Price
                            </td>
                            <td className="py-3 px-6 text-gray-700 font-semibold">
                                {formatINR(rates.buy)}
                            </td>
                            <td className="py-3 px-6 text-gray-700 font-semibold">
                                {formatINR(rates.sell)}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-xs text-gray-500 p-2">
                    Last updated:{" "}
                    {rates.updatedAt && new Date(rates.updatedAt).toLocaleString()}
                </div>
            </div>
        </div>
    );
};

export default CommodityTables;