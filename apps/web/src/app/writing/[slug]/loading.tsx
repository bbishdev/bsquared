export default function Loading() {
  return (
    <div className="prose dark:prose-invert max-w-none animate-pulse">
      <div className="h-10 bg-muted rounded w-3/4 mb-4" />
      <div className="h-4 bg-muted rounded w-1/4 mb-8" />
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-5/6" />
        <div className="h-4 bg-muted rounded w-4/5" />
      </div>
    </div>
  );
}
