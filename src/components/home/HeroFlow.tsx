import { cn } from "@/lib/utils";

/**
 * Abstract "engineers -> Skill Stand In -> AI training -> evaluation -> human
 * feedback -> better models" visualization. Pure SVG + CSS keyframes, so it
 * ships zero JS and pauses automatically under prefers-reduced-motion.
 */
export function HeroFlow({ className }: { className?: string }) {
  const engineers = [92, 260, 428];
  const outputs: { x: number; label: string }[] = [
    { x: 92, label: "AI Training" },
    { x: 260, label: "Evaluation" },
    { x: 428, label: "Human Feedback" },
  ];

  return (
    <div className={cn("relative", className)} aria-hidden="true">
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="absolute inset-x-10 top-1/3 -z-10 h-1/3 rounded-full bg-brand/25 blur-3xl dark:bg-brand/15" />
      <svg
        viewBox="0 0 520 600"
        className="h-auto w-full"
        role="img"
        aria-label="Diagram: engineers flow through Skill Stand In into AI training, evaluation and human feedback, producing better models"
      >
        <defs>
          <linearGradient id="ssi-flow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--brand-strong)" stopOpacity="0.9" />
          </linearGradient>
          <filter id="ssi-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* --- Static connection lines --- */}
        <g stroke="var(--border)" strokeWidth="1.5" fill="none">
          {engineers.map((x) => (
            <path key={`e-${x}`} d={`M ${x} 92 C ${x} 140, 260 130, 260 176`} />
          ))}
          {outputs.map(({ x }) => (
            <path key={`o-${x}`} d={`M 260 244 C 260 300, ${x} 290, ${x} 336`} />
          ))}
          {outputs.map(({ x }) => (
            <path key={`m-${x}`} d={`M ${x} 392 C ${x} 450, 260 440, 260 486`} />
          ))}
        </g>

        {/* --- Animated flowing dashes on top --- */}
        <g
          stroke="url(#ssi-flow)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="4 8"
          className="animate-flow-dash"
        >
          {engineers.map((x) => (
            <path key={`ea-${x}`} d={`M ${x} 92 C ${x} 140, 260 130, 260 176`} />
          ))}
          {outputs.map(({ x }) => (
            <path key={`oa-${x}`} d={`M 260 244 C 260 300, ${x} 290, ${x} 336`} />
          ))}
          {outputs.map(({ x }) => (
            <path key={`ma-${x}`} d={`M ${x} 392 C ${x} 450, 260 440, 260 486`} />
          ))}
        </g>

        {/* --- Row 1: Engineers --- */}
        <text
          x="260"
          y="26"
          textAnchor="middle"
          className="fill-muted-foreground font-sans text-[11px] font-semibold tracking-[0.2em] uppercase"
        >
          Engineers
        </text>
        {engineers.map((x, i) => (
          <g key={`en-${x}`} className="animate-float" style={{ animationDelay: `${i * 0.9}s` }}>
            <circle cx={x} cy="64" r="26" className="fill-card stroke-border" strokeWidth="1.5" />
            <text
              x={x}
              y="69"
              textAnchor="middle"
              className="fill-brand-deep font-mono text-[15px] font-semibold"
            >
              {"</>"}
            </text>
          </g>
        ))}

        {/* --- Row 2: Skill Stand In hub --- */}
        <g filter="url(#ssi-glow)">
          <rect
            x="150"
            y="176"
            width="220"
            height="68"
            rx="18"
            className="fill-brand-strong dark:fill-brand"
          />
        </g>
        <rect x="150" y="176" width="220" height="68" rx="18" className="fill-brand-strong dark:fill-brand" />
        <text
          x="260"
          y="205"
          textAnchor="middle"
          className="fill-primary-foreground font-heading text-[18px] font-extrabold tracking-tight"
        >
          Skill Stand In
        </text>
        <text
          x="260"
          y="226"
          textAnchor="middle"
          className="fill-primary-foreground/80 font-sans text-[10px] font-semibold tracking-[0.18em] uppercase"
        >
          Engineering agency
        </text>

        {/* --- Row 3: Outputs --- */}
        {outputs.map(({ x, label }) => (
          <g key={`out-${x}`}>
            <rect
              x={x - 80}
              y="336"
              width="160"
              height="56"
              rx="14"
              className="fill-card stroke-border"
              strokeWidth="1.5"
            />
            <circle cx={x - 60} cy="364" r="4" className="fill-brand-strong animate-pulse-soft" />
            <text
              x={x - 48}
              y="369"
              className="fill-foreground font-heading text-[15px] font-bold"
            >
              {label}
            </text>
          </g>
        ))}

        {/* --- Row 4: Better models --- */}
        <g>
          <circle cx="260" cy="540" r="52" className="fill-brand/20 animate-pulse-soft" />
          <circle cx="260" cy="540" r="40" className="fill-card stroke-brand-strong" strokeWidth="2" />
          <text
            x="260"
            y="536"
            textAnchor="middle"
            className="fill-foreground font-heading text-[14px] font-extrabold"
          >
            Better
          </text>
          <text
            x="260"
            y="552"
            textAnchor="middle"
            className="fill-foreground font-heading text-[14px] font-extrabold"
          >
            Models
          </text>
        </g>
      </svg>
    </div>
  );
}
