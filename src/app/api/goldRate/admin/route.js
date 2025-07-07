import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import axios from 'axios';

const pool = new Pool({
    connectionString: 'postgres://neondb_owner:npg_sQ0WFJGNfwl5@ep-odd-credit-admoirvs-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require',
});

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
            gold24KBuy: safeNum(parsed.gold24k_buy),
            gold24KSell: safeNum(parsed.gold24k_sell),
            gold22KBuy: safeNum(parsed.gold22k_buy),
            gold22KSell: safeNum(parsed.gold22k_sell),
            silverBuy: safeNum(parsed.silver_buy),
            silverSell: safeNum(parsed.silver_sell),
        };
    } catch (error) {
        console.error('Error fetching admin margins:', error);
        return {
            gold24KBuy: 0, gold24KSell: 0,
            gold22KBuy: 0, gold22KSell: 0,
            silverBuy: 0, silverSell: 0,
        };
    }
}

async function fetchMetalPriceApi() {
    const apiKey = '214b6517e187b405f266423a0f22ee4a';
    const url = `https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=INR&currencies=XAU,XAG`;

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'application/json',
            },
            timeout: 8000, // 8 seconds
        });
        const data = response.data;
        const rates = data.rates || {};
        const XAU = rates.INRXAU || (rates.XAUINR ? 1 / rates.XAUINR : null);
        const XAG = rates.INRXAG || (rates.XAGINR ? 1 / rates.XAGINR : null);
        if (!XAU || !XAG) throw new Error('Missing data for XAU or XAG');

        const gold24KPerGram = XAU / gramsPerOunce;
        const silverPerGram = XAG / gramsPerOunce;
        return { gold24KPerGram, silverPerGram };
    } catch (e) {
        console.error('MetalPriceAPI fetch failed:', e);
        throw e;
    }
}

async function getSpotPricesWithCache() {
    let cache = null;
    try {
        const { rows } = await pool.query('SELECT * FROM metal_cache ORDER BY timestamp DESC LIMIT 1');
        cache = rows[0];
    } catch (error) {
        console.error('Error fetching metal_cache:', error);
    }

    const cacheIsFresh = cache && cache.timestamp && (Date.now() - new Date(cache.timestamp).getTime() < CACHE_TIME);
    const cacheIsValid = cache && cache.gold24k_per_gram && cache.silver_per_gram &&
        cache.gold24k_per_gram > 0 && cache.silver_per_gram > 0;

    // If cache is fresh and valid, use it
    if (cacheIsFresh && cacheIsValid) {
        return {
            gold24KPerGram: cache.gold24k_per_gram,
            silverPerGram: cache.silver_per_gram,
            timestamp: new Date(cache.timestamp).getTime(),
        };
    }

    // Otherwise, fetch fresh data
    try {
        const { gold24KPerGram, silverPerGram } = await fetchMetalPriceApi();
        // Only update cache if valid non-zero data!
        if (gold24KPerGram > 0 && silverPerGram > 0) {
            try {
                await pool.query(
                    'INSERT INTO metal_cache (gold24k_per_gram, silver_per_gram, timestamp) VALUES ($1, $2, NOW())',
                    [gold24KPerGram, silverPerGram]
                );
            } catch (err) {
                console.error('Error inserting into metal_cache:', err);
            }
            return { gold24KPerGram, silverPerGram, timestamp: Date.now() };
        }
    } catch (e) {
        console.error('Error fetching from MetalPriceAPI:', e);
    }

    // If fresh fetch failed, but cache has last valid data, use it (even if expired)
    if (cacheIsValid) {
        return {
            gold24KPerGram: cache.gold24k_per_gram,
            silverPerGram: cache.silver_per_gram,
            timestamp: new Date(cache.timestamp).getTime(),
        };
    }

    // If no valid data at all, return zeros
    return { gold24KPerGram: 0, silverPerGram: 0, timestamp: Date.now() };
}

export async function GET() {
    try {
        const { gold24KPerGram, silverPerGram } = await getSpotPricesWithCache();
        const {
            gold24KBuy, gold24KSell,
            gold22KBuy, gold22KSell,
            silverBuy, silverSell
        } = await getAdminMargins();

        // Gold 24K
        const gold24KAfterTax = gold24KPerGram + FIXED_TAX_GOLD;
        const gold24K_1g_buy = +(gold24KAfterTax + gold24KBuy).toFixed(2);
        const gold24K_1g_sell = +(gold24KAfterTax + gold24KSell).toFixed(2);
        const gold24K_10g_buy = +(gold24K_1g_buy * 10).toFixed(2);
        const gold24K_10g_sell = +(gold24K_1g_sell * 10).toFixed(2);

        // Gold 22K
        const gold22KPerGram = gold24KPerGram * 0.916;
        const gold22KAfterTax = gold22KPerGram + FIXED_TAX_GOLD;
        const gold22K_1g_buy = +(gold22KAfterTax + gold22KBuy).toFixed(2);
        const gold22K_1g_sell = +(gold22KAfterTax + gold22KSell).toFixed(2);
        const gold22K_10g_buy = +(gold22K_1g_buy * 10).toFixed(2);
        const gold22K_10g_sell = +(gold22K_1g_sell * 10).toFixed(2);

        // Silver
        const silverAfterTaxPerGram = silverPerGram + FIXED_TAX_SILVER;
        const silver_1g_buy = +(silverAfterTaxPerGram + silverBuy).toFixed(2);
        const silver_1g_sell = +(silverAfterTaxPerGram + silverSell).toFixed(2);
        const silver_1kg_buy = +(silver_1g_buy * 1000).toFixed(2);
        const silver_1kg_sell = +(silver_1g_sell * 1000).toFixed(2);

        // Response data
        const result = {
            gold24K_1g_buy, gold24K_1g_sell, gold24K_10g_buy, gold24K_10g_sell,
            gold22K_1g_buy, gold22K_1g_sell, gold22K_10g_buy, gold22K_10g_sell,
            silver_1g_buy, silver_1g_sell, silver_1kg_buy, silver_1kg_sell,
            updatedAt: new Date().toISOString(),
            adminMargins: {
                gold24KBuy, gold24KSell,
                gold22KBuy, gold22KSell,
                silverBuy, silverSell,
            }
        };

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error in GET gold/silver:', error);
        return NextResponse.json({
            error: 'Failed to get gold/silver prices',
            gold24K_1g_buy: 0, gold24K_1g_sell: 0, gold24K_10g_buy: 0, gold24K_10g_sell: 0,
            gold22K_1g_buy: 0, gold22K_1g_sell: 0, gold22K_10g_buy: 0, gold22K_10g_sell: 0,
            silver_1g_buy: 0, silver_1g_sell: 0, silver_1kg_buy: 0, silver_1kg_sell: 0,
            updatedAt: new Date().toISOString(),
            adminMargins: {
                gold24KBuy: 0, gold24KSell: 0,
                gold22KBuy: 0, gold22KSell: 0,
                silverBuy: 0, silverSell: 0,
            }
        }, { status: 200 });
    }
}

export async function POST(req) {
    try {
        const data = await req.json();
        await pool.query(
            `INSERT INTO admin_margins
                (gold24k_buy, gold24k_sell, gold22k_buy, gold22k_sell, silver_buy, silver_sell, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
            [
                safeNum(data.gold24KBuy),
                safeNum(data.gold24KSell),
                safeNum(data.gold22KBuy),
                safeNum(data.gold22KSell),
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