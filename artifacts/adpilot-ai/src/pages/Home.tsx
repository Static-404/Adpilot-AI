import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useUser, useClerk } from "@clerk/react";
import { Sparkles, LayoutDashboard, Bookmark, ChevronRight, Zap, LogOut, User } from "lucide-react";
import { CampaignForm } from "@/components/CampaignForm";
import { ResultsPanel } from "@/components/ResultsPanel";
import { SavedCampaigns } from "@/components/SavedCampaigns";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import { generateCampaignRecommendations } from "@/lib/mockAi";
import type { CampaignInput, CampaignRecommendation } from "@/lib/mockAi";
import { getSavedCampaigns, getSavedCurrency, setSavedCurrency } from "@/lib/storage";
import { detectCurrency, getCurrencyByCode } from "@/lib/currency";
import type { Currency } from "@/lib/currency";

type ActiveTab = "generate" | "saved";

const stats = [
  { label: "Platforms Analysed", value: "12+" },
  { label: "Ad Variables", value: "200+" },
  { label: "Strategy Templates", value: "48" },
  { label: "Avg Time Saved", value: "6 hrs" },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [activeTab, setActiveTab] = useState<ActiveTab>("generate");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<CampaignRecommendation | null>(null);
  const [savedCampaigns, setSavedCampaigns] = useState<CampaignRecommendation[]>([]);
  const [currency, setCurrency] = useState<Currency>(detectCurrency());
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const userId = user?.id ?? null;

  useEffect(() => {
    if (!isLoaded) return;
    setSavedCampaigns(getSavedCampaigns(userId));
    const savedCode = getSavedCurrency(userId);
    if (savedCode) setCurrency(getCurrencyByCode(savedCode));
  }, [isLoaded, userId]);

  async function handleGenerate(data: CampaignInput) {
    setIsLoading(true);
    setResult(null);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < 5 ? prev + 1 : 5));
    }, 350);

    try {
      const recommendation = await generateCampaignRecommendations({ ...data, currency });
      setResult(recommendation);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
    }
  }

  function handleCurrencyChange(c: Currency) {
    setCurrency(c);
    setSavedCurrency(c.code, userId);
  }

  function handleCampaignSelect(campaign: CampaignRecommendation) {
    setResult(campaign);
    setActiveTab("generate");
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  function handleCampaignDelete(id: string) {
    setSavedCampaigns((prev) => prev.filter((c) => c.id !== id));
  }

  function handleTabChange(tab: ActiveTab) {
    setActiveTab(tab);
    if (tab === "saved") {
      setSavedCampaigns(getSavedCampaigns(userId));
    }
  }

  async function handleSignOut() {
    await signOut();
    setLocation("/");
  }

  const displayName = user?.firstName || user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] || "Account";

  return (
    <div className="min-h-screen bg-background bg-grid-pattern">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center glow-orange-sm">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-foreground tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                AdPilot <span className="text-gradient-orange">AI</span>
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                data-testid="tab-generate"
                onClick={() => handleTabChange("generate")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "generate"
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Generate</span>
              </button>
              <button
                data-testid="tab-saved"
                onClick={() => handleTabChange("saved")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "saved"
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Saved</span>
                {savedCampaigns.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                    {savedCampaigns.length}
                  </span>
                )}
              </button>

              {/* User menu */}
              <div className="relative ml-1">
                <button
                  data-testid="user-menu-button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all"
                >
                  {user?.imageUrl ? (
                    <img src={user.imageUrl} alt={displayName} className="w-5 h-5 rounded-full" />
                  ) : (
                    <User className="w-3.5 h-3.5" />
                  )}
                  <span className="hidden sm:inline text-xs font-medium max-w-[100px] truncate">{displayName}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-10 z-50 w-48 rounded-xl border border-border/60 bg-card shadow-xl overflow-hidden">
                    <div className="px-3 py-2.5 border-b border-border/40">
                      <p className="text-xs font-semibold text-foreground truncate">{displayName}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.emailAddresses?.[0]?.emailAddress}</p>
                    </div>
                    <button
                      data-testid="sign-out-button"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Hero */}
        {activeTab === "generate" && !result && !isLoading && (
          <div className="text-center py-6 sm:py-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4 tracking-wide">
              <Sparkles className="w-3 h-3" />
              AI-POWERED MARKETING
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Your marketing strategy,
              <br />
              <span className="text-gradient-orange">ready in seconds</span>
            </h1>
            <p className="text-base text-muted-foreground max-w-xl mx-auto mb-7 leading-relaxed">
              Fill in your business details and we'll put together a complete, actionable marketing plan — audience, platforms, ad copy, and budget — all tailored to your goals.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl bg-card border border-border/50 px-4 py-3">
                  <div className="text-xl font-bold text-primary mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Saved Campaigns Tab */}
        {activeTab === "saved" && (
          <div>
            <div className="mb-5">
              <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Saved Campaigns
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {savedCampaigns.length > 0
                  ? `${savedCampaigns.length} campaign${savedCampaigns.length > 1 ? "s" : ""} saved — click any to view recommendations`
                  : "Save campaigns here to come back to them later"}
              </p>
            </div>
            <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
              <SavedCampaigns
                campaigns={savedCampaigns}
                onSelect={handleCampaignSelect}
                onDelete={handleCampaignDelete}
                userId={userId}
              />
            </div>
          </div>
        )}

        {/* Generate Tab */}
        {activeTab === "generate" && (
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            {/* Form Panel */}
            <div className="xl:col-span-2">
              <div className="sticky top-20">
                <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
                  <div className="px-5 py-4 border-b border-border/40">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <h2 className="text-sm font-semibold text-foreground">Campaign Brief</h2>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Tell us about your business to get started
                    </p>
                  </div>
                  <div className="p-5">
                    <CampaignForm
                      onSubmit={handleGenerate}
                      isLoading={isLoading}
                      initialCurrency={currency}
                      onCurrencyChange={handleCurrencyChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="xl:col-span-3" ref={resultsRef}>
              {isLoading ? (
                <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
                  <LoadingAnimation currentStep={loadingStep} />
                </div>
              ) : result ? (
                <ResultsPanel campaign={result} userId={userId} />
              ) : (
                <EmptyState />
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border/30 mt-16 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold text-foreground/70">AdPilot AI</span>
          </div>
          <p className="text-xs text-muted-foreground">
            AI-powered marketing for small businesses and entrepreneurs
          </p>
        </div>
      </footer>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mb-5">
          <ChevronRight className="w-7 h-7 text-primary/50" />
        </div>
        <h3 className="text-base font-semibold text-foreground/70 mb-2">Ready when you are</h3>
        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
          Fill in your campaign brief and click "Generate Recommendations" to get your personalised marketing plan
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {["Target Audience", "Platform Mix", "Ad Copy", "Budget Breakdown", "Action Plan"].map((item) => (
            <span
              key={item}
              className="text-xs px-2.5 py-1 rounded-full bg-muted/40 border border-border/40 text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
