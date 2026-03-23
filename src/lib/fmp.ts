import { StockQuote, NewsArticle, MarketIndex } from "./types";

const FMP_BASE = "https://financialmodelingprep.com/api/v3";

function apiKey(): string {
  return process.env.FMP_API_KEY || "";
}

export async function getStockQuotes(
  symbols: string[]
): Promise<StockQuote[]> {
  const joined = symbols.join(",");
  const res = await fetch(`${FMP_BASE}/quote/${joined}?apikey=${apiKey()}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  return res.json();
}

export async function getMarketIndices(): Promise<MarketIndex[]> {
  const symbols = "^GSPC,^DJI,^IXIC,^RUT,^VIX";
  const res = await fetch(`${FMP_BASE}/quote/${symbols}?apikey=${apiKey()}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  return res.json();
}

export async function getLatestNews(limit = 12): Promise<NewsArticle[]> {
  const res = await fetch(
    `${FMP_BASE}/stock_news?limit=${limit}&apikey=${apiKey()}`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) return [];
  return res.json();
}

export async function getStockNews(
  symbol: string,
  limit = 5
): Promise<NewsArticle[]> {
  const res = await fetch(
    `${FMP_BASE}/stock_news?tickers=${symbol}&limit=${limit}&apikey=${apiKey()}`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) return [];
  return res.json();
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
