import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_req: Request, { params }: Props) {
  try {
    const { id } = await params;

    await prisma.photo.delete({
      where: { id },
    });

    return NextResponse.json(
      { success: true, message: "Photo deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("PHOTO_DELETE_ERROR", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete photo" },
      { status: 500 }
    );
  }
}