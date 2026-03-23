import { Post } from "./types";
import fs from "fs";
import path from "path";

const POSTS_FILE = path.join(process.cwd(), "src/data/posts.json");

export function getAllPosts(): Post[] {
  try {
    const raw = fs.readFileSync(POSTS_FILE, "utf-8");
    const posts: Post[] = JSON.parse(raw);
    if (posts.length === 0) return getSamplePosts();
    return posts.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch {
    return getSamplePosts();
  }
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter((p) => p.featured);
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export function getCategories(): string[] {
  const posts = getAllPosts();
  return [...new Set(posts.map((p) => p.category))];
}

function getSamplePosts(): Post[] {
  return [
    {
      id: 1,
      slug: "power-of-compound-interest",
      title: "The Power of Compound Interest: How Small Investments Grow Into Fortunes",
      excerpt:
        "Understanding compound interest is the first step toward building lasting wealth. Learn how even modest monthly contributions can transform your financial future.",
      content: `<p>Compound interest is often called the eighth wonder of the world, and for good reason. It's the principle that makes your money work for you, turning even small, consistent investments into significant wealth over time.</p>
<h2>What Is Compound Interest?</h2>
<p>At its core, compound interest is interest earned on interest. When you invest money, you earn returns not just on your original investment, but also on the accumulated returns from previous periods.</p>
<h2>The Math Behind the Magic</h2>
<p>Consider this: if you invest $500 per month starting at age 25, assuming an average annual return of 8%, by age 65 you would have approximately $1.74 million. The total amount you actually contributed? Just $240,000. The remaining $1.5 million came from compound growth.</p>
<h2>Starting Early Makes All the Difference</h2>
<p>The most powerful variable in compound interest is time. Starting just 10 years earlier can nearly double your final amount, even with the same monthly contribution.</p>
<h2>Practical Steps</h2>
<ul>
<li>Start investing as early as possible, even if the amounts are small</li>
<li>Reinvest all dividends and returns</li>
<li>Stay consistent with monthly contributions</li>
<li>Be patient — the real magic happens in the later years</li>
</ul>`,
      coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
      author: { name: "Solo Investing", avatar: "/logo.png" },
      category: "Investing",
      tags: ["compound interest", "investing basics", "wealth building"],
      publishedAt: "2026-03-20T10:00:00Z",
      readTime: 6,
      featured: true,
    },
    {
      id: 2,
      slug: "ai-revolution-reshaping-markets",
      title: "The AI Revolution Is Reshaping Financial Markets — Here's What You Need to Know",
      excerpt:
        "Artificial intelligence is transforming how markets operate, from algorithmic trading to predictive analytics. We break down the opportunities and risks for individual investors.",
      content: `<p>The financial world is undergoing a seismic shift driven by artificial intelligence. From high-frequency trading algorithms to AI-powered portfolio management, the technology is changing every aspect of investing.</p>
<h2>AI in Trading</h2>
<p>Algorithmic trading now accounts for over 70% of all trading volume in US equity markets. These systems can analyze thousands of data points in milliseconds, identifying patterns that human traders might miss.</p>
<h2>Opportunities for Retail Investors</h2>
<p>AI-powered tools are becoming accessible to everyday investors. Robo-advisors, sentiment analysis platforms, and AI-driven research tools can help level the playing field.</p>
<h2>The Risks to Consider</h2>
<p>While AI offers tremendous potential, it also introduces new risks: flash crashes, algorithmic herding, and the challenge of understanding "black box" decision-making processes.</p>`,
      coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      author: { name: "Solo Investing", avatar: "/logo.png" },
      category: "Technology",
      tags: ["AI", "fintech", "markets"],
      publishedAt: "2026-03-18T08:00:00Z",
      readTime: 8,
      featured: true,
    },
    {
      id: 3,
      slug: "building-diversified-portfolio-2026",
      title: "Building a Diversified Portfolio in 2026: Strategies That Actually Work",
      excerpt:
        "Diversification remains the cornerstone of smart investing. Here's a modern approach to building a portfolio that balances growth with protection.",
      content: `<p>In an era of market uncertainty, having a well-diversified portfolio is more important than ever. But diversification in 2026 looks different from what it did even five years ago.</p>
<h2>Beyond Stocks and Bonds</h2>
<p>Modern portfolios should include exposure to multiple asset classes: equities, fixed income, real estate (REITs), commodities, and potentially alternative investments like private equity or cryptocurrency.</p>
<h2>Geographic Diversification</h2>
<p>Don't limit yourself to domestic markets. International exposure can provide growth opportunities and reduce overall portfolio risk through low correlation with US markets.</p>
<h2>Sector Balance</h2>
<p>Ensure your equity holdings span multiple sectors. Over-concentration in technology or any single sector increases vulnerability to sector-specific downturns.</p>`,
      coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      author: { name: "Solo Investing", avatar: "/logo.png" },
      category: "Investing",
      tags: ["portfolio", "diversification", "strategy"],
      publishedAt: "2026-03-15T12:00:00Z",
      readTime: 7,
      featured: true,
    },
    {
      id: 4,
      slug: "federal-reserve-rate-decisions-impact",
      title: "How Federal Reserve Rate Decisions Impact Your Investments",
      excerpt:
        "Interest rate changes ripple through every corner of the financial markets. Understanding this relationship is crucial for making informed investment decisions.",
      content: `<p>The Federal Reserve's interest rate decisions are among the most closely watched events in global finance. Every rate change sends ripples through stocks, bonds, real estate, and currencies.</p>
<h2>The Mechanics</h2>
<p>When the Fed raises rates, borrowing becomes more expensive. This tends to slow economic growth and can put downward pressure on stock prices. Conversely, rate cuts stimulate borrowing and spending.</p>
<h2>Impact on Different Asset Classes</h2>
<p>Bonds typically move inversely to interest rates. Stocks can go either way depending on the economic context. Real estate is particularly sensitive to rate changes due to mortgage costs.</p>`,
      coverImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
      author: { name: "Solo Investing", avatar: "/logo.png" },
      category: "Economy",
      tags: ["federal reserve", "interest rates", "monetary policy"],
      publishedAt: "2026-03-12T09:00:00Z",
      readTime: 5,
    },
    {
      id: 5,
      slug: "crypto-etfs-new-era",
      title: "Crypto ETFs Are Here: A New Era for Digital Asset Investing",
      excerpt:
        "With the approval of multiple cryptocurrency ETFs, digital assets are entering the mainstream. What does this mean for your portfolio?",
      content: `<p>The approval of spot Bitcoin and Ethereum ETFs has opened the floodgates for institutional and retail investors alike. This marks a pivotal moment in the mainstream adoption of digital assets.</p>
<h2>What Are Crypto ETFs?</h2>
<p>Cryptocurrency ETFs allow investors to gain exposure to digital assets through traditional brokerage accounts, eliminating the need for crypto wallets or exchanges.</p>
<h2>The Impact on Markets</h2>
<p>Since their approval, crypto ETFs have attracted billions in inflows, bringing new liquidity and potentially more stability to the cryptocurrency market.</p>`,
      coverImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
      author: { name: "Solo Investing", avatar: "/logo.png" },
      category: "Crypto",
      tags: ["cryptocurrency", "ETFs", "bitcoin"],
      publishedAt: "2026-03-10T14:00:00Z",
      readTime: 6,
    },
    {
      id: 6,
      slug: "passive-income-strategies",
      title: "7 Passive Income Strategies That Can Replace Your Salary",
      excerpt:
        "Building streams of passive income is the key to financial independence. Here are proven strategies that can generate consistent returns.",
      content: `<p>Financial independence doesn't mean you need millions in the bank. It means having enough passive income streams to cover your living expenses.</p>
<h2>1. Dividend Investing</h2>
<p>Building a portfolio of high-quality dividend stocks can generate reliable quarterly income. Focus on companies with a long history of dividend growth.</p>
<h2>2. Real Estate Investment Trusts (REITs)</h2>
<p>REITs offer exposure to real estate without the hassle of property management, and they're required to distribute at least 90% of taxable income.</p>
<h2>3. Bond Laddering</h2>
<p>A bond ladder provides predictable income while protecting against interest rate risk by staggering maturity dates.</p>`,
      coverImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
      author: { name: "Solo Investing", avatar: "/logo.png" },
      category: "Personal Finance",
      tags: ["passive income", "financial independence", "dividends"],
      publishedAt: "2026-03-08T11:00:00Z",
      readTime: 9,
      featured: true,
    },
    {
      id: 7,
      slug: "market-psychology-behavioral-finance",
      title: "Market Psychology: Why Smart People Make Dumb Investment Decisions",
      excerpt:
        "Behavioral finance reveals the cognitive biases that lead even experienced investors astray. Understanding these biases is your first line of defense.",
      content: `<p>The biggest threat to your investment returns isn't a market crash or a recession — it's your own brain. Behavioral finance has identified numerous cognitive biases that systematically lead investors to make poor decisions.</p>
<h2>Loss Aversion</h2>
<p>We feel the pain of losses roughly twice as intensely as the pleasure of equivalent gains. This often leads to selling winners too early and holding losers too long.</p>
<h2>Herd Mentality</h2>
<p>The urge to follow the crowd is powerful. When everyone is buying, it feels safe to buy — and when everyone is selling, panic becomes contagious.</p>`,
      coverImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
      author: { name: "Solo Investing", avatar: "/logo.png" },
      category: "Investing",
      tags: ["behavioral finance", "psychology", "biases"],
      publishedAt: "2026-03-05T10:00:00Z",
      readTime: 7,
    },
    {
      id: 8,
      slug: "global-supply-chain-investment-opportunities",
      title: "Global Supply Chain Shifts Are Creating New Investment Opportunities",
      excerpt:
        "As companies reshape global supply chains, new winners and losers are emerging. Here's where smart money is flowing.",
      content: `<p>The global supply chain is undergoing its most significant transformation in decades. Geopolitical tensions, pandemic lessons, and technological advances are reshaping how goods move around the world.</p>
<h2>Nearshoring and Reshoring</h2>
<p>Companies are moving production closer to end markets. Mexico, Vietnam, and India are among the biggest beneficiaries of this trend.</p>
<h2>Investment Implications</h2>
<p>Infrastructure companies, logistics firms, and automation providers stand to benefit significantly from supply chain restructuring.</p>`,
      coverImage: "https://images.unsplash.com/photo-1494412574643-ff11b0a5eb95?w=800&q=80",
      author: { name: "Solo Investing", avatar: "/logo.png" },
      category: "Economy",
      tags: ["supply chain", "global trade", "geopolitics"],
      publishedAt: "2026-03-02T08:00:00Z",
      readTime: 6,
    },
  ];
}
