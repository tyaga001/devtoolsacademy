import Image from "next/image"

const featuredTools = [
  { name: "Tool 1", description: "Brief description", image: "/tool1.png" },
  { name: "Tool 2", description: "Brief description", image: "/tool2.png" },
  { name: "Tool 3", description: "Brief description", image: "/tool3.png" },
]

export default function FeaturedTools() {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-3xl font-bold">Featured Developer Tools</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {featuredTools.map((tool, index) => (
          <div key={index} className="rounded-lg border p-4">
            <Image
              src={tool.image}
              alt={tool.name}
              width={64}
              height={64}
              className="mb-2"
            />
            <h3 className="mb-2 text-xl font-semibold">{tool.name}</h3>
            <p>{tool.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
