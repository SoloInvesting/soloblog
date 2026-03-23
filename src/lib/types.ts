export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: Author;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  featured?: boolean;
}

export interface Author {
  name: string;
  avatar: string;
  bio?: string;
}

export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changesPercentage: number;
  dayHigh: number;
  dayLow: number;
  volume: number;
  marketCap: number;
}

export interface NewsArticle {
  title: string;
  url: string;
  publishedDate: string;
  image: string;
  site: string;
  text: string;
  symbol?: string;
}

export interface MarketIndex {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changesPercentage: number;
}
