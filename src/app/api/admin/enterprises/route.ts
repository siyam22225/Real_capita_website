import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/admin-auth";

export const runtime = "nodejs";

const CORE_ENTERPRISE_SLUGS = new Set([
  "land-rpcdl",
  "apartment-rchl",
  "hotel-rc-bay",
  "resda",
  "afsen-group",
  "abdf",
]);

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

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function makeSlug(value: unknown) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET() {
  const admin = await requireAdmin();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const enterprises = await prisma.enterprise.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return NextResponse.json({
    success: true,
    data: enterprises,
    enterprises,
  });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const name = cleanText(body.name);
  const slug = makeSlug(body.slug || body.name);

  if (!name || !slug) {
    return NextResponse.json(
      { error: "Concern name and valid slug are required." },
      { status: 400 }
    );
  }

  const enterprise = await prisma.enterprise.create({
    data: {
      name,
      slug,
      description: cleanText(body.description),
      imageUrl: cleanText(body.imageUrl || body.image),
      location: cleanText(body.location),
      buttonText: cleanText(body.buttonText) || "Visit Website",
      buttonHref: cleanText(body.buttonHref || body.website) || "#",
      profileUrl: cleanText(body.profileUrl) || null,
      sortOrder: Number(body.sortOrder || 0),
      isActive: body.isActive !== false,
    },
  });

  return NextResponse.json({
    success: true,
    data: enterprise,
    enterprise,
  });
}

export async function PUT(req: Request) {
  const admin = await requireAdmin();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const id = cleanText(body.id);
  const name = cleanText(body.name);
  const slug = makeSlug(body.slug || body.name);

  if (!id || !name || !slug) {
    return NextResponse.json(
      { error: "Concern id, name, and valid slug are required." },
      { status: 400 }
    );
  }

  const existing = await prisma.enterprise.findUnique({
    where: { id },
  });

  if (!existing) {
    return NextResponse.json(
      { error: "Concern not found." },
      { status: 404 }
    );
  }

  const enterprise = await prisma.enterprise.update({
    where: { id },
    data: {
      name,
      slug,
      description: cleanText(body.description),
      imageUrl: cleanText(body.imageUrl || body.image),
      location: cleanText(body.location),
      buttonText: cleanText(body.buttonText) || "Visit Website",
      buttonHref: cleanText(body.buttonHref || body.website) || "#",
      profileUrl: cleanText(body.profileUrl) || null,
      sortOrder: Number(body.sortOrder || 0),
      isActive: body.isActive !== false,
    },
  });

  if (existing.slug !== enterprise.slug) {
    await prisma.enterpriseProject.updateMany({
      where: { enterpriseSlug: existing.slug },
      data: { enterpriseSlug: enterprise.slug },
    });
  }

  return NextResponse.json({
    success: true,
    data: enterprise,
    enterprise,
  });
}

export async function DELETE(req: Request) {
  const admin = await requireAdmin();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Concern id is required." },
      { status: 400 }
    );
  }

  const existing = await prisma.enterprise.findUnique({
    where: { id },
  });

  if (!existing) {
    return NextResponse.json(
      { error: "Concern not found." },
      { status: 404 }
    );
  }

  if (CORE_ENTERPRISE_SLUGS.has(existing.slug)) {
    const enterprise = await prisma.enterprise.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json({
      success: true,
      action: "set-inactive",
      data: enterprise,
    });
  }

  await prisma.enterprise.delete({
    where: { id },
  });

  return NextResponse.json({
    success: true,
    action: "deleted",
  });
}