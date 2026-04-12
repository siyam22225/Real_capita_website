import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  queryType: z.string().min(2),
  subject: z.string().min(2),
  message: z.string().min(5),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid form data", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const saved = await prisma.contactMessage.create({
      data: parsed.data,
    });

    return NextResponse.json(
      { success: true, message: "Message saved successfully", data: saved },
      { status: 201 }
    );
  } catch (error) {
    console.error("CONTACT_API_ERROR", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}