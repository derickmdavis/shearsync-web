export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-[32px] border border-border/70 bg-card p-8 text-center shadow-[0_24px_80px_rgba(17,24,39,0.08)]">
        <p className="font-display text-4xl font-semibold italic text-foreground">
          ShearSync
        </p>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
          Public booking web app
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          Open a stylist booking link at <code>/book/[slug]</code> to preview
          the public booking flow.
        </p>
      </div>
    </main>
  );
}
