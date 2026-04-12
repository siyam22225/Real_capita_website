import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const videoSchema = z.object({
  title: z.string().min(2),
  youtubeUrl: z.string().url(),
  category: z.string().optional(),
});

function extractYouTubeId(url: string) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1);
    }

    if (parsed.hostname.includes("youtube.com")) {
      const v = parsed.searchParams.get("v");
      if (v) return v;

      const parts = parsed.pathname.split("/");
      const embedIndex = parts.findIndex((part) => part === "embed");
      if (embedIndex !== -1 && parts[embedIndex + 1]) {
        return parts[embedIndex + 1];
      }

      const shortsIndex = parts.findIndex((part) => part === "shorts");
      if (shortsIndex !== -1 && parts[shortsIndex + 1]) {
        return parts[shortsIndex + 1];
      }
    }

    return null;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = videoSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid video data" },
        { status: 400 }
      );
    }

    const videoId = extractYouTubeId(parsed.data.youtubeUrl);

    if (!videoId) {
      return NextResponse.json(
        { success: false, message: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    const saved = await prisma.video.create({
      data: {
        title: parsed.data.title,
        videoUrl: embedUrl,
        thumbnail: thumbnailUrl,
        category: parsed.data.category || null,
      },
    });

    return NextResponse.json(
      { success: true, message: "Video added successfully", data: saved },
      { status: 201 }
    );
  } catch (error) {
    console.error("VIDEO_POST_ERROR", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}