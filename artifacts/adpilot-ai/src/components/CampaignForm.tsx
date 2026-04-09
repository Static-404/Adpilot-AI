import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Sparkles, Target, DollarSign, MapPin, Building2, Package } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { CampaignInput, MarketingGoal } from "@/lib/mockAi";

const schema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  product: z.string().min(2, "Product/service must be at least 2 characters"),
  description: z.string().min(10, "Please provide at least a brief description"),
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
    description: "Get more people to know your brand",
    color: "from-violet-500/20 to-violet-500/5",
  },
  {
    value: "leads",
    label: "Generate Leads",
    description: "Capture interested prospects",
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    value: "sales",
    label: "Drive Sales",
    description: "Convert buyers and increase revenue",
    color: "from-green-500/20 to-green-500/5",
  },
  {
    value: "growth",
    label: "Accelerate Growth",
    description: "Scale fast and expand reach",
    color: "from-orange-500/20 to-orange-500/5",
  },
];

interface CampaignFormProps {
  onSubmit: (data: CampaignInput) => void;
  isLoading: boolean;
}

export function CampaignForm({ onSubmit, isLoading }: CampaignFormProps) {
  const [selectedGoal, setSelectedGoal] = useState<MarketingGoal>("awareness");

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

  function handleSubmit(values: FormValues) {
    onSubmit(values as CampaignInput);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Business Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground/80 flex items-center gap-2">
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
                <FormLabel className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                  <Package className="w-3.5 h-3.5 text-primary" />
                  Product or Service
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. Specialty Coffee Subscriptions"
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
              <FormLabel className="text-sm font-medium text-foreground/80">
                Short Description
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Describe what makes your business unique, who you serve, and what problem you solve..."
                  data-testid="input-description"
                  className="bg-muted/40 border-border/60 focus:border-primary/60 focus:ring-primary/20 transition-all resize-none min-h-[90px]"
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
                <FormLabel className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  Target Location
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. Austin, Texas or Nationwide"
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
                <FormLabel className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                  <DollarSign className="w-3.5 h-3.5 text-primary" />
                  Monthly Budget
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. $500 or $2,000"
                    data-testid="input-budget"
                    className="bg-muted/40 border-border/60 focus:border-primary/60 focus:ring-primary/20 transition-all"
                  />
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
              <FormLabel className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                <Target className="w-3.5 h-3.5 text-primary" />
                Main Marketing Goal
              </FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-1">
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
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary animate-pulse" />
                    )}
                    <div className="text-sm font-semibold text-foreground">{goal.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {goal.description}
                    </div>
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
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base rounded-xl
            shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-200 glow-orange-sm
            disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Analyzing your business...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Recommendations
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
