import type { CampaignRecommendation } from "./mockAi";

const STORAGE_KEY = "adpilot_saved_campaigns";

export function getSavedCampaigns(): CampaignRecommendation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CampaignRecommendation[];
  } catch {
    return [];
  }
}

export function saveCampaign(campaign: CampaignRecommendation): void {
  const existing = getSavedCampaigns();
  const filtered = existing.filter((c) => c.id !== campaign.id);
  const updated = [campaign, ...filtered];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function deleteCampaign(id: string): void {
  const existing = getSavedCampaigns();
  const updated = existing.filter((c) => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function isCampaignSaved(id: string): boolean {
  const existing = getSavedCampaigns();
  return existing.some((c) => c.id === id);
}
