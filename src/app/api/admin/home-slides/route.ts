import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/admin-auth";

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) return null;

  try {
    return await verifyAdminToken(token);
  } catch {
    return null;
  }
}

const slideSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional().nullable(),
  subtitle: z.string().optional().nullable(),
  imageUrl: z.string().min(3),
  buttonText: z.string().optional().nullable(),
  buttonHref: z.string().optional().nullable(),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

const updateSchema = z.object({
  slides: z.array(slideSchema).min(1),
});

export async function GET() {
  try {
    const admin = await requireAdmin();

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const slides = await prisma.homeSlide.findMany({
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({
      success: true,
      data: slides,
    });
  } catch (error) {
    console.error("ADMIN_HOME_SLIDES_GET_ERROR", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const admin = await requireAdmin();

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid slider data" },
        { status: 400 }
      );
    }

    const updatedSlides = [];

    for (const item of parsed.data.slides) {
      if (item.id) {
        const updated = await prisma.homeSlide.update({
          where: { id: item.id },
          data: {
            title: item.title || null,
            subtitle: item.subtitle || null,
            imageUrl: item.imageUrl,
            buttonText: item.buttonText || null,
            buttonHref: item.buttonHref || null,
            sortOrder: item.sortOrder ?? 0,
            isActive: item.isActive ?? true,
          },
        });

        updatedSlides.push(updated);
      } else {
        const created = await prisma.homeSlide.create({
          data: {
            title: item.title || null,
            subtitle: item.subtitle || null,
            imageUrl: item.imageUrl,
            buttonText: item.buttonText || null,
            buttonHref: item.buttonHref || null,
            sortOrder: item.sortOrder ?? 0,
            isActive: item.isActive ?? true,
          },
        });

        updatedSlides.push(created);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Homepage slider updated successfully",
      data: updatedSlides,
    });
  } catch (error) {
    console.error("ADMIN_HOME_SLIDES_PATCH_ERROR", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
export async function DELETE(req: Request) {
  try {
    const admin = await requireAdmin();

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const id = String(body.id || "");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Slide id is required" },
        { status: 400 }
      );
    }

    await prisma.homeSlide.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Slide deleted successfully",
    });
  } catch (error) {
    console.error("ADMIN_HOME_SLIDES_DELETE_ERROR", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}