import { getAllPosts, getPostBySlug } from '../../lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'

export default function Page({ params }: { params?: { slug: string } }) {
  if (params?.slug) {
    // This is a blog post page
    const post = getPostBySlug(params.slug)
    return (
        <div>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-400 mb-8">{post.views} views</p>
          <div className="prose prose-invert">
            <MDXRemote source={post.content} />
          </div>
        </div>
    )
  } else {
    // This is the home page
    const posts = getAllPosts()
    return (
        <div>
          <h1 className="text-4xl font-bold mb-8">Dev Tools Comparison Blog</h1>
          <ul>
            {posts.map((post) => (
                <li key={post.slug} className="mb-4">
                  <a href={`/${post.slug}`} className="text-xl hover:underline">
                    {post.title}
                  </a>
                  <p className="text-gray-400">{post.views} views</p>
                </li>
            ))}
          </ul>
        </div>
    )
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}