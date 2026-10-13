import Link from "next/link";
export default function NotFound() {
  return (
    <section className="error-page container">
      <p className="eyebrow justify-center">A different direction</p>
      <h1>Let’s find your way.</h1>
      <p>This page isn’t available. Explore our care options or return home.</p>
      <Link href="/services" className="button button-primary">
        Explore services →
      </Link>
    </section>
  );
}
