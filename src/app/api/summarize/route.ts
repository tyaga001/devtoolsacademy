import { NextResponse } from 'next/server';
import axios from 'axios';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

export async function POST(request: Request) {
    try {
        const { content, query } = await request.json();

        if (!ANTHROPIC_API_KEY) {
            throw new Error('ANTHROPIC_API_KEY is not set');
        }

        const response = await axios.post(ANTHROPIC_API_URL, {
            model: "claude-3-sonnet-20240229",
            messages: [
                { role: "system", content: "You are an AI assistant that answers questions about blog posts." },
                { role: "human", content: `Here's a blog post:\n\n${content}\n\nQuestion: ${query}` }
            ],
            max_tokens: 1000,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01'
            },
        });

        const answer = response.data.content[0].text;
        return NextResponse.json({ answer });
    } catch (error: any) {
        console.error('Error in API:', error.response?.data || error.message);
        return NextResponse.json(
            { error: 'Error processing request. Please try again.' },
            { status: error.response?.status || 500 }
        );
    }
}