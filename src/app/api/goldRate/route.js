// src/app/api/goldrate/route.js

import { NextResponse } from 'next/server';

export async function GET() {
    const apiKey = '214b6517e187b405f266423a0f22ee4a';
    const url = `https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=INR&currencies=XAU,XAG`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch rates');
        const data = await response.json();

        // Check if the response contains rates data
        const { INRXAU, INRXAG } = data.rates || {};

        if (!INRXAU || !INRXAG) {
            return NextResponse.json({ error: 'Missing data for XAU or XAG' }, { status: 500 });
        }

        // Conversion constants
        const gramsPerOunce = 31.1035;
        const gold24KPer10g = (INRXAU / gramsPerOunce) * 10; // 24K gold per 10 grams
        const gold22KPer10g = gold24KPer10g * 0.9167; // Approximate 22K gold per 10 grams
        const silverPerKg = (INRXAG / gramsPerOunce) * 1000; // Silver per 1 kilogram

        // Response data
        const rates = {
            pureGoldBuy: gold24KPer10g.toFixed(2),
            pureGoldSell: (gold24KPer10g * 0.98).toFixed(2), // Assuming 2% margin for sell price
            gold22KBuy: gold22KPer10g.toFixed(2),
            gold22KSell: (gold22KPer10g * 0.98).toFixed(2), // Assuming 2% margin for sell price
            silverBuy: silverPerKg.toFixed(2),
            silverSell: (silverPerKg * 0.98).toFixed(2) // Assuming 2% margin for sell price
        };

        return NextResponse.json(rates);
    } catch (error) {
        console.error('Error fetching gold and silver rates:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
