import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse) {
  const text = req.nextUrl.searchParams.get("text");

  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(
    "AIzaSyDgnQLdSPqUkX4kMlkZ_vBnjowD9GSmeYg"
  );

  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(text || "");
  const response = await result.response;
  const resulta = response.text();

  return new Response(resulta);
}
