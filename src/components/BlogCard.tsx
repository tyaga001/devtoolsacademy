import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface BlogCardProps {
    title: string
    description: string
    date: string
    slug: string
}

export function BlogCard({ title, description, date, slug }: BlogCardProps) {
    return (
        <Card className="hover:bg-accent transition-colors">
            <Link href={`/blog/${slug}`} className="block">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{description}</p>
                    <p className="text-sm text-muted-foreground mt-2">{date}</p>
                </CardContent>
            </Link>
        </Card>
    )
}