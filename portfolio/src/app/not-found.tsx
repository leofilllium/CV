import Link from "next/link";
export default function NotFound() {
  return (
    <main className="not-found">
      <h1>Off the map.</h1>
      <p>This world hasn’t been built. Let’s get you back to the portfolio.</p>
      <Link href="/" className="button primary">
        Back to Sherzod’s portfolio
      </Link>
    </main>
  );
}
