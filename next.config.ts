import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * CSP is intentionally a little looser in development so Next.js HMR / eval
 * continue to work. Production still allows Turnstile + Vercel Analytics.
 */
const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  "https://challenges.cloudflare.com",
  "https://va.vercel-scripts.com",
  ...(isDev ? ["'unsafe-eval'"] : []),
].join(" ");

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://challenges.cloudflare.com https://va.vercel-scripts.com https://vitals.vercel-insights.com https://*.vercel-insights.com",
  "frame-src https://challenges.cloudflare.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  outputFileTracingIncludes: {
    "/": ["./content/careers/**/*"],
    "/careers": ["./content/careers/**/*"],
  },
  experimental: {
    // Résumé uploads are capped at 4 MB; leave headroom for multipart overhead.
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
