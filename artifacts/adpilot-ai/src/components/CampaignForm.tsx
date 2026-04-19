import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Sparkles, Target, MapPin, Building2, Package, ChevronDown } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { CampaignInput, MarketingGoal } from "@/lib/mockAi";
import { CURRENCIES, detectCurrency, getCurrencyByCode } from "@/lib/currency";
import type { Currency } from "@/lib/currency";

const schema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  product: z.string().min(2, "Product or service must be at least 2 characters"),
  description: z.string().min(10, "Please write a short description"),
  location: z.string().min(2, "Location is required"),
  budget: z.string().min(1, "Budget is required"),
  goal: z.enum(["awareness", "leads", "sales", "growth"]),
});

type FormValues = z.infer<typeof schema>;

interface GoalOption {
  value: MarketingGoal;
  label: string;
  description: string;
  color: string;
}

const goals: GoalOption[] = [
  {
    value: "awareness",
    label: "Brand Awareness",
    description: "Get your name out there",
    color: "from-violet-500/20 to-violet-500/5",
  },
  {
    value: "leads",
    label: "Generate Leads",
    description: "Attract interested prospects",
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    value: "sales",
    label: "Drive Sales",
    description: "Turn browsers into buyers",
    color: "from-green-500/20 to-green-500/5",
  },
  {
    value: "growth",
    label: "Accelerate Growth",
    description: "Scale fast and expand",
    color: "from-orange-500/20 to-orange-500/5",
  },
];

interface CampaignFormProps {
  onSubmit: (data: CampaignInput) => void;
  isLoading: boolean;
  initialCurrency?: Currency;
  onCurrencyChange?: (currency: Currency) => void;
}

export function CampaignForm({ onSubmit, isLoading, initialCurrency, onCurrencyChange }: CampaignFormProps) {
  const [selectedGoal, setSelectedGoal] = useState<MarketingGoal>("awareness");
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(initialCurrency ?? detectCurrency());
  const [currencyOpen, setCurrencyOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      businessName: "",
      product: "",
      description: "",
      location: "",
      budget: "",
      goal: "awareness",
    },
  });

  function handleCurrencySelect(code: string) {
    const c = getCurrencyByCode(code);
    setSelectedCurrency(c);
    setCurrencyOpen(false);
    onCurrencyChange?.(c);
  }

  function handleSubmit(values: FormValues) {
    onSubmit({ ...values, currency: selectedCurrency } as CampaignInput);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        {/* Business Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-primary" />
                  Business Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. Spark Coffee Co."
                    data-testid="input-business-name"
                    className="bg-muted/40 border-border/60 focus:border-primary/60 focus:ring-primary/20 transition-all"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="product"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-primary" />
                  Product or Service
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. Coffee Subscriptions"
                    data-testid="input-product"
                    className="bg-muted/40 border-border/60 focus:border-primary/60 focus:ring-primary/20 transition-all"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium text-muted-foreground">
                Short Description
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="What makes your business different? Who do you serve? What problem do you solve?"
                  data-testid="input-description"
                  className="bg-muted/40 border-border/60 focus:border-primary/60 focus:ring-primary/20 transition-all resize-none min-h-[80px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  Target Location
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. Austin, TX or Nationwide"
                    data-testid="input-location"
                    className="bg-muted/40 border-border/60 focus:border-primary/60 focus:ring-primary/20 transition-all"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-medium text-muted-foreground">
                  Monthly Budget
                </FormLabel>
                <FormControl>
                  <div className="flex gap-1.5">
                    {/* Currency selector */}
                    <div className="relative">
                      <button
                        type="button"
                        data-testid="currency-selector"
                        onClick={() => setCurrencyOpen(!currencyOpen)}
                        className="h-9 px-2.5 flex items-center gap-1 rounded-lg border border-border/60 bg-muted/40 text-sm font-medium text-foreground hover:border-primary/40 transition-all whitespace-nowrap"
                      >
                        <span className="text-primary font-bold">{selectedCurrency.symbol}</span>
                        <span className="text-xs text-muted-foreground">{selectedCurrency.code}</span>
                        <ChevronDown className="w-3 h-3 text-muted-foreground" />
                      </button>
                      {currencyOpen && (
                        <div className="absolute top-10 left-0 z-50 min-w-[160px] rounded-xl border border-border/60 bg-card shadow-xl overflow-hidden">
                          {CURRENCIES.map((c) => (
                            <button
                              key={c.code}
                              type="button"
                              data-testid={`currency-option-${c.code}`}
                              onClick={() => handleCurrencySelect(c.code)}
                              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-muted/60 transition-colors text-left
                                ${selectedCurrency.code === c.code ? "bg-primary/10 text-primary" : "text-foreground"}`}
                            >
                              <span className="font-bold w-5 text-center">{c.symbol}</span>
                              <span className="font-medium">{c.code}</span>
                              <span className="text-xs text-muted-foreground truncate">{c.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <Input
                      {...field}
                      placeholder="e.g. 500 or 2000"
                      data-testid="input-budget"
                      className="bg-muted/40 border-border/60 focus:border-primary/60 focus:ring-primary/20 transition-all flex-1"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Goal Selection */}
        <FormField
          control={form.control}
          name="goal"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-primary" />
                Main Marketing Goal
              </FormLabel>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {goals.map((goal) => (
                  <button
                    key={goal.value}
                    type="button"
                    data-testid={`goal-${goal.value}`}
                    onClick={() => {
                      setSelectedGoal(goal.value);
                      field.onChange(goal.value);
                    }}
                    className={`relative p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer
                      ${
                        selectedGoal === goal.value
                          ? "border-primary/70 bg-gradient-to-br " + goal.color + " shadow-lg shadow-primary/10"
                          : "border-border/50 bg-muted/20 hover:border-border hover:bg-muted/40"
                      }`}
                  >
                    {selectedGoal === goal.value && (
                      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    )}
                    <div className="text-sm font-semibold text-foreground">{goal.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{goal.description}</div>
                  </button>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          data-testid="button-generate"
          className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm rounded-xl
            shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-200 glow-orange-sm
            disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analysing your business...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Recommendations
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
