import axios from "axios";
import next from "next";
import { NextRequest, NextResponse } from "next/server";

export const PostsApis = axios.create({
  baseURL: "http://localhost:3002/api/posts",
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function GET(req: NextRequest) {
  try {
    const posts = await PostsApis.get("/");
    return NextResponse.json(posts.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Falha ao carregar posts"}, { status: 500 });
  }
}

