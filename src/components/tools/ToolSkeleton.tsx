import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ToolSkeleton() {
  return (
    <Card
      className={`relative size-full max-w-sm overflow-hidden rounded-none border-white/10`}
    >
      <div className={`skeleton-shimmer absolute inset-0`}></div>
      <div className="grow">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="size-12 animate-pulse rounded bg-[#141414]"></div>
            <div className="h-6 w-1/3 animate-pulse rounded bg-[#141414]"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex items-center">
            <div className="h-4 w-full animate-pulse rounded bg-[#141414]"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="h-4 w-full animate-pulse rounded bg-[#141414]"></div>
          </div>
          <div className="flex flex-col flex-wrap gap-2 pt-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between">
                <div className="h-6 w-16 animate-pulse rounded bg-[#141414]"></div>
                <div className="h-6 w-16 animate-pulse rounded bg-[#141414]"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
