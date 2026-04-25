import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

const superAdmins = [
  {
    email: "ashiksiyam302@gmail.com",
    name: "IT Head Super Admin",
    passwordEnv: "SUPER_ADMIN_1_PASSWORD",
  },
  {
    email: "realcapita89@gmail.com",
    name: "Real Capita Super Admin",
    passwordEnv: "SUPER_ADMIN_2_PASSWORD",
  },
];

async function main() {
  for (const admin of superAdmins) {
    const rawPassword = process.env[admin.passwordEnv];

    if (!rawPassword || rawPassword.length < 8) {
      throw new Error(`${admin.passwordEnv} must be at least 8 characters.`);
    }

    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    await prisma.adminUser.upsert({
      where: { email: admin.email },
      update: {
        name: admin.name,
        password: hashedPassword,
        role: "super_admin",
        isProtected: true,
        isActive: true,
      },
      create: {
        email: admin.email,
        name: admin.name,
        password: hashedPassword,
        role: "super_admin",
        isProtected: true,
        isActive: true,
      },
    });
  }

  const admins = await prisma.adminUser.findMany({
    select: {
      email: true,
      name: true,
      role: true,
      isProtected: true,
      isActive: true,
    },
    orderBy: { createdAt: "asc" },
  });

  console.table(admins);
  console.log("Two protected super admins are ready.");
}

main()
  .catch((error) => {
    console.error("SEED_SUPER_ADMINS_ERROR", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });