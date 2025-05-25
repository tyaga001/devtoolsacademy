import { streamText, UIMessage } from "ai"
import { anthropic } from "@ai-sdk/anthropic"

export async function POST(req: Request) {
  const {
    messages,
    blogContent,
  }: { messages: UIMessage[]; blogContent: string } = await req.json()

  const result = streamText({
    model: anthropic("claude-3-5-sonnet-20241022"),
    system: `You are a helpful assistant that answers questions about the following blog post. 
    Only answer questions related to the content of this blog post. 
    If asked about something unrelated to the blog, politely inform the user that you can only answer questions about this specific blog post.
    Blog Content:
    ${blogContent}`,
    messages,
  })

  return result.toDataStreamResponse()
}
