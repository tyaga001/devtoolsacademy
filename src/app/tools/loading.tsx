import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_COUNT = 6;
const ToolCardSkeleton = () => (
  <div className="p-6 rounded-lg border" role="status">
    <Skeleton className="h-6 w-3/4 mb-4" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-2/3" />
  </div>
);
export default function Loading(): JSX.Element {
  return (
    <div className="container mx-auto px-4 py-8">
      <section
        aria-label="Loading tools grid"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {Array.from({ length: SKELETON_COUNT }, (_, i) => (
          <ToolCardSkeleton key={i} />
        ))}
      </section>
    </div>
  );
}
