import Image from 'next/image'

const featuredTools = [
    { name: 'Tool 1', description: 'Brief description', image: '/tool1.png' },
    { name: 'Tool 2', description: 'Brief description', image: '/tool2.png' },
    { name: 'Tool 3', description: 'Brief description', image: '/tool3.png' },
]

export default function FeaturedTools() {
    return (
        <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Developer Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredTools.map((tool, index) => (
                    <div key={index} className="border p-4 rounded-lg">
                        <Image src={tool.image} alt={tool.name} width={64} height={64} className="mb-2" />
                        <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                        <p>{tool.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}