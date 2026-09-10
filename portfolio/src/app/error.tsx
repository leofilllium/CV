"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="not-found"><h1>A small detour.</h1><p>Something interrupted this page. Please try loading it again.</p><button className="button primary" onClick={reset}>Try again</button><Link href="/">Return to the portfolio</Link></main>;
}
