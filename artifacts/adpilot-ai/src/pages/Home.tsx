import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Sparkles, LayoutDashboard, Bookmark, ChevronRight, Zap, ArrowLeft } from "lucide-react";
import { CampaignForm } from "@/components/CampaignForm";
import { ResultsPanel } from "@/components/ResultsPanel";
import { SavedCampaigns } from "@/components/SavedCampaigns";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import { generateCampaignRecommendations } from "@/lib/mockAi";
import type { CampaignInput, CampaignRecommendation } from "@/lib/mockAi";
import { getSavedCampaigns } from "@/lib/storage";

type ActiveTab = "generate" | "saved";

const stats = [
  { label: "Platforms Analyzed", value: "12+" },
  { label: "Ad Variables", value: "200+" },
  { label: "Strategy Templates", value: "48" },
  { label: "Avg Time Saved", value: "6hrs" },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<ActiveTab>("generate");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<CampaignRecommendation | null>(null);
  const [savedCampaigns, setSavedCampaigns] = useState<CampaignRecommendation[]>([]);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSavedCampaigns(getSavedCampaigns());
  }, []);

  async function handleGenerate(data: CampaignInput) {
    setIsLoading(true);
    setResult(null);
    setLoadingStep(0);

    // Simulate step progression
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < 5 ? prev + 1 : 5));
    }, 350);

    try {
      const recommendation = await generateCampaignRecommendations(data);
      setResult(recommendation);
      // Scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
    }
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

  // Refresh saved campaigns when tab changes to saved
  function handleTabChange(tab: ActiveTab) {
    setActiveTab(tab);
    if (tab === "saved") {
      setSavedCampaigns(getSavedCampaigns());
    }
  }

  return (
    <div className="min-h-screen bg-background bg-grid-pattern">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLocation("/")}
                data-testid="back-to-home"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Home</span>
              </button>
              <div className="w-px h-4 bg-border/50" />
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center glow-orange-sm">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-foreground tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  AdPilot <span className="text-gradient-orange">AI</span>
                </span>
              </div>
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
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Hero */}
        {activeTab === "generate" && !result && !isLoading && (
          <div className="text-center py-8 sm:py-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-5 tracking-wide">
              <Sparkles className="w-3 h-3" />
              AI-POWERED MARKETING INTELLIGENCE
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Your marketing strategy,
              <br />
              <span className="text-gradient-orange">built in seconds</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Tell us about your business and goals. We'll deliver a complete, actionable marketing 
              strategy tailored to your budget and audience.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-card border border-border/50 px-4 py-3"
                >
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
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Saved Campaigns
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {savedCampaigns.length > 0
                  ? `${savedCampaigns.length} campaign${savedCampaigns.length > 1 ? "s" : ""} saved — click to view recommendations`
                  : "Save campaigns to access them later"}
              </p>
            </div>
            <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
              <SavedCampaigns
                campaigns={savedCampaigns}
                onSelect={handleCampaignSelect}
                onDelete={handleCampaignDelete}
              />
            </div>
          </div>
        )}

        {/* Generate Tab */}
        {activeTab === "generate" && (
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            {/* Form Panel */}
            <div className="xl:col-span-2">
              <div className="sticky top-22">
                <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
                  <div className="px-5 py-4 border-b border-border/40">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <h2 className="text-sm font-semibold text-foreground">Campaign Brief</h2>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Fill in your business details to get started
                    </p>
                  </div>
                  <div className="p-5">
                    <CampaignForm onSubmit={handleGenerate} isLoading={isLoading} />
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
                <ResultsPanel campaign={result} />
              ) : (
                <EmptyState />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 mt-16 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold text-foreground/70">AdPilot AI</span>
          </div>
          <p className="text-xs text-muted-foreground">
            AI-powered marketing for small businesses &amp; entrepreneurs
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
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
            <ChevronRight className="w-7 h-7 text-primary/50" />
          </div>
        </div>
        <h3 className="text-base font-semibold text-foreground/70 mb-2">Ready to launch</h3>
        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
          Fill out your campaign brief and click "Generate Recommendations" to see your personalized marketing strategy
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {["Target Audience", "Platform Mix", "Ad Copy", "Budget Plan", "Action Steps"].map((item) => (
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
