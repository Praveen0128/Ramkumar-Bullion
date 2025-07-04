import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.resolve(process.cwd(), 'goldrate-admin.json');
const FIXED_TAX = 500; // Fixed tax/margin to add, always (edit as needed)
const METALPRICE_API_KEY = process.env.METAL_PRICE_API_KEY;
const CACHE_FILE = path.resolve(process.cwd(), 'metalprice-cache.json');
const CACHE_TIME = 3 * 60 * 60 * 1000; // 3 hours in ms

// Read admin-set charges
async function getAdminCharges() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch {
        // Defaults if not set
        return { manualBuy: 0, manualSell: 0 };
    }
}

// Save admin-set charges
async function setAdminCharges({ manualBuy, manualSell }) {
    await fs.writeFile(DATA_FILE, JSON.stringify({ manualBuy, manualSell }), 'utf8');
}

// Get (and cache) metalpriceapi spot price (per gram)
async function getCachedSpotPrice() {
    try {
        const cache = JSON.parse(await fs.readFile(CACHE_FILE, 'utf8'));
        if (cache.timestamp && Date.now() - cache.timestamp < CACHE_TIME) {
            return cache.spotPrice;
        }
    } catch { }
    // Fetch new price
    const url = `https://api.metalpriceapi.com/v1/latest?api_key=${METALPRICE_API_KEY}&base=INR&currencies=XAU`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch metal price');
    const data = await res.json();
    const { INRXAU } = data.rates || {};
    if (!INRXAU) throw new Error('No gold rate');
    const gramsPerOunce = 31.1035;
    const spotPerGram = INRXAU / gramsPerOunce;
    await fs.writeFile(CACHE_FILE, JSON.stringify({ spotPrice: spotPerGram, timestamp: Date.now() }));
    return spotPerGram;
}

// GET: returns processed buy/sell prices
export async function GET() {
    try {
        const spotPrice = await getCachedSpotPrice();
        const { manualBuy, manualSell } = await getAdminCharges();
        const buy = Number((spotPrice + FIXED_TAX + manualBuy).toFixed(2));
        const sell = Number((spotPrice + FIXED_TAX + manualSell).toFixed(2));
        return NextResponse.json({
            spotPrice: Number(spotPrice.toFixed(2)),
            fixedTax: FIXED_TAX,
            manualBuy,
            manualSell,
            buy,
            sell,
            updatedAt: new Date().toISOString(),
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: admin sets manual charges for buy/sell
export async function POST(req) {
    try {
        const { manualBuy, manualSell } = await req.json();
        await setAdminCharges({ manualBuy, manualSell });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}