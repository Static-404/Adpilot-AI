export interface Currency {
  code: string;
  symbol: string;
  name: string;
  locale: string;
}

export const CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar", locale: "en-US" },
  { code: "GBP", symbol: "£", name: "British Pound", locale: "en-GB" },
  { code: "EUR", symbol: "€", name: "Euro", locale: "de-DE" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira", locale: "en-NG" },
  { code: "CAD", symbol: "CA$", name: "Canadian Dollar", locale: "en-CA" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", locale: "en-AU" },
];

const LOCALE_TO_CURRENCY: Record<string, string> = {
  "en-US": "USD",
  "en-GB": "GBP",
  "en-NG": "NGN",
  "en-CA": "CAD",
  "en-AU": "AUD",
  "de": "EUR",
  "fr": "EUR",
  "es": "EUR",
  "it": "EUR",
  "pt-PT": "EUR",
  "nl": "EUR",
};

export function detectCurrency(): Currency {
  try {
    const locale = navigator.language || "en-US";
    // Try exact match first
    let code = LOCALE_TO_CURRENCY[locale];
    if (!code) {
      // Try language prefix
      const lang = locale.split("-")[0];
      code = LOCALE_TO_CURRENCY[lang];
    }
    if (!code) {
      // Try Intl to get currency
      const fmt = new Intl.NumberFormat(locale, { style: "currency", currency: "USD" });
      const parts = fmt.formatToParts(0);
      const currencyPart = parts.find((p) => p.type === "currency");
      if (currencyPart) code = currencyPart.value;
    }
    const found = CURRENCIES.find((c) => c.code === code);
    return found ?? CURRENCIES[0];
  } catch {
    return CURRENCIES[0];
  }
}

export function getCurrencyByCode(code: string): Currency {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
}

export function formatBudget(amount: number, currency: Currency): string {
  try {
    return new Intl.NumberFormat(currency.locale, {
      style: "currency",
      currency: currency.code,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency.symbol}${amount.toLocaleString()}`;
  }
}

export function parseBudgetAmount(budget: string): number {
  const num = parseFloat(budget.replace(/[^0-9.]/g, ""));
  return isNaN(num) ? 500 : num;
}
