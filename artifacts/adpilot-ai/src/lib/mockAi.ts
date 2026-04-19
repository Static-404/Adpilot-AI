import type { Currency } from "./currency";
import { parseBudgetAmount, formatBudget } from "./currency";

export type MarketingGoal = "awareness" | "leads" | "sales" | "growth";

export interface CampaignInput {
  businessName: string;
  product: string;
  description: string;
  location: string;
  budget: string;
  goal: MarketingGoal;
  currency: Currency;
}

export interface AudienceRecommendation {
  demographic: string;
  interests: string[];
  behaviors: string[];
  ageRange: string;
  income: string;
}

export interface PlatformRecommendation {
  name: string;
  icon: string;
  reason: string;
  budgetShare: number;
  estimatedReach: string;
  cpc: string;
}

export interface AdCopy {
  headline: string;
  body: string;
  cta: string;
  tone: string;
}

export interface BudgetGuidance {
  monthly: string;
  breakdown: { platform: string; amount: string; percentage: number }[];
  tips: string[];
  roiEstimate: string;
}

export interface ActionStep {
  week: number;
  title: string;
  tasks: string[];
}

export interface CampaignRecommendation {
  id: string;
  createdAt: string;
  input: CampaignInput;
  audience: AudienceRecommendation;
  platforms: PlatformRecommendation[];
  adCopies: AdCopy[];
  budgetGuidance: BudgetGuidance;
  strategySummary: string;
  actionPlan: ActionStep[];
}

const platformData: Record<string, { icon: string }> = {
  "Google Ads": { icon: "G" },
  "Facebook & Instagram": { icon: "F" },
  "TikTok Ads": { icon: "T" },
  "LinkedIn Ads": { icon: "Li" },
  "YouTube Ads": { icon: "Y" },
  "Pinterest Ads": { icon: "P" },
  "Twitter/X Ads": { icon: "X" },
  "Email Marketing": { icon: "E" },
};

