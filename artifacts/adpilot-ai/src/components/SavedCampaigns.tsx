import { useState } from "react";
import { Trash2, ChevronRight, Calendar, Target, DollarSign, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CampaignRecommendation } from "@/lib/mockAi";
import { deleteCampaign } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";

interface SavedCampaignsProps {
  campaigns: CampaignRecommendation[];
  onSelect: (campaign: CampaignRecommendation) => void;
  onDelete: (id: string) => void;
  userId?: string | null;
}

const goalColors: Record<string, string> = {
  awareness: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  leads: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  sales: "text-green-400 bg-green-400/10 border-green-400/20",
  growth: "text-orange-400 bg-orange-400/10 border-orange-400/20",
};

const goalLabels: Record<string, string> = {
  awareness: "Brand Awareness",
  leads: "Lead Generation",
  sales: "Drive Sales",
  growth: "Accelerate Growth",
};

export function SavedCampaigns({ campaigns, onSelect, onDelete, userId }: SavedCampaignsProps) {
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function handleDelete(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    setDeletingId(id);
    deleteCampaign(id, userId);
    onDelete(id);
    toast({
      title: "Campaign removed",
      description: "Removed from your saved campaigns",
    });
    setTimeout(() => setDeletingId(null), 300);
  }

  if (campaigns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-14 h-14 rounded-2xl bg-muted/40 border border-border/40 flex items-center justify-center mb-4">
          <Target className="w-6 h-6 text-muted-foreground/50" />
        </div>
        <h3 className="text-sm font-semibold text-foreground/70 mb-1">No saved campaigns yet</h3>
        <p className="text-xs text-muted-foreground max-w-xs">
          Generate a campaign and save it — it'll appear here for easy access later
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2 p-3">
      {campaigns.map((campaign) => {
        const goalColor = goalColors[campaign.input.goal] || goalColors.awareness;
        const goalLabel = goalLabels[campaign.input.goal] || campaign.input.goal;
        const createdDate = new Date(campaign.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        const currencySymbol = campaign.input.currency?.symbol ?? "$";

        return (
          <div
            key={campaign.id}
            data-testid={`saved-campaign-${campaign.id}`}
            onClick={() => onSelect(campaign)}
            className={`group relative flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200
              border-border/50 bg-background/40 hover:border-primary/30 hover:bg-muted/20
              ${deletingId === campaign.id ? "opacity-50 scale-98" : ""}`}
          >
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-muted/50 border border-border/40 flex items-center justify-center">
              <span className="text-base font-bold text-foreground/50">
                {campaign.input.businessName.charAt(0).toUpperCase()}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-foreground truncate">{campaign.input.businessName}</h4>
                  <p className="text-xs text-muted-foreground truncate">{campaign.input.product}</p>
                </div>
                <span className={`flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${goalColor}`}>
                  {goalLabel}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>{campaign.input.location}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <DollarSign className="w-3 h-3" />
                  <span>{currencySymbol}{campaign.input.budget}/mo</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>{createdDate}</span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                data-testid={`delete-campaign-${campaign.id}`}
                onClick={(e) => handleDelete(e, campaign.id)}
                className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
