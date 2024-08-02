import Link from 'next/link'

interface Post {
    slug: string;
    title: string;
    summary: string;
    publishedAt: string;
    views: number;
}

interface RecentPostsProps {
    posts: Post[];
}

export const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Recent Posts:</h2>
            <div className="space-y-4">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{post.summary}</p>
                        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                            <span>{post.publishedAt}</span>
                            <span>{post.views} views</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};