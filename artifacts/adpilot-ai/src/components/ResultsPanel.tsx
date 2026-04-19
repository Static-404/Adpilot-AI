import { useState } from "react";
import {
  Users,
  BarChart2,
  MessageSquare,
  DollarSign,
  Map,
  Zap,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  TrendingUp,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResultCard } from "@/components/ResultCard";
import type { CampaignRecommendation } from "@/lib/mockAi";
import { saveCampaign, isCampaignSaved, deleteCampaign } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";

interface ResultsPanelProps {
  campaign: CampaignRecommendation;
  userId?: string | null;
}

export function ResultsPanel({ campaign, userId }: ResultsPanelProps) {
  const [saved, setSaved] = useState(isCampaignSaved(campaign.id, userId));
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const { toast } = useToast();

  function handleSave() {
    if (saved) {
      deleteCampaign(campaign.id, userId);
      setSaved(false);
      toast({ title: "Campaign removed", description: "Removed from saved campaigns" });
    } else {
      saveCampaign(campaign, userId);
      setSaved(true);
      toast({ title: "Campaign saved", description: "Added to your saved campaigns" });
    }
  }

  const allResultsText = `
ADPILOT AI — CAMPAIGN RECOMMENDATIONS
Campaign: ${campaign.input.businessName} — ${campaign.input.product}
Goal: ${campaign.input.goal.toUpperCase()}
Generated: ${new Date(campaign.createdAt).toLocaleDateString()}

TARGET AUDIENCE
Demographic: ${campaign.audience.demographic}
Age Range: ${campaign.audience.ageRange}
Income: ${campaign.audience.income}
Interests: ${campaign.audience.interests.join(", ")}
Behaviours: ${campaign.audience.behaviors.join(", ")}

RECOMMENDED PLATFORMS
${campaign.platforms.map((p) => `• ${p.name} (${p.budgetShare}% budget) — ${p.reason}`).join("\n")}

AD COPY SUGGESTIONS
${campaign.adCopies.map((c, i) => `Variation ${i + 1} (${c.tone})\nHeadline: ${c.headline}\nBody: ${c.body}\nCTA: ${c.cta}`).join("\n\n")}

BUDGET GUIDANCE
Monthly Budget: ${campaign.budgetGuidance.monthly}
Estimated Return: ${campaign.budgetGuidance.roiEstimate}
Breakdown:
${campaign.budgetGuidance.breakdown.map((b) => `• ${b.platform}: ${b.amount} (${b.percentage}%)`).join("\n")}

STRATEGY SUMMARY
${campaign.strategySummary}

ACTION PLAN
${campaign.actionPlan.map((s) => `Week ${s.week}: ${s.title}\n${s.tasks.map((t) => `  - ${t}`).join("\n")}`).join("\n\n")}
`.trim();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              Recommendations Ready
            </span>
          </div>
          <h2 className="text-xl font-bold text-foreground">{campaign.input.businessName}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {campaign.input.product} &middot;{" "}
            <span className="capitalize">{campaign.input.goal}</span> &middot;{" "}
            {campaign.input.location}
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            data-testid="button-copy-all"
            onClick={() => {
              navigator.clipboard.writeText(allResultsText);
              toast({ title: "Copied to clipboard", description: "All recommendations copied" });
            }}
            className="text-xs border-border/60 hover:border-primary/40 hover:text-primary transition-all"
          >
            Copy All
          </Button>
          <Button
            variant={saved ? "default" : "outline"}
            size="sm"
            data-testid="button-save-campaign"
            onClick={handleSave}
            className={`text-xs transition-all ${
              saved
                ? "bg-primary/90 hover:bg-primary text-primary-foreground border-primary/70"
                : "border-border/60 hover:border-primary/40 hover:text-primary"
            }`}
          >
            {saved ? (
              <><BookmarkCheck className="w-3.5 h-3.5 mr-1.5" />Saved</>
            ) : (
              <><Bookmark className="w-3.5 h-3.5 mr-1.5" />Save</>
            )}
          </Button>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Target Audience */}
        <ResultCard
          title="Target Audience"
          data-testid="card-audience"
          icon={<Users className="w-4 h-4" />}
          accentColor="from-violet-400/40 to-transparent"
          copyContent={`Target Audience\n\nDemographic: ${campaign.audience.demographic}\nAge: ${campaign.audience.ageRange}\nIncome: ${campaign.audience.income}\nInterests: ${campaign.audience.interests.join(", ")}\nBehaviours: ${campaign.audience.behaviors.join(", ")}`}
        >
          <div className="space-y-3">
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Who they are</div>
              <p className="text-sm text-foreground leading-relaxed">{campaign.audience.demographic}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-muted/40 rounded-lg p-2.5">
                <div className="text-xs text-muted-foreground mb-0.5">Age Range</div>
                <div className="text-sm font-medium text-foreground">{campaign.audience.ageRange}</div>
              </div>
              <div className="bg-muted/40 rounded-lg p-2.5">
                <div className="text-xs text-muted-foreground mb-0.5">Income</div>
                <div className="text-sm font-medium text-foreground">{campaign.audience.income}</div>
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Interests</div>
              <div className="flex flex-wrap gap-1.5">
                {campaign.audience.interests.map((interest) => (
                  <span key={interest} className="text-xs px-2 py-1 rounded-md bg-violet-500/10 text-violet-300 border border-violet-500/20">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Behaviours</div>
              <div className="flex flex-wrap gap-1.5">
                {campaign.audience.behaviors.map((b) => (
                  <span key={b} className="text-xs px-2 py-1 rounded-md bg-muted/60 text-muted-foreground border border-border/40">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ResultCard>

        {/* Platforms */}
        <ResultCard
          title="Best Platforms"
          data-testid="card-platforms"
          icon={<BarChart2 className="w-4 h-4" />}
          accentColor="from-blue-400/40 to-transparent"
          copyContent={campaign.platforms.map((p) => `${p.name} (${p.budgetShare}%): ${p.reason}`).join("\n\n")}
        >
          <div className="space-y-3">
            {campaign.platforms.map((platform) => (
              <div key={platform.name} className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                  {platform.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-foreground truncate">{platform.name}</span>
                    <span className="flex-shrink-0 text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {platform.budgetShare}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{platform.reason}</p>
                  <div className="text-xs text-muted-foreground/70 mt-1">
                    Est. reach: <span className="text-foreground/70">{platform.estimatedReach}</span>
                  </div>
                  <div className="mt-1.5 h-1 rounded-full bg-muted/60 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-700"
                      style={{ width: `${platform.budgetShare}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ResultCard>

        {/* Ad Copy */}
        <ResultCard
          title="Ad Copy Ideas"
          data-testid="card-adcopy"
          icon={<MessageSquare className="w-4 h-4" />}
          accentColor="from-green-400/40 to-transparent"
          copyContent={campaign.adCopies.map((c, i) => `VARIATION ${i + 1} — ${c.tone}\n\nHeadline: ${c.headline}\n\nBody: ${c.body}\n\nCTA: ${c.cta}`).join("\n\n---\n\n")}
        >
          <div className="space-y-3">
            {campaign.adCopies.map((copy, i) => (
              <AdCopyVariant key={i} copy={copy} index={i} />
            ))}
          </div>
        </ResultCard>

        {/* Budget */}
        <ResultCard
          title="Budget Guidance"
          data-testid="card-budget"
          icon={<DollarSign className="w-4 h-4" />}
          accentColor="from-amber-400/40 to-transparent"
          copyContent={`Monthly Budget: ${campaign.budgetGuidance.monthly}\nEst. Return: ${campaign.budgetGuidance.roiEstimate}\n\nBreakdown:\n${campaign.budgetGuidance.breakdown.map((b) => `• ${b.platform}: ${b.amount} (${b.percentage}%)`).join("\n")}\n\nTips:\n${campaign.budgetGuidance.tips.map((t) => `• ${t}`).join("\n")}`}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-xl p-3">
              <TrendingUp className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <div className="text-xs text-muted-foreground">Estimated Return</div>
                <div className="text-sm font-semibold text-primary">{campaign.budgetGuidance.roiEstimate}</div>
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">How to split your budget</div>
              <div className="space-y-2">
                {campaign.budgetGuidance.breakdown.map((item) => (
                  <div key={item.platform} className="flex items-center justify-between">
                    <span className="text-sm text-foreground/80 truncate mr-2">{item.platform}</span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="w-14 h-1.5 rounded-full bg-muted/60 overflow-hidden">
                        <div className="h-full rounded-full bg-primary/70" style={{ width: `${item.percentage}%` }} />
                      </div>
                      <span className="text-xs font-medium text-primary w-14 text-right">{item.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Tips</div>
              <div className="space-y-1.5">
                {campaign.budgetGuidance.tips.map((tip, i) => (
                  <div key={i} className="flex gap-2 text-xs text-muted-foreground">
                    <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ResultCard>
      </div>

      {/* Strategy Summary */}
      <ResultCard
        title="Strategy Summary"
        data-testid="card-strategy"
        icon={<Map className="w-4 h-4" />}
        accentColor="from-primary/60 via-primary/20 to-transparent"
        copyContent={campaign.strategySummary}
      >
        <p className="text-sm text-foreground/80 leading-relaxed">{campaign.strategySummary}</p>
      </ResultCard>

      {/* Action Plan */}
      <ResultCard
        title="Step-by-Step Action Plan"
        data-testid="card-action-plan"
        icon={<Zap className="w-4 h-4" />}
        accentColor="from-orange-400/50 to-transparent"
        copyContent={campaign.actionPlan.map((s) => `Week ${s.week}: ${s.title}\n${s.tasks.map((t) => `• ${t}`).join("\n")}`).join("\n\n")}
      >
        <div className="space-y-2.5">
          {campaign.actionPlan.map((step, i) => (
            <div key={step.week} className="border border-border/40 rounded-xl overflow-hidden">
              <button
                type="button"
                data-testid={`action-step-${step.week}`}
                onClick={() => setExpandedStep(expandedStep === i ? null : i)}
                className="w-full flex items-center justify-between p-3.5 text-left hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                    {step.week}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{step.title}</div>
                    <div className="text-xs text-muted-foreground">Week {step.week} &middot; {step.tasks.length} tasks</div>
                  </div>
                </div>
                {expandedStep === i ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              {expandedStep === i && (
                <div className="px-4 pb-4 border-t border-border/30 bg-muted/10">
                  <div className="pt-3 space-y-2">
                    {step.tasks.map((task, j) => (
                      <div key={j} className="flex gap-2.5 items-start">
                        <CheckCircle2 className="w-4 h-4 text-primary/60 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/75 leading-relaxed">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ResultCard>
    </div>
  );
}

interface AdCopyVariantProps {
  copy: { headline: string; body: string; cta: string; tone: string };
  index: number;
}

function AdCopyVariant({ copy, index }: AdCopyVariantProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(`Headline: ${copy.headline}\n\n${copy.body}\n\nCTA: ${copy.cta}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      data-testid={`adcopy-variant-${index}`}
      className="group bg-muted/30 rounded-xl p-3.5 border border-border/30 hover:border-border/60 transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-primary/80 uppercase tracking-wide">
          Variant {index + 1} &mdash; {copy.tone}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          data-testid={`copy-adcopy-${index}`}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground p-1 rounded"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <p className="text-sm font-semibold text-foreground mb-1">{copy.headline}</p>
      <p className="text-xs text-muted-foreground leading-relaxed mb-2">{copy.body}</p>
      <span className="inline-block text-xs font-medium text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
        CTA: {copy.cta}
      </span>
    </div>
  );
}
