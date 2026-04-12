import bcrypt from "bcryptjs";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.news.createMany({
    data: [
      {
        title: "Project and customer service updates published",
        slug: "project-and-customer-service-updates",
        excerpt:
          "Latest updates highlight progress, service improvement, and better communication with clients.",
        content:
          "Real Capita Group has published new updates focused on project progress, customer communication, and service quality improvement.",
        imageUrl: "/images/news/photo-1.jpg",
      },
      {
        title: "Corporate office announces seasonal campaign",
        slug: "corporate-office-announces-seasonal-campaign",
        excerpt:
          "A new campaign has been introduced to improve brand visibility and customer engagement across channels.",
        content:
          "The corporate office has announced a new seasonal campaign designed to improve communication and outreach.",
        imageUrl: "/images/news/photo-2.jpg",
      },
      {
        title: "Real Capita shares updated service commitments",
        slug: "real-capita-shares-updated-service-commitments",
        excerpt:
          "The company published a fresh communication on service standards, transparency, and customer support.",
        content:
          "Real Capita Group has shared a new statement about service commitments and support quality.",
        imageUrl: "/images/news/photo-3.jpg",
      },
      {
        title: "Community support and social initiative",
        slug: "community-support-and-social-initiative",
        excerpt:
          "A new initiative has been launched to support community-oriented social programs.",
        content:
          "Real Capita Group continues to invest in community support through new social initiatives.",
        imageUrl: "/images/news/photo-4.jpg",
      },
      {
        title: "New enterprise milestone announced",
        slug: "new-enterprise-milestone-announced",
        excerpt:
          "A new enterprise milestone was announced as part of the group’s long-term expansion plan.",
        content:
          "The group has announced a new enterprise milestone aligned with long-term strategic growth.",
        imageUrl: "/images/news/photo-5.jpg",
      },
      {
        title: "Residential service desk enhancement completed",
        slug: "residential-service-desk-enhancement-completed",
        excerpt:
          "Customer response workflow and support communication were improved through a new service desk upgrade.",
        content:
          "Real Capita Group upgraded its residential support desk to improve efficiency and communication.",
        imageUrl: "/images/news/photo-6.jpg",
      },
    ],
    skipDuplicates: true,
  });
  const hashedPassword = await bcrypt.hash("admin12345", 10);

await prisma.adminUser.upsert({
  where: { email: "admin@realcapita.com" },
  update: {},
  create: {
    email: "admin@realcapita.com",
    password: hashedPassword,
  },
});

  console.log("Seed completed successfully.");
}


main()

  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("SEED_ERROR:", e);
    await prisma.$disconnect();
    process.exit(1);
    
  });
  