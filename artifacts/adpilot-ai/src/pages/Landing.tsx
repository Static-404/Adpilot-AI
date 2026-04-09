import { useLocation } from "wouter";
import {
  Zap,
  ArrowRight,
  Users,
  BarChart2,
  MessageSquare,
  DollarSign,
  Map,
  CheckCircle2,
  ChevronDown,
  Target,
  Sparkles,
  Clock,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: <Users className="w-5 h-5" />,
    title: "Target the Right Audience",
    text: "Get suggested audience types based on your product, business type, and location.",
    color: "from-violet-500/20 to-violet-500/5 border-violet-500/20",
    iconColor: "text-violet-400 bg-violet-400/10",
  },
  {
    icon: <BarChart2 className="w-5 h-5" />,
    title: "Know the Best Platforms",
    text: "Find out whether your business should focus on Facebook, Instagram, TikTok, Google Ads, or a mix of platforms.",
    color: "from-blue-500/20 to-blue-500/5 border-blue-500/20",
    iconColor: "text-blue-400 bg-blue-400/10",
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    title: "Get Ad Copy Suggestions",
    text: "Receive ready-to-use messaging ideas and ad angles tailored to your offer.",
    color: "from-green-500/20 to-green-500/5 border-green-500/20",
    iconColor: "text-green-400 bg-green-400/10",
  },
  {
    icon: <DollarSign className="w-5 h-5" />,
    title: "Use Your Budget Better",
    text: "See practical budget guidance so you can avoid wasting money on the wrong channels.",
    color: "from-amber-500/20 to-amber-500/5 border-amber-500/20",
    iconColor: "text-amber-400 bg-amber-400/10",
  },
  {
    icon: <Map className="w-5 h-5" />,
    title: "Follow a Clear Marketing Strategy",
    text: "Get a summary of the best approach for your business, not generic advice.",
    color: "from-primary/20 to-primary/5 border-primary/20",
    iconColor: "text-primary bg-primary/10",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Take Action Step by Step",
    text: "AdPilot AI breaks things down into simple steps so you know what to do next.",
    color: "from-rose-500/20 to-rose-500/5 border-rose-500/20",
    iconColor: "text-rose-400 bg-rose-400/10",
  },
];

const steps = [
  {
    number: "01",
    title: "Enter Your Business Details",
    text: "Add your business name, product or service, short description, target location, budget, and main goal.",
  },
  {
    number: "02",
    title: "Get AI-Powered Recommendations",
    text: "AdPilot AI analyzes your input and gives you tailored suggestions on who to target, where to market, what to say, and how to spend your budget.",
  },
  {
    number: "03",
    title: "Follow the Step-by-Step Plan",
    text: "Get a practical action plan you can use immediately to launch and improve your marketing with more confidence.",
  },
];

const builtFor = [
  "Small business owners",
  "Solo entrepreneurs",
  "Online vendors",
  "Local service providers",
  "Startups testing new offers",
  "Anyone who wants to market a business without marketing experience",
];

