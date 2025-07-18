export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-dune-light">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header skeleton */}
          <div className="animate-pulse">
            <div className="h-8 bg-pine/20 rounded mb-4 w-1/3"></div>
            <div className="h-4 bg-pine/20 rounded mb-2 w-2/3"></div>
          </div>
          
          {/* Content skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="animate-pulse">
              <div className="h-6 bg-pine/20 rounded mb-2"></div>
              <div className="h-4 bg-pine/20 rounded w-3/4"></div>
            </div>
            <div className="animate-pulse">
              <div className="h-6 bg-pine/20 rounded mb-2"></div>
              <div className="h-4 bg-pine/20 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 