import type { CampaignRecommendation } from "./mockAi";

const STORAGE_KEY_PREFIX = "adpilot_campaigns";
const CURRENCY_KEY_PREFIX = "adpilot_currency";

function getCampaignsKey(userId?: string | null): string {
  return userId ? `${STORAGE_KEY_PREFIX}_${userId}` : `${STORAGE_KEY_PREFIX}_anon`;
}

function getCurrencyKey(userId?: string | null): string {
  return userId ? `${CURRENCY_KEY_PREFIX}_${userId}` : `${CURRENCY_KEY_PREFIX}_anon`;
}

export function getSavedCampaigns(userId?: string | null): CampaignRecommendation[] {
  try {
    const raw = localStorage.getItem(getCampaignsKey(userId));
    if (!raw) return [];
    return JSON.parse(raw) as CampaignRecommendation[];
  } catch {
    return [];
  }
}

export function saveCampaign(campaign: CampaignRecommendation, userId?: string | null): void {
  const existing = getSavedCampaigns(userId);
  const filtered = existing.filter((c) => c.id !== campaign.id);
  const updated = [campaign, ...filtered];
  localStorage.setItem(getCampaignsKey(userId), JSON.stringify(updated));
}

export function deleteCampaign(id: string, userId?: string | null): void {
  const existing = getSavedCampaigns(userId);
  const updated = existing.filter((c) => c.id !== id);
  localStorage.setItem(getCampaignsKey(userId), JSON.stringify(updated));
}

export function isCampaignSaved(id: string, userId?: string | null): boolean {
  const existing = getSavedCampaigns(userId);
  return existing.some((c) => c.id === id);
}

export function getSavedCurrency(userId?: string | null): string | null {
  try {
    return localStorage.getItem(getCurrencyKey(userId));
  } catch {
    return null;
  }
}

export function setSavedCurrency(code: string, userId?: string | null): void {
  localStorage.setItem(getCurrencyKey(userId), code);
}
