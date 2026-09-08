"use client";

/**
 * Root-level error boundary. Must render its own <html>/<body> because the
 * root layout has failed. Kept dependency-free and inline-styled on purpose.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          background: "#ffffff",
          color: "#142018",
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: 480 }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "#126b43",
            }}
          >
            Skill Stand In
          </p>
          <h1 style={{ fontSize: 36, lineHeight: 1.1, margin: "12px 0" }}>
            Something went wrong.
          </h1>
          <p style={{ color: "#647069", lineHeight: 1.6 }}>
            An unexpected error occurred while loading this page.
            {error.digest ? ` Reference: ${error.digest}` : ""}
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 20,
              height: 48,
              padding: "0 24px",
              borderRadius: 12,
              border: 0,
              background: "#24b967",
              color: "#0b1a10",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