const benefits = [
  { icon: <Shield className="w-4 h-4" />, text: "No marketing background needed" },
  { icon: <Sparkles className="w-4 h-4" />, text: "Simple and easy to use" },
  { icon: <MessageSquare className="w-4 h-4" />, text: "Clear recommendations, not confusing jargon" },
  { icon: <Target className="w-4 h-4" />, text: "Helps you market with more confidence" },
  { icon: <Clock className="w-4 h-4" />, text: "Saves time on planning" },
  { icon: <CheckCircle2 className="w-4 h-4" />, text: "Gives structure to your advertising decisions" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Landing() {
  const [, setLocation] = useLocation();

  function goToApp() {
    setLocation("/app");
  }

  return (
    <div className="min-h-screen bg-background bg-grid-pattern text-foreground">
      {/* ── Navigation ──────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center glow-orange-sm">
                <Zap className="w-4.5 h-4.5 text-white" />
              </div>
              <span
                className="text-lg font-bold tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                AdPilot <span className="text-gradient-orange">AI</span>
              </span>
            </div>

            {/* Nav links */}
            <div className="hidden md:flex items-center gap-1">
              {[
                { label: "How It Works", id: "how-it-works" },
                { label: "Features", id: "features" },
                { label: "Benefits", id: "benefits" },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <Button
              onClick={goToApp}
              data-testid="nav-cta"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm px-4 h-9 rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/35 transition-all"
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* Glow blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[80px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold mb-6 tracking-widest uppercase">
            <Sparkles className="w-3 h-3" />
            AI-Powered Marketing for Small Businesses
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Create Better Ads and Market Your Product{" "}
            <span className="text-gradient-orange">
              Without Any Marketing Experience
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            AdPilot AI helps small businesses and solo entrepreneurs turn their business or
            product details into clear marketing recommendations, audience suggestions, ad copy
            ideas, platform guidance, and a step-by-step action plan.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              onClick={goToApp}
              data-testid="hero-primary-cta"
              size="lg"
              className="w-full sm:w-auto h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base rounded-xl
                shadow-xl shadow-primary/25 hover:shadow-primary/40 glow-orange-sm transition-all"
            >
              <Sparkles className="w-4.5 h-4.5 mr-2" />
              Generate My Marketing Plan
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollTo("how-it-works")}
              data-testid="hero-secondary-cta"
              className="w-full sm:w-auto h-12 px-8 text-base rounded-xl border-border/60 text-foreground/80
                hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all font-medium"
            >
              See How It Works
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Social proof strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-xs text-muted-foreground">
            {[
              { value: "12+", label: "Platforms analyzed" },
              { value: "200+", label: "Ad variables" },
              { value: "4 goals", label: "Campaign strategies" },
              { value: "Free", label: "No credit card needed" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-primary">{item.value}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem ─────────────────────────────────────── */}
      <section className="py-16 sm:py-20 border-y border-border/30 bg-muted/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2
            className="text-2xl sm:text-3xl font-bold text-foreground mb-5"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Marketing your business should not feel confusing
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Most small business owners know they need visibility, but they do not know where
            to start. AdPilot AI simplifies the process by turning your business details into
            a practical marketing plan you can actually follow.
          </p>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────── */}
      <section id="how-it-works" className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border/50 text-muted-foreground text-xs font-medium mb-4 uppercase tracking-widest">
              Simple Process
            </div>
            <h2
              className="text-2xl sm:text-4xl font-bold text-foreground"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              How It Works
            </h2>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-gradient-to-r from-border/0 via-primary/30 to-border/0" />

            {steps.map((step, i) => (
              <div
                key={step.number}
                data-testid={`how-step-${i + 1}`}
                className="relative flex flex-col items-center text-center p-6 rounded-2xl border border-border/50 bg-card card-hover"
              >
                {/* Number badge */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/25 flex items-center justify-center mb-5 glow-orange-sm">
                  <span
                    className="text-sm font-bold text-primary"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {step.number}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────── */}
      <section id="features" className="py-16 sm:py-24 bg-muted/10 border-y border-border/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border/50 text-muted-foreground text-xs font-medium mb-4 uppercase tracking-widest">
              Capabilities
            </div>
            <h2
              className="text-2xl sm:text-4xl font-bold text-foreground"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              What AdPilot AI Helps You Do
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                data-testid={`feature-${feature.title.replace(/\s+/g, "-").toLowerCase()}`}
                className={`group relative p-5 rounded-2xl border bg-gradient-to-br ${feature.color} card-hover`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 ${feature.iconColor}`}>
                  {feature.icon}
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who It's For ────────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border/50 text-muted-foreground text-xs font-medium mb-4 uppercase tracking-widest">
              Who It's For
            </div>
            <h2
              className="text-2xl sm:text-4xl font-bold text-foreground"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Built For
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {builtFor.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-card card-hover"
              >
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                <span className="text-sm text-foreground/85">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ────────────────────────────────────── */}
      <section id="benefits" className="py-16 sm:py-24 bg-muted/10 border-y border-border/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border/50 text-muted-foreground text-xs font-medium mb-4 uppercase tracking-widest">
              Benefits
            </div>
            <h2
              className="text-2xl sm:text-4xl font-bold text-foreground"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Why Use AdPilot AI
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.text}
                className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-card card-hover"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  {benefit.icon}
                </div>
                <span className="text-sm text-foreground/85 leading-relaxed">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mid-page CTA ────────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="relative inline-block w-full">
            {/* Glow */}
            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-3xl pointer-events-none" />
            <div className="relative p-10 sm:p-14 rounded-3xl border border-primary/20 bg-card">
              <h2
                className="text-2xl sm:text-3xl font-bold text-foreground mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Stop guessing how to market your business
              </h2>
              <p className="text-base text-muted-foreground mb-8">
                Let AdPilot AI help you create a smarter plan in minutes.
              </p>
              <Button
                onClick={goToApp}
                data-testid="mid-cta"
                size="lg"
                className="h-12 px-10 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base rounded-xl
                  shadow-xl shadow-primary/25 hover:shadow-primary/40 glow-orange-sm transition-all"
              >
                <Sparkles className="w-4.5 h-4.5 mr-2" />
                Try AdPilot AI
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────── */}
      <section className="py-16 sm:py-28 relative overflow-hidden border-t border-border/30">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-primary/6 blur-[80px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-5 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Create better ads.{" "}
            <span className="text-gradient-orange">Reach the right people.</span>{" "}
            Market with confidence.
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
            AdPilot AI gives you the guidance you need to promote your business step by step.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              onClick={goToApp}
              data-testid="final-cta-primary"
              size="lg"
              className="w-full sm:w-auto h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base rounded-xl
                shadow-xl shadow-primary/30 hover:shadow-primary/45 glow-orange-sm transition-all"
            >
              <Zap className="w-4.5 h-4.5 mr-2" />
              Start Free
            </Button>
            <Button
              onClick={goToApp}
              data-testid="final-cta-secondary"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-12 px-8 text-base rounded-xl border-border/60 text-foreground/80
                hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all font-medium"
            >
              Generate My First Campaign
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="border-t border-border/30 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span
              className="font-bold text-foreground/70"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              AdPilot <span className="text-gradient-orange">AI</span>
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            {[
              { label: "How It Works", id: "how-it-works" },
              { label: "Features", id: "features" },
              { label: "Benefits", id: "benefits" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            AI-powered marketing for small businesses
          </p>
        </div>
      </footer>
    </div>
  );
}