export async function generateCampaignRecommendations(
  input: CampaignInput
): Promise<CampaignRecommendation> {
  await new Promise((resolve) => setTimeout(resolve, 2200));

  const { goal, product, businessName, location, currency } = input;
  const budget = parseBudgetAmount(input.budget);
  const fmt = (amount: number) => formatBudget(amount, currency);
  const sym = currency.symbol;

  const audienceMap: Record<MarketingGoal, AudienceRecommendation> = {
    awareness: {
      demographic: `Local residents and visitors in ${location}`,
      interests: ["Local businesses", product, "Community events", "Lifestyle"],
      behaviors: ["Active on social media", "Online shoppers", "Mobile-first users"],
      ageRange: "18–54",
      income: "All income levels",
    },
    leads: {
      demographic: `Decision-makers interested in ${product} near ${location}`,
      interests: [product, "Business solutions", "Professional services", "Productivity"],
      behaviors: ["Research-driven buyers", "Form completers", "Comparison shoppers"],
      ageRange: "25–55",
      income: `${sym}40K–${sym}150K+`,
    },
    sales: {
      demographic: `Ready-to-buy customers looking for ${product} in ${location}`,
      interests: [product, "Deals & offers", "Online shopping", "Product reviews"],
      behaviors: ["Frequent online buyers", "Price-aware shoppers", "Mobile shoppers"],
      ageRange: "22–50",
      income: `${sym}35K–${sym}100K`,
    },
    growth: {
      demographic: `Growth-focused people and businesses interested in ${product}`,
      interests: [product, "Business growth", "Innovation", "Success stories"],
      behaviors: ["Early adopters", "Brand advocates", "Repeat buyers"],
      ageRange: "25–45",
      income: `${sym}50K–${sym}200K+`,
    },
  };

  const platformSets: Record<MarketingGoal, string[]> = {
    awareness: ["Facebook & Instagram", "TikTok Ads", "Google Ads"],
    leads: ["Google Ads", "Facebook & Instagram", "LinkedIn Ads"],
    sales: ["Google Ads", "Facebook & Instagram", "Email Marketing"],
    growth: ["Google Ads", "Facebook & Instagram", "YouTube Ads"],
  };

  const selectedPlatforms = platformSets[goal];
  const platformShares = [45, 35, 20];

  const platformReasons: Record<string, Record<MarketingGoal, string>> = {
    "Google Ads": {
      awareness: `Capture search demand from people discovering ${product} in ${location}`,
      leads: `High-intent search traffic converts well for ${product} lead generation`,
      sales: `Search ads reach buyers actively looking to purchase ${product}`,
      growth: `Scale reach across Search and Display for consistent growth`,
    },
    "Facebook & Instagram": {
      awareness: `Visual storytelling across Meta's 3B+ users builds strong brand recognition`,
      leads: `Lead gen forms and retargeting make collecting qualified leads easy`,
      sales: `Shopping ads and dynamic retargeting drive real purchase conversions`,
      growth: `Lookalike audiences help find new high-value customers at scale`,
    },
    "TikTok Ads": {
      awareness: `Short-form video can go viral, massively amplifying ${businessName}'s reach`,
      leads: `TikTok's engaged user base is increasingly conversion-ready`,
      sales: `In-feed ads create powerful impulse purchase moments`,
      growth: `Lower CPMs than mature platforms — ideal for early-stage growth`,
    },
    "LinkedIn Ads": {
      awareness: `Professional audience on LinkedIn raises ${businessName}'s credibility`,
      leads: `LinkedIn's targeting delivers the highest-quality B2B leads`,
      sales: `Sponsored content reaches decision-makers with buying authority`,
      growth: `Build thought leadership that generates compounding organic reach`,
    },
    "YouTube Ads": {
      awareness: `Video pre-roll ads tell your brand story to 2B+ monthly viewers`,
      leads: `Demo and explainer videos build trust and generate qualified leads`,
      sales: `Product videos with direct CTAs move buyers through the funnel`,
      growth: `Long-form content builds loyal audiences and lasting brand equity`,
    },
    "Email Marketing": {
      awareness: `Newsletters keep ${businessName} top of mind between purchase cycles`,
      leads: `Nurture sequences turn cold leads into warm, ready-to-buy prospects`,
      sales: `Promotional emails and cart recovery flows drive direct revenue`,
      growth: `Loyalty campaigns turn customers into repeat buyers and referrers`,
    },
  };

  const platforms: PlatformRecommendation[] = selectedPlatforms.map((name, i) => ({
    name,
    icon: platformData[name]?.icon || name[0],
    reason: platformReasons[name]?.[goal] || `${name} is well-suited for your ${goal} goal`,
    budgetShare: platformShares[i],
    estimatedReach: `${Math.round((budget * platformShares[i]) / 100 / 0.02).toLocaleString()}–${Math.round((budget * platformShares[i]) / 100 / 0.01).toLocaleString()} people/mo`,
    cpc: `${sym}1–${sym}4/click`,
  }));

  const adCopies: AdCopy[] = [
    {
      headline: `${businessName}: ${product} That Delivers`,
      body: `${input.description} Join customers in ${location} who've already made the switch. The results speak for themselves.`,
      cta: goal === "leads" ? "Get a Free Consultation" : goal === "sales" ? "Shop Now" : "Learn More",
      tone: "Direct & Confident",
    },
    {
      headline: `Tired of ${product} That Doesn't Work?`,
      body: `${businessName} does things differently. ${input.description.toLowerCase()} No fluff, no confusion — just results that matter to your business.`,
      cta: goal === "leads" ? "Claim Your Spot" : goal === "sales" ? "Get Yours Today" : "See How It Works",
      tone: "Problem-Solution",
    },
    {
      headline: `${location}'s Go-To for ${product}`,
      body: `${businessName} has helped people just like you. ${input.description} See why customers keep coming back.`,
      cta: goal === "leads" ? "Book a Call" : goal === "sales" ? "Order Now" : "Discover More",
      tone: "Social Proof",
    },
  ];

  const budgetGuidance: BudgetGuidance = {
    monthly: fmt(budget),
    breakdown: platforms.map((p) => ({
      platform: p.name,
      amount: fmt(Math.round((budget * p.budgetShare) / 100)),
      percentage: p.budgetShare,
    })),
    tips: [
      `Start with ${platforms[0].name} — it's your best bet for ${goal === "awareness" ? "reach" : goal === "leads" ? "lead volume" : "conversions"}`,
      "Always run 2–3 ad variations at once so you know what's working",
      "Set aside 15–20% of your budget for retargeting past visitors",
      budget < 1000
        ? "With a smaller budget, go deep on one platform before branching out"
        : "Your budget is solid — a multi-channel approach will work well",
      "Check performance every two weeks. Cut what's not working early",
    ],
    roiEstimate:
      goal === "sales"
        ? `${fmt(Math.round(budget * 2.5))}–${fmt(Math.round(budget * 5))} estimated revenue`
        : goal === "leads"
        ? `${Math.round(budget / 8)}–${Math.round(budget / 4)} qualified leads per month`
        : goal === "awareness"
        ? `${Math.round(budget * 50).toLocaleString()}–${Math.round(budget * 150).toLocaleString()} impressions per month`
        : `${Math.round(budget * 0.15)}–${Math.round(budget * 0.3)}% estimated growth rate`,
  };

  const strategyMap: Record<MarketingGoal, string> = {
    awareness: `For ${businessName}, the focus is on getting your name in front of the right people in ${location}. A mix of visual content on ${platforms[0].name} and broader display on ${platforms[1].name} will build real recognition over time. Lead with what makes you different — not just what you sell. Expect meaningful brand recall improvements within 4–6 weeks of consistent activity.`,
    leads: `The strategy here is catching buyers at the right moment. ${platforms[0].name} captures people actively searching, while ${platforms[1].name} retargets those who've shown interest. Offer something genuinely valuable — a free consultation, a guide, a quick demo — in exchange for their contact details. Set up email follow-up within 24 hours of every lead captured.`,
    sales: `To drive purchases for ${product}, lead with ${platforms[0].name} search ads focused on high-intent keywords, backed by social proof campaigns on ${platforms[1].name}. Set up conversion tracking before anything else — you need clean data to optimize. Aim for a 3–5% conversion rate as your early benchmark and iterate from there.`,
    growth: `${businessName}'s growth plan combines paid acquisition with retention mechanics. ${platforms[0].name} brings in new customers at the top of the funnel, while ${platforms[1].name} keeps them engaged through the middle. Invest in content that stays relevant over time — tutorials, case studies, real customer stories. Add a referral program in month two to layer in organic growth on top of your paid activity.`,
  };

  const actionPlanMap: Record<MarketingGoal, ActionStep[]> = {
    awareness: [
      {
        week: 1,
        title: "Set Up Your Foundation",
        tasks: [
          `Create or claim ${businessName}'s business accounts on ${platforms.map((p) => p.name).join(", ")}`,
          "Install tracking: Facebook Pixel and Google Tag Manager",
          "Define 3 core brand messages and a simple visual style guide",
          "Design 5–8 ad creatives — mix images, short videos, and copy variations",
        ],
      },
      {
        week: 2,
        title: "Launch Your Campaigns",
        tasks: [
          `Go live with a ${platforms[0].name} awareness campaign targeting ${location}`,
          "Launch a Google Display Network campaign with remarketing audiences",
          "Publish short-form video content across your social platforms",
          "Check campaign performance daily for the first 2 weeks",
        ],
      },
      {
        week: 3,
        title: "Optimise What's Working",
        tasks: [
          "Review impression share, CPM, and click-through rate data",
          "Pause any ad sets performing below average",
          "Increase budget by 20% on your top-performing placements",
          "Launch a second set of creative variations",
        ],
      },
      {
        week: 4,
        title: "Scale and Report",
        tasks: [
          "Write your month-1 performance summary",
          "Expand targeting to lookalike audiences based on best performers",
          "Test new ad formats — Stories, Reels, Display",
          "Set your month-2 strategy using what you've learned",
        ],
      },
    ],
    leads: [
      {
        week: 1,
        title: "Build Your Lead Capture System",
        tasks: [
          "Create a focused landing page with one clear CTA and a short form",
          "Set up a CRM or email system (HubSpot, Mailchimp, or similar)",
          "Create a lead magnet: a guide, free consultation, or a demo offer",
          "Install conversion tracking on every form submission",
        ],
      },
      {
        week: 2,
        title: "Launch and Start Collecting",
        tasks: [
          `Run Google Search ads targeting high-intent keywords for ${product}`,
          "Set up Facebook Lead Ads with instant forms",
          "Write a 3–5 email welcome sequence for new leads",
          "Define what a qualified lead looks like for your business",
        ],
      },
      {
        week: 3,
        title: "Nurture and Filter",
        tasks: [
          "Survey your first 10 leads — ask them what made them sign up",
          "A/B test your landing page headline and form length",
          "Launch a retargeting campaign for website visitors who didn't convert",
          "Add live chat or a chatbot to capture late-night visitors",
        ],
      },
      {
        week: 4,
        title: "Double Down on Winners",
        tasks: [
          "Double budget on your lowest cost-per-lead channel",
          "Launch a referral incentive for existing contacts",
          "Turn your best early results into a short case study",
          "Set monthly lead targets for month two",
        ],
      },
    ],
    sales: [
      {
        week: 1,
        title: "Get Your Conversion Setup Right",
        tasks: [
          "Optimise your product or service page: speed, clear CTA, social proof",
          "Set up purchase tracking on every channel you plan to run",
          "Create urgency mechanisms — limited-time offers or stock countdowns",
          "Write three promotional angles to test against each other",
        ],
      },
      {
        week: 2,
        title: "Turn Ads On",
        tasks: [
          "Launch Google Search with purchase-intent keywords",
          "Start Facebook and Instagram shopping or conversion campaigns",
          "Create an abandoned cart email sequence",
          "Set a daily budget cap and check spend every morning",
        ],
      },
      {
        week: 3,
        title: "Cut and Scale",
        tasks: [
          "Break down conversion rate by traffic source and device type",
          "Identify your best-converting creative and put more budget behind it",
          "Launch upsell or cross-sell campaigns to recent buyers",
          "Audit your checkout flow for any unnecessary friction",
        ],
      },
      {
        week: 4,
        title: "Build for Retention",
        tasks: [
          "Scale campaigns hitting 3x ROAS or better",
          "Send a loyalty email to recent buyers — thank them, offer something",
          "Set up a monthly sales reporting dashboard",
          "Plan your next promotional push or seasonal campaign",
        ],
      },
    ],
    growth: [
      {
        week: 1,
        title: "Audit and Align",
        tasks: [
          "Review your website and social profiles for obvious conversion gaps",
          "Set up Google Analytics 4 with proper conversion events",
          "Identify your top 3 growth levers specific to your business model",
          "Plan 30 days of content to maintain consistent visibility",
        ],
      },
      {
        week: 2,
        title: "Open the Acquisition Tap",
        tasks: [
          `Launch ${platforms[0].name} targeting lookalike audiences of your best customers`,
          "Start creating content: posts, short videos, or useful guides",
          "Launch an early-adopter offer or a simple referral incentive",
          "Build a weekly dashboard tracking your key growth metrics",
        ],
      },
      {
        week: 3,
        title: "Create Loops That Compound",
        tasks: [
          "Set up a customer success sequence to activate new signups or buyers",
          "Build your referral program mechanics — links, rewards, tracking",
          "Collect testimonials and plan a short case study pipeline",
          "Test your onboarding or first-purchase experience for friction",
        ],
      },
      {
        week: 4,
        title: "Accelerate",
        tasks: [
          "Compare growth metrics to targets — adjust spend allocation as needed",
          "Scale paid acquisition on your best-performing channel",
          "Reach out to 2–3 potential co-marketing or partnership contacts",
          "Set ambitious but realistic month-2 growth targets",
        ],
      },
    ],
  };

  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    input,
    audience: audienceMap[goal],
    platforms,
    adCopies,
    budgetGuidance,
    strategySummary: strategyMap[goal],
    actionPlan: actionPlanMap[goal],
  };
}
