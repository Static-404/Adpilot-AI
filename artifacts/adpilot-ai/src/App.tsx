import { useEffect, useRef } from "react";
import { ClerkProvider, SignIn, SignUp, Show, useClerk } from "@clerk/react";
import { Switch, Route, useLocation, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

if (!clerkPubKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY");
}

const clerkAppearance = {
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: "hsl(25, 95%, 53%)",
    colorBackground: "hsl(220, 14%, 9%)",
    colorInputBackground: "hsl(220, 14%, 13%)",
    colorText: "hsl(220, 10%, 92%)",
    colorTextSecondary: "hsl(220, 8%, 58%)",
    colorInputText: "hsl(220, 10%, 92%)",
    colorNeutral: "hsl(220, 10%, 92%)",
    borderRadius: "0.75rem",
    fontFamily: "Inter, sans-serif",
    fontFamilyButtons: "Inter, sans-serif",
    fontSize: "14px",
  },
  elements: {
    rootBox: "w-full",
    cardBox: "border border-[hsl(220,12%,20%)] rounded-2xl w-full overflow-hidden shadow-2xl",
    card: "!shadow-none !border-0 !bg-transparent !rounded-none",
    footer: "!shadow-none !border-0 !bg-transparent !rounded-none",
    headerTitle: { color: "hsl(220, 10%, 92%)", fontWeight: "700", fontFamily: "'Space Grotesk', sans-serif" },
    headerSubtitle: { color: "hsl(220, 8%, 58%)" },
    socialButtonsBlockButtonText: { color: "hsl(220, 10%, 85%)" },
    formFieldLabel: { color: "hsl(220, 8%, 62%)", fontSize: "13px" },
    footerActionLink: { color: "hsl(25, 95%, 60%)" },
    footerActionText: { color: "hsl(220, 8%, 55%)" },
    dividerText: { color: "hsl(220, 8%, 45%)" },
    identityPreviewEditButton: { color: "hsl(25, 95%, 60%)" },
    formFieldSuccessText: { color: "hsl(142, 71%, 55%)" },
    alertText: { color: "hsl(220, 10%, 85%)" },
    logoBox: "flex justify-center mb-2",
    logoImage: "h-10 w-10",
    socialButtonsBlockButton:
      "border border-[hsl(220,12%,22%)] bg-[hsl(220,14%,13%)] hover:bg-[hsl(220,14%,17%)] text-sm transition-colors",
    formButtonPrimary:
      "bg-[hsl(25,95%,53%)] hover:bg-[hsl(25,95%,47%)] text-white font-semibold shadow-lg shadow-orange-900/30 transition-all",
    formFieldInput:
      "bg-[hsl(220,14%,13%)] border-[hsl(220,12%,22%)] text-[hsl(220,10%,92%)] placeholder:text-[hsl(220,8%,40%)] focus:border-[hsl(25,95%,53%)] transition-colors",
    footerAction: "border-t border-[hsl(220,12%,18%)] bg-[hsl(220,14%,9%)]",
    dividerLine: "bg-[hsl(220,12%,20%)]",
    alert: "border border-[hsl(220,12%,22%)] bg-[hsl(220,14%,12%)]",
    otpCodeFieldInput:
      "border-[hsl(220,12%,22%)] bg-[hsl(220,14%,13%)] text-[hsl(220,10%,92%)]",
    formFieldRow: "gap-3",
    main: "gap-4",
  },
};

const queryClient = new QueryClient();

function SignInPage() {
  // To update login providers, app branding, or OAuth settings use the Auth
  // pane in the workspace toolbar. More information can be found in the Replit docs.
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 bg-grid-pattern">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4 tracking-widest uppercase">
            AdPilot AI
          </div>
        </div>
        <SignIn
          routing="path"
          path={`${basePath}/sign-in`}
          signUpUrl={`${basePath}/sign-up`}
          fallbackRedirectUrl={`${basePath}/app`}
        />
      </div>
    </div>
  );
}

function SignUpPage() {
  // To update login providers, app branding, or OAuth settings use the Auth
  // pane in the workspace toolbar. More information can be found in the Replit docs.
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 bg-grid-pattern">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4 tracking-widest uppercase">
            AdPilot AI
          </div>
        </div>
        <SignUp
          routing="path"
          path={`${basePath}/sign-up`}
          signInUrl={`${basePath}/sign-in`}
          fallbackRedirectUrl={`${basePath}/app`}
        />
      </div>
    </div>
  );
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const qc = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (prevUserIdRef.current !== undefined && prevUserIdRef.current !== userId) {
        qc.clear();
      }
      prevUserIdRef.current = userId;
    });
    return unsubscribe;
  }, [addListener, qc]);

  return null;
}

function HomeRedirect() {
  return (
    <>
      <Show when="signed-in">
        <Redirect to="/app" />
      </Show>
      <Show when="signed-out">
        <Landing />
      </Show>
    </>
  );
}

function AppRoute() {
  return (
    <>
      <Show when="signed-in">
        <Home />
      </Show>
      <Show when="signed-out">
        <Redirect to="/" />
      </Show>
    </>
  );
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      localization={{
        signIn: {
          start: {
            title: "Welcome back",
            subtitle: "Sign in to your AdPilot AI account",
          },
        },
        signUp: {
          start: {
            title: "Get started free",
            subtitle: "Create your AdPilot AI account",
          },
        },
      }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <TooltipProvider>
          <Switch>
            <Route path="/" component={HomeRedirect} />
            <Route path="/app" component={AppRoute} />
            <Route path="/sign-in/*?" component={SignInPage} />
            <Route path="/sign-up/*?" component={SignUpPage} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function App() {
  return (
    <WouterRouter base={basePath}>
      <ClerkProviderWithRoutes />
    </WouterRouter>
  );
}

export default App;
