

import { GoogleGenerativeAI, GoogleGenerativeAIError } from "@google/generative-ai";
import { NextResponse } from "next/server";


const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    throw new Error("Something went wrong while fetching API Keys.")
  }
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You're an AI assistant, Who only answers questions related to the blog post that have provided to you in the prompt.\n\nTry to Answer using numeric points for readability and Bold the title of the point. \n\n If the user wants help related to the topic mentioned in the blog you can answer that.\n\n If the question is not related to the blog post or the topic that is mentioned on the blog, Throw error response."
},

);

export async function POST(request: Request) {

    const { content, query } = await request.json();

    try {
        const prompt = `Here's a blog post:\n\n${content}\n\nQuestion: ${query}`;

        const result = await model.generateContent(prompt);
        return NextResponse.json({
            answer: result.response.text(),
            success: true
        })
    }
    catch (error: any) {
        const errorMessage = new GoogleGenerativeAIError(error.message);
        console.error('Error in API:', errorMessage.message);
        return NextResponse.json(
            {
                error: 'Internal Server Error. Please try again after some time.',
                success: false

            },
            { status: error.response?.status || 500 }
        );
    }
}