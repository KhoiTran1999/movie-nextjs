import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse) {
  const prompt = req.nextUrl.searchParams.get("text");

  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY || "");

  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(prompt || "");
  const response = await result.response;
  const text = response.text();

  return new Response(text);
}
