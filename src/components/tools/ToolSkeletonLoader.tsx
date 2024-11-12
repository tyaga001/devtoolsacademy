import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface SkeletonLoaderProps {
  viewType: "grid" | "list";
}

export const ToolSkeletonLoader = ({ viewType }: SkeletonLoaderProps) => {
  return (
    <Card
      className={`relative rounded-xl bg-gradient-to-br from-purple-900 to-[#070808] shadow-none border-none overflow-hidden ${viewType === "list" ? "flex" : ""}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-purple-800/10 to-transparent skeleton-shimmer`}
      ></div>
      <div className={viewType === "list" ? "flex-grow" : ""}>
        <CardHeader>
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 rounded-full bg-purple-800/50"></div>
            <div className="h-6 w-1/3 bg-purple-800/50 rounded"></div>
          </div>
          <div className="h-4 w-2/3 bg-purple-800/50 rounded mt-2"></div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 w-16 bg-purple-800/50 rounded"></div>
            ))}
          </div>
          <div className="flex items-center mb-2">
            <div className="h-4 w-full bg-purple-800/50 rounded"></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="h-4 w-full bg-purple-800/50 rounded"></div>
          </div>
        </CardContent>
      </div>
      <CardFooter
        className={`flex justify-between ${viewType === "list" ? "flex-col items-end" : ""}`}
      >
        <div className="h-4 w-16 bg-purple-800/50 rounded"></div>
        <div className="h-4 w-16 bg-purple-800/50 rounded"></div>
      </CardFooter>
    </Card>
  );
}


