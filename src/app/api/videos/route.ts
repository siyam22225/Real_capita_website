import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const videos = await prisma.video.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(videos);
  } catch (error) {
    console.error("GET /api/videos error:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, category, sourceType, videoUrl } = body;

    if (!title || !videoUrl || !sourceType) {
      return NextResponse.json(
        { error: "Title, sourceType, and videoUrl are required." },
        { status: 400 }
      );
    }

    if (sourceType !== "youtube" && sourceType !== "raw") {
      return NextResponse.json(
        { error: "sourceType must be either youtube or raw." },
        { status: 400 }
      );
    }

    const newVideo = await prisma.video.create({
      data: {
        title,
        category: category || null,
        sourceType,
        videoUrl,
      },
    });

    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) {
    console.error("POST /api/videos error:", error);
    return NextResponse.json(
      { error: "Failed to create video." },
      { status: 500 }
    );
  }
}