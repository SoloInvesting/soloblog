"use client";

import { useState, useEffect } from "react";
import { StockQuote, NewsArticle, MarketIndex } from "./types";

const FMP_BASE = "https://financialmodelingprep.com/api/v3";

function getApiKey(): string {
  return process.env.NEXT_PUBLIC_FMP_API_KEY || "";
}

export function useMarketIndices() {
  const [indices, setIndices] = useState<MarketIndex[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const key = getApiKey();
    if (!key) { setLoading(false); return; }

    const symbols = "^GSPC,^DJI,^IXIC,^RUT,^VIX";
    fetch(`${FMP_BASE}/quote/${symbols}?apikey=${key}`)
      .then((r) => r.ok ? r.json() : [])
      .then(setIndices)
      .catch(() => setIndices([]))
      .finally(() => setLoading(false));
  }, []);

  return { indices, loading };
}

export function useLatestNews(limit = 12) {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const key = getApiKey();
    if (!key) { setLoading(false); return; }

    fetch(`${FMP_BASE}/stock_news?limit=${limit}&apikey=${key}`)
      .then((r) => r.ok ? r.json() : [])
      .then(setNews)
      .catch(() => setNews([]))
      .finally(() => setLoading(false));
  }, [limit]);

  return { news, loading };
}

export function useStockQuotes(symbols: string[]) {
  const [stocks, setStocks] = useState<StockQuote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const key = getApiKey();
    if (!key) { setLoading(false); return; }

    const joined = symbols.join(",");
    fetch(`${FMP_BASE}/quote/${joined}?apikey=${key}`)
      .then((r) => r.ok ? r.json() : [])
      .then(setStocks)
      .catch(() => setStocks([]))
      .finally(() => setLoading(false));
  }, [symbols]);

  return { stocks, loading };
}

const INDEX_NAMES: Record<string, string> = {
  "^GSPC": "S&P 500 אס אנד פי",
  "^DJI": "דאו ג׳ונס",
  "^IXIC": "נאסד״ק",
  "^RUT": "ראסל 2000",
  "^VIX": "מדד הפחד VIX",
};

export function getIndexDisplayName(symbol: string): string {
  return INDEX_NAMES[symbol] || symbol;
}
