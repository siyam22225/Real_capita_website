import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const oldEmail = "ashiksiyam302@gmail.com";
  const newEmail = "ashiksiyam302@gmail.com";
  const newPassword = "admin649080";

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const existingAdmin = await prisma.adminUser.findFirst({
    where: {
      OR: [{ email: oldEmail }, { email: newEmail }, { email: "admin@realcapita.com" }],
    },
  });

  if (existingAdmin) {
    await prisma.adminUser.update({
      where: { id: existingAdmin.id },
      data: {
        email: newEmail,
        password: hashedPassword,
      },
    });
  } else {
    await prisma.adminUser.create({
      data: {
        email: newEmail,
        password: hashedPassword,
      },
    });
  }

  console.log("Admin credentials updated successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });