import { NextResponse } from 'next/server';
import axios from 'axios';
import pool from '../../../../lib/db.js';

const CACHE_TIME = 12 * 60 * 60 * 1000; // 12 hours
const FIXED_TAX_GOLD = 500;
const FIXED_TAX_SILVER = 5;
const gramsPerOunce = 31.1035;

function safeNum(val) {
    return Number.isFinite(val) ? val : 0;
}

async function getAdminMargins() {
    try {
        const { rows } = await pool.query('SELECT * FROM admin_margins ORDER BY updated_at DESC LIMIT 1');
        const parsed = rows[0] || {};
        return {
            gold24Buy: safeNum(parsed.gold24k_buy),
            gold24Sell: safeNum(parsed.gold24k_sell),
            gold22Buy: safeNum(parsed.gold22k_buy),
            gold22Sell: safeNum(parsed.gold22k_sell),
            silverBuy: safeNum(parsed.silver_buy),
            silverSell: safeNum(parsed.silver_sell),
        };
    } catch (error) {
        console.error('Error fetching admin margins:', error);
        return {
            gold24Buy: 0, gold24Sell: 0,
            gold22Buy: 0, gold22Sell: 0,
            silverBuy: 0, silverSell: 0
        };
    }
}

// Call MetalPrice API
async function fetchMetalPriceApi() {
    const apiKey = '214b6517e187b405f266423a0f22ee4a';
    const url = `https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=INR&currencies=XAU,XAG`;
    try {
        const response = await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' },
            timeout: 8000,
        });
        const rates = response.data.rates || {};
        const INRXAU = rates.INRXAU;
        const INRXAG = rates.INRXAG;
        if (!INRXAU || !INRXAG) throw new Error('Missing data for INRXAU or INRXAG');
        const gold24PerGram = INRXAU / gramsPerOunce;
        const silverPerGram = INRXAG / gramsPerOunce;
        return { gold24PerGram, silverPerGram };
    } catch (e) {
        console.error('MetalPriceAPI fetch failed:', e);
        throw e;
    }
}

// Get spot prices with cache logic
async function getSpotPricesWithCache() {
    let cache = null;
    try {
        const { rows } = await pool.query('SELECT * FROM metal_cache ORDER BY timestamp DESC LIMIT 1');
        cache = rows[0];
    } catch (error) {
        console.error('Error fetching metal_cache:', error);
    }
    const now = Date.now();
    if (cache) {
        const cacheAge = now - new Date(cache.timestamp).getTime();
        const cacheIsFresh = cacheAge < CACHE_TIME;
        const cacheIsValid = cache.gold24k_per_gram > 0 && cache.silver_per_gram > 0;
        if (cacheIsFresh && cacheIsValid) {
            return {
                gold24PerGram: cache.gold24k_per_gram,
                silverPerGram: cache.silver_per_gram,
                timestamp: new Date(cache.timestamp).getTime(),
            };
        }
    }
    // Fetch fresh data
    try {
        const { gold24PerGram, silverPerGram } = await fetchMetalPriceApi();
        if (gold24PerGram > 0 && silverPerGram > 0) {
            await pool.query(
                'INSERT INTO metal_cache (gold24k_per_gram, silver_per_gram, timestamp) VALUES ($1, $2, NOW())',
                [gold24PerGram, silverPerGram]
            );
        }
        return { gold24PerGram, silverPerGram, timestamp: now };
    } catch (error) {
        console.error('Failed to fetch fresh prices:', error);
        if (cache) {
            return {
                gold24PerGram: cache.gold24k_per_gram,
                silverPerGram: cache.silver_per_gram,
                timestamp: new Date(cache.timestamp).getTime(),
            };
        }
        return { gold24PerGram: 0, silverPerGram: 0, timestamp: now };
    }
}

export async function GET() {
    try {
        const { gold24PerGram, silverPerGram } = await getSpotPricesWithCache();
        const { gold24Buy, gold24Sell, gold22Buy, gold22Sell, silverBuy, silverSell } = await getAdminMargins();

        // Gold 24
        const gold24AfterTax = gold24PerGram + FIXED_TAX_GOLD;
        const gold24_1g_buy = +(gold24AfterTax + gold24Buy).toFixed(2);
        const gold24_1g_sell = +(gold24AfterTax + gold24Sell).toFixed(2);
        const gold24_10g_buy = +(gold24_1g_buy * 10).toFixed(2);
        const gold24_10g_sell = +(gold24_1g_sell * 10).toFixed(2);

        // Gold 22
        const gold22PerGram = gold24PerGram * 0.916;
        const gold22AfterTax = gold22PerGram + FIXED_TAX_GOLD;
        const gold22_1g_buy = +(gold22AfterTax + gold22Buy).toFixed(2);
        const gold22_1g_sell = +(gold22AfterTax + gold22Sell).toFixed(2);
        const gold22_10g_buy = +(gold22_1g_buy * 10).toFixed(2);
        const gold22_10g_sell = +(gold22_1g_sell * 10).toFixed(2);

        // Silver
        const silverAfterTaxPerGram = silverPerGram + FIXED_TAX_SILVER;
        const silver_1g_buy = +(silverAfterTaxPerGram + silverBuy).toFixed(2);
        const silver_1g_sell = +(silverAfterTaxPerGram + silverSell).toFixed(2);
        const silver_1kg_buy = +(silver_1g_buy * 1000).toFixed(2);
        const silver_1kg_sell = +(silver_1g_sell * 1000).toFixed(2);

        return NextResponse.json({
            gold24_1g_buy,
            gold24_1g_sell,
            gold24_10g_buy,
            gold24_10g_sell,
            gold22_1g_buy,
            gold22_1g_sell,
            gold22_10g_buy,
            gold22_10g_sell,
            silver_1g_buy,
            silver_1g_sell,
            silver_1kg_buy,
            silver_1kg_sell,
            updatedAt: new Date().toISOString(),
            adminMargins: { gold24Buy, gold24Sell, gold22Buy, gold22Sell, silverBuy, silverSell },
        });
    } catch (error) {
        console.error('Error in GET gold/silver:', error);
        return NextResponse.json({ error: 'Failed to get gold/silver prices' }, { status: 500 });
    }
}

// POST: admin update margins
export async function POST(req) {
    try {
        const data = await req.json();
        await pool.query(
            'INSERT INTO admin_margins (gold24k_buy, gold24k_sell, gold22k_buy, gold22k_sell, silver_buy, silver_sell, updated_at) VALUES ($1, $2, $3, $4, $5, $6, NOW())',
            [
                safeNum(data.gold24Buy),
                safeNum(data.gold24Sell),
                safeNum(data.gold22Buy),
                safeNum(data.gold22Sell),
                safeNum(data.silverBuy),
                safeNum(data.silverSell),
            ]
        );
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Admin save error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}