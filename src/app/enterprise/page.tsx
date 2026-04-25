import Link from "next/link";
import { enterpriseItems } from "@/data/enterprises";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type EnterpriseListItem = {
  id: string | number;
  slug: string;
  name: string;
  sortOrder?: number;
};

async function getEnterpriseItems(): Promise<EnterpriseListItem[]> {
  try {
    const items = await prisma.enterprise.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
      select: {
        id: true,
        slug: true,
        name: true,
        sortOrder: true,
      },
    });

    if (items.length > 0) {
      return items;
    }
  } catch (error) {
    console.error("ENTERPRISE_PAGE_DYNAMIC_ERROR", error);
  }

  return enterpriseItems.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    sortOrder: item.id,
  }));
}

export default async function EnterprisePage() {
  const items = await getEnterpriseItems();

  return (
    <section
      style={{
        background: "#f2f2f2",
        minHeight: "100vh",
        padding: "70px 0 90px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#666",
              fontSize: "54px",
              fontWeight: 300,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Enterprise
          </h1>
        </div>

        <div
          style={{
            background: "#fff",
            boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            padding: "30px",
          }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              style={{
                borderBottom:
                  index !== items.length - 1 ? "1px solid #e5e7eb" : "none",
              }}
            >
              <Link
                href={`/enterprise/${item.slug}`}
                style={{
                  display: "block",
                  padding: "18px 0",
                  textDecoration: "none",
                  color: "#555",
                  fontSize: "22px",
                  fontWeight: 500,
                }}
              >
                {item.name.trim()}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}