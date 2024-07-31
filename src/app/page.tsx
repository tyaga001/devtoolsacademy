import Link from 'next/link'

export default function Home() {
    return (
        <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-6xl font-bold mb-6">Dev Tools Compare</h1>
            <p className="text-xl mb-8">"Unbiased Developer Tools Comparisons – Your One-Stop Resource"</p>
            <p className="mb-8">
                Welcome to Dev Tools Compare, where we provide in-depth, unbiased comparisons of
                the developer tools to help you make informed decisions for your projects.
            </p>
            <Link href="/blog" className="text-blue-500 hover:underline">
                Read our blog
            </Link>
        </div>
    )
}