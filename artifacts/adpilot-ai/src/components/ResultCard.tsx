import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  title: string;
  icon: React.ReactNode;
  accentColor?: string;
  children: React.ReactNode;
  className?: string;
  copyContent?: string;
  "data-testid"?: string;
}

export function ResultCard({
  title,
  icon,
  accentColor = "from-primary/20 to-transparent",
  children,
  className,
  copyContent,
  "data-testid": testId,
}: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!copyContent) return;
    await navigator.clipboard.writeText(copyContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      data-testid={testId}
      className={cn(
        "relative rounded-2xl border border-border/50 bg-card overflow-hidden card-hover",
        className
      )}
    >
      {/* Top accent gradient */}
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${accentColor}`} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              {icon}
            </div>
            <h3 className="font-semibold text-foreground text-sm tracking-wide uppercase">
              {title}
            </h3>
          </div>
          {copyContent && (
            <Button
              variant="ghost"
              size="sm"
              data-testid={`copy-${testId}`}
              onClick={handleCopy}
              className="h-7 px-2 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1 text-green-400" />
                  <span className="text-xs text-green-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1" />
                  <span className="text-xs">Copy</span>
                </>
              )}
            </Button>
          )}
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}
