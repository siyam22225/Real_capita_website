import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/admin-auth";

const CORE_ENTERPRISE_SLUGS = [
  "land-rpcdl",
  "apartment-rchl",
  "hotel-rc-bay",
  "resda",
  "afsen-group",
  "abdf",
];

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

const enterpriseSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(5),
  imageUrl: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  buttonText: z.string().optional().nullable(),
  buttonHref: z.string().optional().nullable(),
  profileUrl: z.string().optional().nullable(),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

const updateSchema = z.object({
  enterprises: z.array(enterpriseSchema).min(1),
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

    const enterprises = await prisma.enterprise.findMany({
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({
      success: true,
      data: enterprises,
    });
  } catch (error) {
    console.error("ADMIN_ENTERPRISES_GET_ERROR", error);
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
        { success: false, message: "Invalid enterprise data" },
        { status: 400 }
      );
    }

    const updatedEnterprises = [];

    for (const item of parsed.data.enterprises) {
      const data = {
        name: item.name.trim(),
        slug: item.slug.trim(),
        description: item.description,
        imageUrl: item.imageUrl || null,
        location: item.location || null,
        buttonText: item.buttonText || null,
        buttonHref: item.buttonHref || null,
        profileUrl: item.profileUrl || null,
        sortOrder: item.sortOrder ?? 0,
        isActive: item.isActive ?? true,
      };

      const updated = item.id
        ? await prisma.enterprise.update({
            where: { id: item.id },
            data,
          })
        : await prisma.enterprise.upsert({
            where: { slug: data.slug },
            update: data,
            create: data,
          });

      updatedEnterprises.push(updated);
    }

    return NextResponse.json({
      success: true,
      message: "Enterprise concerns updated successfully",
      data: updatedEnterprises,
    });
  } catch (error) {
    console.error("ADMIN_ENTERPRISES_PATCH_ERROR", error);
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
        { success: false, message: "Enterprise id is required" },
        { status: 400 }
      );
    }

    const enterprise = await prisma.enterprise.findUnique({
      where: { id },
      select: {
        id: true,
        slug: true,
        name: true,
      },
    });

    if (!enterprise) {
      return NextResponse.json(
        { success: false, message: "Enterprise not found" },
        { status: 404 }
      );
    }

    if (CORE_ENTERPRISE_SLUGS.includes(enterprise.slug)) {
      return NextResponse.json(
        {
          success: false,
          message: "Default enterprise concerns cannot be deleted.",
        },
        { status: 403 }
      );
    }

    await prisma.enterprise.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Enterprise concern deleted successfully",
    });
  } catch (error) {
    console.error("ADMIN_ENTERPRISES_DELETE_ERROR", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}