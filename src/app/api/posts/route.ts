import { BlogPost } from "@/data/@types/BlogPostInterface";
import axios from "axios";
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
    return NextResponse.json({ error: "Falha ao carregar posts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newPost = body as BlogPost;
    newPost.slug = newPost.title
      .toLowerCase()
      .replace(/\s/g, '-')
      .replace(/[^\w-]+/g, '');

    const createdPost = await PostsApis.post('/', newPost);
    return NextResponse.json(createdPost.data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao cadastrar post" }, { status: 500 })
  }
}