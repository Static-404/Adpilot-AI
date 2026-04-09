export type MarketingGoal = "awareness" | "leads" | "sales" | "growth";

export interface CampaignInput {
  businessName: string;
  product: string;
  description: string;
  location: string;
  budget: string;
  goal: MarketingGoal;
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

function parseBudget(budget: string): number {
  const num = parseFloat(budget.replace(/[^0-9.]/g, ""));
  return isNaN(num) ? 500 : num;
}

const platformData: Record<string, { icon: string; cpc: string }> = {
  "Google Ads": { icon: "G", cpc: "$1.20–$3.50/click" },
  "Facebook & Instagram": { icon: "F", cpc: "$0.50–$2.00/click" },
  "TikTok Ads": { icon: "T", cpc: "$0.30–$1.50/click" },
  "LinkedIn Ads": { icon: "Li", cpc: "$3.00–$8.00/click" },
  "YouTube Ads": { icon: "Y", cpc: "$0.10–$0.30/view" },
  "Pinterest Ads": { icon: "P", cpc: "$0.10–$1.50/click" },
  "Twitter/X Ads": { icon: "X", cpc: "$0.50–$2.00/click" },
  "Email Marketing": { icon: "E", cpc: "$0.05–$0.20/click" },
};

export async function generateCampaignRecommendations(
  input: CampaignInput
): Promise<CampaignRecommendation> {
  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 2200));

  const budget = parseBudget(input.budget);
  const { goal, product, businessName, location, description } = input;

  // Audience recommendations based on goal
  const audienceMap: Record<MarketingGoal, AudienceRecommendation> = {
    awareness: {
      demographic: `Local residents and visitors in ${location}`,
      interests: ["Local businesses", product, "Community events", "Lifestyle"],
      behaviors: ["Active social media users", "Online shoppers", "Mobile users"],
      ageRange: "18–54",
      income: "All income levels",
    },
    leads: {
      demographic: `Decision-makers and buyers interested in ${product} near ${location}`,
      interests: [product, "Business solutions", "Professional services", "Productivity"],
      behaviors: ["Research-oriented", "Form fillers", "Comparison shoppers", "Email subscribers"],
      ageRange: "25–55",
      income: "$40K–$150K+",
    },
    sales: {
      demographic: `Ready-to-buy customers looking for ${product} in ${location}`,
      interests: [product, "Deals & discounts", "Shopping", "Reviews & recommendations"],
      behaviors: ["Frequent online buyers", "Price-conscious", "Mobile shoppers", "Coupon users"],
      ageRange: "22–50",
      income: "$35K–$100K",
    },
    growth: {
      demographic: `Growth-minded individuals and businesses interested in ${product}`,
      interests: [product, "Business growth", "Innovation", "Success stories", "Entrepreneurship"],
      behaviors: ["Early adopters", "Brand loyalists", "Referral sources", "Repeat purchasers"],
      ageRange: "25–45",
      income: "$50K–$200K+",
    },
  };

  // Platform recommendations based on goal and budget
  const platformSets: Record<MarketingGoal, string[]> = {
    awareness: ["Facebook & Instagram", "TikTok Ads", "Google Ads"],
    leads: ["Google Ads", "Facebook & Instagram", "LinkedIn Ads"],
    sales: ["Google Ads", "Facebook & Instagram", "Email Marketing"],
    growth: ["Google Ads", "Facebook & Instagram", "YouTube Ads"],
  };

  const selectedPlatforms = platformSets[goal];
  const platformShares: number[] = [45, 35, 20];
  const platformReasons: Record<string, Record<MarketingGoal, string>> = {
    "Google Ads": {
      awareness: `Capture search intent from people discovering ${product} in ${location}`,
      leads: `High-intent search traffic converts well for ${product} lead generation`,
      sales: `Search ads reach buyers actively looking to purchase ${product}`,
      growth: `Scale reach across Search and Display to drive consistent growth`,
    },
    "Facebook & Instagram": {
      awareness: `Visual storytelling across Meta's 3B+ users builds powerful brand recognition`,
      leads: `Lead gen forms and retargeting make collecting qualified leads seamless`,
      sales: `Shopping ads and dynamic retargeting drive proven sales conversions`,
      growth: `Lookalike audiences help you find new high-value customers at scale`,
    },
    "TikTok Ads": {
      awareness: `Short-form video ads go viral organically, amplifying ${businessName}'s reach`,
      leads: `TikTok's growing user base includes engaged demographics ready to learn more`,
      sales: `TikTok Shop and in-feed ads create impulse purchase opportunities`,
      growth: `Fast-growing platform with lower CPMs — ideal for growth campaigns`,
    },
    "LinkedIn Ads": {
      awareness: `Professional audience on LinkedIn elevates ${businessName}'s brand perception`,
      leads: `LinkedIn's professional targeting delivers the highest B2B lead quality`,
      sales: `Sponsored content reaches decision-makers with purchasing authority`,
      growth: `Build thought leadership and professional network to fuel long-term growth`,
    },
    "YouTube Ads": {
      awareness: `Video pre-roll ads tell your brand story to 2B+ monthly viewers`,
      leads: `Tutorial and demo videos build trust and generate high-quality leads`,
      sales: `Product showcase videos with direct CTAs drive purchase decisions`,
      growth: `Long-form content builds loyal audience and brand equity over time`,
    },
    "Email Marketing": {
      awareness: `Newsletter campaigns keep your brand top-of-mind for existing contacts`,
      leads: `Lead nurture sequences convert prospects into qualified opportunities`,
      sales: `Promotional emails and abandoned cart sequences drive direct revenue`,
      growth: `Loyalty campaigns and referral programs turn customers into advocates`,
    },
  };

  const platforms: PlatformRecommendation[] = selectedPlatforms.map((name, i) => ({
    name,
    icon: platformData[name]?.icon || name[0],
    reason:
      platformReasons[name]?.[goal] ||
      `${name} is highly effective for your ${goal} goal`,
    budgetShare: platformShares[i],
    estimatedReach: `${Math.round((budget * platformShares[i]) / 100 / 0.02).toLocaleString()}–${Math.round((budget * platformShares[i]) / 100 / 0.01).toLocaleString()} people/mo`,
    cpc: platformData[name]?.cpc || "$1.00–$2.50/click",
  }));

  // Ad copy suggestions
  const adCopies: AdCopy[] = [
    {
      headline: `${businessName}: ${product} That Actually Works`,
      body: `${description} Ready to see real results? Join hundreds of satisfied customers in ${location} and experience the difference.`,
      cta: goal === "leads" ? "Get Free Consultation" : goal === "sales" ? "Shop Now" : "Learn More",
      tone: "Direct & Confident",
    },
    {
      headline: `Finally — ${product} Done Right in ${location}`,
      body: `Most people settle for less. You don't have to. ${businessName} delivers ${description.toLowerCase()} without the usual headaches. Your success starts here.`,
      cta: goal === "leads" ? "Claim Your Spot" : goal === "sales" ? "Get Yours Today" : "See How",
      tone: "Problem-Solution",
    },
    {
      headline: `${location}'s #1 Choice for ${product}`,
      body: `Don't take our word for it — ${businessName} has helped local businesses and individuals just like you. ${description} See why we're the trusted name for ${product}.`,
      cta: goal === "leads" ? "Book a Call" : goal === "sales" ? "Order Now" : "Discover More",
      tone: "Social Proof",
    },
  ];

  // Budget guidance
  const monthlyBudget = budget;
  const budgetGuidance: BudgetGuidance = {
    monthly: `$${monthlyBudget.toLocaleString()}`,
    breakdown: platforms.map((p) => ({
      platform: p.name,
      amount: `$${Math.round((monthlyBudget * p.budgetShare) / 100).toLocaleString()}`,
      percentage: p.budgetShare,
    })),
    tips: [
      `Start with ${platforms[0].name} for maximum ${goal === "awareness" ? "reach" : goal === "leads" ? "lead volume" : "conversions"}`,
      "Run A/B tests on your ad copy — test 2–3 variations simultaneously",
      "Retarget website visitors with a separate 15–20% budget allocation",
      budget < 1000
        ? "On a tighter budget, focus on one platform first before diversifying"
        : "With this budget, you can effectively run multi-channel campaigns",
      "Review and optimize every 2 weeks — pause underperforming ads immediately",
    ],
    roiEstimate:
      goal === "sales"
        ? `$${Math.round(monthlyBudget * 2.5).toLocaleString()}–$${Math.round(monthlyBudget * 5).toLocaleString()} in estimated revenue`
        : goal === "leads"
        ? `${Math.round(monthlyBudget / 8)}–${Math.round(monthlyBudget / 4)} qualified leads per month`
        : goal === "awareness"
        ? `${Math.round(monthlyBudget * 50).toLocaleString()}–${Math.round(monthlyBudget * 150).toLocaleString()} impressions per month`
        : `${Math.round(monthlyBudget * 0.15)}–${Math.round(monthlyBudget * 0.3)}% estimated growth rate`,
  };

  // Strategy summary
  const strategyMap: Record<MarketingGoal, string> = {
    awareness: `For ${businessName}, we recommend a multi-platform brand awareness strategy centered on ${location}. Your campaign will combine visual storytelling on ${platforms[0].name} with targeted display on ${platforms[1].name} to maximize local visibility. The creative focus should be on showcasing your unique value proposition and building recognition before conversion. Expect to see brand recall improvements within 4–6 weeks.`,
    leads: `${businessName}'s lead generation strategy will leverage high-intent search traffic via ${platforms[0].name} combined with social retargeting on ${platforms[1].name}. This dual-channel approach captures buyers at different stages of the decision journey. We recommend gating valuable content (guides, consultations, demos) to maximize lead quality. Set up email automation to nurture leads within 24 hours of capture.`,
    sales: `To drive sales for ${product}, ${businessName} should lead with ${platforms[0].name} search ads targeting purchase-intent keywords, supported by social proof campaigns on ${platforms[1].name}. Implement conversion tracking immediately and optimize toward Cost Per Acquisition (CPA). A strong landing page with a single CTA will be critical — aim for 3–5% conversion rate as a benchmark.`,
    growth: `${businessName}'s growth strategy combines paid acquisition with retention mechanics. ${platforms[0].name} will fuel top-of-funnel discovery while ${platforms[1].name} handles mid-funnel nurturing. Invest in content that compounds over time (tutorials, case studies, testimonials). Introduce a referral program in month 2 to amplify organic growth alongside your paid campaigns.`,
  };

  // Action plan
  const actionPlanMap: Record<MarketingGoal, ActionStep[]> = {
    awareness: [
      {
        week: 1,
        title: "Foundation & Setup",
        tasks: [
          `Create ${businessName} business accounts on ${platforms.map((p) => p.name).join(", ")}`,
          "Install tracking pixels on your website (Facebook Pixel, Google Tag Manager)",
          "Define 3 core brand messages and visual style guide",
          "Design 5–8 ad creatives (images, videos, copy variants)",
        ],
      },
      {
        week: 2,
        title: "Campaign Launch",
        tasks: [
          `Launch ${platforms[0].name} awareness campaign targeting ${location}`,
          "Set up Google Display Network campaign with remarketing audiences",
          "Create short-form video content for social platforms",
          "Schedule daily monitoring for first 2 weeks",
        ],
      },
      {
        week: 3,
        title: "Optimization Round 1",
        tasks: [
          "Analyze impression share, CPM, and frequency data",
          "Pause underperforming ad sets (below average CTR)",
          "Increase budget on top-performing placements by 20%",
          "Launch second wave of creative variations",
        ],
      },
      {
        week: 4,
        title: "Scale & Report",
        tasks: [
          "Generate month-1 performance report",
          "Expand targeting to lookalike audiences",
          "Test new ad formats (Stories, Reels, Display)",
          "Plan month-2 strategy based on learnings",
        ],
      },
    ],
    leads: [
      {
        week: 1,
        title: "Lead Capture Setup",
        tasks: [
          "Build a dedicated landing page with single CTA and lead form",
          "Set up CRM or email system (HubSpot, Mailchimp, or similar)",
          "Create lead magnet: free guide, consultation, or demo offer",
          "Install conversion tracking on all form submissions",
        ],
      },
      {
        week: 2,
        title: "Campaign Launch",
        tasks: [
          `Launch Google Search campaign targeting high-intent keywords for ${product}`,
          "Set up Facebook Lead Generation ads with instant forms",
          "Create email welcome sequence (3–5 automated emails)",
          "Define lead scoring criteria and qualification process",
        ],
      },
      {
        week: 3,
        title: "Nurture & Qualify",
        tasks: [
          "Review lead quality — survey first 10 leads for feedback",
          "A/B test landing page headline and form length",
          "Launch retargeting campaign for website visitors",
          "Add live chat or chatbot to capture late-night visitors",
        ],
      },
      {
        week: 4,
        title: "Scale Winning Channels",
        tasks: [
          "Double budget on lowest Cost Per Lead channel",
          "Launch referral program: incentivize existing contacts to refer",
          "Create case study content from early customers",
          "Set monthly lead volume targets for month 2",
        ],
      },
    ],
    sales: [
      {
        week: 1,
        title: "Conversion Infrastructure",
        tasks: [
          "Optimize product/service page for conversions (speed, CTA, social proof)",
          "Set up Google Shopping or Dynamic Product Ads if applicable",
          "Install purchase tracking across all channels",
          "Create urgency mechanisms (limited time offers, inventory counts)",
        ],
      },
      {
        week: 2,
        title: "Sales Campaigns Live",
        tasks: [
          "Launch Google Search with purchase-intent keywords",
          "Start Facebook/Instagram shopping or conversion campaigns",
          "Create 3 promotional offers to test (discount, bundle, bonus)",
          "Set up abandoned cart email sequence",
        ],
      },
      {
        week: 3,
        title: "Revenue Optimization",
        tasks: [
          "Analyze conversion rate by traffic source and device",
          "Identify your best-converting ad creative and scale it",
          "Launch upsell/cross-sell campaigns to recent buyers",
          "Test checkout process for friction points",
        ],
      },
      {
        week: 4,
        title: "Scale & Retention",
        tasks: [
          "Scale winning campaigns — target 3x ROAS minimum before scaling",
          "Launch loyalty email campaign for repeat purchases",
          "Set up monthly sales reporting dashboard",
          "Plan seasonal promotions and upcoming campaign calendar",
        ],
      },
    ],
    growth: [
      {
        week: 1,
        title: "Growth Foundation",
        tasks: [
          "Audit current website and social presence for conversion gaps",
          "Set up analytics: Google Analytics 4, conversion events, funnel tracking",
          "Identify top 3 growth levers specific to your business model",
          "Create content calendar for 30 days of consistent posting",
        ],
      },
      {
        week: 2,
        title: "Acquisition Campaigns",
        tasks: [
          `Launch ${platforms[0].name} campaign targeting lookalike audiences`,
          "Start content marketing: blog posts, videos, or social content",
          "Launch early-adopter offer or referral incentive program",
          "Set up weekly growth metric dashboard",
        ],
      },
      {
        week: 3,
        title: "Retention & Viral Loops",
        tasks: [
          "Launch customer success sequence to activate new customers",
          "Implement referral program mechanics (share link, rewards)",
          "Create testimonial and case study content pipeline",
          "A/B test onboarding flow to improve activation rate",
        ],
      },
      {
        week: 4,
        title: "Compounding Growth",
        tasks: [
          "Review growth metrics vs targets — adjust strategy as needed",
          "Scale paid acquisition on best-performing channels",
          "Launch partnership or co-marketing initiative",
          "Define month-2 growth targets with stretch goals",
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
