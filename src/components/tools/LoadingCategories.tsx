import React from "react"

function LoadingCategories() {
  return (
    <div className="w-full px-4 py-8 pt-16 md:px-6 lg:px-48">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Explore Categories
          </h2>
          <p className="text-muted-foreground">
            Discover tools and resources across various categories
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="flex w-full items-center gap-4 rounded-lg p-4"
              >
                <div className="size-12 animate-pulse rounded-full bg-[#141414]"></div>
                <div className="flex flex-col gap-1">
                  <div className="h-4 w-20 animate-pulse rounded-xl bg-[#141414]"></div>
                  <div className="h-4 w-28 animate-pulse rounded-xl bg-[#141414]"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingCategories
