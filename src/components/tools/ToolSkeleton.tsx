import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ToolSkeleton() {
  return (
    <Card
      className={`relative w-full h-full max-w-sm border-white border-opacity-10 rounded-xl overflow-hidden`}
    >
      <div className={`absolute inset-0 skeleton-shimmer`}></div>
      <div className="flex-grow">
        <CardHeader>
          <div className="flex gap-2 items-center">
            <div className="w-12 h-12 rounded bg-[#141414] animate-pulse"></div>
            <div className="h-6 w-1/3 bg-[#141414] rounded animate-pulse"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-2">
            <div className="h-4 w-full bg-[#141414] rounded animate-pulse"></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="h-4 w-full bg-[#141414] rounded animate-pulse"></div>
          </div>
          <div className="flex flex-col flex-wrap gap-2 pt-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between">
                <div className="h-6 w-16 bg-[#141414] rounded animate-pulse"></div>
                <div className="h-6 w-16 bg-[#141414] rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
