import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Post {
    slug: string
    title: string
    date: string
    views: number
}

interface RecentPostsProps {
    posts: Post[]
}

export function RecentPosts({ posts }: RecentPostsProps) {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Recent Posts:</h2>
            <div className="space-y-4">
                {posts.map((post) => (
                    <Card key={post.slug} className="hover:bg-accent transition-colors">
                        <Link href={`/blog/${post.slug}`} className="block">
                            <CardHeader>
                                <CardTitle>{post.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{post.date}</p>
                                <p className="text-sm text-muted-foreground">{post.views} views</p>
                            </CardContent>
                        </Link>
                    </Card>
                ))}
            </div>
        </div>
    )
}