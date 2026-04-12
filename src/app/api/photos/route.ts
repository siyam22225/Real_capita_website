import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const photoSchema = z.object({
  title: z.string().min(2),
  imageUrl: z.string().min(3),
  category: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = photoSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid photo data" },
        { status: 400 }
      );
    }

    const saved = await prisma.photo.create({
      data: {
        title: parsed.data.title,
        imageUrl: parsed.data.imageUrl,
        category: parsed.data.category || null,
      },
    });

    return NextResponse.json(
      { success: true, message: "Photo added successfully", data: saved },
      { status: 201 }
    );
  } catch (error) {
    console.error("PHOTO_POST_ERROR", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}