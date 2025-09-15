import React from "react"

const LoadingCategories: React.FC = () => {
  return (
    <section className="mx-auto mb-20 max-w-7xl px-4 md:px-0">
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">
          <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
            Browse by Category
          </span>
        </h2>
        <p className="text-base text-neutral-500 md:text-lg">
          Find jobs in your area of expertise
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="h-10 w-24 bg-neutral-800 rounded animate-pulse"
          />
        ))}
      </div>
    </section>
  )
}

export default LoadingCategories
