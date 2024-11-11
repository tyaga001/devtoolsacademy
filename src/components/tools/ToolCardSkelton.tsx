import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ToolCardSkeleton() {
  return (
    <Card className="flex flex-col h-full overflow-hidden border-l-4 border-l-primary/20">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-48" /> {/* Tool name */}
          <Skeleton className="h-6 w-20 rounded-full" /> {/* Stars count */}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {/* Category badges */}
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
      </CardHeader>

      <CardContent className="flex-grow py-2">
        {/* Description */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-[90%] mb-2" />
        <Skeleton className="h-4 w-[80%]" />

        <div className="flex flex-wrap gap-2 mt-4">
          {/* Tags */}
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4 mt-auto">
        <div className="flex justify-between items-center w-full">
          <Skeleton className="h-4 w-32" /> {/* Date */}
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded-md" /> {/* GitHub button */}
            <Skeleton className="h-8 w-8 rounded-md" /> {/* Website button */}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}