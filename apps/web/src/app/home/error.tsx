"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="py-12">
      <p className="text-sm text-muted-foreground">Something went wrong.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-3 text-sm text-blue-500 hover:underline"
      >
        Try again
      </button>
    </div>
  );
}
