"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <NextError statusCode={500} title="A critical error occurred. Please try again." />
        <div style={{ textAlign: 'center', marginTop: '-28px', position: 'relative', zIndex: 999 }}>
          <button onClick={() => window.location.reload()}
            style={{ padding: '8px 16px', cursor: 'pointer' }}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
