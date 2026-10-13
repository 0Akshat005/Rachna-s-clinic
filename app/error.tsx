"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="error-page container">
      <h1>Something needs another moment.</h1>
      <p>Please try loading this page again, or call the clinic for help.</p>
      <button type="button" className="button button-primary" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
